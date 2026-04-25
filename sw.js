const CACHE_NAME = 'kjv-companion-v1';
const CACHE_URLS = [
    './',
    './index.html',
    './manifest.json',
    './preacher-suite.html',
    './harmonizer.html',
    './qa.html',
    './notes.html',
    './settings.html',
    './about.html',
    './annex-index.html',
    './annex-private.html',
    './preaching-assistant.html',
    './first-principles-engine.html',
    './first-principles.html',
    './page-flow.html',
    './context-restorer.html',
    './doctrinal-themes-map.html',
    './audio-library.html',
    './visual-library.html',
    './john3-16-new-birth-eternal.html'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache =>
            cache.addAll(CACHE_URLS).catch(err => console.warn('SW cache install partial failure:', err))
        )
    );
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cached => {
            if (cached) return cached;
            return fetch(event.request).catch(() =>
                new Response('Offline — content not yet cached.', { status: 503, headers: { 'Content-Type': 'text/plain' } })
            );
        })
    );
});
