import * as React from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { is_authenticated } from "../../../stores/user";


export const Route = createFileRoute("/dashboard/settings")({
  component: RouteComponent,
  beforeLoad: async () => {
    if (!is_authenticated()) {
      window.location = "/?redirect=" + encodeURIComponent(location.href)
      throw redirect({
        to: '/',
      })
    }
  },
});

function RouteComponent() {
  return (
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
    </div>
  );
}
