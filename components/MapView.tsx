'use client';

import { useEffect, useRef } from 'react';
import type { Listing } from '@/types/listing';

interface MapViewProps {
  listings: Listing[];
  center?: [number, number];
  onMarkerClick?: (listing: Listing) => void;
}

// Brantford, ON
const DEFAULT_CENTER: [number, number] = [43.1394, -80.2644];

export default function MapView({
  listings,
  center = DEFAULT_CENTER,
  onMarkerClick,
}: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let isMounted = true;

    const initMap = async () => {
      const L = (await import('leaflet')).default;
      await import('leaflet/dist/leaflet.css');

      if (!isMounted || !mapRef.current) return;

      // Fix default icon paths
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl:
          'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl:
          'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      const map = L.map(mapRef.current).setView(center, 13);
      mapInstanceRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      // Add markers
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      const listingsWithCoords = listings.filter(
        (l) => l.lat != null && l.lng != null
      );

      for (const listing of listingsWithCoords) {
        const marker = L.marker([listing.lat!, listing.lng!]).addTo(map);

        const price = new Intl.NumberFormat('en-CA', {
          style: 'currency',
          currency: 'CAD',
          maximumFractionDigits: 0,
        }).format(listing.price);

        marker.bindPopup(`
          <div style="min-width:180px">
            <strong style="color:#146FB7">${price}</strong><br/>
            <span style="font-size:0.85em">${listing.address || ''}</span><br/>
            <span style="font-size:0.8em;color:#555">${listing.city}, ${listing.province}</span><br/>
            <a href="/listings/${listing.id}" style="color:#146FB7;font-size:0.8em;font-weight:bold">View Details &rarr;</a>
          </div>
        `);

        if (onMarkerClick) {
          marker.on('click', () => onMarkerClick(listing));
        }

        markersRef.current.push(marker);
      }
    };

    initMap();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update map view when center changes
  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(center, 14);
    }
  }, [center]);

  return (
    <div
      ref={mapRef}
      className="w-full h-full rounded-xl overflow-hidden"
      style={{ minHeight: '400px' }}
    />
  );
}
