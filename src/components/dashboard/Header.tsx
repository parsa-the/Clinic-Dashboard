import { useAuthStore } from "../../stores/auth.store";
import { FaRegBell } from "react-icons/fa";
import React from "react";

const Header = () => {
  const userName = useAuthStore((e) => e.user);
  return (
    <div className="md:flex hidden p-4 px-10 border-b justify-between flex-row ">
      <div className="flex items-center gap-3">
        <img
          src="./images.jpg"
          alt="profile image"
          className="rounded-full w-15"
        />
        <div className="flex font-medium items-center gap-1">
          <p>سلام</p>,<p>{userName?.name}</p>
        </div>
      </div>
      <button className="border p-4 rounded-3xl">
        <FaRegBell size={25} />
      </button>
    </div>
  );
};

export default Header;
