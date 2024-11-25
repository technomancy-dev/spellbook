import { Github } from "lucide-react";
import { github_login, password_sign_in } from "../stores/user";
import { useForm } from "@tanstack/react-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { create_user } from "../services/user";
import { redirect, useNavigate } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

const sign_in_schema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Must be at least 8 characters" }),
    confirm: z.string().min(8, { message: "Must be at least 8 characters" }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"], // path of error
  });
function FieldInfo({ field }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em class="text-xs">{field.state.meta.errors.join(",")}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}

const SignUpForm = () => {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirm: "",
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: sign_in_schema,
    },
    onSubmit: ({ value }) => {
      const data = {
        email: value.email,
        password: value.password,
        passwordConfirm: value.confirm,
      };
      const promise = create_user(data).then((response) => {
        const sign_in_promise = password_sign_in(
          value.email,
          value.password,
        ).then(() => {
          navigate({ to: "/dashboard" });
        });

        toast.promise(promise, {
          loading: "Signing in",
          success: "Successfully signed in",
          error: (err) => `${err.toString()}`,
        });
      });
      toast.promise(promise, {
        loading: "Creating account",
        success: "Successfully created account",
        error: (err) => `${err.toString()}`,
      });
    },
  });

  return (
    <div class="max-w-xl flex flex-col gap-4 mx-auto w-full h-full items-center justify-center">
      <p class="text-3xl text-center font-black">Sign up for an account</p>
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
              <FieldInfo field={field} />
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
              <FieldInfo field={field} />
            </label>
          )}
        />
        <form.Field
          name="confirm"
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
              <FieldInfo field={field} />
            </label>
          )}
        />
        <div class="flex gap-2 justify-between">
          <form.Subscribe
            selector={(state) => [
              state.canSubmit,
              state.isSubmitting,
              state.isTouched,
            ]}
            children={([canSubmit, isSubmitting, isTouched]) => (
              <button
                disabled={!canSubmit || !isTouched}
                type="submit"
                class="btn btn-primary grow"
              >
                {isSubmitting ? "..." : "Sign In"}
              </button>
            )}
          />
        </div>
      </form>
      <button
        onClick={() =>
          github_login().then(() => {
            toast.success("Successfully signed in");
            navigate({ to: "/dashboard" });
          })
        }
        class="btn btn-outline w-full"
      >
        <Github />
        Sign Up with Github
      </button>
      <div>
        <p class="text-xs -mb-2">Already have an account?</p>
        <Link to="/dashboard/sign-in" class="btn btn-link w-full">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default SignUpForm;
