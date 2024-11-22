import { Github, Sparkles } from "lucide-react";
import pb from "../pocketbase";
import { useStore } from "@nanostores/react";
import { $user } from "../stores/user";

const Navigation = () => {
  const user = useStore($user)
  console.log({ user });
  return (
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <a class="font-black flex items-center gap-2 text-xl"><Sparkles />spellbook</a>
      </div>
      <div class="flex-none">
        {user ? (
          <div class="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              class="btn btn-ghost btn-circle avatar"
            >
              <div class="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a class="justify-between">
                  Profile
                  <span class="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <button onClick={() => pb.authStore.clear()}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <button class="btn btn-primary">
            <Github />
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navigation;
