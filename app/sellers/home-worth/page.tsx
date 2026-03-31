import type { Metadata } from 'next';
import HomeWorthForm from '@/components/HomeWorthForm';

export const metadata: Metadata = {
  title: "What's My Home Worth? | Pay It Forward Realty",
  description:
    'Find out what your Brantford home is worth. Get a free, no-obligation home evaluation from the experts at Pay It Forward Realty.',
};

export default function HomeWorthPage() {
  return (
    <div style={{ backgroundColor: '#1a1a1a', minHeight: '100vh' }}>

      {/* ─── HERO ─── */}
      <section
        style={{
          backgroundColor: '#111',
          padding: '80px 20px',
          textAlign: 'center',
          borderBottom: '1px solid #2a2a2a',
        }}
      >
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <p
            style={{
              color: '#58b3e5',
              fontFamily: "'Raleway', sans-serif",
              fontSize: '14px',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              marginBottom: '12px',
            }}
          >
            FREE HOME EVALUATION
          </p>
          <h1
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: '54px',
              fontWeight: 700,
              color: '#fff',
              textTransform: 'uppercase',
              lineHeight: 1.1,
              marginBottom: '24px',
            }}
          >
            WHAT&apos;S MY<br />
            <span style={{ color: '#58b3e5' }}>HOME WORTH?</span>
          </h1>
          <p
            style={{
              fontFamily: "'Raleway', sans-serif",
              color: '#aaa',
              fontSize: '17px',
              lineHeight: 1.8,
              marginBottom: '0',
            }}
          >
            Find out what your home is worth in today&apos;s market. Our local experts
            will provide you with a free, no-obligation market evaluation — no automated
            estimate, just real data from real agents who know Brantford inside and out.
          </p>
        </div>
      </section>

      {/* ─── FORM + BENEFITS ─── */}
      <section style={{ padding: '60px 20px' }}>
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            width: '90%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '60px',
            alignItems: 'start',
          }}
          className="hw-layout"
        >
          {/* ─── LEFT: CONTACT FORM ─── */}
          {/* 👇 THIS IS WHERE THE CONTACT FORM LIVES */}
          <div>
            <h2
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: '26px',
                color: '#fff',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}
            >
              REQUEST YOUR FREE EVALUATION
            </h2>
            <p style={{ fontFamily: "'Raleway', sans-serif", color: '#888', fontSize: '14px', marginBottom: '28px' }}>
              Fill in your details below and one of our agents will be in touch within 24 hours.
            </p>
            <HomeWorthForm />
          </div>

          {/* ─── RIGHT: BENEFITS ─── */}
          <div>
            <h2
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: '26px',
                color: '#fff',
                textTransform: 'uppercase',
                marginBottom: '28px',
              }}
            >
              WHY GET AN EVALUATION?
            </h2>

            {[
              {
                icon: '📊',
                title: 'Real Market Data',
                body: 'We pull live comparable sales and active listings from the Brantford MLS to give you an accurate picture of where your home sits in today\'s market.',
              },
              {
                icon: '🏡',
                title: 'Local Expertise',
                body: 'Our agents live and work in Brantford. We know which neighbourhoods are trending, what buyers are paying, and how to position your home to sell fast.',
              },
              {
                icon: '💰',
                title: 'Maximize Your Sale Price',
                body: 'Pricing your home right from day one is the single biggest factor in getting top dollar. Overpricing loses buyers; underpricing loses money. We help you nail it.',
              },
              {
                icon: '🤝',
                title: 'No Obligation',
                body: 'Your evaluation is completely free with zero pressure. We\'re here to give you the information you need to make the best decision for you and your family.',
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  display: 'flex',
                  gap: '16px',
                  marginBottom: '28px',
                  paddingBottom: '28px',
                  borderBottom: '1px solid #2a2a2a',
                }}
              >
                <div style={{ fontSize: '28px', flexShrink: 0, lineHeight: 1.2 }}>{item.icon}</div>
                <div>
                  <h3
                    style={{
                      fontFamily: "'Oswald', sans-serif",
                      fontSize: '18px',
                      color: '#58b3e5',
                      textTransform: 'uppercase',
                      marginBottom: '6px',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ fontFamily: "'Raleway', sans-serif", color: '#aaa', fontSize: '14px', lineHeight: 1.8 }}>
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section style={{ backgroundColor: '#111', padding: '60px 20px', borderTop: '1px solid #2a2a2a' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', width: '90%' }}>
          <h2
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: '36px',
              fontWeight: 700,
              color: '#fff',
              textTransform: 'uppercase',
              textAlign: 'center',
              marginBottom: '48px',
            }}
          >
            HOW IT WORKS
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
            }}
            className="steps-grid"
          >
            {[
              { step: '01', title: 'Submit Your Info', body: 'Fill in your home address and contact details using the form above.' },
              { step: '02', title: 'We Do the Research', body: 'One of our local agents reviews comparable sales and active listings in your area.' },
              { step: '03', title: 'Get Your Report', body: 'We contact you within 24 hours with a detailed, honest market evaluation — no strings attached.' },
            ].map((s) => (
              <div
                key={s.step}
                style={{
                  backgroundColor: '#1a1a1a',
                  padding: '36px 28px',
                  border: '1px solid #2a2a2a',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: '52px',
                    fontWeight: 700,
                    color: '#58b3e5',
                    opacity: 0.4,
                    lineHeight: 1,
                    marginBottom: '12px',
                  }}
                >
                  {s.step}
                </div>
                <h3
                  style={{
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: '20px',
                    color: '#fff',
                    textTransform: 'uppercase',
                    marginBottom: '12px',
                  }}
                >
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
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            width: '90%',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
            textAlign: 'center',
          }}
          className="stats-bar"
        >
          {[
            { value: '17+', label: 'Local Agents' },
            { value: '500+', label: 'Homes Sold' },
            { value: '24hr', label: 'Response Time' },
            { value: '100%', label: 'Free & No Obligation' },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '40px', fontWeight: 700, color: '#fff', lineHeight: 1 }}>
                {s.value}
              </div>
              <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '6px' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .hw-layout { grid-template-columns: 1fr !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
          .stats-bar { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .stats-bar { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
