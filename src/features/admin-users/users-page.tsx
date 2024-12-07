import { useSuspenseQuery } from "@tanstack/react-query";
import { users_query_options } from "@/services/user";
import DashboardLayout from "@/layouts/dashboard/dashboard-layout";
import UsersTable from "@/features/admin-users/users-table";

const UsersPage = () => {
  const { data: users } = useSuspenseQuery(users_query_options);

  return (
    <DashboardLayout>
      <div class="overflow-x-auto my-12 max-w-5xl w-full mx-auto">
        <UsersTable users={users} />
      </div>
    </DashboardLayout>
  );
};

export default UsersPage;
