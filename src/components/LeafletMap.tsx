'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface Park {
  id: string;
  name: string;
  position: [number, number];
  status: 'visited' | 'notVisited' | 'bucketList';
  description?: string;
}

interface LeafletMapProps {
  center?: [number, number];
  zoom?: number;
  className?: string;
  parks?: Park[];
}

const createCustomIcon = (color: string) => {
  
  return L.divIcon({
    className: 'custom-div-icon',
    html: `
      <div style="
        width: 20px;
        height: 20px;
        background-color: ${color};
        border: 2px solid white;
        border-radius: 50%;
        box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
      "></div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

export default function LeafletMap({ 
  center = [42.47, -71.49], 
  zoom = 13,
  className = "h-96 w-full",
  parks = []
}: LeafletMapProps) {
  const [isClient, setIsClient] = useState(false);
  const [markerIcons, setMarkerIcons] = useState<{
    visited: L.DivIcon;
    notVisited: L.DivIcon;
    bucketList: L.DivIcon;
  } | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setIsClient(true);
    }, 0);
    
    // Create custom icons only on client side
    setTimeout(() => {
      setMarkerIcons({
        visited: createCustomIcon('#16a34a'), // green-600
        notVisited: createCustomIcon('#d1d5db'), // gray-300
        bucketList: createCustomIcon('#facc15'), // yellow-400
      });
    }, 0);
  }, []);

  if (!isClient || !markerIcons) {
    return <div className={`bg-gray-200 animate-pulse ${className}`} />;
  }

  return (
    <MapContainer 
        center={center} 
        zoom={zoom} 
        className={className}
        maxBounds={[
            [24.396308, -125.0], // Southwest corner
            [49.384358, -66.93457] // Northeast corner
        ]}
        maxBoundsViscosity={1.0}
        minZoom={3}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {parks.map((park) => (
        <Marker 
          key={park.id}
          position={park.position}
          icon={markerIcons[park.status]}
        >
          <Popup>
            <div className="font-semibold">{park.name}</div>
            {park.description && (
              <div className="text-sm text-gray-600 mt-1">{park.description}</div>
            )}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}