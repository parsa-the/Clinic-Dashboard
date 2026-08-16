import UserSidebar from "@/features/dashboard/components/UserSidebar";
import MobileNav from "@/features/dashboard/components/MobileNav";
import { Outlet } from "react-router-dom";

const UserLayout = () => (
  <main className="flex h-dvh w-full overflow-hidden bg-slate-50" dir="rtl">
    <div className="min-w-0 flex-1">
      <Outlet />
    </div>
    <UserSidebar />
    <MobileNav />
  </main>
);

export default UserLayout;
