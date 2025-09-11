import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["image.tmdb.org", "placehold.co"], // add any external domains you use
  },
};

export default nextConfig;
