"use client";

import { useEffect, useState } from 'react';

export default function FooterStatus() {
  const [display, setDisplay] = useState<string>('Loading…');

  useEffect(() => {
    let isMounted = true;
    fetch('/api/cron/status', { cache: 'no-store' })
      .then(async (res) => {
        const data = await res.json();
        if (!isMounted) return;
        const ts = data?.lastPulledAt;
        if (!ts) {
          setDisplay('No data yet');
          return;
        }
        const date = new Date(ts);
        const formatted = date.toLocaleString('en-US', {
          timeZone: 'America/Los_Angeles',
          year: 'numeric',
          month: 'short',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        });
        setDisplay(formatted);
      })
      .catch(() => {
        if (isMounted) setDisplay('error');
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <footer className="w-full border-t bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-gray-500 flex items-center justify-between">
        <span>Last pulled: {display} PT</span>
        <span>News7</span>
      </div>
    </footer>
  );
}


