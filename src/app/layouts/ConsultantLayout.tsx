import ConsultantSidebar from "@/features/consultant-dashboard/components/ConsultantSidebar";
import ConsultantMobileNav from "@/features/consultant-dashboard/components/ConsultantMobileNav";
import { Outlet } from "react-router-dom";

const ConsultantLayout = () => (
  <main className="flex h-dvh w-full overflow-hidden bg-slate-50" dir="rtl">
    <ConsultantSidebar />
    <div className="min-w-0 flex-1">
      <Outlet />
    </div>
    <ConsultantMobileNav />
  </main>
);

export default ConsultantLayout;
