// Version definition
let CACHE_VERSION = "ca-v1";
let DISP_VERSION = "ca-d-v1";

// Directory to be cached (css / js is added individually)
let resources = ["/", "/images"];

// Add cache
self.addEventListener("install", function (event) {
  console.log("ServiceWorker Install");
  event.waitUntil(
    caches.open(CACHE_VERSION).then(function (cache) {
      console.log("cache.addAll");
      cache.addAll(resources);
    })
  );
});
// Shiw cash
self.addEventListener("fetch", function (event) {
  console.log("ServiceWorker fetch");
  event.respondWith(
    // Check if cache exists
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      } else {
        // If there is no cache, put it in the cache
        return fetch(event.request)
          .then(function (res) {
            return caches.open(DISP_VERSION).then(function (cache) {
              console.log("cache.put");
              cache.put(event.request.url, res.clone());
              return res;
            });
          })
          .catch(function () {
            // do nothing
          });
      }
    })
  );
});
// Delete old cache
self.addEventListener("activate", function (event) {
  console.log("activate ServiceWorker");
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(
        keyList.map(function (key) {
          if (key !== CACHE_VERSION && key !== DISP_VERSION) {
            console.log("cache.delete");
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// console.log("Registered");

// //CHACHE ALL FILES
// let cacheData = "appv1";
// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(cacheData).then((cacheres) => {
//       cacheres
//         .addAll(["/favicon.ico", "/index.html"])
//         .then(() => {
//           console.log("Files are cached");
//         })
//         .catch((err) => {
//           console.log("Error while caching files: ", err);
//         });
//     })
//   );
// });

// importScripts(
//   "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
// );
// workbox.setConfig({ debug: false });
// workbox.precaching.precacheAndRoute([]);

// workbox.routing.registerRoute(
//   /\.(?:png|jpg|jpeg|svg|gif)$/, //What image file types do you care about caching
//   new workbox.strategies.CacheFirst({
//     cacheName: "image-cache",
//     plugins: [
//       new workbox.expiration.Plugin({
//         maxEntries: 20,
//         maxAgeSeconds: 7 * 24 * 60 * 60,
//       }),
//     ],
//   })
// );
