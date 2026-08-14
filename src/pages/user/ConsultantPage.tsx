import { Search, Star, StarIcon } from "lucide-react";
import { consultants } from "../../mocks/consultants";
import React from "react";
import { FaStar } from "react-icons/fa";

const ConsultantPage = () => {
  return (
    <div className="w-full h-full overflow-auto p-5 pb-30 flex flex-col gap-4 bg-slate-50">
      {/* search */}
      <div className="px-5 items-center sticky flex top-0 z-10 shadow rounded-md border bg-white w-full">
        <input
          type="text"
          className="w-full h-full focus:outline-none py-5 transition-shadow duration-300"
          placeholder="  جست و جوی نام مشاور..."
        />
        <Search className="text-zinc-400" size={25} />
      </div>

      {/* doctors */}
      <div className="w-full grid  md:grid-cols-2 gap-4  xl:grid-cols-4">
        {consultants.map((items) => {
          return (
            <div className=" bg-white justify-between  flex flex-col gap-6 border shadow rounded-lg p-5">
              <div className="flex ">
                <div className="flex  flex-row  gap-3">
                  <img
                    src={items.profilePicture}
                    alt={items.name}
                    className="rounded-full w-24 h-24 border "
                  />
                  <div>
                    <p className="font-semibold">{items.name}</p>
                    <p className="text-zinc-700">{items.service}</p>
                  </div>
                </div>
                <span>
                  {/* star and rating */}
                  <div className="flex gap-1 pr-2">
                    <p className="flex gap-0.5 relative items-center ">
                      <span className="font-semibold">{items.rating}</span>
                    </p>
                    <FaStar size={17} className=" text-yellow-400" />
                  </div>
                </span>
              </div>
              <p className="text-zinc-700">{items.bio}</p>
              <button className="w-full border-2 text-blue-600 hover:bg-blue-50 transition-colors duration-300 cursor-pointer font-semibold border-blue-600 py-3 rounded-md">
                رزرو نوبت
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ConsultantPage;
