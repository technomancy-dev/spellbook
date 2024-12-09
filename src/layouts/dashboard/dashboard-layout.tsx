import DashboardSideBar from "./dashboard-sidebar";
import DashboardBottomNavigation from "./dashboard-bottom-navigation";

const DashboardLayout = ({ children }) => {
  return (
    <div class="drawer h-full flex-1 lg:drawer-open border-t border-dashed border-base-200">
      <input id="drawer" type="checkbox" class="drawer-toggle" />
      <div class="pb-16 lg:pb-0 drawer-content">
        <div class="flex flex-1 h-full animate-fade-in">
        {children}
        </div>
        <DashboardBottomNavigation />
      </div>
      <DashboardSideBar />
    </div>
  );
};

export default DashboardLayout;
