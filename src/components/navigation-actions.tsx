import { useStore } from "@nanostores/react";
import { $user } from "@/stores/user";
import { sign_out } from "@/services/user";

import { dual_navigate } from "@/helpers/navigation";
import Avatar from "./Avatar";

const NavigationActions = () => {
  const user = useStore($user);

  return user ? (
    <div class="dropdown dropdown-end">
      <div tabIndex={0} role="button" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <Avatar user={user} />
        </div>
      </div>

      <ul
        tabIndex={0}
        class="menu z-50 menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
      >
        <li>
          <button
            onClick={(e) => {
              // @ts-ignore this has a blur event typescript omg.
              e.target.blur();
              dual_navigate("/dashboard");
            }}
            class="justify-between"
          >
            Dashboard <span class="badge">New</span>
          </button>
        </li>

        <li>
          <button onClick={() => sign_out(() => (window.location.href = "/"))}>
            Sign out
          </button>
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
