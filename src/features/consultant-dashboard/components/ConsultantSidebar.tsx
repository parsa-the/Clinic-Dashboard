import { CalendarDays, Clock3, House, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/features/auth/model/auth.store";

const navigationItems = [
  { title: "داشبورد", icon: House, route: "/consultant/dashboard" },
  { title: " نوبت‌ها", icon: CalendarDays, route: "/consultant/calendar" },
  { title: "مدیریت زمان کاری", icon: Clock3, route: "/consultant/availability" },
];

const ConsultantSidebar = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="relative hidden h-dvh w-64 shrink-0 flex-col bg-teal-900 p-3 text-white md:flex">
      <header className="my-4 flex flex-col items-center justify-center p-3 text-center">
        <img
          src="/3.jpg"
          alt={user?.name ?? "مشاور"}
          className="mb-4 size-24 rounded-full border-2 border-white/20 object-cover"
        />
        <h1 className="font-black">{user?.name ?? "دکتر نرگس محمدی"}</h1>
        <p className="mt-1 text-xs text-white/65">روانشناس بالینی</p>
      </header>

      <nav className="w-full px-2">
        {navigationItems.map(({ title, icon: Icon, route }) => (
          <NavLink
            to={route}
            key={title}
            className={({ isActive }) =>
              `mb-1 flex w-full items-center gap-3 rounded-xl p-4 pr-3 text-sm font-medium transition-colors ${
                isActive ? "bg-white/12" : "text-white/80 hover:bg-white/7"
              }`
            }
          >
            <Icon size={22} className="shrink-0" />
            <p>{title}</p>
          </NavLink>
        ))}
      </nav>

      <footer className="mt-auto px-2">
        <button
          type="button"
          onClick={handleLogout}
          className="mb-1 flex w-full items-center gap-3 rounded-xl p-4 pr-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/7"
        >
          <LogOut size={22} />
          <p>خروج</p>
        </button>
      </footer>
    </aside>
  );
};

export default ConsultantSidebar;
