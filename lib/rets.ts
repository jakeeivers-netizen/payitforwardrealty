import crypto from 'crypto';
import type { Listing, ListingSearchParams } from '@/types/listing';

interface CapabilityURLs {
  Search?: string;
  GetObject?: string;
  Logout?: string;
}

interface SessionData {
  cookie: string;
  capabilityURLs: CapabilityURLs;
  expiresAt: number;
}

function md5(str: string): string {
  return crypto.createHash('md5').update(str).digest('hex');
}

function parseDigestChallenge(wwwAuthenticate: string): Record<string, string> {
  const result: Record<string, string> = {};
  const regex = /(\w+)="([^"]+)"/g;
  let match;
  while ((match = regex.exec(wwwAuthenticate)) !== null) {
    result[match[1]] = match[2];
  }
  return result;
}

function buildDigestAuth(
  method: string,
  uri: string,
  username: string,
  password: string,
  challenge: Record<string, string>
): string {
  const realm = challenge.realm || '';
  const nonce = challenge.nonce || '';
  const qop = challenge.qop;
  const opaque = challenge.opaque;

  const ha1 = md5(`${username}:${realm}:${password}`);
  const ha2 = md5(`${method}:${uri}`);

  let response: string;
  let nc = '';
  let cnonce = '';

  if (qop === 'auth' || qop === 'auth-int') {
    nc = '00000001';
    cnonce = crypto.randomBytes(8).toString('hex');
    response = md5(`${ha1}:${nonce}:${nc}:${cnonce}:${qop}:${ha2}`);
  } else {
    response = md5(`${ha1}:${nonce}:${ha2}`);
  }

  let header = `Digest username="${username}", realm="${realm}", nonce="${nonce}", uri="${uri}", response="${response}"`;
  if (qop) header += `, qop=${qop}, nc=${nc}, cnonce="${cnonce}"`;
  if (opaque) header += `, opaque="${opaque}"`;

  return header;
}

function parseCapabilityURLs(body: string): CapabilityURLs {
  const urls: CapabilityURLs = {};
  const lines = body.split('\n');
  for (const line of lines) {
    const eqIdx = line.indexOf('=');
    if (eqIdx === -1) continue;
    const key = line.substring(0, eqIdx).trim();
    const value = line.substring(eqIdx + 1).trim();
    if (key === 'Search') urls.Search = value;
    if (key === 'GetObject') urls.GetObject = value;
    if (key === 'Logout') urls.Logout = value;
  }
  return urls;
}

class RetsClient {
  private session: SessionData | null = null;
  private readonly loginUrl: string;
  private readonly username: string;
  private readonly password: string;
  private readonly baseUrl: string;

  constructor() {
    this.loginUrl = process.env.DDF_LOGIN_URL || 'https://ddfapi.realtor.ca/rets/v1.5/login';
    this.username = process.env.DDF_USERNAME || '';
    this.password = process.env.DDF_PASSWORD || '';
    const url = new URL(this.loginUrl);
    this.baseUrl = `${url.protocol}//${url.host}`;
  }

  private isSessionValid(): boolean {
    return (
      this.session !== null &&
      Date.now() < this.session.expiresAt
    );
  }

