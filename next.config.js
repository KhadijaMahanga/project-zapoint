const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
  });
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withBundleAnalyzer(
    withPWA({
        pwa: {
            dest: 'public',
            disable: process.env.NODE_ENV === 'development',
            runtimeCaching,
        },
    })
);