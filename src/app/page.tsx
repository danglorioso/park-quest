"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MapHomePage from "@/components/MapHomePage";
import Features from "@/components/Features";
import CTA from "@/components/CTA";
import Nav from "@/components/NavBar";
import ProgressCard from "@/components/ProgressCard";
import QuickStats from "@/components/QuickStats";
import RecentBadges from "@/components/RecentBadges";
import Legend from "@/components/Legend";
import Map from "@/components/Map";

interface ParkFromDB {
  id: number;
  name: string;
  latitude: string | null;
  longitude: string | null;
  description: string | null;
}

interface ParkForMap {
  id: string;
  name: string;
  position: [number, number];
  status: 'visited' | 'notVisited' | 'bucketList';
  description?: string;
}

export default function Home() {
  const { isSignedIn, isLoaded } = useUser();
  const [parks, setParks] = useState<ParkForMap[]>([]);
  const [isLoadingParks, setIsLoadingParks] = useState(true);

  useEffect(() => {
    if (isSignedIn) {
      fetchParks();
    }
  }, [isSignedIn]);

  const fetchParks = async () => {
    try {
      setIsLoadingParks(true);
      const response = await fetch('/api/parks');
      if (!response.ok) {
        throw new Error('Failed to fetch parks');
      }
      const data: ParkFromDB[] = await response.json();
      
      // Transform database parks to map format
      const transformedParks: ParkForMap[] = data
        .filter(park => park.latitude && park.longitude)
        .map(park => ({
          id: park.id.toString(),
          name: park.name,
          position: [
            parseFloat(park.latitude!),
            parseFloat(park.longitude!)
          ] as [number, number],
          status: 'notVisited' as const, // Default status, can be updated later based on visits
          description: park.description || undefined,
        }));
      
      setParks(transformedParks);
    } catch (error) {
      console.error('Error fetching parks:', error);
    } finally {
      setIsLoadingParks(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  // If signed in, show dashboard
  if (isSignedIn) {
    return (
      <div className="flex flex-col h-screen">
        {/* Navigation Bar */}
        <Nav />

        {/* Body */}
        <div className="flex flex-1 flex-row min-h-0 overflow-hidden">
          {/* Left Sidebar */}
          <div className="w-80 bg-gray-50 border-r border-gray-200 overflow-y-auto p-6">
            <ProgressCard />
            <QuickStats />
            <RecentBadges />
          </div>

          {/* Right Map */}
          <div className="flex-1 relative overflow-hidden">
            {isLoadingParks ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-lg text-gray-600">Loading parks...</div>
              </div>
            ) : (
              <>
                {/* Map */}
                <Map 
                  center={[39.8283, -98.5795]} 
                  zoom={4}
                  className="h-full w-full"
                  parks={parks}
                />
                
                {/* Legend - positioned over the map */}
                <div className="absolute bottom-4 left-4 z-[1000]">
                  <Legend />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // If not signed in, show landing page
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <MapHomePage />
      <Features />
      <CTA />
    </div>
  );
}
