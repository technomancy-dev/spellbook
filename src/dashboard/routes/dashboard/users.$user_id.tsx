import * as React from "react"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard/users/$user_id")({
  component: RouteComponent,
})

function RouteComponent() {
  const { user_id } = Route.useParams()
  console.log(user_id)
  return "Hello /dashboard/users/$user_id!"
}
