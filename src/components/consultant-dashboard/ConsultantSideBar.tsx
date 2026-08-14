import { LuHeartHandshake, LuMessageSquare } from "react-icons/lu";
import { IoHomeOutline } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { SlPeople } from "react-icons/sl";
import { VscCollectionSmall } from "react-icons/vsc";
import {
  Calendar1Icon,
  CalendarDays,
  House,
  LogOut,
  MessageSquare,
  NotepadText,
  Settings,
  UserRound,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const Logout = () => {
  localStorage.clear();
};

const ConsultantSideBar = [
  { title: "داشبورد", icon: House, route: "/dashboard" },

  { title: "نوبت ها", icon: CalendarDays, route: "/dashboard" },
  { title: " تقویم", icon: Calendar1Icon, route: "/dashboard" },
  { title: "مراجعین", icon: Users, route: "/consultant" },
  { title: "خدمات", icon: VscCollectionSmall, route: "/dashboard" },
  { title: "پیام ها", icon: MessageSquare, route: "/dashboard" },
  { title: "مقالات و منابع", icon: NotepadText, route: "/dashboard" },
  { title: "تنظیمات", icon: Settings, route: "/dashboard" },
];

const UserSidebar = () => {
  return (
    <aside className="hidden relative md:flex h-dvh w-64 shrink-0 flex-col bg-teal-900 p-3 text-white">
      <header className="my-5 flex flex-col items-center justify-center p-3">
        <img src="3.jpg" className="w-27 mb-4 border h-27 rounded-full"></img>
        <h1 className="font-black text-lg">دکتر نرگس محمدی</h1>
        <h1> روانشناس بالینی </h1>
      </header>

      <nav className="w-full px-2">
        {ConsultantSideBar.map(({ title, icon: Icon, route }) => (
          <Link
            to={route}
            key={title}
            className={`mb-1 font-medium hover:bg-white/3 transition-colors duration-300 flex w-full items-center gap-3 rounded-xl p-4 pr-3 text-md`}
          >
            <Icon size={24} className="shrink-0" />
            <p>{title}</p>
          </Link>
        ))}
      </nav>
      <footer className="px-2 mt-auto">
        <Link
          to={"/login"}
          onClick={Logout}
          className="mb-1 font-medium hover:bg-white/3 transition-colors duration-300 flex w-full items-center gap-3 rounded-xl p-4 pr-3 text-md"
        >
          <LogOut size={24} /> <p className="">خروج</p>
        </Link>
      </footer>
    </aside>
  );
};

export default UserSidebar;
