import * as React from "react";
import { useState, useEffect } from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { github_login, is_authenticated } from "../../../stores/user";
import { Github } from "lucide-react";
import DashboardLayout from "../../../components/DashboardLayout";
import pb from "../../../pocketbase";

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

function RouteComponent() {
  const [linked_github, set_linked_github] = useState(false);

  useEffect(() => {
    const result = pb
      .collection("users")
      .listExternalAuths(pb.authStore.model.id)
      .then((result) => {
        const github = result.find((account) => account.provider === "github");
        if (github) {
          set_linked_github(true);
        }
      });
  }, []);

  const unlink_github = () => {
    pb.collection("users")
      .unlinkExternalAuth(pb.authStore.model.id, "github")
      .then(() => set_linked_github(false));
  };

  return (
    <DashboardLayout>
      <div class="max-w-prose gap-2 flex flex-col p-6 mx-auto">
        <label class="input input-bordered flex items-center gap-2">
          Name
          <input type="text" class="grow" placeholder="Daisy" />
        </label>
        <label class="input input-bordered flex items-center gap-2">
          Email
          <input type="text" class="grow" placeholder="daisy@site.com" />
        </label>
        <label class="input input-bordered flex items-center gap-2">
          <input type="text" class="grow" placeholder="Search" />
          <kbd class="kbd kbd-sm">⌘</kbd>
          <kbd class="kbd kbd-sm">K</kbd>
        </label>
        <label class="input input-bordered flex items-center gap-2">
          <input type="text" class="grow" placeholder="Search" />
          <span class="badge badge-info">Optional</span>
        </label>
        {linked_github ? (
          <button onClick={unlink_github} class="btn w-full btn-error">
            <Github />
            Unlink Github
          </button>
        ) : (
          <button onClick={() => github_login().then(() => set_linked_github(true))} class="btn w-full btn-primary">
            <Github />
            Link Github
          </button>
        )}
      </div>
    </DashboardLayout>
  );
}
