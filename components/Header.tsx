'use client';

import { useState } from 'react';
import Link from 'next/link';
import AuthModal from './AuthModal';

const navLinks = [
  { href: '/', label: 'HOME' },
  { href: '/team', label: 'TEAM' },
  {
    href: '/listings',
    label: 'LISTINGS',
    dropdown: [
      { href: '/listings/new', label: 'New Listings' },
      { href: '/listings/sold', label: 'Sold By Us' },
    ],
  },
  { href: '/sellers/home-worth', label: 'HOME WORTH' },
  { href: '/buyers', label: 'BUYERS' },
  { href: '/sellers', label: 'SELLERS' },
  { href: '/blog', label: 'BLOG' },
  { href: '/contact', label: 'CONTACT' },
  { href: '/communities/brantford', label: 'BRANTFORD' },
  { href: '/communities/simcoe', label: 'SIMCOE' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <header
        id="menu-premium-2"
        style={{
          backgroundColor: '#1a1a1a',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          width: '100%',
        }}
      >
        {/* ─── TOP BAR: phone, email, socials ─── */}
        <div style={{ borderBottom: '1px solid #2a2a2a', padding: '6px 0' }}>
          <div style={{ width: '90%', maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '16px' }}>
            {/* Phone */}
            <a href="tel:5197577439" style={{ color: '#ccc', fontFamily: "'Raleway', sans-serif", fontSize: '13px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#58b3e5')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#ccc')}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
              (519)757-7439
            </a>
            <span style={{ color: '#333' }}>|</span>
            {/* Email */}
            <a href="mailto:info@payitforwardrealty.ca" style={{ color: '#ccc', fontFamily: "'Raleway', sans-serif", fontSize: '13px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#58b3e5')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#ccc')}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              info@payitforwardrealty.ca
            </a>
            <span style={{ color: '#333' }}>|</span>
            {/* Facebook */}
            <a href="https://www.facebook.com/payitforwardrealty" target="_blank" rel="noopener noreferrer" style={{ color: '#ccc', display: 'flex', alignItems: 'center' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#58b3e5')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#ccc')}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            {/* Instagram */}
            <a href="https://www.instagram.com/payitforwardrealty" target="_blank" rel="noopener noreferrer" style={{ color: '#ccc', display: 'flex', alignItems: 'center' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#58b3e5')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#ccc')}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            {/* YouTube */}
            <a href="https://www.youtube.com/@payitforwardrealty" target="_blank" rel="noopener noreferrer" style={{ color: '#ccc', display: 'flex', alignItems: 'center' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#58b3e5')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#ccc')}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#1a1a1a"/></svg>
            </a>
          </div>
        </div>
        <div
          style={{
            width: '90%',
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            minHeight: '65px',
          }}
        >
          {/* Logo */}
          <a href="/" style={{ flexShrink: 0, display: 'block' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://cdn-websites.agentlocator.ca/18723/Menu/logojayNew1.png"
              alt="Pay It Forward Realty"
              style={{ maxWidth: '180px', height: 'auto', display: 'block' }}
            />
          </a>

          {/* Desktop Center Nav */}
          <nav
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
            }}
            className="desktop-nav"
          >
            <ul
              style={{
                display: 'flex',
                listStyle: 'none',
                margin: 0,
                padding: 0,
                gap: 0,
              }}
            >
              {navLinks.map((link) => (
                <li key={link.href} style={{ position: 'relative' }} className="nav-item">
                  <Link
                    href={link.href}
                    style={{
                      color: 'white',
                      textTransform: 'uppercase',
                      fontSize: '13px',
                      fontFamily: "'Raleway', sans-serif",
                      fontWeight: 600,
                      letterSpacing: '0.5px',
                      padding: '20px 10px',
                      display: 'block',
                      whiteSpace: 'nowrap',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = '#58b3e5';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = 'white';
                    }}
                  >
                    {link.label}
                  </Link>
                  {link.dropdown && (
                    <ul className="nav-dropdown" style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      background: 'white',
                      listStyle: 'none',
                      margin: 0,
                      padding: '8px 0',
                      minWidth: '160px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      zIndex: 2000,
                      display: 'none',
                    }}>
                      {link.dropdown.map((sub) => (
                        <li key={sub.href}>
                          <Link
                            href={sub.href}
                            style={{
                              display: 'block',
                              padding: '10px 20px',
                              color: '#1a1a1a',
                              fontFamily: "'Raleway', sans-serif",
                              fontSize: '13px',
                              fontWeight: 500,
                              textDecoration: 'none',
                              whiteSpace: 'nowrap',
                              transition: 'color 0.2s',
                            }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLAnchorElement).style.color = '#58b3e5';
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLAnchorElement).style.color = '#1a1a1a';
                            }}
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Login */}
          <div className="desktop-login" style={{ flexShrink: 0 }}>
            <button
              onClick={() => setAuthOpen(true)}
              style={{
                border: '1px solid white',
                color: 'white',
                padding: '8px 20px',
                fontSize: '14px',
                fontFamily: "'Raleway', sans-serif",
                background: 'transparent',
                cursor: 'pointer',
                transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={(e) => {
                const btn = e.currentTarget as HTMLButtonElement;
                btn.style.background = 'white';
                btn.style.color = '#1a1a1a';
              }}
              onMouseLeave={(e) => {
                const btn = e.currentTarget as HTMLButtonElement;
                btn.style.background = 'transparent';
                btn.style.color = 'white';
              }}
            >
              LOGIN
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="hamburger-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: '8px',
              marginLeft: 'auto',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div
            style={{
              backgroundColor: '#1a1a1a',
              borderTop: '1px solid #333',
              padding: '10px 20px 20px',
            }}
            className="mobile-menu"
          >
            <nav>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'block',
                    color: 'white',
                    textTransform: 'uppercase',
                    fontSize: '14px',
                    fontFamily: "'Raleway', sans-serif",
                    padding: '10px 0',
                    borderBottom: '1px solid #222',
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setAuthOpen(true);
                }}
                style={{
                  marginTop: '12px',
                  border: '1px solid white',
                  color: 'white',
                  padding: '8px 20px',
                  fontSize: '14px',
                  fontFamily: "'Raleway', sans-serif",
                  background: 'transparent',
                  cursor: 'pointer',
                }}
              >
                LOGIN
              </button>
            </nav>
          </div>
        )}
      </header>

      <style>{`
        @media (max-width: 991px) {
          .desktop-nav { display: none !important; }
          .desktop-login { display: none !important; }
          .hamburger-btn { display: block !important; }
        }
        @media (min-width: 992px) {
          .mobile-menu { display: none !important; }
        }
        .nav-item:hover .nav-dropdown {
          display: block !important;
        }
      `}</style>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
