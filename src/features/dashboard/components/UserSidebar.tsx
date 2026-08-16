import { LuHeartHandshake } from "react-icons/lu";
import {
  CalendarDays,
  House,
  LogOut,
  Stethoscope,
  Users,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/features/auth/model/auth.store";

const navigationItems = [
  { title: "داشبورد", icon: House, route: "/dashboard" },
  { title: "نوبت‌های من", icon: CalendarDays, route: "/appointments" },
  { title: "مشاوران", icon: Users, route: "/consultants" },
  { title: "رزرو نوبت", icon: Stethoscope, route: "/booking" },
];

const UserSidebar = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="relative hidden h-dvh w-64 shrink-0 flex-col bg-sky-950 p-3 text-white md:flex">
      <header className="my-5 flex items-center justify-center gap-2 p-3">
        <p className="text-center text-sm font-black md:text-base lg:text-lg">
          مرکز درمانی آرامش
        </p>
        <LuHeartHandshake className="size-7 shrink-0 lg:size-8" />
      </header>

      <nav className="w-full px-2">
        {navigationItems.map(({ title, icon: Icon, route }) => (
          <NavLink
            to={route}
            key={title}
            className={({ isActive }) =>
              `mb-1 flex w-full items-center gap-3 rounded-xl p-4 pr-3 text-sm font-medium transition-colors duration-300 ${
                isActive ? "bg-white/12 text-white" : "text-white/80 hover:bg-white/7"
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

export default UserSidebar;
