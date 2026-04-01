import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import FeaturedCarousel from '@/components/FeaturedCarousel';
import MortgageCalculator from '@/components/MortgageCalculator';
import type { Listing } from '@/types/listing';

async function getFeaturedListings(): Promise<Listing[]> {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/listings?city=Brantford&limit=9&status=For+Sale`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.listings ?? [];
  } catch {
    return [];
  }
}

const neighbourhoods = [
  { name: 'Brantford', bg: '#1a1a1a' },
  { name: 'Paris', bg: '#2a2020' },
  { name: 'Woodstock', bg: '#1a2020' },
  { name: 'Cambridge', bg: '#202020' },
  { name: 'Simcoe', bg: '#201a20' },
  { name: 'Port Dover', bg: '#1a1a28' },
];

export default async function HomePage() {
  const featuredListings = await getFeaturedListings();

  return (
    <>
      {/* ─── HERO: YouTube video background ─── */}
      <section style={{ position: 'relative', overflow: 'hidden', background: '#000' }}>
        {/* 16:9 video container */}
        <div
          style={{
            position: 'relative',
            paddingBottom: '56.23%',
            height: 0,
            overflow: 'hidden',
            maxWidth: '100%',
          }}
        >
          <iframe
            src="https://www.youtube.com/embed/Ndo_1DPIFyg?autoplay=1&mute=1&loop=1&playlist=Ndo_1DPIFyg&controls=0&showinfo=0&rel=0&modestbranding=1"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
            }}
            allow="autoplay"
            title="Pay It Forward Realty"
          />
        </div>

        {/* Transparent overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 10,
            pointerEvents: 'none',
            background: 'rgba(0,0,0,0.15)',
          }}
        />

        {/* #YOUDESERVEMORE — centered over video */}
        <div
          style={{
            position: 'absolute',
            top: '40%',
            transform: 'translateY(-50%)',
            zIndex: 100,
            width: '100%',
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: 'clamp(36px, 7vw, 90px)',
              fontWeight: 800,
              color: '#fff',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              textShadow: '2px 2px 12px rgba(0,0,0,0.5)',
            }}
          >
            #YOUDESERVEMORE
          </span>
        </div>

        {/* Search bar — 60% from top */}
        <div
          style={{
            position: 'absolute',
            top: '60%',
            transform: 'translateY(-50%)',
            zIndex: 101,
            width: '100%',
            padding: '0 20px',
          }}
        >
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <SearchBar />
          </div>
        </div>
      </section>

      {/* ─── Mobile fallback hero (shown only on mobile) ─── */}
      <section
        className="mobile-hero"
        style={{
          backgroundColor: '#1a1a1a',
          padding: '40px 20px',
          display: 'none',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1
            style={{
              fontFamily: "'Oswald', sans-serif",
              color: 'white',
              fontSize: '32px',
              textAlign: 'center',
              marginBottom: '24px',
            }}
          >
            Find Your Home in Brantford
          </h1>
          <SearchBar />
        </div>
      </section>

      <style>{`
        @media (max-width: 767px) {
          .mobile-hero { display: block !important; }
        }
      `}</style>

      {/* ─── FEATURED LISTINGS ─── */}
      <section style={{ backgroundColor: '#fff', padding: '60px 0' }}>
        <div style={{ width: '90%', maxWidth: '1280px', margin: '0 auto' }}>
          {/* Two-line heading */}
          <h2 style={{ textAlign: 'center', marginBottom: '40px', lineHeight: 1 }}>
            <span
              style={{
                color: '#58b3e5',
                fontSize: '22px',
                display: 'block',
                fontFamily: "'Raleway', sans-serif",
                fontWeight: 400,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              FEATURED
            </span>
            <span
              style={{
                color: '#5c5c5c',
                fontSize: '60px',
                fontWeight: 800,
                fontFamily: "'Oswald', sans-serif",
                lineHeight: 1.1,
                display: 'block',
              }}
            >
              LISTINGS
            </span>
          </h2>

          <FeaturedCarousel listings={featuredListings} />

          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <Link
              href="/listings"
              style={{
                display: 'inline-block',
                backgroundColor: '#1a1a1a',
                color: 'white',
                padding: '12px 32px',
                fontFamily: "'Raleway', sans-serif",
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              View All Listings
            </Link>
          </div>
        </div>
      </section>

      {/* ─── ABOUT / INTRO ─── */}
      <section style={{ backgroundColor: '#f5f5f5', padding: '60px 0' }}>
        <div
          style={{
            width: '90%',
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '40px',
            alignItems: 'center',
          }}
        >
          {/* Left: logo image */}
          <div style={{ flex: '1 1 300px', textAlign: 'center' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://cdn-websites.agentlocator.ca/18723/TestPremiumAbout2/2023LogoFull.png"
              alt="Pay It Forward Realty Full Logo"
              style={{ maxWidth: '360px', width: '100%', height: 'auto' }}
            />
          </div>

          {/* Right: text */}
          <div style={{ flex: '1 1 300px' }}>
            <h2
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: '36px',
                fontWeight: 600,
                color: '#1a1a1a',
                marginBottom: '16px',
                textTransform: 'uppercase',
              }}
            >
              PAY IT FORWARD REALTY
            </h2>
            <p
              style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: '16px',
                color: '#555',
                lineHeight: 1.8,
                marginBottom: '24px',
              }}
            >
              We are a team of dedicated real estate professionals serving Brantford
              and surrounding areas. With every transaction, we give back to our community.
              Our mission is to make homeownership possible for everyone while supporting
              the local causes that make Brantford such a wonderful place to live.
            </p>
            <Link
              href="/team"
              style={{
                display: 'inline-block',
                backgroundColor: '#1a1a1a',
                color: 'white',
                padding: '12px 28px',
                fontFamily: "'Raleway', sans-serif",
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              LEARN MORE
            </Link>
          </div>
        </div>
      </section>

      {/* ─── BRANTFORD COMMUNITY ─── */}
      <section style={{ backgroundColor: '#1a1a1a', padding: '60px 0' }}>
        <div style={{ width: '90%', maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '48px', alignItems: 'center' }}>
            {/* Left: text */}
            <div style={{ flex: '1 1 300px' }}>
              <p style={{ color: '#58b3e5', fontFamily: "'Raleway', sans-serif", fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px' }}>
                EXPLORE THE COMMUNITY
              </p>
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '48px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '20px' }}>
                BRANTFORD
              </h2>
              <p style={{ fontFamily: "'Raleway', sans-serif", color: '#aaa', fontSize: '15px', lineHeight: 1.8, marginBottom: '16px' }}>
                Known as the "Telephone City," Brantford sits along the Grand River in Southern Ontario. With affordable housing, top schools, Wilfrid Laurier University, and easy Highway 403 access, it's one of Ontario's most livable cities.
              </p>
              <ul style={{ color: '#aaa', fontFamily: "'Raleway', sans-serif", fontSize: '14px', lineHeight: 2.2, listStyle: 'none', padding: 0, marginBottom: '28px' }}>
                <li>✓ &nbsp;Wayne Gretzky Sports Centre</li>
                <li>✓ &nbsp;Grand River trails &amp; parks</li>
                <li>✓ &nbsp;Wilfrid Laurier University campus</li>
                <li>✓ &nbsp;Vibrant downtown &amp; Harmony Square</li>
                <li>✓ &nbsp;~45 min to Hamilton, ~90 min to Toronto</li>
              </ul>
              <Link
                href="/communities/brantford"
                style={{
                  display: 'inline-block',
                  backgroundColor: '#58b3e5',
                  color: '#fff',
                  padding: '12px 32px',
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontWeight: 700,
                }}
              >
                EXPLORE BRANTFORD
              </Link>
            </div>

            {/* Right: stat cards */}
            <div style={{ flex: '1 1 300px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[
                { label: 'Population', value: '100,000+' },
                { label: 'Avg. Home Price', value: '$550K' },
                { label: 'Schools', value: 'Public & Catholic' },
                { label: 'Drive to Toronto', value: '~90 min' },
              ].map((stat) => (
                <div key={stat.label} style={{ backgroundColor: '#111', padding: '28px 20px', textAlign: 'center', border: '1px solid #333' }}>
                  <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '28px', fontWeight: 700, color: '#58b3e5', marginBottom: '6px' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: '12px', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SIMCOE COMMUNITY ─── */}
      <section style={{ backgroundColor: '#111', padding: '60px 0' }}>
        <div style={{ width: '90%', maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '48px', alignItems: 'center' }}>
            {/* Left: stat cards */}
            <div style={{ flex: '1 1 300px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[
                { label: 'Population', value: '15,000+' },
                { label: 'Avg. Home Price', value: '$450K' },
                { label: 'County', value: 'Norfolk County' },
                { label: 'Drive to Brantford', value: '~40 min' },
              ].map((stat) => (
                <div key={stat.label} style={{ backgroundColor: '#1a1a1a', padding: '28px 20px', textAlign: 'center', border: '1px solid #333' }}>
                  <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '28px', fontWeight: 700, color: '#58b3e5', marginBottom: '6px' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: '12px', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Right: text */}
            <div style={{ flex: '1 1 300px' }}>
              <p style={{ color: '#58b3e5', fontFamily: "'Raleway', sans-serif", fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px' }}>
                EXPLORE THE COMMUNITY
              </p>
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '48px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '20px' }}>
                SIMCOE
              </h2>
              <p style={{ fontFamily: "'Raleway', sans-serif", color: '#aaa', fontSize: '15px', lineHeight: 1.8, marginBottom: '16px' }}>
                The county seat of Norfolk County, Simcoe blends small-town warmth with easy access to Lake Erie beaches, conservation areas, and the Highway 403 corridor — an ideal spot for families and retirees alike.
              </p>
              <ul style={{ color: '#aaa', fontFamily: "'Raleway', sans-serif", fontSize: '14px', lineHeight: 2.2, listStyle: 'none', padding: 0, marginBottom: '28px' }}>
                <li>✓ &nbsp;Long Point World Biosphere Reserve</li>
                <li>✓ &nbsp;Turkey Point Provincial Park</li>
                <li>✓ &nbsp;Norfolk General Hospital</li>
                <li>✓ &nbsp;Norfolk County Fairgrounds</li>
                <li>✓ &nbsp;~40 min to Brantford, ~90 min to Toronto</li>
              </ul>
              <Link
                href="/communities/simcoe"
                style={{
                  display: 'inline-block',
                  backgroundColor: '#58b3e5',
                  color: '#fff',
                  padding: '12px 32px',
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontWeight: 700,
                }}
              >
                EXPLORE SIMCOE
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── NEIGHBOURHOODS ─── */}
      <section style={{ backgroundColor: '#f5f5f5', padding: '60px 0' }}>
        <div style={{ width: '90%', maxWidth: '1280px', margin: '0 auto' }}>
          <h2
            style={{
              textAlign: 'center',
              fontFamily: "'Oswald', sans-serif",
              fontSize: '36px',
              fontWeight: 600,
              color: '#1a1a1a',
              textTransform: 'uppercase',
              marginBottom: '40px',
            }}
          >
            EXPLORE NEIGHBOURHOODS
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
            }}
            className="neighbourhood-grid"
          >
            {neighbourhoods.map((hood) => (
              <Link
                key={hood.name}
                href={`/listings?city=${encodeURIComponent(hood.name)}`}
                style={{ display: 'block', textDecoration: 'none' }}
              >
                <div
                  className="neighbourhood-card"
                  style={{
                    backgroundColor: hood.bg,
                    minHeight: '140px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #333',
                    transition: 'border-color 0.2s',
                    cursor: 'pointer',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Oswald', sans-serif",
                      fontSize: '22px',
                      fontWeight: 500,
                      color: 'white',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {hood.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .neighbourhood-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
          @media (max-width: 480px) {
            .neighbourhood-grid {
              grid-template-columns: 1fr !important;
            }
          }
          .neighbourhood-card:hover {
            border-color: #58b3e5 !important;
          }
          .cta-contact-btn:hover {
            background: white !important;
            color: #1a1a1a !important;
          }
        `}</style>
      </section>

      {/* ─── MORTGAGE CALCULATOR ─── */}
      <section style={{ padding: '60px 0', backgroundColor: '#fff' }}>
        <div style={{ width: '90%', maxWidth: '900px', margin: '0 auto' }}>
          <h2
            style={{
              textAlign: 'center',
              fontFamily: "'Oswald', sans-serif",
              fontSize: '36px',
              fontWeight: 600,
              color: '#1a1a1a',
              textTransform: 'uppercase',
              marginBottom: '40px',
            }}
          >
            MORTGAGE CALCULATOR
          </h2>
          <MortgageCalculator defaultPrice={450000} />
        </div>
      </section>

      {/* ─── CTA / CONTACT ─── */}
      <section
        style={{
          backgroundColor: '#1a1a1a',
          padding: '60px 0',
          textAlign: 'center',
        }}
      >
        <div style={{ width: '90%', maxWidth: '1280px', margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: '42px',
              fontWeight: 600,
              color: 'white',
              textTransform: 'uppercase',
              marginBottom: '24px',
            }}
          >
            READY TO FIND YOUR HOME?
          </h2>
          <p
            style={{
              fontFamily: "'Raleway', sans-serif",
              color: '#aaa',
              fontSize: '16px',
              marginBottom: '32px',
              maxWidth: '500px',
              margin: '0 auto 32px',
            }}
          >
            Our team is ready to help you buy, sell, or rent in Brantford and surrounding areas.
          </p>
          <Link
            href="/contact"
            className="cta-contact-btn"
            style={{
              display: 'inline-block',
              border: '1px solid white',
              color: 'white',
              padding: '14px 36px',
              fontFamily: "'Raleway', sans-serif",
              fontSize: '14px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            CONTACT US
          </Link>
        </div>
      </section>
    </>
  );
}
