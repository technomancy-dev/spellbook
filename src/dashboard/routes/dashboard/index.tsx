import * as React from "react"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <div class="h-full">"Hello /!"</div>
}
