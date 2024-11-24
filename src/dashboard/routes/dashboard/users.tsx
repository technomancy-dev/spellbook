import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { is_admin, is_authenticated } from "../../../stores/user";
import pb from "../../../pocketbase";
import { useQuery } from "@tanstack/react-query";
import { delete_user } from "../../../services/user";
import { redirect } from "@tanstack/react-router";
import DashboardLayout from "../../../components/DashboardLayout";

export const Route = createFileRoute("/dashboard/users")({
  component: RouteComponent,
  beforeLoad: async () => {
    if (!is_authenticated() || (await is_admin()) === false) {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
});

function RouteComponent() {
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () => pb.collection("users").getFullList(),
  });


  return (
    <DashboardLayout>
      <div class="overflow-x-auto max-w-5xl w-full mx-auto">
        <table class="table">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" class="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Created At</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user.id}>
                <th>
                  <label>
                    <input type="checkbox" class="checkbox" />
                  </label>
                </th>
                <td>
                  <div class="flex items-center gap-3">
                    <div class="avatar">
                      <div class="mask mask-squircle h-12 w-12">
                        <img
                          src={pb.files.getUrl(user, user.avatar)}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div class="font-bold">{user.username}</div>
                      {/* <div class="text-sm opacity-50">United States</div> */}
                    </div>
                  </div>
                </td>
                <td>{new Date(user.created).toLocaleDateString()}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    onClick={() => delete_user(user.id)}
                    class="btn btn-error btn-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Created at</th>
              <th>Role</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </DashboardLayout>
  );
}
