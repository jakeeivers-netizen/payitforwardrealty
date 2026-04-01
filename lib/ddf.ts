/**
 * CREA DDF API Client (New OAuth 2.0 + OData platform)
 * Replaces the old RETS-based client.
 *
 * Credentials: Get from CREA / your board (BRREA)
 *   - DDF_CLIENT_ID     = your new client ID
 *   - DDF_CLIENT_SECRET = your new client secret
 */

import type { Listing, ListingSearchParams } from '@/types/listing';

const TOKEN_URL = 'https://identity.crea.ca/connect/token';
const API_BASE = 'https://ddfapi.realtor.ca/odata/v1';

interface TokenCache {
  accessToken: string;
  expiresAt: number;
}

let tokenCache: TokenCache | null = null;

async function getAccessToken(): Promise<string> {
  if (tokenCache && Date.now() < tokenCache.expiresAt) {
    return tokenCache.accessToken;
  }

  const clientId = process.env.DDF_CLIENT_ID;
  const clientSecret = process.env.DDF_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('DDF_CLIENT_ID and DDF_CLIENT_SECRET are not set in .env.local');
  }

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
      scope: 'DDFApi_Read',
    }).toString(),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`DDF token request failed (${res.status}): ${body}`);
  }

  const data = await res.json();
  tokenCache = {
    accessToken: data.access_token,
    expiresAt: Date.now() + (data.expires_in - 60) * 1000, // refresh 60s early
  };

  return tokenCache.accessToken;
}

async function ddfFetch(path: string): Promise<Response> {
  const token = await getAccessToken();
  return fetch(`${API_BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
}

function mapPropertyToListing(p: Record<string, unknown>): Listing {
  const streetNumber = String(p['StreetNumber'] || p['UnparsedAddress'] || '');
  const streetName = String(p['StreetName'] || '');
  const address = streetNumber && streetName
    ? `${streetNumber} ${streetName}`.trim()
    : String(p['UnparsedAddress'] || '');

  const price = Number(p['ListPrice'] || 0);
  const beds = Number(p['BedsTotal'] || p['BedroomsTotal'] || 0);
  const baths = Number(p['BathroomsTotalInteger'] || p['BathroomsTotalDecimal'] || 0);
  const sqft = Number(p['LivingArea'] || p['BuildingAreaTotal'] || 0);

  const rawStatus = String(p['StandardStatus'] || 'Active');
  let status: 'For Sale' | 'For Rent' | 'Sold' = 'For Sale';
  if (rawStatus === 'Active') status = 'For Sale';
  else if (rawStatus === 'ActiveUnderContract') status = 'For Sale';
  else if (rawStatus === 'Closed' || rawStatus === 'Sold') status = 'Sold';

  // Images from Media array
  const mediaArray = Array.isArray(p['Media']) ? p['Media'] as Record<string, unknown>[] : [];
  const images = mediaArray
    .filter((m) => String(m['MediaURL'] || '').length > 0)
    .sort((a, b) => Number(a['Order'] || 0) - Number(b['Order'] || 0))
    .map((m) => String(m['MediaURL'] || ''))
    .filter(Boolean);

  return {
    id: String(p['ListingKey'] || p['ListingId'] || ''),
    mlsNum: String(p['ListingId'] || ''),
    address,
    streetNumber,
    streetName,
    city: String(p['City'] || ''),
    province: String(p['StateOrProvince'] || 'ON'),
    postalCode: String(p['PostalCode'] || ''),
    price,
    beds,
    baths,
    sqft,
    propertyType: String(p['PropertyType'] || p['PropertySubType'] || 'Residential'),
    status,
    description: String(p['PublicRemarks'] || ''),
    images,
    lat: p['Latitude'] ? Number(p['Latitude']) : undefined,
    lng: p['Longitude'] ? Number(p['Longitude']) : undefined,
    yearBuilt: p['YearBuilt'] ? Number(p['YearBuilt']) : undefined,
    garageType: p['GarageSpaces'] ? `${p['GarageSpaces']} car garage` : undefined,
    listDate: p['ListingContractDate'] ? String(p['ListingContractDate']) : undefined,
  };
}

export async function searchListings(
  params: ListingSearchParams
): Promise<{ listings: Listing[]; total: number }> {
  const filters: string[] = ['StandardStatus eq \'Active\''];

  if (params.city) filters.push(`City eq '${params.city}'`);
  if (params.minPrice) filters.push(`ListPrice ge ${params.minPrice}`);
  if (params.maxPrice) filters.push(`ListPrice le ${params.maxPrice}`);
  if (params.beds) filters.push(`BedsTotal ge ${params.beds}`);
  if (params.baths) filters.push(`BathroomsTotalInteger ge ${params.baths}`);
  if (params.propertyType && params.propertyType !== 'All Types') {
    filters.push(`PropertyType eq '${params.propertyType}'`);
  }
  if (params.officeKey) {
    filters.push(`ListOfficeKey eq '${params.officeKey}'`);
  }

  const top = params.limit || 20;
  const skip = params.offset || 0;

  const query = new URLSearchParams({
    $filter: filters.join(' and '),
    $top: String(top),
    $skip: String(skip),
    $count: 'true',
    $orderby: 'ListPrice desc',
  });

  const res = await ddfFetch(`/Property?${query.toString()}`);

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`DDF search failed (${res.status}): ${body}`);
  }

  const data = await res.json();
  const items: Record<string, unknown>[] = data.value || [];
  const total: number = data['@odata.count'] || items.length;

  return {
    listings: items.map(mapPropertyToListing),
    total,
  };
}

export async function getListing(listingKey: string): Promise<Listing | null> {
  const res = await ddfFetch(`/Property('${listingKey}')`);

  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`DDF get listing failed: ${res.status}`);

  const data = await res.json();
  return mapPropertyToListing(data);
}
