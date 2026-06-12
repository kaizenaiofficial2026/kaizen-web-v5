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
            // Daily (the WebRTC engine Vapi uses) ships a blob-based AudioWorklet.
            "child-src 'self' blob:",
            // Vapi REST + Daily call-machine, signaling, and TURN/STUN endpoints.
            "connect-src 'self' https://api.kaizenai.dev wss://api.kaizenai.dev ws://localhost:3001 https://*.vapi.ai wss://*.vapi.ai https://*.daily.co wss://*.daily.co https://*.pluot.blue wss://*.pluot.blue",
            // Daily streams assistant audio through blob/mediastream sources.
            "media-src 'self' blob: mediastream:",
          ].join("; "),
        },
      ],
    },
  ],
};

export default nextConfig;
