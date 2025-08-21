import { NextResponse } from 'next/server';
import { db } from '@/db.mjs';

export async function GET(request: Request) {
  try {
    // This is a test endpoint that you can call manually
    // Add basic protection for testing
    const testSecret = process.env.TEST_SECRET || 'dev-test-secret';
    const authHeader = request.headers.get('authorization');
    
    if (process.env.NODE_ENV === 'production' && authHeader !== `Bearer ${testSecret}`) {
      return NextResponse.json({ 
        success: false, 
        error: 'Unauthorized. Use Authorization header with Bearer token.' 
      }, { status: 401 });
    }
    
    const cronResponse = await fetch(
      `${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : 'http://localhost:3000'}/api/cron/fetch-news`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.CRON_SECRET || 'dev-cron-secret'}`,
        },
      }
    );

    const result = await cronResponse.json();

    // Also show current articles in database
    const articles = await db`
      SELECT 
        title, 
        source_name, 
        rank, 
        published_date,
        created_at
      FROM articles 
      WHERE region = 'us' AND published_date >= CURRENT_DATE - INTERVAL '1 day'
      ORDER BY rank ASC
    `;

    return NextResponse.json({
      cronResult: result,
      currentArticles: articles,
      articleCount: articles.length
    });

  } catch (error) {
    console.error('Error in test-news-fetch:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
