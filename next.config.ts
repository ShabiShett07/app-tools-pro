import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/app/warehouse_simulation',
        destination: '/app/warehouse_simulation/index.html',
        permanent: false,
      },
      {
        source: '/apps/smart_picking',
        destination: '/apps/smart_picking/index.html',
        permanent: false,
      },
    ]
  },
};

export default nextConfig;
