/** @type {import('next').NextConfig} */
const nextConfig = {
     images: {
    domains: ['firebasestorage.googleapis.com'], // 👈 add this
  },
};

export default nextConfig;
