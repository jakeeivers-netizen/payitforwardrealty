'use client';
import Link from 'next/link';
import { agents } from '@/lib/agents';

export default function TeamPage() {
  return (
    <div>
      {/* Hero */}
      <section style={{ background: '#1a1a1a', padding: '80px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p style={{ color: '#58b3e5', fontSize: '13px', fontFamily: 'Raleway, sans-serif', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '12px' }}>
            Pay It Forward Realty
          </p>
          <h1 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 700, color: '#fff', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '20px' }}>
            Meet Our Team
          </h1>
          <p style={{ color: '#aaa', fontSize: '16px', fontFamily: 'Raleway, sans-serif', lineHeight: 1.7 }}>
            Dedicated professionals serving Brantford and surrounding communities.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section style={{ backgroundColor: '#f5f5f5', padding: '60px 20px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', width: '90%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '24px' }}>
            {agents.map((agent) => (
              <div key={agent.slug} style={{ background: '#fff', borderRadius: '2px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                {/* Photo */}
                <div style={{ position: 'relative', width: '100%', paddingBottom: '110%', overflow: 'hidden', background: '#ddd' }}>
                  <img
                    src={agent.photo}
                    alt={agent.name}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
                {/* Info */}
                <div style={{ padding: '16px', borderTop: '3px solid #1a1a1a' }}>
                  <h3 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '17px', fontWeight: 600, color: '#1a1a1a', textTransform: 'uppercase', marginBottom: '3px' }}>
                    {agent.name}
                  </h3>
                  <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', color: '#58b3e5', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
                    {agent.title}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '12px' }}>
                    <a href={`tel:${agent.phone.replace(/\D/g, '')}`} style={{ fontFamily: 'Raleway, sans-serif', fontSize: '13px', color: '#555', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
                      {agent.phone}
                    </a>
                    <a href={`mailto:${agent.email}`} style={{ fontFamily: 'Raleway, sans-serif', fontSize: '13px', color: '#555', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                      Email Agent
                    </a>
                  </div>
                  <Link
                    href={`/team/${agent.slug}`}
                    style={{ display: 'block', padding: '8px 0', background: '#5c5c5c', color: '#fff', textAlign: 'center', fontFamily: 'Raleway, sans-serif', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}
                  >
                    More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#1a1a1a', padding: '60px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '36px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', marginBottom: '16px' }}>
            Ready to Work With Us?
          </h2>
          <p style={{ color: '#aaa', fontFamily: 'Raleway, sans-serif', fontSize: '15px', marginBottom: '30px', lineHeight: 1.7 }}>
            Our team is ready to help you buy, sell or rent in Brantford and surrounding areas.
          </p>
          <Link href="/contact" style={{ display: 'inline-block', padding: '14px 40px', border: '2px solid #fff', color: '#fff', fontFamily: 'Raleway, sans-serif', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '2px' }}>
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
