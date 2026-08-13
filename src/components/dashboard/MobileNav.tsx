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
  },
  {
    icon: MessageSquare,
    title: "پیام ها",
  },
];

const MobileNav = () => {
  return (
    <div className="flex items-center  font-medium px-5 justify-around relative md:hidden w-full h-20">
      {SecondHalf.map((items, index) => {
        return (
          <button className="flex gap-2 cursor-pointer flex-col items-center" key={index}>
            <span>
              <items.icon />
            </span>
            <span> {items.title}</span>
          </button>
        );
      })}

      <button className="bg-blue-500 cursor-pointer p-5 rounded-full  text-white text-3xl font-black mb-7">
        <Plus size={30} />
      </button>

      {FirstHalf.map((items, index) => {
        return (
          <button className="flex gap-2 cursor-pointer flex-col items-center" key={index}>
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
