'use client';

import { useState } from 'react';
import Link from 'next/link';
import AuthModal from './AuthModal';

const navLinks = [
  { href: '/', label: 'HOME' },
  { href: '/listings', label: 'BUY' },
  { href: '/listings?status=For+Rent', label: 'RENT' },
  { href: '/communities/brantford', label: 'BRANTFORD' },
  { href: '/communities/simcoe', label: 'SIMCOE' },
  { href: '/sellers/home-worth', label: 'HOME WORTH' },
  { href: '/team', label: 'TEAM' },
  { href: '/testimonials', label: 'TESTIMONIALS' },
  { href: '/contact', label: 'CONTACT' },
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
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      color: 'white',
                      textTransform: 'uppercase',
                      fontSize: '16px',
                      fontFamily: "'Raleway', sans-serif",
                      padding: '20px 15px',
                      display: 'block',
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
      `}</style>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
