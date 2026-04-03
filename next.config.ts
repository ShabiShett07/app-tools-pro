import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/app/warehouse_simulation',
        destination: '/app/warehouse_simulation/index.html',
        permanent: false,
      },
    ]
  },
};

export default nextConfig;
