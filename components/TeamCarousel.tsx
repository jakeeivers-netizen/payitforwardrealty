'use client';

import { useEffect, useState } from 'react';
import { agents } from '@/lib/agents';

export default function TeamCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % agents.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const agent = agents[current];

  return (
    <div style={{ position: 'relative', width: '260px', height: '260px', margin: '0 auto' }}>
      {agents.map((a, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={a.slug}
          src={a.photo}
          alt={a.name}
          style={{
            position: 'absolute',
            inset: 0,
            width: '260px',
            height: '260px',
            objectFit: 'cover',
            borderRadius: '50%',
            border: '4px solid #58b3e5',
            opacity: i === current ? 1 : 0,
            transition: 'opacity 0.8s ease-in-out',
          }}
        />
      ))}
      {/* Name tag */}
      <div style={{
        position: 'absolute',
        bottom: '-36px',
        left: '50%',
        transform: 'translateX(-50%)',
        whiteSpace: 'nowrap',
        textAlign: 'center',
      }}>
        <p style={{ fontFamily: "'Oswald', sans-serif", fontSize: '15px', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
          {agent.name}
        </p>
        <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: '12px', color: '#58b3e5', margin: 0 }}>
          {agent.title}
        </p>
      </div>

      {/* Dots */}
      <div style={{ position: 'absolute', bottom: '-64px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '5px' }}>
        {agents.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: i === current ? '16px' : '6px',
              height: '6px',
              borderRadius: '3px',
              backgroundColor: i === current ? '#58b3e5' : '#444',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.3s',
            }}
          />
        ))}
      </div>
    </div>
  );
}
