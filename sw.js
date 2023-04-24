// Navn på App Shell Cache til assets filter
const staticCacheName = "site-static-v1";

// Navn på dynamisk cache
const dynamicCacheName = "site-dynamic-v2";

const assets = [
  "/",
  "./fallback.html",
  "./index.html",
  "./js/App.js",
  "./js/ui.js",
  "./js/firestore.config.js",
  "./js/materialize.min.js",
  "./css/styles.css",
  "./css/materialize.min.css",
  "./img/dish.png",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
];

const limitCacheSize = (cacheName, numAllowedFiles) => {
  caches.open(cacheName).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.lengthe > numAllowedFiles) {
        cache.delete(keys[0]).then(limitCacheSize(cacheName, numAllowedFiles));
      }
    });
  });
};

// Install Service Worker
self.addEventListener("install", (event) => {
  // console.log('Service Worker has been installed');
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      // console.log('caching all assets');
      cache.addAll(assets);
    })
  );
});
//Activate Service Worker
self.addEventListener("activate", (event) => {
  // console.log('Service Worker has been activated');

  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
  return;
});

// Fetch event
self.addEventListener("fetch", (event) => {
  // limitCacheSize(dynamicCacheName, 2)

  // Fix af problem med dynamisk cache og chrome-extension bug
  if (!(event.request.url.indexOf("http") === 0)) return;

  

  // Kontroller svar på request
  event.respondWith(
    /* Håndtering af cache match og dynamisk cache */

    // Kig efter file match i cache
    caches
      .match(event.request)
      .then((cacheRes) => {
        return (
          cacheRes ||
          fetch(event.request).then((fetchRes) => {
            // Åbn dynamisk cache
            return caches.open(dynamicCacheName).then((cache) => {
              // Tilføj side til dynamisk cache
              cache.put(event.request.url, fetchRes.clone());

              limitCacheSize(dynamicCacheName, 1);
              // Returner request
              return fetchRes;
            });
          })
        );

        // Returner hvis match fra cache - ellers hent fil på server
      })
      .catch(() => {
     	if(event.request.url.indexOf('.html') > -1) { return
  	caches.match('fallback.html')
   }
      })
  );
});
