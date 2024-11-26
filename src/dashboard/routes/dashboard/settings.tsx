import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { $user, github_login, is_authenticated } from "../../../stores/user";
import { CircleX, Github, Upload } from "lucide-react";
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
  avatar: z.any()
});

function RouteComponent() {
  const user = useStore($user);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar ? pb.files.getUrl(user, user?.avatar) : null);
  const fileInputRef = useRef(null); // Add this ref for the file input

  const form = useForm({
    defaultValues: {
      username: user?.username,
      email: user?.email,
      avatar: user?.avatar,
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: user_schema,
    },
    onSubmit: async ({ value }) => {
      try {
        const formData = new FormData();
        formData.append("username", value.username);

        if (value.avatar) {
          formData.append("avatar", value.avatar);
        } else if (avatarPreview === null) {
          formData.append("avatar", "");
        }

        console.log(formData)

        // Update with your actual API endpoint
        const promise = pb.collection("users").update(user.id, formData);

        if (value.email !== user.email) {
          const email_promise = pb
            .collection("users")
            .requestEmailChange(value.email);

          toast.promise(email_promise, {
            loading: "Updating email...",
            success: "Successfully changed email",
            error: (err) => `${err.toString()}`,
          });
        }

        toast.promise(promise, {
          loading: "Updating profile...",
          success: "Successfully updated settings",
          error: (err) => `${err.toString()}`,
        });
      } catch (error) {
        toast.error(`Error updating profile: ${error.toString()}`);
      }
    },
  });

  const { data: linked_github, isLoading } = useQuery({
    queryKey: ["linked_github"],
    queryFn: () =>
      pb
        .collection("_externalAuths")
        .getFirstListItem(
          `recordRef="${pb.authStore.model.id}" && provider="github"`,
        )
        .then((result) => {
          console.log(result);
          return !!result;
        }),
  });

  const unlink_github = () => {
    pb.collection("users")
      .unlinkExternalAuth(pb.authStore.model.id, "github")
      .then(() => queryClient.refetchQueries({ queryKey: ["linked_github"] }));
  };

  const handleFileChange = (field, event) => {
    const file = event.target.files[0];

    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }

      // Validate file size (e.g., 5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Update form field
      field.handleChange(file);
    }
  };

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
            name="avatar"
            children={(field) => (
              <div class="relative">
                <label class="form-control w-full">
                  <div class="label">
                    <span class="label-text">Choose Avatar</span>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => handleFileChange(field, e)}
                    class="file-input file-input-bordered w-full"
                  />
                </label>
                {avatarPreview && (
                  <div className="flex avatar indicator absolute top-4 -right-4 items-center gap-4">
                    <button
                      type="button"
                      class="indicator-item bg-base-100 rounded-full right-1 top-1 p-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        setAvatarPreview(null);
                        field.handleChange(null);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = ""; // Reset the file input
                        }
                      }}
                    >
                      <CircleX class="text-error" size={16} />
                    </button>
                    <div class="h-12 w-12 rounded-full">
                      <img src={avatarPreview} alt="Avatar preview" />
                    </div>
                  </div>
                )}
                <FieldInfo field={field} />
              </div>
            )}
          />
          {/* <form.Field
            name="avatar"
            children={(field) => (
              <label class="form-control w-full">
                <div class="label">
                  <span class="label-text">Avatar</span>
                </div>
                <input
                  type="file"
                  class="file-input file-input-bordered w-full"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </label>
            )}
          /> */}
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
          {/* <form.Field
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
          /> */}
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
