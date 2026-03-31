'use client';

import { useState } from 'react';

export default function HomeWorthForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/home-worth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: '#111',
    border: '1px solid #333',
    color: '#fff',
    padding: '12px 14px',
    fontFamily: "'Raleway', sans-serif",
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: "'Raleway', sans-serif",
    fontSize: '12px',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: '6px',
  };

  if (status === 'error') {
    return (
      <div style={{ backgroundColor: '#111', border: '1px solid #e53935', padding: '24px', textAlign: 'center' }}>
        <p style={{ fontFamily: "'Raleway', sans-serif", color: '#e53935', fontSize: '15px', marginBottom: '12px' }}>
          Something went wrong. Please try again or call us at <a href="tel:5197577439" style={{ color: '#58b3e5' }}>(519) 757-7439</a>.
        </p>
        <button onClick={() => setStatus('idle')} style={{ backgroundColor: '#58b3e5', color: '#fff', border: 'none', padding: '10px 24px', fontFamily: "'Raleway', sans-serif", cursor: 'pointer', fontSize: '13px', textTransform: 'uppercase' }}>
          Try Again
        </button>
      </div>
    );
  }

  if (status === 'sent') {
    return (
      <div
        style={{
          backgroundColor: '#111',
          border: '1px solid #58b3e5',
          padding: '40px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '40px', marginBottom: '16px' }}>✓</div>
        <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '22px', color: '#58b3e5', textTransform: 'uppercase', marginBottom: '12px' }}>
          Request Received!
        </h3>
        <p style={{ fontFamily: "'Raleway', sans-serif", color: '#aaa', fontSize: '15px', lineHeight: 1.8 }}>
          Thank you! One of our agents will review your property and be in touch within 24 hours with your free home evaluation.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Name */}
      <div>
        <label style={labelStyle} htmlFor="name">Full Name *</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Jane Smith"
          value={form.name}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

      {/* Email + Phone side by side */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div>
          <label style={labelStyle} htmlFor="email">Email *</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="jane@email.com"
            value={form.email}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle} htmlFor="phone">Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="(519) 555-0100"
            value={form.phone}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Property Address */}
      <div>
        <label style={labelStyle} htmlFor="address">Property Address *</label>
        <input
          id="address"
          name="address"
          type="text"
          required
          placeholder="123 Main Street"
          value={form.address}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

      {/* City */}
      <div>
        <label style={labelStyle} htmlFor="city">City *</label>
        <input
          id="city"
          name="city"
          type="text"
          required
          placeholder="Brantford"
          value={form.city}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

      {/* Additional notes */}
      <div>
        <label style={labelStyle} htmlFor="message">Additional Notes (optional)</label>
        <textarea
          id="message"
          name="message"
          rows={3}
          placeholder="e.g. recent renovations, timeline for selling, etc."
          value={form.message}
          onChange={handleChange}
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        style={{
          backgroundColor: '#58b3e5',
          color: '#fff',
          border: 'none',
          padding: '14px 32px',
          fontFamily: "'Raleway', sans-serif",
          fontSize: '14px',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          fontWeight: 700,
          cursor: status === 'sending' ? 'not-allowed' : 'pointer',
          opacity: status === 'sending' ? 0.7 : 1,
          width: '100%',
        }}
      >
        {status === 'sending' ? 'Sending...' : 'GET MY FREE EVALUATION'}
      </button>

      <p style={{ fontFamily: "'Raleway', sans-serif", color: '#555', fontSize: '12px', textAlign: 'center' }}>
        No obligation. 100% free. We&apos;ll never share your information.
      </p>
    </form>
  );
}
