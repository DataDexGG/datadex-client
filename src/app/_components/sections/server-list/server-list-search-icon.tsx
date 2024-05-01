"use client";

import {IoSearch} from "react-icons/io5";

export default function ServerListSearchIcon(props) {
  const { update } = props;

  return (
    <div className={`cursor-pointer relative w-full h-fit tooltip-group`}
         onClick={() => {
           // Search for guild and add.
         }}
    >
      <div className={`relative w-[3.25rem] h-[3.25rem] rounded-full mx-auto mt-3 bg-[#313338] flex justify-center items-center`}>
        <IoSearch className="w-[1.3rem] h-[1.3rem] text-green-300" />
      </div>

      <div className="absolute tooltip w-fit h-fit py-2 px-4 bg-black rounded-xl top-[0.35rem] left-[5rem]">
        <span className="text-white whitespace-nowrap">Search a Guild</span>
        <p className="text-white text-xs whitespace-nowrap">Currently in development</p>
      </div>
    </div>
  )
}
