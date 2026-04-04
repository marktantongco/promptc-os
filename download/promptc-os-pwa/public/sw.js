const CACHE_NAME='promptc-os-v2026.6';const S=['./','./index.html'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(S)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(cached=>{const fetched=fetch(e.request).then(res=>{if(res&&res.status===200){caches.open(CACHE_NAME).then(c=>c.put(e.request,res.clone()))}return res}).catch(()=>cached);return cached||fetched}))});
