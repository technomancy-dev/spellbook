import { Github } from "lucide-react";
import { github_login, password_sign_in } from "../stores/user";
import { useForm } from "@tanstack/react-form";
import toast from "react-hot-toast";

const SignInForm = () => {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      toast.success("Logged in");
      console.log(value);
    },
  });
  return (
    <div class="max-w-xl flex flex-col gap-4 mx-auto w-full h-full items-center justify-center">
      <p class="text-3xl text-center font-black">Sign in to your account</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        class="max-w-xl flex flex-col gap-4 mx-auto w-full justify-center"
      >
        <form.Field
          name="email"
          children={(field) => (
            <label class="input input-bordered flex items-center gap-2">
              <input
                type="text"
                class="grow"
                placeholder="Email"
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </label>
          )}
        />
        <form.Field
          name="password"
          children={(field) => (
            <label class="input input-bordered flex items-center gap-2">
              <input
                type="password"
                class="grow"
                placeholder="Password"
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </label>
          )}
        />
        <div class="flex gap-2 justify-between">
          {/* <button class="btn grow">Register</button> */}
          <button type="submit" class="btn btn-primary grow">
            Sign In
          </button>
        </div>
      </form>
      <button onClick={github_login} class="btn btn-outline w-full">
        <Github />
        Sign in with Github
      </button>
    </div>
  );
};

export default SignInForm;
