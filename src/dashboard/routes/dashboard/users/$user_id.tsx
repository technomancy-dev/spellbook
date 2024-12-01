import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";

import DashboardLayout from "@/components/DashboardLayout";
import { Link } from "@tanstack/react-router";
import pb from "@/pocketbase";
import { useQuery } from "@tanstack/react-query";
import { is_admin } from "@/services/user";
import { redirect } from "@tanstack/react-router";

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
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => pb.collection("users").getOne(user_id),
  });

  return (
    <DashboardLayout>
      <div class="px-6">
        <div class="breadcrumbs text-sm">
          <ul>
            <li>
              <Link to="/dashboard">Home</Link>
            </li>
            <li>
              <Link to="/dashboard/users">Users</Link>
            </li>
            <li>{user?.username}</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}
