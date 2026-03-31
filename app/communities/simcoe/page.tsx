import type { Metadata } from 'next';
import Link from 'next/link';
import ListingCard from '@/components/ListingCard';
import type { Listing } from '@/types/listing';

export const metadata: Metadata = {
  title: 'Simcoe Real Estate | Pay It Forward Realty',
  description: 'Browse homes for sale and rent in Simcoe, Ontario. Find your perfect property with Pay It Forward Realty.',
};

async function getSimcoeListings(): Promise<Listing[]> {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/listings?city=Simcoe&limit=24`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.listings ?? [];
  } catch {
    return [];
  }
}

export default async function SimcoeCommunityPage() {
  const listings = await getSimcoeListings();

  return (
    <div style={{ backgroundColor: '#1a1a1a', minHeight: '100vh' }}>

      {/* ─── PAGE TITLE BAR ─── */}
      <div style={{ backgroundColor: '#111', borderBottom: '1px solid #2a2a2a', padding: '24px 20px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', width: '90%' }}>
          <p style={{ color: '#888', fontFamily: "'Raleway', sans-serif", fontSize: '13px', marginBottom: '4px' }}>
            Browse listings by location
          </p>
          <h1 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '36px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '2px', margin: 0 }}>
            SIMCOE
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
                  <ListingCard key={listing.ListingKey} listing={listing} />
                ))}
              </div>
            </>
          )}

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link
              href="/listings?city=Simcoe"
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
              VIEW ALL SIMCOE LISTINGS
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
              { label: 'Population', value: '15,000+' },
              { label: 'Avg. Home Price', value: '$450K' },
              { label: 'County', value: 'Norfolk County' },
              { label: 'Drive to Brantford', value: '~40 min' },
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
                About Simcoe
              </h2>
              <p style={{ fontFamily: "'Raleway', sans-serif", color: '#aaa', lineHeight: 1.8, fontSize: '14px' }}>
                Simcoe is the county seat of Norfolk County in southwestern Ontario. Situated between Lake Erie to the south and the Highway 403 corridor to the north, it offers a perfect balance of small-town charm and modern convenience.
              </p>
              <p style={{ fontFamily: "'Raleway', sans-serif", color: '#aaa', lineHeight: 1.8, fontSize: '14px', marginTop: '12px' }}>
                Known for fertile farmland, tobacco and ginseng heritage, and proximity to Long Point World Biosphere Reserve, Turkey Point Provincial Park, and Lake Erie beaches.
              </p>
            </div>

            <div>
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '22px', color: '#fff', textTransform: 'uppercase', marginBottom: '16px', borderBottom: '2px solid #58b3e5', paddingBottom: '8px' }}>
                Neighbourhoods
              </h2>
              <ul style={{ fontFamily: "'Raleway', sans-serif", color: '#aaa', lineHeight: 2.4, fontSize: '14px', listStyle: 'none', padding: 0 }}>
                {['Downtown Simcoe', 'Norfolk Heights', 'Queensway East', 'Avalon', 'Port Ryerse Road Area', 'Windham Road Area', 'Norfolk Street North'].map((n) => (
                  <li key={n} style={{ borderBottom: '1px solid #2a2a2a' }}>
                    <Link href={`/listings?city=Simcoe`} style={{ color: '#58b3e5', textDecoration: 'none' }}>→ {n}</Link>
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
                  'Norfolk General Hospital',
                  'Simcoe Recreation Centre',
                  'Long Point World Biosphere Reserve',
                  'Turkey Point Provincial Park',
                  'Backus Woods Conservation Area',
                  'Norfolk County Fairgrounds',
                  'Downtown shops, restaurants & cafés',
                  'Hwy 403 access & Lake Erie beaches',
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
