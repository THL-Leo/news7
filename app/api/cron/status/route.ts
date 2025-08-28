import { NextResponse } from 'next/server';
import { db } from '@/db.mjs';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    const [{ last_created_at }] = await db`
      SELECT MAX(created_at) AS last_created_at
      FROM articles
      WHERE region = 'us'
    `;

    const [{ count: today_count }] = await db`
      SELECT COUNT(*) AS count
      FROM articles
      WHERE region = 'us'
        AND published_date = (CURRENT_TIMESTAMP AT TIME ZONE 'America/Los_Angeles')::date
    `;

    return NextResponse.json({
      success: true,
      lastPulledAt: last_created_at || null,
      todayCount: Number(today_count || 0),
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}


