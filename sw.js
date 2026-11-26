const CACHE_NAME = 'routines-cache-v1';
const urlsToCache = [
  './index.html',
  './manifest.json',
  './logo.png'
];

// Saat aplikasi diinstal, simpan file ke cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Ambil file dari cache saat offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Jika ada di cache, ambil dari cache. Jika tidak, ambil dari internet.
        return response || fetch(event.request);
      })
  );
});
