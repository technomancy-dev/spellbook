/**
 * Helper for client-side navigation within dashboard routes.
 * Uses history.pushState directly because this needs to work outside
 * of TanStack Router's context (in Astro layouts) while still triggering
 * client-side navigation when in the dashboard.

 * I was trying to use the TanStack router.navigate, but the router seemed out of sync causing
 * failed navigations, likely an Astro + TanStack conflict.
 */
export const astro_navigate = (path: string) => {
  window.history.pushState({}, '', path);
};
