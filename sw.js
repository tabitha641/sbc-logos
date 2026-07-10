// SBC service worker — RETIRED 2026-07-10. It caused a recurring stale-page bug,
// and a static site does not need it. This version unregisters itself and wipes
// every cache so the site behaves like a normal webpage (a plain refresh works).
self.addEventListener('install', function(){ self.skipWaiting(); });
self.addEventListener('activate', function(event){
  event.waitUntil((async function(){
    try {
      var keys = await caches.keys();
      await Promise.all(keys.map(function(k){ return caches.delete(k); }));
      await self.registration.unregister();
      var clients = await self.clients.matchAll({ type: 'window' });
      clients.forEach(function(c){ c.navigate(c.url); });
    } catch (e) {}
  })());
});
