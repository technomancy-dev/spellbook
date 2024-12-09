import { $user } from "@/stores/user";
import DashboardLayout from "@/layouts/dashboard/dashboard-layout";
import { useStore } from "@nanostores/react";
import SettingsForm from "./settings-form";
import LinkedAccounts from "./linked-accounts";

const SettingsPage = () => {
  const user = useStore($user);

  return (
    <DashboardLayout>
      <div class="grid w-full justify-stretch gap-4 lg:gap-24 p-6 mx-auto">
        <SettingsForm user={user} />
        <div class="divider" />
        <LinkedAccounts user={user} />
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
