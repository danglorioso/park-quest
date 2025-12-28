import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { visits } from '@/lib/db/schema';
import { auth } from '@clerk/nextjs/server';
import { eq, and } from 'drizzle-orm';

export async function GET() {
  try {
    // Get Clerk signed-in user ID
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch all visits for the current user
    const userVisits = await db
      .select({
        park_code: visits.park_code,
        visited_date: visits.visited_date,
        is_bucket_list: visits.is_bucket_list,
      })
      .from(visits)
      .where(eq(visits.clerk_user_id, userId));

    return NextResponse.json(userVisits);
  } catch (error) {
    console.error('Error fetching visits:', error);
    return NextResponse.json(
      { error: 'Failed to fetch visits' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Get Clerk signed-in user ID
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { park_code } = body;

    if (!park_code) {
      return NextResponse.json(
        { error: 'Park code is required' },
        { status: 400 }
      );
    }

    // Check if visit already exists
    const existingVisit = await db
      .select()
      .from(visits)
      .where(
        and(
          eq(visits.clerk_user_id, userId),
          eq(visits.park_code, park_code)
        )
      )
      .limit(1);

    if (existingVisit.length > 0) {
      // Visit already exists, return success
      return NextResponse.json({ 
        message: 'Park already marked as visited',
        visit: existingVisit[0]
      });
    }

    // Create new visit
    const newVisit = await db
      .insert(visits)
      .values({
        clerk_user_id: userId,
        park_code: park_code,
        visited_date: new Date(),
      })
      .returning();

    return NextResponse.json({ 
      message: 'Park marked as visited',
      visit: newVisit[0]
    });
  } catch (error) {
    console.error('Error marking park as visited:', error);
    return NextResponse.json(
      { error: 'Failed to mark park as visited' },
      { status: 500 }
    );
  }
}

