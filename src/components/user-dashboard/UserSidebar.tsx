import { LuHeartHandshake, LuMessageSquare } from "react-icons/lu";
import { IoHomeOutline } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { SlPeople } from "react-icons/sl";
import { VscCollectionSmall } from "react-icons/vsc";
import {
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

const Logout =()=>{
  localStorage.clear()
}


const UserSideBarBtns = [
  { title: "داشبورد", icon: House, route: "/dashboard" },
  { title: "نوبت های من", icon: CalendarDays ,route: "/dashboard"},
  { title: "مشاوران", icon: Users, route: "/consultant-page" },
  { title: "خدمات", icon: VscCollectionSmall ,route: "/dashboard"},
  { title: "پیام ها", icon: MessageSquare ,route: "/dashboard"},
  { title: "مقالات و منابع", icon: NotepadText,route: "/dashboard" },
  { title: "پروفایل", icon: UserRound ,route: "/dashboard"},
  { title: "تنظیمات", icon: Settings ,route: "/dashboard"},
];

const UserSidebar = () => {
  return (
    <aside className="hidden relative md:flex h-dvh w-64 shrink-0 flex-col bg-sky-950 p-3 text-white">
      <header className="my-5 flex items-center justify-center gap-2 p-3">
        <p className="text-center text-sm font-black md:text-base lg:text-lg">
          مرکز درمانی آرامش
        </p>

        <LuHeartHandshake className="size-7 shrink-0 lg:size-8" />
      </header>

      <nav className="w-full px-2">
        {UserSideBarBtns.map(({ title, icon: Icon, route }) => (
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
        <Link to={"/login"} onClick={Logout} className="mb-1 font-medium hover:bg-white/3 transition-colors duration-300 flex w-full items-center gap-3 rounded-xl p-4 pr-3 text-md">
          <LogOut size={24} /> <p className="">خروج</p>
        </Link>
      </footer>
    </aside>
  );
};

export default UserSidebar;
