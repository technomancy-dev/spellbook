import { createFileRoute } from "@tanstack/react-router";
import { is_authenticated } from "@/services/user";
import { redirect } from "@tanstack/react-router";
import DashboardLayout from "@/layouts/dashboard/dashboard-layout";
import HomePage from "@/features/home/home-page";

export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
  beforeLoad: () => {
    if (!is_authenticated()) {
      throw redirect({
        to: "/dashboard/sign-in",
      });
    }
  },
});

function RouteComponent() {
  return (
    <DashboardLayout>
      <HomePage />
    </DashboardLayout>
  );
}
