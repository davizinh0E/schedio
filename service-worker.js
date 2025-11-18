const CACHE_NAME = 'schedio-v2';
const BASE_PATH = '/schedio/';
const urlsToCache = [
    `${BASE_PATH}schedio.html`,
    `${BASE_PATH}schedio_3.html`,
    `${BASE_PATH}manifest.json`,
    `${BASE_PATH}assets/icons/icon-192.png`,
    `${BASE_PATH}assets/icons/icon-512.png`,
    'https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;600;700&display=swap',
    'https://unpkg.com/react@18/umd/react.production.min.js',
    'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
    'https://unpkg.com/@babel/standalone/babel.min.js',
    'https://cdn.tailwindcss.com'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
            .catch((error) => {
                console.log('Cache failed:', error);
            })
    );
    // Force the waiting service worker to become the active service worker
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    // Take control of all pages immediately
    return self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                // Clone the request
                const fetchRequest = event.request.clone();

                return fetch(fetchRequest).then((response) => {
                    // Check if valid response
                    if (!response || response.status !== 200) {
                        return response;
                    }

                    // Clone the response
                    const responseToCache = response.clone();

                    // Cache successful responses (except for external resources)
                    if (response.type === 'basic' || response.type === 'cors') {
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });
                    }

                    return response;
                }).catch((error) => {
                    console.log('Fetch failed:', error);
                    
                    // If both cache and network fail, try to return cached HTML as fallback
                    if (event.request.destination === 'document') {
                        return caches.match(`${BASE_PATH}schedio_3.html`)
                            .then(cachedResponse => {
                                if (cachedResponse) {
                                    return cachedResponse;
                                }
                                return new Response(
                                    `<!DOCTYPE html>
                                    <html lang="pt-BR">
                                    <head>
                                        <meta charset="UTF-8">
                                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                        <title>Schedio - Offline</title>
                                        <style>
                                            body {
                                                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                                                display: flex;
                                                align-items: center;
                                                justify-content: center;
                                                min-height: 100vh;
                                                margin: 0;
                                                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                                                color: white;
                                                text-align: center;
                                                padding: 20px;
                                            }
                                            .offline-container {
                                                max-width: 400px;
                                            }
                                            h1 { font-size: 3rem; margin: 0; }
                                            p { font-size: 1.2rem; margin: 20px 0; opacity: 0.9; }
                                            button {
                                                background: white;
                                                color: #667eea;
                                                border: none;
                                                padding: 12px 30px;
                                                font-size: 1rem;
                                                font-weight: 600;
                                                border-radius: 25px;
                                                cursor: pointer;
                                                margin-top: 20px;
                                            }
                                            button:hover { transform: scale(1.05); }
                                        </style>
                                    </head>
                                    <body>
                                        <div class="offline-container">
                                            <h1>📴</h1>
                                            <h2>You're Offline</h2>
                                            <p>Please check your internet connection and try again.</p>
                                            <button onclick="window.location.reload()">Try Again</button>
                                        </div>
                                    </body>
                                    </html>`,
                                    {
                                        status: 200,
                                        statusText: 'OK',
                                        headers: new Headers({
                                            'Content-Type': 'text/html'
                                        })
                                    }
                                );
                            });
                    }
                    
                    // For other resources, return a simple error
                    return new Response('Resource unavailable offline', {
                        status: 503,
                        statusText: 'Service Unavailable',
                        headers: new Headers({
                            'Content-Type': 'text/plain'
                        })
                    });
                });
            })
    );
});

// Handle background sync (optional)
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-events') {
        event.waitUntil(syncEvents());
    }
});

function syncEvents() {
    // Placeholder for syncing events when back online
    return Promise.resolve();
}

// Handle push notifications (optional)
self.addEventListener('push', (event) => {
    const options = {
        body: event.data ? event.data.text() : 'New notification',
        icon: 'assets/icons/icon-192.png',
        badge: 'assets/icons/icon-192.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };

    event.waitUntil(
        self.registration.showNotification('Schedio', options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(`${BASE_PATH}schedio_3.html`)
    );
});

// Add message handler for manual cache refresh
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

