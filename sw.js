// sw.js - Service Worker for KJV Harmony Companion PWA
const CACHE_NAME = 'kjv-companion-v2';
const BASE = '/kjv-companion';
const urlsToCache = [
  BASE + '/',
  BASE + '/index.html',
  BASE + '/data/bibleData.js',
  BASE + '/manifest.json',
  BASE + '/icons/icon-192.svg',
  BASE + '/icons/icon-512.svg'
];

self.addEventListener('install', event => {
  console.log('✅ Installing KJV Companion Service Worker...');
  // skipWaiting activates the new SW immediately; safe for this single-user PWA
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  console.log('✅ Activating KJV Companion Service Worker...');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
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