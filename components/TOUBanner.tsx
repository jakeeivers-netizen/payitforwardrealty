'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TOUBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('tou_dismissed');
    if (!dismissed) setVisible(true);
  }, []);

  const dismiss = () => {
    localStorage.setItem('tou_dismissed', '1');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        width: '100%',
        padding: '15px 10px',
        backgroundColor: '#58b3e5',
        textAlign: 'center',
        fontSize: '18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        zIndex: 9999,
        position: 'fixed',
        bottom: 0,
        left: 0,
      }}
    >
      <div style={{ fontFamily: 'Raleway, sans-serif', color: '#fff' }}>
        By using our site, you agree to our{' '}
        <Link href="/terms-of-use" target="_blank" style={{ color: '#fff', fontWeight: 'bold', textDecoration: 'underline' }}>
          Terms of Use
        </Link>
        {' '}and{' '}
        <Link href="/privacy-policy" target="_blank" style={{ color: '#fff', fontWeight: 'bold', textDecoration: 'underline' }}>
          Privacy Policy
        </Link>
      </div>
      <button
        onClick={dismiss}
        style={{
          color: 'white',
          fontSize: '16px',
          backgroundColor: '#1a1a1a',
          borderRadius: '60px',
          padding: '10px 25px',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontFamily: 'Raleway, sans-serif',
        }}
      >
        Dismiss
      </button>
    </div>
  );
}
