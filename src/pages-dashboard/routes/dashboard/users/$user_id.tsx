import { createFileRoute } from "@tanstack/react-router";
import { is_admin } from "@/services/user";
import { redirect } from "@tanstack/react-router";
import UserPage from "@/features/dashboard-pages-admin-users/user-page";

export const Route = createFileRoute("/dashboard/users/$user_id")({
  component: RouteComponent,
  beforeLoad: () => {
    if (!is_admin()) {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
});

function RouteComponent() {
  const { user_id } = Route.useParams();
  return <UserPage userId={user_id} />;
}
