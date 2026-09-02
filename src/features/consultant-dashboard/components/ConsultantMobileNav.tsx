import { useAuthStore } from "@/features/auth/model/auth.store";
import { CalendarDays, Clock3, House, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const ConsultantMobileNav = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const items = [
    { label: "داشبورد", icon: House, to: "/consultant/dashboard" },
    { label: "تقویم", icon: CalendarDays, to: "/consultant/calendar" },
    { label: "دسترسی", icon: Clock3, to: "/consultant/availability" },
    {
      icon: LogOut,
      label: "خروج",
      to: "/login",
      function: handleLogout,
    },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 flex h-20 items-center justify-around border-t bg-white/95 px-4 shadow-[0_-8px_25px_rgba(15,23,42,0.08)] backdrop-blur md:hidden">
      {items.map(({ label, icon: Icon, to, function: action }) => (
        <NavLink
          key={to}
          to={to}
          onClick={action}
          className={({ isActive }) =>
            `flex min-w-20 flex-col items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition ${
              isActive ? "bg-teal-50 text-teal-700" : "text-slate-500"
            }`
          }
        >
          <Icon size={21} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default ConsultantMobileNav;