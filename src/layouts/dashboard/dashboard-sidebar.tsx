import { Link } from "@tanstack/react-router";
import { useIsAdmin } from "@/hooks/user";

const DashboardSideBar = () => {
  const isAdmin = useIsAdmin();
  return (
    <div class="drawer-side z-50 xl:border-r border-dashed border-base-300 h-full">
      <label
        htmlFor="drawer"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <div class="flex flex-col bg-base-100 justify-between h-full">
        <ul class="menu menu-lg lg:menu-md gap-2 w-80 grow bg-base-100 rounded-box">
          <li>
            <Link activeOptions={{ exact: true }} to="/dashboard">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Home
              {/* <span class="badge badge-sm">99+</span> */}
            </Link>
          </li>
          <li>
            <Link activeOptions={{ exact: true }} to="/dashboard/settings">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Settings
            </Link>
          </li>
        </ul>
        <div>
          <p class="ml-4 font-bold">Admin Options</p>
          <ul class="menu menu-lg lg:menu-md gap-2 w-80 bg-base-100 rounded-box">
            {isAdmin && (
              <li>
                <Link to="/dashboard/users">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Users
                  <span class="badge badge-sm badge-warning">ADMIN</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardSideBar;
