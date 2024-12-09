import DashboardLayout from "@/layouts/dashboard/dashboard-layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/$")({
  component: () => (
    <DashboardLayout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Page Not Found</h1>
          <p className="mt-2">This dashboard page doesn't exist</p>
        </div>
      </div>
    </DashboardLayout>
  ),
});
