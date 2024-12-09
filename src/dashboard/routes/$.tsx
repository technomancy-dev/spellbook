import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/$")({
  component: () => null,
  beforeLoad: ({ location }) => {
    if (location.pathname.startsWith('/dashboard')) {
      throw new Error('Not Found')  // Let TanStack's 404 handle it
    }
  },
})
