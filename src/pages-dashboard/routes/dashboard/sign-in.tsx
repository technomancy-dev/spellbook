import * as React from "react"
import { createFileRoute } from "@tanstack/react-router"
import SignInForm from "@/components/sign-in-form"
import { is_authenticated } from "@/services/user";
import { redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/sign-in")({
  component: RouteComponent,
  beforeLoad: async () => {
    if (is_authenticated()) {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
})

function RouteComponent() {
  return <SignInForm/>
}
