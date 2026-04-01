import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sellers | Pay It Forward Realty',
  description: 'Sell your home for top dollar in Brantford and surrounding areas. Expert guidance from Pay It Forward Realty.',
};

const steps = [
  {
    step: '01',
    title: 'Get Your Home Evaluated',
    body: 'Start with a free, no-obligation home evaluation. We analyze comparable sales, active competition, and market trends to give you an accurate picture of what your home is worth today.',
  },
  {
    step: '02',
    title: 'Prepare Your Home',
    body: 'First impressions matter. We advise you on exactly what to fix, stage, and declutter to maximize your sale price — without overspending on renovations that won\'t pay off.',
  },
  {
    step: '03',
    title: 'Professional Marketing',
    body: 'Professional photography, MLS listing, social media campaigns, and our database of active buyers. Your home gets maximum exposure from day one.',
  },
  {
    step: '04',
    title: 'Showings & Open Houses',
    body: 'We coordinate all showings and open houses on your schedule. Every showing is followed up with buyer feedback so you always know how the market is reacting.',
  },
  {
    step: '05',
    title: 'Receive & Negotiate Offers',
    body: 'When offers come in, we break them down clearly — price, conditions, closing date — and negotiate hard to get you the best possible outcome.',
  },
  {
    step: '06',
    title: 'Close the Sale',
    body: 'Once conditions are met and closing is confirmed, your lawyer handles the paperwork and funds. We stay with you right through to a smooth handover.',
  },
];

export default function SellersPage() {
  return (
    <div style={{ backgroundColor: '#1a1a1a', minHeight: '100vh' }}>

      {/* ─── HERO ─── */}
      <section style={{ backgroundColor: '#111', padding: '80px 20px', textAlign: 'center', borderBottom: '1px solid #2a2a2a' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <p style={{ color: '#58b3e5', fontFamily: "'Raleway', sans-serif", fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '12px' }}>
            SELLING YOUR HOME
          </p>
          <h1 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '54px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '24px' }}>
            SELL SMARTER.<br /><span style={{ color: '#58b3e5' }}>SELL FOR MORE.</span>
          </h1>
          <p style={{ fontFamily: "'Raleway', sans-serif", color: '#aaa', fontSize: '17px', lineHeight: 1.8, marginBottom: '36px' }}>
            Selling your home is one of the biggest financial decisions you&apos;ll make. Our team combines local expertise, proven marketing, and tough negotiation to get you top dollar.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/sellers/home-worth" style={{ display: 'inline-block', backgroundColor: '#58b3e5', color: '#fff', padding: '14px 36px', fontFamily: "'Raleway', sans-serif", fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
              GET FREE EVALUATION
            </Link>
            <Link href="/contact" style={{ display: 'inline-block', border: '1px solid #fff', color: '#fff', padding: '14px 36px', fontFamily: "'Raleway', sans-serif", fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              TALK TO AN AGENT
            </Link>
          </div>
        </div>
      </section>

      {/* ─── STEPS ─── */}
      <section style={{ padding: '60px 20px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', width: '90%' }}>
          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '36px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', textAlign: 'center', marginBottom: '48px' }}>
            THE SELLING PROCESS
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="steps-grid">
            {steps.map((s) => (
              <div key={s.step} style={{ backgroundColor: '#111', padding: '36px 28px', border: '1px solid #2a2a2a' }}>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '52px', fontWeight: 700, color: '#58b3e5', opacity: 0.4, lineHeight: 1, marginBottom: '12px' }}>
                  {s.step}
                </div>
                <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '20px', color: '#fff', textTransform: 'uppercase', marginBottom: '12px' }}>
                  {s.title}
                </h3>
                <p style={{ fontFamily: "'Raleway', sans-serif", color: '#888', fontSize: '14px', lineHeight: 1.8 }}>
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section style={{ backgroundColor: '#58b3e5', padding: '40px 20px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', width: '90%', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', textAlign: 'center' }} className="stats-bar">
          {[
            { value: '500+', label: 'Homes Sold' },
            { value: '17+', label: 'Local Agents' },
            { value: '98%', label: 'List-to-Sale Ratio' },
            { value: '30', label: 'Avg. Days on Market' },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '40px', fontWeight: 700, color: '#fff', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '6px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── MARKETING + CTA ─── */}
      <section style={{ backgroundColor: '#111', padding: '60px 20px', borderTop: '1px solid #2a2a2a' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', width: '90%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }} className="mkt-grid">
          <div>
            <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '36px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', marginBottom: '24px' }}>
              HOW WE MARKET<br /><span style={{ color: '#58b3e5' }}>YOUR HOME</span>
            </h2>
            {[
              { icon: '📸', title: 'Professional Photography', body: 'High-quality photos that make your home stand out online — where 95% of buyers start their search.' },
              { icon: '🏡', title: 'MLS® Listing', body: 'Full exposure on MLS® reaches every buyer\'s agent and buyer searching in your area.' },
              { icon: '📱', title: 'Social Media Campaigns', body: 'Targeted ads on Facebook and Instagram reaching buyers actively looking in Brantford and surrounding areas.' },
              { icon: '📧', title: 'Buyer Database', body: 'We match your home against our database of pre-approved buyers looking right now.' },
            ].map((item) => (
              <div key={item.title} style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                <div style={{ fontSize: '24px', flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '16px', color: '#58b3e5', textTransform: 'uppercase', marginBottom: '4px' }}>{item.title}</h3>
                  <p style={{ fontFamily: "'Raleway', sans-serif", color: '#888', fontSize: '14px', lineHeight: 1.7 }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ backgroundColor: '#1a1a1a', padding: '40px', border: '1px solid #2a2a2a' }}>
            <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '24px', color: '#fff', textTransform: 'uppercase', marginBottom: '8px' }}>FIND OUT WHAT YOUR HOME IS WORTH</h3>
            <p style={{ fontFamily: "'Raleway', sans-serif", color: '#888', fontSize: '14px', lineHeight: 1.8, marginBottom: '24px' }}>
              Get a free, no-obligation home evaluation from our local experts. We&apos;ll tell you exactly where your home stands in today&apos;s market.
            </p>
            <Link href="/sellers/home-worth" style={{ display: 'block', backgroundColor: '#58b3e5', color: '#fff', padding: '14px 32px', fontFamily: "'Raleway', sans-serif", fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, textAlign: 'center', textDecoration: 'none', marginBottom: '12px' }}>
              GET FREE EVALUATION
            </Link>
            <Link href="/contact" style={{ display: 'block', border: '1px solid #333', color: '#aaa', padding: '14px 32px', fontFamily: "'Raleway', sans-serif", fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center', textDecoration: 'none' }}>
              CONTACT AN AGENT
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .steps-grid { grid-template-columns: 1fr !important; }
          .mkt-grid { grid-template-columns: 1fr !important; }
          .stats-bar { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
