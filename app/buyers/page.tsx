import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Buyers | Pay It Forward Realty',
  description: 'Everything you need to buy a home in Brantford and surrounding areas. Expert guidance from Pay It Forward Realty.',
};

const steps = [
  {
    step: '01',
    title: 'Get Pre-Approved',
    body: 'Before you start shopping, know your budget. We connect you with trusted local mortgage brokers who can get you pre-approved fast — so you can make confident offers.',
  },
  {
    step: '02',
    title: 'Define Your Needs',
    body: 'Bedrooms, neighbourhood, commute, schools — we sit down with you and map out exactly what you\'re looking for so we don\'t waste your time on the wrong homes.',
  },
  {
    step: '03',
    title: 'Search & Tour',
    body: 'We give you live access to every MLS listing in Brantford and surrounding areas. When something catches your eye, we book showings fast — sometimes same day.',
  },
  {
    step: '04',
    title: 'Make an Offer',
    body: 'When you find the one, we write a strong, competitive offer and negotiate hard on your behalf. We know the market and we know how to win.',
  },
  {
    step: '05',
    title: 'Due Diligence',
    body: 'We guide you through home inspections, condition periods, and all the paperwork — explaining every step in plain language so you always know where you stand.',
  },
  {
    step: '06',
    title: 'Close & Move In',
    body: 'Your lawyer handles closing, keys get handed over, and you move in. We\'re with you right through to moving day — and beyond.',
  },
];

const faqs = [
  {
    q: 'How much do I need for a down payment?',
    a: 'In Canada, the minimum down payment is 5% for homes under $500K, and 10% on the portion above $500K up to $999,999. For homes $1M+, you need 20% down.',
  },
  {
    q: 'Do I need a real estate lawyer?',
    a: 'Yes — in Ontario, a real estate lawyer is required to complete the purchase. They handle title transfer, mortgage registration, and closing funds. We can refer you to trusted local lawyers.',
  },
  {
    q: 'How long does it take to buy a home?',
    a: 'From starting your search to getting keys, most buyers take 1–3 months. A competitive market can speed that up or slow it down depending on your price range.',
  },
  {
    q: 'What are closing costs?',
    a: 'Budget roughly 1.5–4% of the purchase price for closing costs — land transfer tax, legal fees, title insurance, and adjustments. We walk you through the full estimate before you make an offer.',
  },
  {
    q: 'Does using a buyer\'s agent cost me anything?',
    a: 'No. As a buyer, our services are completely free to you. The seller pays both agents\' commissions through the sale proceeds.',
  },
];

export default function BuyersPage() {
  return (
    <div style={{ backgroundColor: '#1a1a1a', minHeight: '100vh' }}>

      {/* ─── HERO ─── */}
      <section style={{ backgroundColor: '#111', padding: '80px 20px', textAlign: 'center', borderBottom: '1px solid #2a2a2a' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <p style={{ color: '#58b3e5', fontFamily: "'Raleway', sans-serif", fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '12px' }}>
            BUYING A HOME
          </p>
          <h1 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '54px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '24px' }}>
            YOUR GUIDE TO<br /><span style={{ color: '#58b3e5' }}>BUYING IN BRANTFORD</span>
          </h1>
          <p style={{ fontFamily: "'Raleway', sans-serif", color: '#aaa', fontSize: '17px', lineHeight: 1.8, marginBottom: '36px' }}>
            Whether it&apos;s your first home or your fifth, buying real estate is one of the biggest decisions you&apos;ll make. Our team is here to make it simple, stress-free, and successful.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/listings" style={{ display: 'inline-block', backgroundColor: '#58b3e5', color: '#fff', padding: '14px 36px', fontFamily: "'Raleway', sans-serif", fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
              SEARCH LISTINGS
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
            THE BUYING PROCESS
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

      {/* ─── WHY US ─── */}
      <section style={{ backgroundColor: '#111', padding: '60px 20px', borderTop: '1px solid #2a2a2a' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', width: '90%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }} className="why-grid">
          <div>
            <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '36px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', marginBottom: '24px' }}>
              WHY BUY WITH<br /><span style={{ color: '#58b3e5' }}>PAY IT FORWARD?</span>
            </h2>
            {[
              { icon: '🏠', title: 'Local Experts', body: '17+ agents who live and work in Brantford, Paris, Simcoe and the surrounding region.' },
              { icon: '💪', title: 'Strong Negotiators', body: 'We know what homes are worth and fight to get you the best price and conditions every time.' },
              { icon: '📱', title: 'Always Available', body: 'Real estate doesn\'t happen 9–5. Our team is available evenings and weekends when you need us.' },
              { icon: '❤️', title: 'We Give Back', body: 'With every transaction, we donate a portion to local community causes. Your purchase does more than buy a home.' },
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
            <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '24px', color: '#fff', textTransform: 'uppercase', marginBottom: '8px' }}>READY TO START?</h3>
            <p style={{ fontFamily: "'Raleway', sans-serif", color: '#888', fontSize: '14px', lineHeight: 1.8, marginBottom: '24px' }}>
              Talk to one of our buyer agents today — no obligation, no pressure. Just honest advice about the market and your options.
            </p>
            <Link href="/contact" style={{ display: 'block', backgroundColor: '#58b3e5', color: '#fff', padding: '14px 32px', fontFamily: "'Raleway', sans-serif", fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, textAlign: 'center', textDecoration: 'none', marginBottom: '12px' }}>
              CONTACT AN AGENT
            </Link>
            <Link href="/listings" style={{ display: 'block', border: '1px solid #333', color: '#aaa', padding: '14px 32px', fontFamily: "'Raleway', sans-serif", fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center', textDecoration: 'none' }}>
              BROWSE LISTINGS
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section style={{ padding: '60px 20px' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', width: '90%' }}>
          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '36px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', textAlign: 'center', marginBottom: '48px' }}>
            BUYER FAQ
          </h2>
          {faqs.map((faq) => (
            <div key={faq.q} style={{ borderBottom: '1px solid #2a2a2a', paddingBottom: '24px', marginBottom: '24px' }}>
              <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '18px', color: '#58b3e5', textTransform: 'uppercase', marginBottom: '10px' }}>
                {faq.q}
              </h3>
              <p style={{ fontFamily: "'Raleway', sans-serif", color: '#888', fontSize: '15px', lineHeight: 1.8 }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── MORTGAGE CTA ─── */}
      <section style={{ backgroundColor: '#58b3e5', padding: '40px 20px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '32px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', marginBottom: '12px' }}>
          CALCULATE YOUR MORTGAGE
        </h2>
        <p style={{ fontFamily: "'Raleway', sans-serif", color: 'rgba(255,255,255,0.85)', fontSize: '15px', marginBottom: '24px' }}>
          Use our free mortgage calculator to estimate your monthly payments.
        </p>
        <Link href="/calculator" style={{ display: 'inline-block', backgroundColor: '#1a1a1a', color: '#fff', padding: '14px 36px', fontFamily: "'Raleway', sans-serif", fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, textDecoration: 'none' }}>
          OPEN CALCULATOR
        </Link>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .steps-grid { grid-template-columns: 1fr !important; }
          .why-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .steps-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
