import { db } from '@/db.mjs';

export default async function FooterStatus() {
  try {
    const [{ last_created_at }] = await db`
      SELECT MAX(created_at) AS last_created_at
      FROM articles
      WHERE region = 'us'
    `;

    let display = 'No data yet';
    if (last_created_at) {
      const date = new Date(last_created_at as unknown as string);
      display = date.toLocaleString('en-US', {
        timeZone: 'America/Los_Angeles',
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });
    }

    return (
      <footer className="w-full border-t bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-gray-500 flex items-center justify-between">
          <span>Last pulled: {display} PT</span>
          <span>News7</span>
        </div>
      </footer>
    );
  } catch {
    return (
      <footer className="w-full border-t bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-gray-500">
          Last pulled: error fetching status
        </div>
      </footer>
    );
  }
}


