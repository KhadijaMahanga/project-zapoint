const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
  images: {
    domains: process.env.NEXT_PUBLIC_IMAGE_DOMAINS.split(", "),
  },
  reactStrictMode: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        "@svgr/webpack",
        {
          loader: "svg-url-loader",
          options: {},
        },
      ],
    });
    return config;
  },
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    runtimeCaching,
  },
  async redirects() {
    return [
      {
        source: "/jiko-class",
        destination: "/jiko-class/kozi",
        permanent: true,
      },
    ];
  },
});
