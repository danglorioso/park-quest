'use client';

import dynamic from 'next/dynamic';

const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => <div className="h-96 w-full bg-gray-200 animate-pulse rounded-lg" />
});

interface Park {
  id: string;
  name: string;
  position: [number, number];
  status: 'visited' | 'notVisited' | 'bucketList';
  description?: string;
}

interface MapProps {
  center?: [number, number];
  zoom?: number;
  className?: string;
  parks?: Park[];
}

export default function Map(props: MapProps) {
  return <LeafletMap {...props} />;
}