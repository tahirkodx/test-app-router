/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  // output: "export",
  images: { unoptimized: true },
  // layouts: {
  //   layoutsDir: "layouts",
  // },
  pageExtensions: ["tsx", "ts", "jsx", "js"],
  publicRuntimeConfig: {
    BASE_URL: process.env.NEXT_PUBLIC_API_KEY || "http://localhost:5000/api",
  },
  images: {
    domains: ["www.evetech.co.za"],
  },
};

module.exports = nextConfig;
