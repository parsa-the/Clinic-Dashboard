import { useAuthStore } from "../stores/auth.store";
import Sidebar from "../components/user-dashboard/UserSidebar";
import { Navigate, Outlet } from "react-router-dom";
import MobileNav from "../components/user-dashboard/MobileNav";

const UserLayout = () => {
  const IsUser = useAuthStore((e) => e.user);

  if (IsUser?.role !== "user") {
    return <Navigate to={"/consultant"} replace></Navigate>;
  }

  return (
    <main className="flex h-dvh w-full overflow-hidden">
      <div className="min-w-0 flex-1">
        <Outlet />
      </div>
      <Sidebar />
      <MobileNav />
    </main>
  );
};

export default UserLayout;
