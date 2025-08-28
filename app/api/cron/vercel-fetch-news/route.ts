import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    // Verify this is actually from Vercel cron
    const userAgent = request.headers.get('user-agent');
    const isFromVercel = userAgent?.includes('vercel') || 
                        request.headers.get('x-vercel-cron') === '1';
    
    if (process.env.NODE_ENV === 'production' && !isFromVercel) {
      return NextResponse.json({ 
        success: false, 
        error: 'This endpoint is only accessible from Vercel cron jobs' 
      }, { status: 403 });
    }

    // Call the main fetch function with internal auth
    const cronSecret = process.env.CRON_SECRET;
    if (!cronSecret) {
      return NextResponse.json({
        success: false,
        error: 'CRON_SECRET not configured'
      }, { status: 500 });
    }

    // Derive same-origin URL from the incoming request to avoid relying on VERCEL_URL
    const targetUrl = new URL('/api/cron/fetch-news', request.url);
    const cronResponse = await fetch(targetUrl.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cronSecret}`,
      },
    });

    const contentType = cronResponse.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      const text = await cronResponse.text();
      return NextResponse.json({
        success: false,
        error: 'Upstream returned non-JSON response',
        status: cronResponse.status,
        statusText: cronResponse.statusText,
        bodyPreview: text.slice(0, 500),
      }, { status: 502 });
    }

    const result = await cronResponse.json();
    if (!cronResponse.ok) {
      return NextResponse.json({
        success: false,
        error: 'Upstream returned error',
        status: cronResponse.status,
        statusText: cronResponse.statusText,
        body: result,
      }, { status: cronResponse.status });
    }

    return NextResponse.json(result);

  } catch (error) {
    console.error('Error in vercel-fetch-news:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
