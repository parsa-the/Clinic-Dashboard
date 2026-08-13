import Sidebar from "../components/dashboard/Sidebar";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <main className="flex h-dvh w-full overflow-hidden">
      <div className="min-w-0 flex-1">
        <Outlet />
      </div>
      <Sidebar />
     
    </main>
  );
};

export default UserLayout;
