'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Bed, Bath, Square, Home, Heart } from 'lucide-react';
import type { Listing } from '@/types/listing';

interface ListingCardProps {
  listing: Listing;
  onSave?: (id: string) => void;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(price);
}

const statusBadge: Record<string, { bg: string; label: string }> = {
  'For Sale': { bg: '#2196f3', label: 'FOR SALE' },
  'For Rent': { bg: '#7B28AF', label: 'FOR RENT' },
  Sold: { bg: '#9e9e9e', label: 'SOLD' },
};

export default function ListingCard({ listing, onSave }: ListingCardProps) {
  const badge = statusBadge[listing.status] ?? statusBadge['For Sale'];
  const imageSrc = listing.images?.[0] || null;

  return (
    <Link
      href={`/listings/${listing.id}`}
      style={{ display: 'block', textDecoration: 'none' }}
    >
      <div
        style={{
          backgroundColor: '#1a1a1a',
          borderRadius: '0',
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.02)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
        }}
      >
        {/* Image area */}
        <div style={{ height: '200px', position: 'relative', overflow: 'hidden' }}>
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={listing.address || 'Property image'}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized={imageSrc.startsWith('http')}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#2a2a2a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Home style={{ width: '48px', height: '48px', color: '#555' }} />
            </div>
          )}

          {/* Property type badge — top left */}
          <span
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              backgroundColor: '#795548',
              color: 'white',
              fontSize: '10px',
              textTransform: 'uppercase',
              padding: '3px 8px',
              fontFamily: "'Raleway', sans-serif",
              letterSpacing: '0.04em',
            }}
          >
            {listing.propertyType}
          </span>

          {/* Status badge — top right */}
          <span
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              backgroundColor: badge.bg,
              color: 'white',
              fontSize: '10px',
              textTransform: 'uppercase',
              padding: '3px 8px',
              fontFamily: "'Raleway', sans-serif",
              letterSpacing: '0.04em',
            }}
          >
            {badge.label}
          </span>

          {/* Heart icon — bottom right */}
          {onSave ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                onSave(listing.id);
              }}
              aria-label="Save listing"
              style={{
                position: 'absolute',
                bottom: '8px',
                right: '8px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <Heart style={{ width: '20px', height: '20px', color: 'white', opacity: 0.7 }} />
            </button>
          ) : (
            <span
              style={{
                position: 'absolute',
                bottom: '8px',
                right: '8px',
                opacity: 0.7,
              }}
            >
              <Heart style={{ width: '20px', height: '20px', color: 'white' }} />
            </span>
          )}
        </div>

        {/* Content area */}
        <div style={{ padding: '12px', backgroundColor: '#1a1a1a' }}>
          {/* Price */}
          <p
            style={{
              fontSize: '22px',
              fontWeight: 700,
              color: 'white',
              fontFamily: "'Oswald', sans-serif",
              marginBottom: '4px',
              margin: '0 0 4px',
            }}
          >
            {formatPrice(listing.price)}
          </p>

          {/* Address */}
          <p style={{ fontSize: '13px', color: '#ccc', marginBottom: '2px', margin: '0 0 2px' }}>
            {listing.address}
          </p>

          {/* City / Province */}
          <p style={{ fontSize: '12px', color: '#888', marginBottom: '8px', margin: '0 0 8px' }}>
            {listing.city}, {listing.province}
          </p>

          {/* Beds / Baths / Sqft */}
          <div style={{ display: 'flex', gap: '12px', color: '#aaa', fontSize: '12px', flexWrap: 'wrap' }}>
            {listing.beds > 0 && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Bed style={{ width: '13px', height: '13px' }} />
                {listing.beds}
              </span>
            )}
            {listing.baths > 0 && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Bath style={{ width: '13px', height: '13px' }} />
                {listing.baths}
              </span>
            )}
            {listing.sqft > 0 && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Square style={{ width: '13px', height: '13px' }} />
                {listing.sqft.toLocaleString()} sqft
              </span>
            )}
          </div>

          {/* Divider */}
          <div style={{ borderTop: '1px solid #333', margin: '8px 0' }} />

          {/* More button */}
          <span
            style={{
              display: 'inline-block',
              backgroundColor: '#5c5c5c',
              color: 'white',
              fontSize: '12px',
              padding: '6px 16px',
              borderRadius: '2px',
              fontFamily: "'Raleway', sans-serif",
            }}
          >
            More
          </span>
        </div>
      </div>
    </Link>
  );
}
