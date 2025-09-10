import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["image.tmdb.org", "via.placeholder.com"], // add any external domains you use
  },
};

export default nextConfig;
