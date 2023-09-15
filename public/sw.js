console.log("Registered");

//CHACHE ALL FILES
let cacheData = "appv1";
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cacheres) => {
      cacheres.addAll([
        "/favicon.ico",
        "/index.html",
        "/images/",
        "/images/1.png",
      ]);
    })
  );
});

importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
);
workbox.setConfig({ debug: false });
workbox.precaching.precacheAndRoute([]);

workbox.routing.registerRoute(
  /\.(?:png|jpg|jpeg|svg|gif)$/, //What image file types do you care about caching
  new workbox.strategies.CacheFirst({
    cacheName: "image-cache",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 20,
        maxAgeSeconds: 7 * 24 * 60 * 60,
      }),
    ],
  })
);
// //FETCH ALL IN OFFLINE MODE
// this.addEventListener('fetch', (event) => {

//     if (!navigator.onLine) {

//         //PUSH NOTIFICATION WHEN URL IS BELOW MENTIONED ONE
//         if (event.request.url === 'http://localhost:3000/manifest.json') {
//             event.waitUntil(
//                 this.registration.showNotification("You Are Offline", {
//                     body: "Make sure that you internet connection is stable to get the latest updates and feature. Thankyou!"
//                 })
//             )
//         }

//         event.respondWith(
//             caches.match(event.request).then((response) => {
//                 if (response) {
//                     return response
//                 }
//                 let requestUrl = event.request.clone()
//                 fetch(requestUrl).then((res) => {
//                     console.log(res)
//                 }).catch((err) => {
//                     console.log(err)
//                 })

//             })
//         )
//     }
// })
