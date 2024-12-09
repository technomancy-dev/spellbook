import { createFileRoute } from "@tanstack/react-router";
import { is_admin, users_query_options } from "@/services/user";
import { redirect } from "@tanstack/react-router";
import UsersPage from "@/features/admin-users/users-page";
import { query_client } from "@/stores/query";

export const Route = createFileRoute("/dashboard/users/")({
  component: UsersPage,
  loader: () => query_client.ensureQueryData(users_query_options),
  beforeLoad: async () => {
    if (!is_admin()) {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
});
