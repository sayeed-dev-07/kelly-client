/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: ['192.168.1.108',
    '192.168.2.100'
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.**.**',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
