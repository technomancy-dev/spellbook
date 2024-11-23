import { useStore } from "@nanostores/react";
import { $user, github_login } from "../stores/user";
import { Github } from "lucide-react";

const CallToAciton = () => {
  const user = useStore($user);
  return (
    <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div class="form-control">
        {user ? (
          <a href="/dashboard" class="btn btn-primary">
            Go to Dashboard
          </a>
        ) : (
          <button onClick={github_login} class="btn btn-primary">
            <Github />
            Login with Github
          </button>
        )}
      </div>
    </div>
  );
};

export default CallToAciton;
