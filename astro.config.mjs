import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import aws from "astro-sst";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import class_to_class_name from "./class-to-classname";
// import node from "@astrojs/node";

export default defineConfig({
  output: "server",
  // Used for local testing of builds.
  // adapter: node({
  //   mode: "standalone",
  // }),
  adapter: aws({
    serverRoutes: [
      "api/*"     // Directory of API endpoints which require all HTTP methods (weird AWS thing)
    ]
  }),
  integrations: [tailwind(), react(), class_to_class_name()],
  vite: {
    alias: {
      "@": "/src",
    },
    plugins: [
      TanStackRouterVite({
        routesDirectory: "./src/pages-dashboard/routes",
        generatedRouteTree: "./src/pages-dashboard/routeTree.gen.ts",
        routeFileIgnorePrefix: "-",
        quoteStyle: "double",
      }),
    ],
  },
});
