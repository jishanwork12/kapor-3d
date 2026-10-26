const C='kapor-v12';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./index.html','./manifest.json','./icon-192.png'])));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim();});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);
  e.respondWith(fetch(e.request).then(r=>{if(r.ok&&(u.origin===location.origin||/cdnjs|gstatic|googleapis/.test(u.host))){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));}return r;}).catch(()=>caches.match(e.request)));});
