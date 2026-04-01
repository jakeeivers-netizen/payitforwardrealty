import type { Metadata } from 'next';
import Link from 'next/link';
import ListingCard from '@/components/ListingCard';
import type { Listing } from '@/types/listing';

export const metadata: Metadata = {
  title: 'Brantford Real Estate | Pay It Forward Realty',
  description: 'Browse homes for sale and rent in Brantford, Ontario. Find your perfect property with Pay It Forward Realty.',
};

async function getBrantfordListings(): Promise<Listing[]> {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/listings?city=Brantford&limit=24`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.listings ?? [];
  } catch {
    return [];
  }
}

export default async function BrantfordCommunityPage() {
  const listings = await getBrantfordListings();

  return (
    <div style={{ backgroundColor: '#1a1a1a', minHeight: '100vh' }}>

      {/* ─── PAGE TITLE BAR ─── */}
      <div style={{ backgroundColor: '#111', borderBottom: '1px solid #2a2a2a', padding: '24px 20px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', width: '90%' }}>
          <p style={{ color: '#888', fontFamily: "'Raleway', sans-serif", fontSize: '13px', marginBottom: '4px' }}>
            Browse listings by location
          </p>
          <h1 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '36px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '2px', margin: 0 }}>
            BRANTFORD
          </h1>
        </div>
      </div>

      {/* ─── LISTINGS GRID ─── */}
      <section style={{ padding: '40px 20px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', width: '90%' }}>

          {listings.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#888', fontFamily: "'Raleway', sans-serif", padding: '60px 0' }}>
              No listings found at this time. Please check back soon.
            </p>
          ) : (
            <>
              <p style={{ color: '#888', fontFamily: "'Raleway', sans-serif", fontSize: '13px', marginBottom: '24px' }}>
                {listings.length} properties found
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '20px',
                }}
                className="listings-grid"
              >
                {listings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            </>
          )}

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link
              href="/listings?city=Brantford"
              style={{
                display: 'inline-block',
                backgroundColor: '#58b3e5',
                color: '#fff',
                padding: '14px 40px',
                fontFamily: "'Raleway', sans-serif",
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontWeight: 700,
              }}
            >
              VIEW ALL BRANTFORD LISTINGS
            </Link>
          </div>
        </div>
      </section>

      {/* ─── COMMUNITY INFO ─── */}
      <section style={{ backgroundColor: '#111', padding: '60px 20px', borderTop: '1px solid #2a2a2a' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', width: '90%' }}>

          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '60px' }} className="stats-grid">
            {[
              { label: 'Population', value: '100,000+' },
              { label: 'Avg. Home Price', value: '$550K' },
              { label: 'Schools', value: 'Public & Catholic' },
              { label: 'Drive to Toronto', value: '~90 min' },
            ].map((stat) => (
              <div key={stat.label} style={{ backgroundColor: '#1a1a1a', padding: '28px 20px', textAlign: 'center', border: '1px solid #2a2a2a' }}>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '28px', fontWeight: 700, color: '#58b3e5', marginBottom: '6px' }}>
                  {stat.value}
                </div>
                <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Three columns */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }} className="info-grid">
            <div>
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '22px', color: '#fff', textTransform: 'uppercase', marginBottom: '16px', borderBottom: '2px solid #58b3e5', paddingBottom: '8px' }}>
                About Brantford
              </h2>
              <p style={{ fontFamily: "'Raleway', sans-serif", color: '#aaa', lineHeight: 1.8, fontSize: '14px' }}>
                Known as the "Telephone City" — birthplace of Alexander Graham Bell — Brantford sits along the Grand River in Southern Ontario. It offers affordable housing, top schools, Wilfrid Laurier University, and easy Highway 403 access.
              </p>
              <p style={{ fontFamily: "'Raleway', sans-serif", color: '#aaa', lineHeight: 1.8, fontSize: '14px', marginTop: '12px' }}>
                A thriving downtown, Harmony Square events, and a vibrant arts scene make Brantford one of Ontario's most livable mid-sized cities.
              </p>
            </div>

            <div>
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '22px', color: '#fff', textTransform: 'uppercase', marginBottom: '16px', borderBottom: '2px solid #58b3e5', paddingBottom: '8px' }}>
                Neighbourhoods
              </h2>
              <ul style={{ fontFamily: "'Raleway', sans-serif", color: '#aaa', lineHeight: 2.4, fontSize: '14px', listStyle: 'none', padding: 0 }}>
                {['West Brant', 'Eagle Place', 'Henderson', 'Dufferin / Holmedale', 'Echo Place', 'Brier Park / Lynden Hills', 'Terrace Hill', 'North Ward'].map((n) => (
                  <li key={n} style={{ borderBottom: '1px solid #2a2a2a' }}>
                    <Link href={`/listings?city=Brantford`} style={{ color: '#58b3e5', textDecoration: 'none' }}>→ {n}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '22px', color: '#fff', textTransform: 'uppercase', marginBottom: '16px', borderBottom: '2px solid #58b3e5', paddingBottom: '8px' }}>
                Amenities
              </h2>
              <ul style={{ fontFamily: "'Raleway', sans-serif", color: '#aaa', lineHeight: 2, fontSize: '14px', listStyle: 'none', padding: 0 }}>
                {[
                  'Wayne Gretzky Sports Centre',
                  'Wilfrid Laurier University – Brantford',
                  'Conestoga College – Brantford',
                  'Harmony Square (events & festivals)',
                  'Grand River trails & conservation areas',
                  'Lynwood Park & Cockshutt Park',
                  'Brantford General Hospital',
                  'Highway 403 to Hamilton & Toronto',
                ].map((a) => (
                  <li key={a} style={{ borderBottom: '1px solid #2a2a2a', paddingBottom: '2px', color: '#aaa' }}>✓ &nbsp;{a}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 1024px) {
          .listings-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .info-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .listings-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
