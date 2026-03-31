import Link from 'next/link';
import { notFound } from 'next/navigation';
import { agents } from '@/lib/agents';

export function generateStaticParams() {
  return agents.map((a) => ({ slug: a.slug }));
}

export default async function AgentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const agent = agents.find((a) => a.slug === slug);
  if (!agent) notFound();

  return (
    <div>
      {/* Hero */}
      <section style={{ background: '#1a1a1a', padding: '60px 20px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', width: '90%', display: 'flex', gap: '48px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {/* Photo */}
          <div style={{ flexShrink: 0, width: '280px', maxWidth: '100%' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={agent.photo}
              alt={agent.name}
              style={{ width: '100%', height: '320px', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
            />
          </div>

          {/* Info */}
          <div style={{ flex: 1, minWidth: '240px' }}>
            <p style={{ color: '#58b3e5', fontSize: '13px', fontFamily: 'Raleway, sans-serif', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '8px' }}>
              Pay It Forward Realty
            </p>
            <h1 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, color: '#fff', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '8px' }}>
              {agent.name}
            </h1>
            <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '14px', color: '#58b3e5', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '24px' }}>
              {agent.title}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
              <a href={`tel:${agent.phone.replace(/\D/g, '')}`} style={{ fontFamily: 'Raleway, sans-serif', fontSize: '15px', color: '#ccc', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#58b3e5" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
                {agent.phone}
              </a>
              <a href={`mailto:${agent.email}`} style={{ fontFamily: 'Raleway, sans-serif', fontSize: '15px', color: '#ccc', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#58b3e5" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                {agent.email}
              </a>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/listings" style={{ padding: '12px 28px', background: '#58b3e5', color: '#fff', fontFamily: 'Raleway, sans-serif', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                View Listings
              </Link>
              <Link href="/contact" style={{ padding: '12px 28px', border: '1px solid #fff', color: '#fff', fontFamily: 'Raleway, sans-serif', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section style={{ background: '#fff', padding: '60px 20px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', width: '90%' }}>
          <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '28px', fontWeight: 600, color: '#1a1a1a', textTransform: 'uppercase', marginBottom: '20px', borderBottom: '3px solid #58b3e5', paddingBottom: '12px', display: 'inline-block' }}>
            About {agent.name.split(' ')[0]}
          </h2>
          <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '15px', color: '#555', lineHeight: 1.8, maxWidth: '700px' }}>
            {agent.name} is a dedicated real estate professional with Pay It Forward Realty, serving buyers and sellers in Brantford and surrounding communities. With a commitment to exceptional service and giving back to the community, {agent.name.split(' ')[0]} is here to guide you through every step of your real estate journey.
          </p>
        </div>
      </section>

      {/* Back */}
      <section style={{ background: '#f5f5f5', padding: '30px 20px', textAlign: 'center' }}>
        <Link href="/team" style={{ fontFamily: 'Raleway, sans-serif', fontSize: '13px', color: '#1a1a1a', textTransform: 'uppercase', letterSpacing: '1px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          ← Back to Team
        </Link>
      </section>
    </div>
  );
}
