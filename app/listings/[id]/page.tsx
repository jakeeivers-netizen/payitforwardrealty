import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Bed, Bath, Square, Calendar, Car, MapPin, ArrowLeft } from 'lucide-react';
import MortgageCalculator from '@/components/MortgageCalculator';
import type { Listing } from '@/types/listing';

interface ListingDetailPageProps {
  params: Promise<{ id: string }>;
}

async function getListing(id: string): Promise<Listing | null> {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/listings/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.listing ?? null;
  } catch {
    return null;
  }
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(price);
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('en-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

const statusColors: Record<string, string> = {
  'For Sale': '#2196f3',
  'For Rent': '#7B28AF',
  Sold: '#9e9e9e',
};

export default async function ListingDetailPage({ params }: ListingDetailPageProps) {
  const { id } = await params;
  const listing = await getListing(id);

  if (!listing) {
    notFound();
  }

  const statusColor = statusColors[listing.status] ?? '#2196f3';
  const images = listing.images.length > 0 ? listing.images : ['/placeholder-property.jpg'];

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Dark top bar */}
      <div style={{ backgroundColor: '#1a1a1a', padding: '16px 0' }}>
        <div style={{ width: '90%', maxWidth: '1280px', margin: '0 auto' }}>
          <Link
            href="/listings"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#58b3e5',
              fontFamily: "'Raleway', sans-serif",
              fontSize: '13px',
            }}
          >
            <ArrowLeft style={{ width: '14px', height: '14px' }} />
            Back to Listings
          </Link>
        </div>
      </div>

      {/* Full-width photo gallery */}
      <div style={{ backgroundColor: '#1a1a1a' }}>
        <div style={{ width: '90%', maxWidth: '1280px', margin: '0 auto', paddingTop: '16px', paddingBottom: '16px' }}>
          {/* Main large image */}
          <div style={{ position: 'relative', width: '100%', height: '420px', backgroundColor: '#2a2a2a', marginBottom: '8px' }}>
            <Image
              src={images[0]}
              alt={listing.address}
              fill
              style={{ objectFit: 'cover' }}
              sizes="100vw"
              priority
              unoptimized={images[0].startsWith('http')}
            />
            {/* Status badge */}
            <span
              style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                backgroundColor: statusColor,
                color: 'white',
                fontSize: '12px',
                textTransform: 'uppercase',
                padding: '4px 12px',
                fontFamily: "'Raleway', sans-serif",
                letterSpacing: '0.05em',
                fontWeight: 700,
              }}
            >
              {listing.status}
            </span>
          </div>

          {/* Thumbnail row */}
          {images.length > 1 && (
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto' }}>
              {images.slice(1, 6).map((img, i) => (
                <div
                  key={i}
                  style={{
                    position: 'relative',
                    flexShrink: 0,
                    width: '120px',
                    height: '80px',
                    backgroundColor: '#2a2a2a',
                  }}
                >
                  <Image
                    src={img}
                    alt={`${listing.address} photo ${i + 2}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="120px"
                    unoptimized={img.startsWith('http')}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div style={{ width: '90%', maxWidth: '1280px', margin: '0 auto', padding: '40px 0' }}>
        <div
          className="listing-detail-grid"
          style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '32px' }}
        >
          {/* Left column */}
          <div>
            {/* Price & Address */}
            <div style={{ marginBottom: '24px' }}>
              {listing.mlsNum && (
                <p style={{ fontFamily: "'Raleway', sans-serif", color: '#888', fontSize: '12px', marginBottom: '4px' }}>
                  MLS# {listing.mlsNum}
                </p>
              )}
              <h1
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: '42px',
                  fontWeight: 700,
                  color: '#1a1a1a',
                  marginBottom: '8px',
                }}
              >
                {formatPrice(listing.price)}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin style={{ width: '16px', height: '16px', color: '#146FB7', flexShrink: 0 }} />
                <p style={{ fontFamily: "'Raleway', sans-serif", color: '#555', fontSize: '16px' }}>
                  {listing.address}, {listing.city}, {listing.province} {listing.postalCode}
                </p>
              </div>
            </div>

            {/* Specs row */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                marginBottom: '32px',
                backgroundColor: '#1a1a1a',
                padding: '20px',
              }}
            >
              {listing.beds > 0 && (
                <div style={{ textAlign: 'center', minWidth: '80px' }}>
                  <Bed style={{ width: '24px', height: '24px', color: '#58b3e5', margin: '0 auto 4px' }} />
                  <p style={{ fontFamily: "'Oswald', sans-serif", fontSize: '22px', fontWeight: 600, color: 'white', margin: 0 }}>{listing.beds}</p>
                  <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: '11px', color: '#aaa', margin: 0, textTransform: 'uppercase' }}>Beds</p>
                </div>
              )}
              {listing.baths > 0 && (
                <div style={{ textAlign: 'center', minWidth: '80px' }}>
                  <Bath style={{ width: '24px', height: '24px', color: '#58b3e5', margin: '0 auto 4px' }} />
                  <p style={{ fontFamily: "'Oswald', sans-serif", fontSize: '22px', fontWeight: 600, color: 'white', margin: 0 }}>{listing.baths}</p>
                  <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: '11px', color: '#aaa', margin: 0, textTransform: 'uppercase' }}>Baths</p>
                </div>
              )}
              {listing.sqft > 0 && (
                <div style={{ textAlign: 'center', minWidth: '80px' }}>
                  <Square style={{ width: '24px', height: '24px', color: '#58b3e5', margin: '0 auto 4px' }} />
                  <p style={{ fontFamily: "'Oswald', sans-serif", fontSize: '22px', fontWeight: 600, color: 'white', margin: 0 }}>{listing.sqft.toLocaleString()}</p>
                  <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: '11px', color: '#aaa', margin: 0, textTransform: 'uppercase' }}>Sq Ft</p>
                </div>
              )}
              {listing.yearBuilt && (
                <div style={{ textAlign: 'center', minWidth: '80px' }}>
                  <Calendar style={{ width: '24px', height: '24px', color: '#58b3e5', margin: '0 auto 4px' }} />
                  <p style={{ fontFamily: "'Oswald', sans-serif", fontSize: '22px', fontWeight: 600, color: 'white', margin: 0 }}>{listing.yearBuilt}</p>
                  <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: '11px', color: '#aaa', margin: 0, textTransform: 'uppercase' }}>Built</p>
                </div>
              )}
            </div>

            {/* Description */}
            {listing.description && (
              <div style={{ marginBottom: '32px' }}>
                <h2
                  style={{
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: '22px',
                    fontWeight: 600,
                    color: '#1a1a1a',
                    textTransform: 'uppercase',
                    marginBottom: '12px',
                  }}
                >
                  Property Description
                </h2>
                <p style={{ fontFamily: "'Raleway', sans-serif", color: '#555', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                  {listing.description}
                </p>
              </div>
            )}

            {/* Property Details */}
            <div style={{ marginBottom: '40px' }}>
              <h2
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: '22px',
                  fontWeight: 600,
                  color: '#1a1a1a',
                  textTransform: 'uppercase',
                  marginBottom: '12px',
                }}
              >
                Property Details
              </h2>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '12px',
                }}
                className="details-grid"
              >
                <div style={{ backgroundColor: 'white', padding: '12px', border: '1px solid #e5e5e5' }}>
                  <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '2px' }}>Type</p>
                  <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: '14px', color: '#1a1a1a', fontWeight: 600 }}>{listing.propertyType}</p>
                </div>
                <div style={{ backgroundColor: 'white', padding: '12px', border: '1px solid #e5e5e5' }}>
                  <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '2px' }}>Status</p>
                  <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: '14px', color: '#1a1a1a', fontWeight: 600 }}>{listing.status}</p>
                </div>
                <div style={{ backgroundColor: 'white', padding: '12px', border: '1px solid #e5e5e5' }}>
                  <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '2px' }}>City</p>
                  <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: '14px', color: '#1a1a1a', fontWeight: 600 }}>{listing.city}</p>
                </div>
                {listing.garageType && (
                  <div style={{ backgroundColor: 'white', padding: '12px', border: '1px solid #e5e5e5' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
                      <Car style={{ width: '12px', height: '12px', color: '#888' }} />
                      <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Garage</p>
                    </div>
                    <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: '14px', color: '#1a1a1a', fontWeight: 600 }}>{listing.garageType}</p>
                  </div>
                )}
                {listing.listDate && (
                  <div style={{ backgroundColor: 'white', padding: '12px', border: '1px solid #e5e5e5' }}>
                    <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '2px' }}>List Date</p>
                    <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: '14px', color: '#1a1a1a', fontWeight: 600 }}>{formatDate(listing.listDate)}</p>
                  </div>
                )}
                <div style={{ backgroundColor: 'white', padding: '12px', border: '1px solid #e5e5e5' }}>
                  <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '2px' }}>Province</p>
                  <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: '14px', color: '#1a1a1a', fontWeight: 600 }}>{listing.province}</p>
                </div>
              </div>
            </div>

            {/* Mortgage Calculator */}
            <div style={{ marginBottom: '40px' }}>
              <h2
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: '22px',
                  fontWeight: 600,
                  color: '#1a1a1a',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}
              >
                MORTGAGE ESTIMATE
              </h2>
              <MortgageCalculator defaultPrice={listing.price} />
            </div>

            {/* Map placeholder */}
            <div>
              <h2
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: '22px',
                  fontWeight: 600,
                  color: '#1a1a1a',
                  textTransform: 'uppercase',
                  marginBottom: '12px',
                }}
              >
                LOCATION
              </h2>
              <div
                style={{
                  backgroundColor: '#e5e5e5',
                  height: '300px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #ccc',
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <MapPin style={{ width: '32px', height: '32px', color: '#888', margin: '0 auto 8px' }} />
                  <p style={{ fontFamily: "'Raleway', sans-serif", color: '#888', fontSize: '14px' }}>
                    {listing.address}, {listing.city}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column — Contact Sidebar */}
          <div>
            <div style={{ position: 'sticky', top: '80px' }}>
              <div style={{ backgroundColor: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                <div style={{ backgroundColor: '#1a1a1a', padding: '20px' }}>
                  <h3
                    style={{
                      fontFamily: "'Oswald', sans-serif",
                      fontSize: '20px',
                      fontWeight: 500,
                      color: 'white',
                      marginBottom: '4px',
                    }}
                  >
                    REQUEST INFORMATION
                  </h3>
                  <p style={{ fontFamily: "'Raleway', sans-serif", color: '#aaa', fontSize: '13px' }}>
                    Get in touch with an agent
                  </p>
                </div>

                <div style={{ padding: '24px' }}>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontFamily: "'Raleway', sans-serif", fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      style={{ width: '100%', border: '1px solid #ccc', padding: '10px 12px', fontFamily: "'Raleway', sans-serif", fontSize: '14px', outline: 'none' }}
                    />
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontFamily: "'Raleway', sans-serif", fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="jane@example.com"
                      style={{ width: '100%', border: '1px solid #ccc', padding: '10px 12px', fontFamily: "'Raleway', sans-serif", fontSize: '14px', outline: 'none' }}
                    />
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontFamily: "'Raleway', sans-serif", fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>
                      Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="(519) 555-0100"
                      style={{ width: '100%', border: '1px solid #ccc', padding: '10px 12px', fontFamily: "'Raleway', sans-serif", fontSize: '14px', outline: 'none' }}
                    />
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontFamily: "'Raleway', sans-serif", fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>
                      Message
                    </label>
                    <textarea
                      rows={4}
                      placeholder={`I'm interested in ${listing.address}. Please contact me.`}
                      style={{ width: '100%', border: '1px solid #ccc', padding: '10px 12px', fontFamily: "'Raleway', sans-serif", fontSize: '14px', outline: 'none', resize: 'none' }}
                    />
                  </div>
                  <button
                    type="button"
                    style={{
                      width: '100%',
                      backgroundColor: '#1a1a1a',
                      color: 'white',
                      padding: '12px',
                      fontFamily: "'Raleway', sans-serif",
                      fontSize: '14px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Send Message
                  </button>
                  <div style={{ textAlign: 'center', marginTop: '16px' }}>
                    <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: '12px', color: '#888', marginBottom: '4px' }}>Or call us directly:</p>
                    <a
                      href="tel:+15195550100"
                      style={{ fontFamily: "'Raleway', sans-serif", fontSize: '16px', fontWeight: 700, color: '#146FB7' }}
                    >
                      (519) 555-0100
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .listing-detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .details-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
}
