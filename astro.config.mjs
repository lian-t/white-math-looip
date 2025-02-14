// @ts-check
import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
      configPath: "wrangler.json",
      experimentalJsonConfig: true,
      persist: {
        path: "./.cache/wrangler/v3",
      },
    },
  }),
  integrations: [react(), tailwind({ applyBaseStyles: true })],
  output: "server",
  vite: {
    resolve: {
      // Use react-dom/server.edge instead of react-dom/server.browser for React 19.
      // Without this, MessageChannel from node:worker_threads needs to be polyfilled.
      alias: import.meta.env.PROD && {
        "react-dom/server": "react-dom/server.edge",
      },
    },
    optimizeDeps: {
      include: ['i18next', 'i18next-http-backend', 'i18next-browser-languagedetector']
    }
  },
  i18n: {
    defaultLocale: "en",
    locales: ["zh", "en"],
  }
});
