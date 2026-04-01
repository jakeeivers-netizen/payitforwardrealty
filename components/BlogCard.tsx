'use client';

import Link from 'next/link';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
}

const categoryColors: Record<string, string> = {
  'Market Update': '#146FB7',
  'Buyers': '#2196f3',
  'Sellers': '#7B28AF',
  'Community': '#58b3e5',
};

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
      <article
        style={{ backgroundColor: '#111', border: '1px solid #2a2a2a', overflow: 'hidden', height: '100%', transition: 'border-color 0.2s' }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#58b3e5')}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#2a2a2a')}
      >
        <div style={{ height: '180px', backgroundColor: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #2a2a2a' }}>
          <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: '40px', color: '#2a2a2a', fontWeight: 700 }}>PIF</span>
        </div>
        <div style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <span style={{ backgroundColor: categoryColors[post.category] ?? '#58b3e5', color: '#fff', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '3px 8px', fontFamily: "'Raleway', sans-serif" }}>
              {post.category}
            </span>
            <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: '12px', color: '#555' }}>{post.date}</span>
          </div>
          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '20px', color: '#fff', textTransform: 'uppercase', lineHeight: 1.3, marginBottom: '12px' }}>
            {post.title}
          </h2>
          <p style={{ fontFamily: "'Raleway', sans-serif", color: '#888', fontSize: '14px', lineHeight: 1.7, marginBottom: '20px' }}>
            {post.excerpt}
          </p>
          <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: '13px', color: '#58b3e5', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
            Read More →
          </span>
        </div>
      </article>
    </Link>
  );
}
