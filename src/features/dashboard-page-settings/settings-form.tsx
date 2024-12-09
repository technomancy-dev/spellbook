import { useState, useRef } from "react";
import { $user } from "@/stores/user";
import { github_login } from "@/services/user";
import { CircleX, Github } from "lucide-react";

import { pb } from "@/pb-instance";
import { useStore } from "@nanostores/react";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { query_client } from "@/stores/query";
import FieldInfo from "@/components/field-info";

const user_schema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  avatar: z.any(),
});

const SettingsForm = ({ user }) => {
  const [avatarPreview, setAvatarPreview] = useState(
    user?.avatar ? pb.files.getUrl(user, user?.avatar) : null,
  );
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

        const promise = pb.collection("users").update(user.id, formData);

        if (value.email !== user.email) {
          const email_promise = pb
            .collection("users")
            .requestEmailChange(value.email);

          toast.promise(email_promise, {
            loading: "Updating email...",
            success:
              "Email change request sent, please check your email to confirm",
            error: (err) => `${err.toString()}`,
          });
        } else {
          toast.promise(promise, {
            loading: "Updating profile...",
            success: "Successfully updated settings",
            error: (err) => `${err.toString()}`,
          });
        }
      } catch (error) {
        toast.error(`Error updating profile: ${error.toString()}`);
      }
    },
  });

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
        // @ts-ignore
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Update form field
      field.handleChange(file);
    }
  };

  return (
    <div class="grid grow lg:grid-cols-2 w-full">
      <div class="prose mb-8">
        <p class="font-black">User Settings</p>
        <p class="">Changing your email will require verification.</p>
      </div>
      <form
        class="flex w-full flex-col max-w-sm gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
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
                <div class="flex avatar indicator absolute top-4 -right-4 items-center gap-4">
                  <button
                    type="button"
                    class="indicator-item bg-base-100 rounded-full -right-2 -top-2 p-1"
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
              class="btn btn-primary"
            >
              {isSubmitting ? "..." : "Save"}
            </button>
          )}
        />
      </form>
    </div>
  );
};

export default SettingsForm;
