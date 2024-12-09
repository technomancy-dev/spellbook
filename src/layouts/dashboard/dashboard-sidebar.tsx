import { Link } from "@tanstack/react-router";
import { useIsAdmin } from "@/hooks/user";
import { Cog, Home, Users } from "lucide-react";

const DashboardSideBar = () => {
  const isAdmin = useIsAdmin();
  return (
    <div class="drawer-side z-50 lg:border-r border-dashed border-base-300 h-full">
      <label
        htmlFor="drawer"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <div class="flex flex-col bg-base-100 justify-between h-full">
        <ul class="menu menu-lg lg:menu-md gap-2 w-80 grow bg-base-100 rounded-box">
          <li>
            <Link activeOptions={{ exact: true }} to="/dashboard">
              <Home size={16} />
              Home
            </Link>
          </li>
          <li>
            <Link activeOptions={{ exact: true }} to="/dashboard/settings">
              <Cog size={16} />
              Settings
            </Link>
          </li>
        </ul>
        {isAdmin && (
          <div>
            <p class="ml-4 font-bold">Admin Options</p>
            <ul class="menu menu-lg lg:menu-md gap-2 w-80 bg-base-100 rounded-box">
              <li>
                <Link to="/dashboard/users">
                  <Users size={16} />
                  Users
                  <span class="badge badge-sm badge-warning">ADMIN</span>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardSideBar;
