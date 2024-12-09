import { createFileRoute } from "@tanstack/react-router";
import SignUpForm from "@/components/sign-up-form";
import { is_authenticated } from "@/services/user";
import { redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/sign-up")({
  component: SignUpForm,
  beforeLoad: async () => {
    if (is_authenticated()) {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
});
