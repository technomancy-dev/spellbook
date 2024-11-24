import * as React from "react";
import { useState, useEffect } from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { $user, github_login, is_authenticated } from "../../../stores/user";
import { Github } from "lucide-react";
import DashboardLayout from "../../../components/DashboardLayout";
import pb from "../../../pocketbase";
import { useStore } from "@nanostores/react";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../stores/query";

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

export const Route = createFileRoute("/dashboard/settings")({
  component: RouteComponent,
  beforeLoad: async () => {
    if (!is_authenticated()) {
      throw redirect({
        to: "/dashboard/sign-in",
      });
    }
  },
});

const user_schema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
});

function RouteComponent() {
  // const [linked_github_loading, set_linked_github_loading] = useState(true);
  // const [linked_github, set_linked_github] = useState(false);
  const user = useStore($user);

  const form = useForm({
    defaultValues: {
      username: user.username,
      email: user.email,
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: user_schema,
    },
    onSubmit: ({ value }) => {
      console.log(value);
      const data = {
        username: value.username,
      };
      const promise = pb.collection("users").update(user.id, data);
      if (value.email !== user.email) {
        const email_promise = pb
          .collection("users")
          .requestEmailChange(user.id, value.email);
        toast.promise(email_promise, {
          loading: "Loading",
          success: "Successfully changed email",
          error: (err) => `${err.toString()}`,
        });
      }

      toast.promise(promise, {
        loading: "Loading",
        success: "Successfully updated settings",
        error: (err) => `${err.toString()}`,
      });
    },
  });

  const { data: linked_github, isLoading } = useQuery({
    queryKey: ["linked_github"],
    queryFn: () =>
      pb
        .collection("users")
        .listExternalAuths(pb.authStore.model.id)
        .then((result) => {
          const github = result.find(
            (account) => account.provider === "github",
          );
          return !!github;
        }),
  });

  const unlink_github = () => {
    pb.collection("users")
      .unlinkExternalAuth(pb.authStore.model.id, "github")
      .then(() => queryClient.refetchQueries({ queryKey: ["linked_github"] }));
  };

  console.log({isLoading})

  return (
    <DashboardLayout>
      <div class="grid w-full grid-cols-2 gap-24 p-6 mx-auto">
        <form
          class="flex w-full flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <p class="font-black">User Settings</p>
          <form.Field
            name="username"
            children={(field) => (
              <label class="input input-bordered flex items-center gap-2">
                Username
                <input
                  type="text"
                  class="grow"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Daisy"
                />
                <FieldInfo field={field} />
              </label>
            )}
          />
          <form.Field
            name="email"
            children={(field) => (
              <label class="input input-bordered flex items-center gap-2">
                Email
                <input
                  type="text"
                  class="grow"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Daisy"
                />
                <FieldInfo field={field} />
              </label>
            )}
          />
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
                {isSubmitting ? "..." : "Submit"}
              </button>
            )}
          />
        </form>
        <div>
          <p class="font-black">Linked accounts</p>
          {isLoading && (
            <button class="btn w-full skeleton" disabled={true}>
              <Github />
              Github
            </button>
          )}
          {!isLoading &&
            (linked_github ? (
              <button onClick={unlink_github} class="btn w-full btn-error">
                <Github />
                Unlink Github
              </button>
            ) : (
              <button
                onClick={() =>
                  github_login().then(() =>
                    queryClient.refetchQueries({ queryKey: ["linked_github"] }),
                  )
                }
                class="btn w-full btn-primary"
              >
                <Github />
                Link Github
              </button>
            ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
