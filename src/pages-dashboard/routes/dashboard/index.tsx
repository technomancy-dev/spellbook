import { createFileRoute } from "@tanstack/react-router";
import { is_authenticated } from "@/services/user";
import { redirect } from "@tanstack/react-router";
import HomePage from "@/features/dashboard-page-home/home-page";


export const Route = createFileRoute("/dashboard/")({
  component: HomePage,
  beforeLoad: () => {
    if (!is_authenticated()) {
      throw redirect({
        to: "/dashboard/sign-in",
      });
    }
  },
});
