const CACHE_NAME = 'camera-app-cache-v6'; // Ubah nomor versinya (misal jadi v6)
const urlsToCache = [
  './',               // Tambahkan titik di sini
  './index.html',     // Tambahkan titik di sini
  './manifest.json'   // Tambahkan titik di sini
];

// ... (sisa kode sw.js di bawahnya tetap sama persis seperti sebelumnya) ...

self.addEventListener('install', event => {
  // Langsung paksa SW baru aktif tanpa menunggu tab ditutup
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  // Ambil kendali atas halaman web segera
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return file dari cache jika ada, jika tidak ambil dari internet
        return response || fetch(event.request);
      })
  );
});
