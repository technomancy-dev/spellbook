import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { query_client } from "@/stores/query";
import { Toaster } from "react-hot-toast";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <QueryClientProvider client={query_client}>
        <Outlet />
        <Toaster />
      </QueryClientProvider>
    </React.Fragment>
  );
}
