import { NextResponse } from 'next/server';
import { db } from '@/db.mjs';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    // Verify this request is from Vercel Cron
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    if (!cronSecret) {
      return NextResponse.json({ 
        success: false, 
        error: 'CRON_SECRET not configured' 
      }, { status: 500 });
    }
    
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ 
        success: false, 
        error: 'Unauthorized' 
      }, { status: 401 });
    }

    const apiKey = process.env.NEWS_API_KEY;
    
    if (!apiKey) {
      throw new Error('NEWS_API_KEY environment variable not set');
    }

    // Fetch news from NewsAPI
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}&pageSize=7`,
      {
        headers: {
          'User-Agent': 'DailyNews/1.0'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`NewsAPI request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.articles || data.articles.length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'No articles returned from NewsAPI' 
      });
    }

    // Check if we already fetched news today to prevent spam
    const existingToday = await db`
      SELECT COUNT(*) as count 
      FROM articles 
      WHERE region = 'us' 
        AND published_date = CURRENT_DATE
        AND created_at > CURRENT_TIMESTAMP - INTERVAL '1 hour'
    `;
    
    if (existingToday[0].count > 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'News already fetched today. Preventing spam.',
        lastFetch: existingToday[0].count
      });
    }

    // Clear old US news data
    await db`DELETE FROM articles WHERE region = 'us' AND published_date < CURRENT_DATE`;

    // Insert new articles
    let insertedCount = 0;
    for (let i = 0; i < data.articles.length; i++) {
      const article = data.articles[i];
      
      // Skip articles with null or empty essential fields
      if (!article.title || article.title === '[Removed]') {
        continue;
      }

      try {
        await db`
          INSERT INTO articles (
            title, 
            content, 
            summary, 
            source_name, 
            source_url, 
            region, 
            rank, 
            published_date
          ) VALUES (
            ${article.title || ''},
            ${article.content || article.description || ''},
            ${article.description || ''},
            ${article.source?.name || 'Unknown Source'},
            ${article.url || ''},
            'us',
            ${i + 1},
            CURRENT_DATE
          )
        `;
        insertedCount++;
      } catch (insertError) {
        console.error('Error inserting article:', insertError);
        // Continue with other articles
      }
    }

    console.log(`Successfully inserted ${insertedCount} articles`);

    return NextResponse.json({ 
      success: true, 
      message: `Successfully fetched and stored ${insertedCount} news articles`,
      insertedCount,
      totalFetched: data.articles.length
    });

  } catch (error) {
    console.error('Error in fetch-news cron:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Allow manual testing by supporting POST as well
export async function POST(request: Request) {
  return GET(request);
}
