import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  vite: {
    plugins: [TanStackRouterVite({
      routesDirectory: "./src/dashboard/routes",
      generatedRouteTree: "./src/dashboard/routeTree.gen.ts",
      routeFileIgnorePrefix: "-",
      quoteStyle: "double",
    })]
  }
});
