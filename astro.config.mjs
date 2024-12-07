import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import class_to_class_name from "./class-to-classname";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [tailwind(), react(), class_to_class_name()],
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
