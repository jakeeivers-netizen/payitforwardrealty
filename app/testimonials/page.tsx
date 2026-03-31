const testimonials = [
  {
    quote:
      'Jay and the team at Pay It Forward Realty made our first home purchase an absolute dream. They were patient, knowledgeable, and went above and beyond to find us the perfect home in Brantford. We couldn\'t have done it without them!',
    name: 'Sarah & Michael T.',
    detail: 'First-Time Home Buyers, Brantford',
  },
  {
    quote:
      'We listed with Jake and our home sold in just 8 days — well above asking price! The marketing was exceptional and the whole process was smooth from start to finish. Highly recommend Pay It Forward Realty.',
    name: 'David & Karen L.',
    detail: 'Sold in Brantford',
  },
  {
    quote:
      'Melanie helped us find the perfect rental property in Paris. She understood exactly what we were looking for and was always available to answer our questions. Professional, warm, and incredibly effective.',
    name: 'Amanda P.',
    detail: 'Rental in Paris, ON',
  },
  {
    quote:
      'After downsizing, we weren\'t sure what to expect from the market. Dina guided us every step of the way with honest advice. We sold our home quickly and found a beautiful condo — all stress-free. Thank you!',
    name: 'Frank & Eleanor M.',
    detail: 'Sellers in Brantford',
  },
  {
    quote:
      'The whole team is fantastic. What sets Pay It Forward Realty apart is that they genuinely care — not just about the deal but about the community. Mackenzie was our agent and she was absolutely outstanding.',
    name: 'James H.',
    detail: 'Buyer in Cambridge, ON',
  },
];

export default function TestimonialsPage() {
  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Hero */}
      <div
        style={{
          backgroundColor: '#1a1a1a',
          padding: '80px 20px',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: '52px',
            fontWeight: 600,
            color: 'white',
            textTransform: 'uppercase',
            marginBottom: '12px',
          }}
        >
          TESTIMONIALS
        </h1>
        <p
          style={{
            fontFamily: "'Raleway', sans-serif",
            color: '#aaa',
            fontSize: '16px',
            maxWidth: '500px',
            margin: '0 auto',
          }}
        >
          Hear what our clients say about their experience with Pay It Forward Realty.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div style={{ width: '90%', maxWidth: '1200px', margin: '0 auto', padding: '60px 0' }}>
        <div
          className="testimonials-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              style={{
                backgroundColor: 'white',
                padding: '32px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                position: 'relative',
              }}
            >
              {/* Quote mark */}
              <div
                style={{
                  fontFamily: "'Allura', cursive",
                  fontSize: '80px',
                  color: '#58b3e5',
                  lineHeight: 1,
                  position: 'absolute',
                  top: '16px',
                  left: '24px',
                  opacity: 0.4,
                }}
              >
                &ldquo;
              </div>

              <div style={{ paddingTop: '28px' }}>
                <p
                  style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: '14px',
                    color: '#555',
                    lineHeight: 1.8,
                    marginBottom: '20px',
                    fontStyle: 'italic',
                  }}
                >
                  {t.quote}
                </p>

                <div style={{ borderTop: '1px solid #eee', paddingTop: '16px' }}>
                  <p
                    style={{
                      fontFamily: "'Oswald', sans-serif",
                      fontSize: '16px',
                      fontWeight: 600,
                      color: '#1a1a1a',
                      marginBottom: '2px',
                    }}
                  >
                    {t.name}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Raleway', sans-serif",
                      fontSize: '12px',
                      color: '#58b3e5',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {t.detail}
                  </p>
                </div>

                {/* Stars */}
                <div style={{ marginTop: '12px', display: 'flex', gap: '2px' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} width="16" height="16" viewBox="0 0 24 24" fill="#f5a623">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div
        style={{
          backgroundColor: '#1a1a1a',
          padding: '60px 20px',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: '36px',
            fontWeight: 600,
            color: 'white',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}
        >
          READY TO WORK WITH US?
        </h2>
        <a
          href="/contact"
          style={{
            display: 'inline-block',
            border: '1px solid white',
            color: 'white',
            padding: '14px 36px',
            fontFamily: "'Raleway', sans-serif",
            fontSize: '14px',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          CONTACT US TODAY
        </a>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .testimonials-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .testimonials-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
