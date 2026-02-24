const CACHE_NAME = 'machmiles-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/static/js/main.chunk.js',
  '/static/js/bundle.js',
  '/static/css/main.chunk.css',
  '/manifest.json',
  '/favicon.ico',
  '/logo192.png',
  '/logo512.png',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
  'https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLCz7V1tvFP-KUEg.ttf',
  'https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLFj_V1tvFP-KUEg.ttf',
  'https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLGT9V1tvFP-KUEg.ttf',
  'https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLBT5V1tvFP-KUEg.ttf',
  'https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLTT7V1tvFP-KUEg.ttf',
  'https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLFT7V1tvFP-KUEg.ttf',
  'https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLEz6V1tvFP-KUEg.ttf'
];

// Install service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate service worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event handler
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached response if found
        if (response) {
          return response;
        }

        // Clone the request
        const fetchRequest = event.request.clone();

        // Make network request
        return fetch(fetchRequest).then(response => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          // Cache the fetched response
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
  );
});

// Push notification handler
self.addEventListener('push', event => {
  const options = {
    body: event.data.text(),
    icon: '/logo192.png',
    badge: '/logo192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Details',
        icon: '/logo192.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/logo192.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Machmiles Notification', options)
  );
});

// Background sync handler
self.addEventListener('sync', event => {
  if (event.tag === 'syncData') {
    event.waitUntil(syncData());
  }
});

// Handle offline functionality
self.addEventListener('offline', () => {
  console.log('App is offline');
});

// Handle online functionality
self.addEventListener('online', () => {
  console.log('App is online');
}); 