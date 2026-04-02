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
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>

      {/* ─── BREADCRUMB ─── */}
      <div style={{ backgroundColor: '#f5f5f5', borderBottom: '1px solid #e0e0e0', padding: '12px 20px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', width: '90%' }}>
          <Link href="/team" style={{ fontFamily: 'Raleway, sans-serif', fontSize: '13px', color: '#58b3e5', textDecoration: 'none' }}>
            ← Back to Team
          </Link>
        </div>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <section style={{ padding: '60px 20px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', width: '90%', display: 'flex', flexWrap: 'wrap', gap: '60px', alignItems: 'flex-start' }}>

          {/* ─── LEFT: Bio ─── */}
          <div style={{ flex: '1 1 480px' }}>
            <h1 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '42px', fontWeight: 700, color: '#1a1a1a', textTransform: 'uppercase', marginBottom: '4px', lineHeight: 1 }}>
              {agent.name}
            </h1>
            <h2 style={{ fontFamily: 'Raleway, sans-serif', fontSize: '20px', fontWeight: 700, color: '#1a1a1a', marginBottom: '24px' }}>
              {agent.title}
            </h2>

            {/* Bio paragraphs */}
            {agent.bio.length > 0 ? (
              agent.bio.map((para, i) => (
                <p key={i} style={{ fontFamily: 'Raleway, sans-serif', fontSize: '15px', color: '#444', lineHeight: 1.9, marginBottom: '20px' }}>
                  {para}
                </p>
              ))
            ) : (
              <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '15px', color: '#888', lineHeight: 1.9, fontStyle: 'italic' }}>
                Bio coming soon. Contact {agent.name.split(' ')[0]} directly using the details below.
              </p>
            )}

            {/* Contact details */}
            <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href={`tel:${agent.phone.replace(/\D/g, '')}`} style={{ fontFamily: 'Raleway, sans-serif', fontSize: '15px', color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#58b3e5" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                {agent.phone}
              </a>
              <a href={`mailto:${agent.email}`} style={{ fontFamily: 'Raleway, sans-serif', fontSize: '15px', color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#58b3e5" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                {agent.email}
              </a>
            </div>

            {/* Social links */}
            {(agent.facebook || agent.instagram) && (
              <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
                {agent.facebook && (
                  <a href={agent.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '38px', height: '38px', backgroundColor: '#1877f2', borderRadius: '4px', textDecoration: 'none' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                  </a>
                )}
                {agent.instagram && (
                  <a href={agent.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '38px', height: '38px', background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)', borderRadius: '4px', textDecoration: 'none' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  </a>
                )}
              </div>
            )}

            {/* CTA buttons */}
            <div style={{ marginTop: '28px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/contact" style={{ padding: '13px 32px', backgroundColor: '#58b3e5', color: '#fff', fontFamily: 'Raleway, sans-serif', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, textDecoration: 'none' }}>
                Contact {agent.name.split(' ')[0]}
              </Link>
              <Link href="/listings" style={{ padding: '13px 32px', border: '1px solid #1a1a1a', color: '#1a1a1a', fontFamily: 'Raleway, sans-serif', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', textDecoration: 'none' }}>
                View Listings
              </Link>
            </div>
          </div>

          {/* ─── RIGHT: Photo ─── */}
          <div style={{ flex: '0 0 300px', maxWidth: '320px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={agent.photo}
              alt={agent.name}
              style={{ width: '100%', display: 'block', objectFit: 'cover', objectPosition: 'top center' }}
            />
            <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>
              <p style={{ fontFamily: 'Oswald, sans-serif', fontSize: '18px', fontWeight: 700, color: '#1a1a1a', textTransform: 'uppercase', margin: '0 0 2px' }}>
                {agent.name}
              </p>
              <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '13px', color: '#58b3e5', margin: 0 }}>
                {agent.title}
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
