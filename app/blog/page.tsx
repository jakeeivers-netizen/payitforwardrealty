import type { Metadata } from 'next';
import Link from 'next/link';
import BlogCard from '@/components/BlogCard';

export const metadata: Metadata = {
  title: 'Blog | Pay It Forward Realty',
  description: 'Real estate tips, market updates, and community news from Pay It Forward Realty in Brantford, Ontario.',
};

const posts = [
  {
    slug: 'brantford-real-estate-market-2024',
    title: 'Brantford Real Estate Market: What to Expect in 2024',
    date: 'March 15, 2024',
    category: 'Market Update',
    excerpt: 'Brantford continues to be one of Southern Ontario\'s most affordable markets. We break down the latest sales data, price trends, and what buyers and sellers should know heading into spring.',
  },
  {
    slug: 'first-time-home-buyer-guide-ontario',
    title: 'The Complete First-Time Home Buyer Guide for Ontario',
    date: 'February 28, 2024',
    category: 'Buyers',
    excerpt: 'From saving your down payment to getting keys in hand, this step-by-step guide covers everything first-time buyers in Ontario need to know — including grants and incentives you may qualify for.',
  },
  {
    slug: 'top-5-renovations-before-selling',
    title: 'Top 5 Renovations That Actually Pay Off When Selling',
    date: 'February 10, 2024',
    category: 'Sellers',
    excerpt: 'Not all renovations are created equal. Before you spend money getting your home ready to sell, find out which upgrades deliver the best return on investment in the Brantford market.',
  },
  {
    slug: 'interest-rates-and-housing-affordability',
    title: 'How Interest Rate Changes Affect Your Buying Power',
    date: 'January 22, 2024',
    category: 'Buyers',
    excerpt: 'Even a 0.5% change in interest rates can significantly affect how much home you can afford. We explain how rate changes work and what it means for buyers shopping in today\'s market.',
  },
  {
    slug: 'why-brantford-is-ontarios-hidden-gem',
    title: 'Why Brantford Is Ontario\'s Hidden Real Estate Gem',
    date: 'January 8, 2024',
    category: 'Community',
    excerpt: 'With affordability, growth, and quality of life on its side, Brantford is attracting buyers from across the province. Here\'s why more people are choosing to call the Telephone City home.',
  },
  {
    slug: 'understanding-closing-costs-ontario',
    title: 'Understanding Closing Costs in Ontario',
    date: 'December 12, 2023',
    category: 'Buyers',
    excerpt: 'Beyond the purchase price, closing costs can add thousands to your total. Land transfer tax, legal fees, title insurance — we break down every cost so there are no surprises at closing.',
  },
];

export default function BlogPage() {
  return (
    <div style={{ backgroundColor: '#1a1a1a', minHeight: '100vh' }}>

      {/* ─── HERO ─── */}
      <section style={{ backgroundColor: '#111', padding: '60px 20px', textAlign: 'center', borderBottom: '1px solid #2a2a2a' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <p style={{ color: '#58b3e5', fontFamily: "'Raleway', sans-serif", fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '12px' }}>
            REAL ESTATE INSIGHTS
          </p>
          <h1 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '54px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '16px' }}>
            OUR BLOG
          </h1>
          <p style={{ fontFamily: "'Raleway', sans-serif", color: '#aaa', fontSize: '16px', lineHeight: 1.8 }}>
            Market updates, buying and selling tips, and community news from your local Brantford real estate experts.
          </p>
        </div>
      </section>

      {/* ─── POSTS GRID ─── */}
      <section style={{ padding: '60px 20px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', width: '90%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="blog-grid">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={{ backgroundColor: '#111', padding: '60px 20px', textAlign: 'center', borderTop: '1px solid #2a2a2a' }}>
        <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '32px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', marginBottom: '12px' }}>
          HAVE A QUESTION?
        </h2>
        <p style={{ fontFamily: "'Raleway', sans-serif", color: '#888', fontSize: '15px', marginBottom: '24px' }}>
          Our team is always happy to answer your real estate questions — no obligation.
        </p>
        <Link href="/contact" style={{ display: 'inline-block', backgroundColor: '#58b3e5', color: '#fff', padding: '14px 36px', fontFamily: "'Raleway', sans-serif", fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, textDecoration: 'none' }}>
          CONTACT US
        </Link>
      </section>

      <style>{`
        @media (max-width: 1024px) {
          .blog-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .blog-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
