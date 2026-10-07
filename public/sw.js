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
