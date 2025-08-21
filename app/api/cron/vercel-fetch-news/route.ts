import { NextResponse } from 'next/server';

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
    const cronResponse = await fetch(
      `${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : 'http://localhost:3000'}/api/cron/fetch-news`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.CRON_SECRET}`,
        },
      }
    );

    const result = await cronResponse.json();
    return NextResponse.json(result);

  } catch (error) {
    console.error('Error in vercel-fetch-news:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
