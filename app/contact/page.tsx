export default function ContactPage() {
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
          CONTACT US
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
          Get in touch with our team of real estate professionals in Brantford.
        </p>
      </div>

      {/* Content */}
      <div style={{ width: '90%', maxWidth: '1100px', margin: '0 auto', padding: '60px 0' }}>
        <div
          className="contact-grid"
          style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '40px' }}
        >
          {/* Contact Form */}
          <div style={{ backgroundColor: 'white', padding: '40px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
            <h2
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: '28px',
                fontWeight: 600,
                color: '#1a1a1a',
                textTransform: 'uppercase',
                marginBottom: '24px',
              }}
            >
              SEND US A MESSAGE
            </h2>

            <form>
              <div style={{ marginBottom: '20px' }}>
                <label
                  style={{
                    display: 'block',
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: '11px',
                    color: '#888',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    marginBottom: '6px',
                  }}
                >
                  Your Name *
                </label>
                <input
                  type="text"
                  placeholder="Jane Doe"
                  style={{
                    width: '100%',
                    border: '1px solid #ccc',
                    padding: '12px',
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: '14px',
                    outline: 'none',
                    color: '#333',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: "'Raleway', sans-serif",
                      fontSize: '11px',
                      color: '#888',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      marginBottom: '6px',
                    }}
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    placeholder="jane@example.com"
                    style={{
                      width: '100%',
                      border: '1px solid #ccc',
                      padding: '12px',
                      fontFamily: "'Raleway', sans-serif",
                      fontSize: '14px',
                      outline: 'none',
                      color: '#333',
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: "'Raleway', sans-serif",
                      fontSize: '11px',
                      color: '#888',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      marginBottom: '6px',
                    }}
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="(519) 555-0100"
                    style={{
                      width: '100%',
                      border: '1px solid #ccc',
                      padding: '12px',
                      fontFamily: "'Raleway', sans-serif",
                      fontSize: '14px',
                      outline: 'none',
                      color: '#333',
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label
                  style={{
                    display: 'block',
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: '11px',
                    color: '#888',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    marginBottom: '6px',
                  }}
                >
                  Message *
                </label>
                <textarea
                  rows={6}
                  placeholder="How can we help you?"
                  style={{
                    width: '100%',
                    border: '1px solid #ccc',
                    padding: '12px',
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: '14px',
                    outline: 'none',
                    resize: 'vertical',
                    color: '#333',
                  }}
                />
              </div>

              <button
                type="submit"
                className="contact-submit-btn"
                style={{
                  backgroundColor: '#1a1a1a',
                  color: 'white',
                  padding: '14px 36px',
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s',
                }}
              >
                SEND MESSAGE
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div>
            <div
              style={{
                backgroundColor: '#1a1a1a',
                padding: '32px',
                marginBottom: '20px',
              }}
            >
              <h3
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: '22px',
                  fontWeight: 500,
                  color: 'white',
                  textTransform: 'uppercase',
                  marginBottom: '24px',
                }}
              >
                GET IN TOUCH
              </h3>

              <div style={{ marginBottom: '20px' }}>
                <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: '11px', color: '#58b3e5', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>
                  PHONE
                </p>
                <a
                  href="tel:+15195550100"
                  style={{ fontFamily: "'Raleway', sans-serif", fontSize: '18px', color: 'white', fontWeight: 600 }}
                >
                  (519) 555-0100
                </a>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: '11px', color: '#58b3e5', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>
                  EMAIL
                </p>
                <a
                  href="mailto:info@payitforwardrealty.ca"
                  style={{ fontFamily: "'Raleway', sans-serif", fontSize: '14px', color: '#ccc' }}
                >
                  info@payitforwardrealty.ca
                </a>
              </div>

              <div>
                <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: '11px', color: '#58b3e5', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>
                  OFFICE
                </p>
                <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: '14px', color: '#ccc', lineHeight: 1.6 }}>
                  Pay It Forward Realty<br />
                  Brantford, Ontario<br />
                  Canada
                </p>
              </div>
            </div>

            <div style={{ backgroundColor: 'white', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
              <h4
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: '18px',
                  fontWeight: 500,
                  color: '#1a1a1a',
                  textTransform: 'uppercase',
                  marginBottom: '12px',
                }}
              >
                OFFICE HOURS
              </h4>
              <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: '13px', color: '#555', lineHeight: 2 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Monday – Friday</span>
                  <span>9:00 AM – 6:00 PM</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Saturday</span>
                  <span>10:00 AM – 4:00 PM</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Sunday</span>
                  <span>By Appointment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
        .contact-submit-btn:hover {
          opacity: 0.85;
        }
      `}</style>
    </div>
  );
}
