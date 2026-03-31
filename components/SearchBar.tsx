'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ListingSearchParams } from '@/types/listing';

interface SearchBarProps {
  initialValues?: Partial<ListingSearchParams>;
  onSearch?: (params: ListingSearchParams) => void;
}

const propertyTypes = [
  { value: '', label: 'All Types' },
  { value: 'House', label: 'House' },
  { value: 'Condo', label: 'Condo' },
  { value: 'Townhouse', label: 'Townhouse' },
  { value: 'Land', label: 'Land' },
  { value: 'Commercial', label: 'Commercial' },
];

const statusOptions = [
  { value: 'For Sale', label: 'For Sale' },
  { value: 'For Rent', label: 'For Rent' },
];

const bedsOptions = [
  { value: '', label: 'Any Beds' },
  { value: '1', label: '1+' },
  { value: '2', label: '2+' },
  { value: '3', label: '3+' },
  { value: '4', label: '4+' },
];

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '11px',
  textTransform: 'uppercase',
  color: '#888',
  fontFamily: "'Raleway', sans-serif",
  marginBottom: '4px',
  letterSpacing: '0.04em',
};

const fieldStyle: React.CSSProperties = {
  width: '100%',
  border: '1px solid #ccc',
  padding: '8px 12px',
  fontSize: '14px',
  fontFamily: "'Raleway', sans-serif",
  color: '#1a1a1a',
  background: 'white',
  outline: 'none',
};

export default function SearchBar({ initialValues, onSearch }: SearchBarProps) {
  const router = useRouter();
  const [city, setCity] = useState(initialValues?.city ?? 'Brantford');
  const [propertyType, setPropertyType] = useState(initialValues?.propertyType ?? '');
  const [status, setStatus] = useState(initialValues?.status ?? 'For Sale');
  const [minPrice, setMinPrice] = useState(
    initialValues?.minPrice ? String(initialValues.minPrice) : ''
  );
  const [maxPrice, setMaxPrice] = useState(
    initialValues?.maxPrice ? String(initialValues.maxPrice) : ''
  );
  const [beds, setBeds] = useState(
    initialValues?.beds ? String(initialValues.beds) : ''
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params: ListingSearchParams = {
      city: city || undefined,
      propertyType: propertyType || undefined,
      status: status || undefined,
      minPrice: minPrice ? parseInt(minPrice, 10) : undefined,
      maxPrice: maxPrice ? parseInt(maxPrice, 10) : undefined,
      beds: beds ? parseInt(beds, 10) : undefined,
    };

    if (onSearch) {
      onSearch(params);
      return;
    }

    const qs = new URLSearchParams();
    if (params.city) qs.set('city', params.city);
    if (params.propertyType) qs.set('propertyType', params.propertyType);
    if (params.status) qs.set('status', params.status);
    if (params.minPrice) qs.set('minPrice', String(params.minPrice));
    if (params.maxPrice) qs.set('maxPrice', String(params.maxPrice));
    if (params.beds) qs.set('beds', String(params.beds));

    router.push(`/listings?${qs.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '20px 25px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          alignItems: 'flex-end',
        }}
      >
        {/* Location */}
        <div style={{ flex: '1 1 140px', minWidth: '120px' }}>
          <label style={labelStyle}>Location</label>
          <input
            type="text"
            placeholder="City, neighbourhood..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={fieldStyle}
          />
        </div>

        {/* Type */}
        <div style={{ flex: '1 1 120px', minWidth: '100px' }}>
          <label style={labelStyle}>Type</label>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            style={{ ...fieldStyle, appearance: 'none' as const }}
          >
            {propertyTypes.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div style={{ flex: '1 1 120px', minWidth: '100px' }}>
          <label style={labelStyle}>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{ ...fieldStyle, appearance: 'none' as const }}
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Beds */}
        <div style={{ flex: '1 1 100px', minWidth: '80px' }}>
          <label style={labelStyle}>Beds</label>
          <select
            value={beds}
            onChange={(e) => setBeds(e.target.value)}
            style={{ ...fieldStyle, appearance: 'none' as const }}
          >
            {bedsOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Min Price */}
        <div style={{ flex: '1 1 120px', minWidth: '100px' }}>
          <label style={labelStyle}>Min Price</label>
          <input
            type="number"
            placeholder="$0"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            min={0}
            step={10000}
            style={fieldStyle}
          />
        </div>

        {/* Max Price */}
        <div style={{ flex: '1 1 120px', minWidth: '100px' }}>
          <label style={labelStyle}>Max Price</label>
          <input
            type="number"
            placeholder="No max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            min={0}
            step={10000}
            style={fieldStyle}
          />
        </div>

        {/* Search button */}
        <div style={{ flex: '0 0 auto' }}>
          <button
            type="submit"
            style={{
              backgroundColor: '#1a1a1a',
              color: 'white',
              padding: '10px 24px',
              borderRadius: '4px',
              fontSize: '14px',
              fontFamily: "'Raleway', sans-serif",
              textTransform: 'uppercase',
              border: 'none',
              cursor: 'pointer',
              letterSpacing: '0.04em',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.85'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
