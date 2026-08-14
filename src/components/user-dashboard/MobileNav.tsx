import {
  CalendarDays,
  House,
  MessageSquare,
  Plus,
  UserRound,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const FirstHalf = [
  {
    icon: CalendarDays,
    title: "نوبت ها",
  },
  {
    icon: UserRound,
    title: "پروفایل",
  },
];
const SecondHalf = [
  {
    icon: House,
    title: "خانه",
    route: "/dashboard",
  },
  {
    icon: MessageSquare,
    title: "پیام ها",
    route: "/dashboard",
  },
];

const MobileNav = () => {
  return (
    <div className="flex items-center  font-medium px-5 justify-around fixed bottom-0 bg-white/10 backdrop-blur-sm md:hidden w-full h-20">
      {SecondHalf.map((items, index) => {
        return (
          <Link
            to={items.route}
            className="flex gap-2 cursor-pointer flex-col items-center"
            key={index}
          >
            <span>
              <items.icon />
            </span>
            <span> {items.title}</span>
          </Link>
        );
      })}

      <button className="bg-blue-500 cursor-pointer p-5 rounded-full  text-white text-3xl font-black mb-7">
        <Plus size={30} />
      </button>

      {FirstHalf.map((items, index) => {
        return (
          <button
            className="flex gap-2 cursor-pointer flex-col items-center"
            key={index}
          >
            <span>
              <items.icon />
            </span>
            <span> {items.title}</span>
          </button>
        );
      })}
    </div>
  );
};

export default MobileNav;
