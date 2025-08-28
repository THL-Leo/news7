import { NextResponse } from 'next/server';
import { db } from '@/db.mjs';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    const [{ boundary_start }] = await db`
      WITH now_pt AS (
        SELECT (CURRENT_TIMESTAMP AT TIME ZONE 'America/Los_Angeles') AS now_pt
      )
      SELECT ((now_pt - INTERVAL '6 hours')::date + INTERVAL '6 hours') AS boundary_start
      FROM now_pt
    ` as unknown as { boundary_start: string }[];

    const [{ last_created_at }] = await db`
      SELECT MAX(created_at) AS last_created_at
      FROM articles
      WHERE region = 'us'
    `;

    const [{ count: today_count }] = await db`
      SELECT COUNT(*) AS count
      FROM articles
      WHERE region = 'us'
        AND created_at >= ${boundary_start}
    `;

    return NextResponse.json({
      success: true,
      lastPulledAt: last_created_at || null,
      newsDayStart: boundary_start,
      todayCount: Number(today_count || 0),
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}


