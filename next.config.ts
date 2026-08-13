import type { NextConfig } from 'next';

// Define the base Next.js configuration
const baseConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.slingacademy.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'github.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: ''
      }
    ]
  },
  transpilePackages: ['geist']
};

const configWithPlugins = baseConfig;


const nextConfig = configWithPlugins;
export default nextConfig;
