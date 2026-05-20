import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "Content-Security-Policy",
          value: [
            "worker-src 'self' blob:",
            "connect-src 'self' https://api.kaizenai.dev wss://api.kaizenai.dev ws://localhost:3001",
          ].join("; "),
        },
      ],
    },
  ],
};

export default nextConfig;
