/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'travel-journal-api-bootcamp.do.dibimbing.id',
      'images.unsplash.com',
      'localhost',
      'a.cdn-hotels.com',
      'assets.aceternity.com',
    ],
  },
  sassOptions: {
  },
};

export default nextConfig;
