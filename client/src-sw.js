const { precacheAndRoute } = require("workbox-precaching/precacheAndRoute");
const { registerRoute } = require("workbox-routing");
const { CacheableResponsePlugin } = require("workbox-cacheable-response");
const { ExpirationPlugin } = require("workbox-expiration");
const { StaleWhileRevalidate, CacheFirst } = require("workbox-strategies");
const { offlineFallback, warmStrategyCache } = require("workbox-recipes");

// Precache and route your assets based on the provided manifest
precacheAndRoute(self.__WB_MANIFEST);

// Create a cache for HTML pages using the CacheFirst strategy
// It will attempt to serve content from the cache, otherwise fetch it from the network.
const pageCache = new CacheFirst({
  cacheName: "page-cache", // Name for the cache
  plugins: [
    // CacheableResponsePlugin ensures we cache valid responses (status codes 0 and 200)
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    // ExpirationPlugin sets a maximum age for items in the cache (30 days)
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days in seconds
    }),
  ],
});

//
warmStrategyCache({
  urls: ["/index.html", "/"],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === "navigate", pageCache);

// Register route for Cache CSS and JS files using the StaleWhileRevalidate strategy.
registerRoute(
  ({ request }) => {
    return (
      // CSS
      request.destination === "style" ||
      // JavaScript
      request.destination === "script"
    );
  },
  new StaleWhileRevalidate({
    cacheName: "static-resources", // Name for the cache
    plugins: [
      // CacheableResponsePlugin ensures we cache valid responses (status codes 0 and 200)
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// Register route for caching images using the CacheFirst strategy.
registerRoute(
  ({ request }) => request.destination === "image",
  new CacheFirst({
    cacheName: "image-cache", // Name for the cache
    plugins: [
      // CacheableResponsePlugin ensures we cache valid responses (status codes 0 and 200)
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      // ExpirationPlugin sets a maximum number of entries and maximum age for items in the cache (60 entries and 30 days)
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days in seconds
      }),
    ],
  })
);
