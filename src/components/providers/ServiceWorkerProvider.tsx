'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/lib/store/useAppStore';

export function ServiceWorkerProvider() {
  const userRules = useAppStore((state) => state.userRules);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(
          (registration) => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
            
            // Periodically trigger a sync event if supported, or we can just send rules now
            if (registration.active) {
              registration.active.postMessage({
                type: 'SYNC_RULES',
                payload: userRules
              });
            }

            // Register periodic sync for daily evaluation (if supported by browser)
            if ('periodicSync' in registration) {
              navigator.permissions.query({ name: 'periodic-background-sync' as PermissionName }).then((status) => {
                if (status.state === 'granted') {
                  // @ts-ignore
                  registration.periodicSync.register('daily-market-evaluation', {
                    minInterval: 24 * 60 * 60 * 1000, // 24 hours
                  }).catch(console.error);
                }
              });
            }
          },
          (err) => {
            console.log('ServiceWorker registration failed: ', err);
          }
        );
      });
    }
  }, []);

  // Sync rules to SW whenever they change
  useEffect(() => {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'SYNC_RULES',
        payload: userRules
      });
    }
  }, [userRules]);

  return null;
}
