const CACHE_NAME = 'nusasense-cache-v1';

// App shell resources
const STATIC_ASSETS = [
  '/',
  '/app',
  '/app/watchlist',
  '/app/settings',
  '/icon.svg',
];

// Install event: cache app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Intentionally ignore failures for individual static assets during install
      return Promise.allSettled(
        STATIC_ASSETS.map(url => cache.add(url))
      );
    })
  );
  self.skipWaiting();
});

// Activate event: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name.startsWith('nusasense-cache-') && name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch event: Stale-while-revalidate for signals.json, Network-first for everything else
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Stale-while-revalidate strategy specifically for the mock JSON endpoint
  if (url.pathname.includes('/data/signals.json')) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          const fetchPromise = fetch(event.request).then((networkResponse) => {
            if (networkResponse.ok) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => {
            // Network failed, we'll rely on the cache if it exists
          });

          return cachedResponse || fetchPromise;
        });
      })
    );
    return;
  }

  // Network-first strategy for navigation and static assets
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // Cache successful responses for our origin
        if (networkResponse.ok && url.origin === self.location.origin && event.request.method === 'GET') {
          const clonedResponse = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clonedResponse));
        }
        return networkResponse;
      })
      .catch(async () => {
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }
        
        // If it's a page navigation request that fails and isn't cached,
        // we could potentially return a fallback offline page here.
        if (event.request.mode === 'navigate') {
          const offlinePage = await caches.match('/app');
          if (offlinePage) return offlinePage;
        }

        throw new Error('Offline');
      })
  );
});

// Store user rules in SW memory
let activeRules = [];

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SYNC_RULES') {
    activeRules = event.data.payload || [];
    // We could immediately run evaluation here, or wait for background sync
    evaluateRulesAndNotify();
  }
});

// Handle periodic background sync for daily evaluation
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'daily-market-evaluation') {
    event.waitUntil(evaluateRulesAndNotify());
  }
});

// Simple evaluation logic (re-implemented for SW without imports)
function evaluateRule(rule, metrics) {
  if (!rule.active) return false;
  const parts = rule.ruleString.split(' ');
  if (parts.length !== 3) return false;
  
  const metricKey = parts[0];
  const operator = parts[1];
  const targetValue = parseFloat(parts[2]);
  
  if (isNaN(targetValue) || metrics[metricKey] == null) return false;
  const actualValue = Number(metrics[metricKey]);
  if (isNaN(actualValue)) return false;

  switch (operator) {
    case '<': return actualValue < targetValue;
    case '>': return actualValue > targetValue;
    case '=':
    case '==': return actualValue === targetValue;
    case '<=': return actualValue <= targetValue;
    case '>=': return actualValue >= targetValue;
    default: return false;
  }
}

async function evaluateRulesAndNotify() {
  if (!activeRules || activeRules.length === 0) return;

  try {
    // Fetch latest master data (mocked here as signals.json)
    const response = await fetch('/data/signals.json');
    if (!response.ok) return;
    const data = await response.json();

    const matches = [];
    const CHUNK_SIZE = 100;
    const alerts = data.alerts || [];

    // Process in chunks to avoid blocking the SW thread
    for (let i = 0; i < alerts.length; i += CHUNK_SIZE) {
      const chunk = alerts.slice(i, i + CHUNK_SIZE);
      
      await new Promise(resolve => setTimeout(() => {
        chunk.forEach(alert => {
          const isMatch = activeRules.some(rule => evaluateRule(rule, alert.metrics));
          if (isMatch) {
            matches.push(alert);
          }
        });
        resolve();
      }, 0));
    }

    // For demonstration, just notify about the first match to avoid spam
    if (matches.length > 0) {
      const match = matches[0];
      const matchedRule = activeRules.find(r => evaluateRule(r, match.metrics));
      
      self.registration.showNotification('🎯 Rule Match: ' + match.ticker, {
        body: `Triggered by rule: ${matchedRule?.ruleString || 'Custom Rule'}`,
        icon: '/icon.jpg',
        badge: '/icon.svg',
        data: { url: '/app' }
      });
    }
  } catch (error) {
    console.error('Failed to evaluate rules in SW', error);
  }
}

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      const urlToOpen = new URL(event.notification.data.url, self.location.origin).href;
      for (const client of clientList) {
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
