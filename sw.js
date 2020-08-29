//importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');

self.addEventListener('install', event => {
    self.skipWaiting();   
});

self.addEventListener('activate', event => {
    console.log('self.skipWaiting() called');
    event.waitUntil(clients.claim());
    console.log('clients.claim() called');
});

if (workbox) {
    console.log('Workbox is loaded..');
    workbox.precaching.precacheAndRoute([
  {
    "url": "styles/main.css",
    "revision": "f506d50a98819fe5dfb496b7d93a4a8c"
  },
  {
    "url": "index.html",
    "revision": "37f836d0794f76c9de2df859bf7ebb78"
  },
  {
    "url": "scripts/main.min.js",
    "revision": "cd1263e40c0fe2a691497b71000ceb10"
  },
  {
    "url": "images/touch/apple-touch-icon.png",
    "revision": "7326f54bfe6776293f08b34c3a5fde7b"
  },
  {
    "url": "images/touch/chrome-touch-icon-192x192.png",
    "revision": "571f134f59f14a6d298ddd66c015b293"
  },
  {
    "url": "images/touch/icon-128x128.png",
    "revision": "7c46d686765c49b813ac5eb34fabf712"
  },
  {
    "url": "images/touch/ms-touch-icon-144x144-precomposed.png",
    "revision": "452d90b250d6f41a0c8f9db729113ffd"
  },
  {
    "url": "images/about-hero-image.jpg",
    "revision": "0a3dd32848cc5474474010fdb1eb72f8"
  },
  {
    "url": "images/header-bg.jpg",
    "revision": "a2a7a6887fb2bce49eeb0555b20afe08"
  },
  {
    "url": "images/footer-background.png",
    "revision": "8baa656efb23ae4e9274a6deb88a2de2"
  },
  {
    "url": "images/logo.png",
    "revision": "a15c18e7f4630b51d201c4b289ba5585"
  },
  {
    "url": "images/delete.svg",
    "revision": "2d2f28110afa1a993d02e159fe99a24e"
  },
  {
    "url": "images/hamburger.svg",
    "revision": "d2cb0dda3e8313b990e8dcf5e25d2d0f"
  }
]);
    const relEndpoint = document.getElementsByTag('Base')[0].href;
    workbox.routing.registerRoute(        
        ({url}) => url.pathname.startsWith(relEndpoint + '/images/products/'),
        workbox.strategies.cacheFirst({
            cacheName: 'products-cache',
            plugin: [
                new workbox.expiration.Plugin({
                    maxEntries: 50,
                    naxAgeSeconds: 30*24*60*60  //30 days
                })
            ]
        })
    );
    workbox.routing.registerRoute(
        new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'fonts-cache',
            plugin: [
                new workbox.expiration.Plugin({
                    maxEntries: 50,
                    naxAgeSeconds: 21*24*60*60  //21 days
                })
            ]
        })
    );
    workbox.routing.registerRoute(
        new RegExp('https://code.getmdl.io/(.*)'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'mdl-cache',
            plugin: [
                new workbox.expiration.Plugin({
                    maxEntries: 50,
                    naxAgeSeconds: 23*24*60*60  //23 days
                })
            ]
        })
    );
}
else {
    console.log('Workbox failed to load!');
}
