import Link from 'next/link';

const footerLinks = [
  { href: '/', label: 'HOME' },
  { href: '/listings', label: 'BUY' },
  { href: '/listings?status=For+Rent', label: 'RENT' },
  { href: '/team', label: 'TEAM' },
  { href: '/testimonials', label: 'TESTIMONIALS' },
  { href: '/contact', label: 'CONTACT' },
];

export default function Footer() {
  return (
    <>
      <style>{`
        .footer-nav-link {
          color: white;
          text-transform: uppercase;
          font-size: 12px;
          font-family: 'Raleway', sans-serif;
          padding: 4px 10px;
          display: inline-block;
          transition: color 0.2s;
          text-decoration: none;
        }
        .footer-nav-link:hover { color: #58b3e5; }
        .footer-social-icon {
          color: #6d6d6d;
          transition: color 0.2s;
          display: inline-flex;
          align-items: center;
        }
        .footer-social-icon:hover { color: #58b3e5; }
      `}</style>

      <footer style={{ backgroundColor: '#1a1a1a' }}>
        {/* Section 1: Logo */}
        <div
          style={{
            backgroundColor: '#1a1a1a',
            padding: '40px 20px',
            textAlign: 'center',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://cdn-websites.agentlocator.ca/18723/FooterLogoImage/logojayNew1.png"
            alt="Pay It Forward Realty"
            style={{ maxWidth: '250px', height: 'auto', display: 'inline-block' }}
          />
        </div>

        {/* Section 2: Footer Menu */}
        <div
          style={{
            backgroundColor: '#1a1a1a',
            paddingBottom: '30px',
            textAlign: 'center',
          }}
        >
          <nav style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4px' }}>
            {footerLinks.map((link, i) => (
              <span key={link.href} style={{ display: 'flex', alignItems: 'center' }}>
                <Link href={link.href} className="footer-nav-link">
                  {link.label}
                </Link>
                {i < footerLinks.length - 1 && (
                  <span style={{ color: '#444', fontSize: '12px' }}>|</span>
                )}
              </span>
            ))}
          </nav>
        </div>

        {/* Section 3: Contact / Copyright */}
        <div
          style={{
            backgroundColor: '#1a1a1a',
            borderTop: '1px solid #333',
            padding: '20px',
            textAlign: 'center',
          }}
        >
          <p style={{ color: '#6d6d6d', fontSize: '11px', margin: '0 0 4px', fontFamily: "'Raleway', sans-serif" }}>
            &copy; 2024 Pay It Forward Realty. All rights reserved.
          </p>
          <p style={{ color: '#6d6d6d', fontSize: '11px', margin: '0 0 16px', fontFamily: "'Raleway', sans-serif" }}>
            Member of Brantford Regional Real Estate Association
          </p>

          {/* Social Icons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="footer-social-icon"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="footer-social-icon"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            {/* Twitter / X */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="footer-social-icon"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
