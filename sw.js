// sw.js - Simple Service Worker for KJV Harmony Companion PWA
const CACHE_NAME = 'kjv-companion-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/data/bibleData.js',
  '/manifest.json'
  // GitHub Pages will automatically cache other HTML files, images, PDFs, MP3s on first visit
];

self.addEventListener('install', event => {
  console.log('✅ Installing KJV Companion Service Worker...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Return cached version or fetch from network
      return response || fetch(event.request);
    })
  );
});

console.log('✅ KJV Harmony Companion Service Worker ready');