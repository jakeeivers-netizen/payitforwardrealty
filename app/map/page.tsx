'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import ListingCard from '@/components/ListingCard';
import type { Listing } from '@/types/listing';

const MapView = dynamic(() => import('@/components/MapView'), {
  ssr: false,
  loading: () => (
    <div
      className="w-full h-full rounded-xl bg-gray-100 flex items-center justify-center"
      style={{ minHeight: '400px' }}
    >
      <p className="text-gray-500">Loading map...</p>
    </div>
  ),
});

export default function MapPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([43.1394, -80.2644]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch('/api/listings?limit=50');
        if (res.ok) {
          const data = await res.json();
          setListings(data.listings ?? []);
        }
      } catch (err) {
        console.error('Failed to fetch listings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  const handleCardClick = (listing: Listing) => {
    setSelectedListing(listing);
    if (listing.lat != null && listing.lng != null) {
      setMapCenter([listing.lat, listing.lng]);
    }
  };

  const listingsWithCoords = listings.filter(
    (l) => l.lat != null && l.lng != null
  );

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden">
      {/* Sidebar */}
      <div className="w-full md:w-96 flex-shrink-0 overflow-y-auto border-r border-gray-200 bg-white">
        <div className="p-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h1 className="text-lg font-bold" style={{ color: '#1a1a1a' }}>
            Map Search
          </h1>
          <p className="text-sm text-gray-500">
            {loading
              ? 'Loading listings...'
              : `${listingsWithCoords.length} listings on map`}
          </p>
        </div>

        {loading ? (
          <div className="p-4 space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="rounded-xl overflow-hidden shadow-sm animate-pulse">
                <div className="h-40 bg-gray-200" />
                <div className="p-3 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : listings.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No listings available.</p>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {listings.map((listing) => (
              <div
                key={listing.id}
                onClick={() => handleCardClick(listing)}
                className={`cursor-pointer rounded-xl transition-all duration-200 ${
                  selectedListing?.id === listing.id
                    ? 'shadow-lg'
                    : 'hover:shadow-md'
                }`}
                style={
                  selectedListing?.id === listing.id
                    ? { outline: '2px solid #146FB7' }
                    : undefined
                }
              >
                <ListingCard listing={listing} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Map */}
      <div className="flex-1 relative p-4 bg-gray-50">
        <MapView
          listings={listingsWithCoords}
          center={mapCenter}
          onMarkerClick={(listing) => {
            setSelectedListing(listing);
          }}
        />
      </div>
    </div>
  );
}
