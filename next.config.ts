import type { NextConfig } from "next";

const isCloudflareScript = process.env.npm_lifecycle_event?.endsWith(":cloudflare");

const nextConfig: NextConfig = {
  // Native Next runtimes do not expose Cloudflare's virtual workers module.
  // Cloudflare npm scripts use Vite and continue to resolve the real module.
  turbopack: isCloudflareScript
    ? undefined
    : {
        resolveAlias: {
          "cloudflare:workers": "./platform/cloudflare-workers.next.ts",
        },
      },
};

export default nextConfig;
