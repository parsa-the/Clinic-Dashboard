import ConsultantSideBar from "../components/consultant-dashboard/ConsultantSideBar";
import { Outlet } from "react-router-dom";

const ConsultantLayout = () => {
  return (
    <main className="flex h-dvh w-full overflow-hidden">
      <ConsultantSideBar />
      <div className="min-w-0 flex-1">
        <Outlet />
      </div>
    </main>
  );
};

export default ConsultantLayout;
