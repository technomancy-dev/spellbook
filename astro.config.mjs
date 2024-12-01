import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [tailwind(), react()],
  vite: {
    alias: {
      "@": "/src",
    },
    plugins: [
      TanStackRouterVite({
        routesDirectory: "./src/dashboard/routes",
        generatedRouteTree: "./src/dashboard/routeTree.gen.ts",
        routeFileIgnorePrefix: "-",
        quoteStyle: "double",
      }),
    ],
  },
});
