import { Github } from "lucide-react";
import { useStore } from "@nanostores/react";
import { $user, github_login, logout } from "../stores/user";
import pb from "../pocketbase";

const NavigationActions = () => {
  const user = useStore($user);
  return user ? (
    <div class="dropdown dropdown-end">
      <div tabIndex={0} role="button" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={pb.files.getUrl(user, user.avatar)}
          />
        </div>
      </div>

      <ul
        tabIndex={0}
        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
      >
        <li>
          <a href="/dashboard" class="justify-between">
            Dashboard
            <span class="badge">New</span>
          </a>
        </li>

        <li>
          <button onClick={logout}>Logout</button>
        </li>
      </ul>
    </div>
  ) : (
    <a href="/dashboard/sign-in" class="btn btn-link btn-primary">
      Sign in
    </a>
  );
};

export default NavigationActions;
