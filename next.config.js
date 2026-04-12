// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["images.unsplash.com", "images.pexels.com", "res.cloudinary.com"]
//   }
// };

// module.exports = nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "images.pexels.com", "res.cloudinary.com"]
  },
  async rewrites() {
    return [
      {
        source: '/backend/:path*',
        destination: 'https://valleyrunproject-production.up.railway.app/:path*',
      },
    ]
  }
};

module.exports = nextConfig;