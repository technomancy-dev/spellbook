import * as React from "react";
import { range } from "ramda";
import { createFileRoute, Link } from "@tanstack/react-router";
import { is_admin } from "@/services/user";
import pb from "@/pocketbase";
import { useQuery } from "@tanstack/react-query";
import { delete_user } from "@/services/user";
import { redirect } from "@tanstack/react-router";
import DashboardLayout from "@/components/DashboardLayout";

export const Route = createFileRoute("/dashboard/users/")({
  component: RouteComponent,
  beforeLoad: async () => {
    if (!is_admin()) {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
});

function RouteComponent() {
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => pb.collection("users").getFullList(),
  });

  return (
    <DashboardLayout>
      <div class="overflow-x-auto my-12 max-w-5xl w-full mx-auto">
        {isLoading ? (
          <SkeletonTable />
        ) : (
          <table class="table w-full">
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
                    <Link to={`/dashboard/users/${user.id}`}>
                      <div class="flex items-center gap-3">
                        <div class="avatar">
                          <div class="mask mask-squircle h-12 w-12">
                            <Avatar user={user} />
                          </div>
                        </div>
                        <div>
                          <div class="font-bold">{user.username}</div>
                          {/* <div class="text-sm opacity-50">United States</div> */}
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td>{new Date(user.created).toLocaleDateString()}</td>
                  <td>{user.role}</td>
                  <td>
                    <div class="flex gap-2">
                      <button
                        onClick={() => delete_user(user.id)}
                        class="btn btn-error btn-xs"
                      >
                        Delete
                      </button>
                      <Link to={`/dashboard/users/${user.id}`}>
                        <div class="btn btn-primary btn-xs">Edit</div>
                      </Link>
                    </div>
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
        )}
      </div>
    </DashboardLayout>
  );
}

const SkeletonTable = () => {
  return (
    <table class="table skeleton w-full min-h-80">
      <thead class="">
        <tr>
          <th></th>
          <th>Name</th>
          <th>Created At</th>
          <th>Role</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {range(1, 4)?.map((num) => (
          <tr class="skeleton" key={num}>
            <th></th>
            <td>
              <div class="flex items-center gap-3">
                <div class="avatar">
                  <div class="mask skeleton mask-squircle h-12 w-12"></div>
                </div>
                <div>
                  {/* <div class="font-bold">{user.username}</div> */}
                  <div class="skeleton h-4 w-40"></div>
                  {/* <div class="text-sm opacity-50">United States</div> */}
                </div>
              </div>
            </td>
            <td>
              <div class="skeleton h-4 w-20"></div>
            </td>
            <td>
              <div class="skeleton h-4 w-20"></div>
            </td>
            <td>
              <div class="flex gap-2">
                <button
                  disabled={true}
                  class="btn skeleton rounded btn-error btn-xs"
                >
                  Delete
                </button>

                <button
                  disabled={true}
                  class="btn skeleton rounded btn-primary btn-xs"
                >
                  Edit
                </button>
              </div>
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
  );
};

const Avatar = ({ user }) => {
  const img = pb.files.getUrl(user, user.avatar);

  if (!img)
    return (
      <div class="h-12 capitalize bg-base-200 flex justify-center items-center font-black">
        {user.username.slice(0, 1)}
      </div>
    );
  return <img width={12} src={img} alt="Avatar Tailwind CSS Component" />;
};
