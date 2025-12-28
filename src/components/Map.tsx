'use client';

import dynamic from 'next/dynamic';
import type { Park } from './LeafletMap';

const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => <div className="h-96 w-full bg-gray-200 animate-pulse rounded-lg" />
});

interface MapProps {
  center?: [number, number];
  zoom?: number;
  className?: string;
  parks?: Park[];
  onMarkVisited?: (parkCode: string) => void;
}

export default function Map(props: MapProps) {
  return <LeafletMap {...props} />;
}