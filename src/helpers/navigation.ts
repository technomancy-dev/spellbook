import { router } from "@/dashboard/main";
import { navigate } from "astro:transitions/client";

/**

 * Helper for client-side navigation within dashboard routes.

 * I was trying to use the TanStack router.navigate, but the router seemed out of sync causing
 * failed navigations, likely an Astro + TanStack conflict.

 * Smart navigation helper that handles both tanstack dashboard routes
 * and Astro routes appropriately.

**/

export const dual_navigate = (path: string) => {
  const should_ts_navigate = window.location.pathname.startsWith("/dashboard");

  if (should_ts_navigate) {
    router.navigate({ to: path });
  } else {
    navigate(path);
    window.history.pushState({}, '', path); // This is needed to trigger tanstack.
  }
};
