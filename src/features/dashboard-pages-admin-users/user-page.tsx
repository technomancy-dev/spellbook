import DashboardLayout from "@/layouts/dashboard/dashboard-layout";
import { Link } from "@tanstack/react-router";
import { pb } from "@/pb-instance";
import { useQuery } from "@tanstack/react-query";

const UserPage = ({ userId }) => {
  const { data: user } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => pb.collection("users").getOne(userId),
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
};

export default UserPage
