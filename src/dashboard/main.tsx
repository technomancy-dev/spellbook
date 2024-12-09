import { RouterProvider, createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen.ts";
import { Loader, LoaderCircle, LoaderPinwheel } from "lucide-react";

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
// Create a new router instance
// @ts-ignore
export const router = createRouter({
  routeTree,
  defaultPendingComponent: () => <div class="flex flex-1 h-full justify-center items-center animate-spin"><LoaderCircle size={52} /></div>,
});

// Usually here we would render to the DOM, but since Astro will handle
// this for us we are okay to just return the component
export const Dashboard = () => {
  return <RouterProvider router={router} />;
};
