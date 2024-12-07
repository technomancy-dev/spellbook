import { Link } from "@tanstack/react-router";
import { Home, Menu } from "lucide-react";

const DashboardBottomNavigation = () => {
  return (
    <div class="btm-nav lg:hidden">
      <div class="bg-base-200 flex items-stretch justify-stretch [&>a]:block [&>a]:h-full border-dashed border-r-2 border-base-300">
        <Link activeOptions={{ exact: true }} to="/dashboard">
          <div class="flex flex-col items-center justify-center w-full h-full">
            <Home />
            <span class="btm-nav-label">Home</span>
          </div>
        </Link>
      </div>
      <label htmlFor="drawer" class="bg-base-200">
        <Menu />
        <span class="btm-nav-label">Menu</span>
      </label>
    </div>
  );
};

export default DashboardBottomNavigation;
