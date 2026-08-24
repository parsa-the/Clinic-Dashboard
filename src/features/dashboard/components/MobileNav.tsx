import { CalendarDays, House, Plus, User2, Users } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { icon: House, title: "خانه", route: "/dashboard" },
  { icon: CalendarDays, title: "نوبت‌ها", route: "/appointments" },
  { icon: Users, title: "مشاوران", route: "/consultants" },
  { icon: User2, title: "پروفایل", route: "/consultants" },
];

const MobileNav = () => (
  <nav className="fixed inset-x-0 bottom-0 z-50 flex h-20 items-center justify-around border-t bg-white/95 px-4 shadow-[0_-8px_25px_rgba(15,23,42,0.08)] backdrop-blur md:hidden">
    {navItems.slice(0, 2).map(({ icon: Icon, title, route }) => (
      <NavLink
        to={route}
        key={title}
        className={({ isActive }) =>
          `flex min-w-16 flex-col items-center gap-1.5 rounded-xl px-2 py-2 text-xs font-semibold ${
            isActive ? "text-blue-600" : "text-slate-500"
          }`
        }
      >
        <Icon size={21} />
        <span>{title}</span>
      </NavLink>
    ))}

    <NavLink
      to="/booking"
      aria-label="رزرو نوبت"
      className="-mt-8 grid size-15 place-items-center rounded-full border-4 border-slate-50 bg-blue-600 text-white shadow-lg shadow-blue-200"
    >
      <Plus size={28} />
    </NavLink>

    {navItems.slice(2).map(({ icon: Icon, title, route }) => (
      <NavLink
        to={route}
        key={title}
        className={({ isActive }) =>
          `flex min-w-16 flex-col items-center gap-1.5 rounded-xl px-2 py-2 text-xs font-semibold ${
            isActive ? "text-blue-600" : "text-slate-500"
          }${Icon === User2 ? "pointer-events-none text-slate-500 cursor-not-allowed" : ""}`
        }
      >
        <Icon size={21} />
        <span>{title}</span>
      </NavLink>
    ))}
  </nav>
);

export default MobileNav;
