/** @type {import("next").NextConfig} */
module.exports = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        // hostname: "upload.wikimedia.org",
        hostname: "**",
        port: "",
        // pathname: "/assets/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "30mb",
    },
  },
}
