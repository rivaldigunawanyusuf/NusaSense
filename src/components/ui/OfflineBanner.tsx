'use client';

import { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';

export function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // Check initial status
    if (typeof navigator !== 'undefined') {
      setIsOffline(!navigator.onLine);
    }

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-center gap-2 bg-warn p-2 text-xs font-semibold text-warn-foreground">
      <WifiOff className="size-4" />
      <span>You are offline. Showing cached data.</span>
    </div>
  );
}