  async login(): Promise<void> {
    if (this.isSessionValid()) return;

    const url = new URL(this.loginUrl);
    const path = url.pathname + (url.search || '');

    // First request — no auth header, expect 401
    const firstRes = await fetch(this.loginUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'PayItForwardRealty/1.0',
        'RETS-Version': 'RETS/1.5',
        'Accept': '*/*',
      },
    });

    if (firstRes.status === 401) {
      const wwwAuth = firstRes.headers.get('WWW-Authenticate') || '';
      const challenge = parseDigestChallenge(wwwAuth);
      const authHeader = buildDigestAuth('GET', path, this.username, this.password, challenge);

      const secondRes = await fetch(this.loginUrl, {
        method: 'GET',
        headers: {
          'User-Agent': 'PayItForwardRealty/1.0',
          'RETS-Version': 'RETS/1.5',
          'Accept': '*/*',
          'Authorization': authHeader,
        },
      });

      if (!secondRes.ok) {
        throw new Error(`RETS login failed: ${secondRes.status} ${secondRes.statusText}`);
      }

      const setCookie = secondRes.headers.get('set-cookie') || '';
      const cookie = setCookie.split(';')[0];
      const body = await secondRes.text();
      const capabilityURLs = parseCapabilityURLs(body);

      this.session = {
        cookie,
        capabilityURLs,
        expiresAt: Date.now() + 30 * 60 * 1000, // 30 minutes
      };
    } else if (firstRes.ok) {
      const setCookie = firstRes.headers.get('set-cookie') || '';
      const cookie = setCookie.split(';')[0];
      const body = await firstRes.text();
      const capabilityURLs = parseCapabilityURLs(body);

      this.session = {
        cookie,
        capabilityURLs,
        expiresAt: Date.now() + 30 * 60 * 1000,
      };
    } else {
      throw new Error(`RETS login unexpected status: ${firstRes.status}`);
    }
  }

  async search(params: ListingSearchParams): Promise<{ listings: Listing[]; total: number }> {
    await this.login();

    if (!this.session) throw new Error('Not logged in');

    const searchUrl = this.session.capabilityURLs.Search
      ? (this.session.capabilityURLs.Search.startsWith('http')
          ? this.session.capabilityURLs.Search
          : `${this.baseUrl}${this.session.capabilityURLs.Search}`)
      : `${this.baseUrl}/rets/v1.5/search`;

    // Build DMQL2 query
    const conditions: string[] = [];
    if (params.city) conditions.push(`(City=${params.city})`);
    if (params.minPrice) conditions.push(`(ListPrice=${params.minPrice}+)`);
    if (params.maxPrice) conditions.push(`(ListPrice=0-${params.maxPrice})`);
    if (params.beds) conditions.push(`(BedsTotal=${params.beds}+)`);
    if (params.baths) conditions.push(`(BathroomsTotalInteger=${params.baths}+)`);
    if (params.propertyType && params.propertyType !== 'All Types') {
      conditions.push(`(PropertyType=${params.propertyType})`);
    }
    if (params.status) conditions.push(`(StandardStatus=${params.status})`);

    const query = conditions.length > 0 ? conditions.join(',') : '(ListPrice=0+)';

    const searchParams = new URLSearchParams({
      SearchType: 'Property',
      Class: 'ResidentialProperty',
      Query: query,
      QueryType: 'DMQL2',
      Format: 'COMPACT-DECODED',
      Limit: String(params.limit || 20),
      Offset: String(params.offset || 0),
      StandardNames: '1',
      Count: '1',
    });

    const url = new URL(searchUrl);
    const path = url.pathname + '?' + searchParams.toString();

    // Try with existing session, re-auth if needed
    const doRequest = async (authHeader?: string) => {
      const headers: Record<string, string> = {
        'User-Agent': 'PayItForwardRealty/1.0',
        'RETS-Version': 'RETS/1.5',
        'Accept': '*/*',
      };
      if (this.session?.cookie) headers['Cookie'] = this.session.cookie;
      if (authHeader) headers['Authorization'] = authHeader;

      return fetch(`${searchUrl}?${searchParams.toString()}`, {
        method: 'GET',
        headers,
      });
    };

    let res = await doRequest();

    if (res.status === 401) {
      const wwwAuth = res.headers.get('WWW-Authenticate') || '';
      const challenge = parseDigestChallenge(wwwAuth);
      const authHeader = buildDigestAuth('GET', path, this.username, this.password, challenge);
      res = await doRequest(authHeader);
    }

    if (!res.ok) {
      throw new Error(`RETS search failed: ${res.status}`);
    }

    const body = await res.text();
    return this.parseCompactDecoded(body);
  }

  private parseCompactDecoded(body: string): { listings: Listing[]; total: number } {
    const lines = body.split('\n').map(l => l.trim()).filter(Boolean);

    // Extract count
    let total = 0;
    const countMatch = body.match(/<COUNT Records="(\d+)"/);
    if (countMatch) total = parseInt(countMatch[1], 10);

    // Find COLUMNS line
    let columns: string[] = [];
    const listings: Listing[] = [];

    for (const line of lines) {
      if (line.startsWith('COLUMNS\t')) {
        columns = line.split('\t').slice(1);
      } else if (line.startsWith('DATA\t')) {
        const values = line.split('\t').slice(1);
        const row: Record<string, string> = {};
        columns.forEach((col, idx) => {
          row[col] = values[idx] || '';
        });

        const listing = this.mapRowToListing(row);
        listings.push(listing);
      }
    }

    return { listings, total: total || listings.length };
  }

  private mapRowToListing(row: Record<string, string>): Listing {
    const streetNumber = row['StreetNumber'] || '';
    const streetName = row['StreetName'] || '';
    const address = `${streetNumber} ${streetName}`.trim();

    const price = parseFloat(row['ListPrice'] || '0') || 0;
    const beds = parseInt(row['BedsTotal'] || '0', 10) || 0;
    const baths = parseInt(row['BathroomsTotalInteger'] || '0', 10) || 0;
    const sqft = parseFloat(row['LivingArea'] || '0') || 0;

    const rawStatus = row['StandardStatus'] || 'Active';
    let status: 'For Sale' | 'For Rent' | 'Sold' = 'For Sale';
    if (rawStatus === 'Active') status = 'For Sale';
    else if (rawStatus === 'Lease' || rawStatus === 'For Rent') status = 'For Rent';
    else if (rawStatus === 'Sold' || rawStatus === 'Closed') status = 'Sold';

    const lat = row['Latitude'] ? parseFloat(row['Latitude']) : undefined;
    const lng = row['Longitude'] ? parseFloat(row['Longitude']) : undefined;
    const yearBuilt = row['YearBuilt'] ? parseInt(row['YearBuilt'], 10) : undefined;

    return {
      id: row['ListingKey'] || row['ListingId'] || '',
      mlsNum: row['ListingId'] || '',
      address,
      streetNumber,
      streetName,
      city: row['City'] || '',
      province: row['StateOrProvince'] || 'ON',
      postalCode: row['PostalCode'] || '',
      price,
      beds,
      baths,
      sqft,
      propertyType: row['PropertyType'] || 'Residential',
      status,
      description: row['PublicRemarks'] || '',
      images: [],
      lat: lat && !isNaN(lat) ? lat : undefined,
      lng: lng && !isNaN(lng) ? lng : undefined,
      yearBuilt: yearBuilt && !isNaN(yearBuilt) ? yearBuilt : undefined,
      garageType: row['GarageType'] || undefined,
      listDate: row['ListDate'] || undefined,
    };
  }

  async getImages(listingKey: string): Promise<string[]> {
    await this.login();
    if (!this.session) return [];

    const getObjectUrl = this.session.capabilityURLs.GetObject
      ? (this.session.capabilityURLs.GetObject.startsWith('http')
          ? this.session.capabilityURLs.GetObject
          : `${this.baseUrl}${this.session.capabilityURLs.GetObject}`)
      : `${this.baseUrl}/rets/v1.5/getobject`;

    const params = new URLSearchParams({
      Type: 'Photo',
      ID: `${listingKey}:*`,
      Location: '1',
    });

    const headers: Record<string, string> = {
      'User-Agent': 'PayItForwardRealty/1.0',
      'RETS-Version': 'RETS/1.5',
      'Accept': '*/*',
    };
    if (this.session.cookie) headers['Cookie'] = this.session.cookie;

    const res = await fetch(`${getObjectUrl}?${params.toString()}`, { headers });
    if (!res.ok) return [];

    const body = await res.text();
    // Parse multipart response for Location headers
    const urls: string[] = [];
    const locationMatches = body.match(/Location: (https?:\/\/[^\r\n]+)/gi);
    if (locationMatches) {
      for (const match of locationMatches) {
        const url = match.replace(/^Location:\s*/i, '').trim();
        urls.push(url);
      }
    }
    return urls;
  }

  async logout(): Promise<void> {
    if (!this.session) return;

    const logoutUrl = this.session.capabilityURLs.Logout
      ? (this.session.capabilityURLs.Logout.startsWith('http')
          ? this.session.capabilityURLs.Logout
          : `${this.baseUrl}${this.session.capabilityURLs.Logout}`)
      : `${this.baseUrl}/rets/v1.5/logout`;

    try {
      await fetch(logoutUrl, {
        headers: {
          'Cookie': this.session.cookie,
          'User-Agent': 'PayItForwardRealty/1.0',
          'RETS-Version': 'RETS/1.5',
        },
      });
    } catch {
      // Ignore logout errors
    }
    this.session = null;
  }
}

export const retsClient = new RetsClient();
