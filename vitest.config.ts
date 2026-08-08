import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "cloudflare:workers": fileURLToPath(new URL("./tests/mocks/cloudflare-workers.ts", import.meta.url)),
    },
  },
  test: {
    clearMocks: true,
    environment: "jsdom",
    environmentOptions: {
      jsdom: {
        pretendToBeVisual: true,
      },
    },
    include: ["tests/**/*.{test,spec}.{ts,tsx}"],
    setupFiles: ["./tests/setup.ts"],
    unstubGlobals: true,
  },
});
