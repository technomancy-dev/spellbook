import { createFileRoute, redirect } from "@tanstack/react-router";
import { is_authenticated } from "@/services/user";
import SettingsPage from "@/features/settings/settings-page";


export const Route = createFileRoute("/dashboard/settings")({
  component: SettingsPage,
  beforeLoad: async () => {
    if (!is_authenticated()) {
      throw redirect({
        to: "/dashboard/sign-in",
      });
    }
  },
});
