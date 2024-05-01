"use client";

// import {CategoryScale, LinearScale} from "chart.js";
// import Chart from 'chart.js/auto'
import {useEffect, useState} from "react";
import BaseServerListSection from "./_components/sections/server-list/base-server-list";
import BaseListSection from "./_components/sections/member-list/base-list-section";
import BaseContentSection from "./_components/sections/content/base-content";
// import LoginManagement from "@/app/_components/login/login-management";
// import BaseContentSection from "@/app/_components/sections/content/base-content";
// import BaseListSection from "@/app/_components/sections/member-list/base-list-section";
// import Loading from "@/app/_components/sections/loading";

export default function Dash() {
  const [ updateTrigger, setUpdateTrigger ] = useState(1);
  const update = () => setUpdateTrigger((prev) => prev < 2 ? 2 : 1);

  const [ isSearching, setIsSearching ] = useState(false);

  // useEffect(() => {
  //   Chart.register(CategoryScale);
  //   Chart.register(LinearScale);
  // }, []);

  return (
      <div className={`relative w-screen h-screen`}>
        {/*<Loading update={update} />*/}

        {/*<LoginManagement update={update} />*/}

        <div className={`w-full h-full grid grid-cols-[4.5rem_16rem_auto]`}>

          {/* LEFT */}
          <div className={`relative w-full h-full bg-primary-1`}>
            <BaseServerListSection update={update} />
          </div>

          {/* MID */}
          <div className={`w-full h-full bg-[#2b2d31]`}>
            <BaseListSection update={update} />
          </div>

          {/* RIGHT */}
          <div className="relative w-full h-full bg-[#313338]">
            <BaseContentSection update={update} />

            {/*{(!selectedGuild) && <DashboardBody update={update} />}*/}
            {/*{(selectedGuild && !selectedMember) && <GuildBody selectedGuild={selectedGuild}/>}*/}
            {/*{(selectedGuild && selectedMember) && <MemberBody selectedGuild={selectedGuild} selectedMember={selectedMember}/>}*/}

            {/*{(isSearching) && (*/}
            {/*  <div>*/}
            {/*    <div className="z-10 fixed top-0 left-0 w-full h-full bg-black opacity-50" />*/}
            {/*    <div className="z-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2*/}
            {/*                  flex w-[30rem] h-3/4*/}
            {/*                  bg-[#313338] border-2 border-[#1e1f22]">*/}
            {/*      <div className="relative flex flex-col w-full h-full ">*/}

            {/*        <form className="mx-4 mt-4">*/}
            {/*          <div className="relative">*/}
            {/*            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">*/}
            {/*              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">*/}
            {/*                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>*/}
            {/*              </svg>*/}
            {/*            </div>*/}
            {/*            <input type="search" id="search"*/}
            {/*                   className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"*/}
            {/*                   placeholder="Search Guild Name..." required />*/}
            {/*              <button type="submit" className="absolute end-2.5 bottom-2.5 bg-[#5a64ea] hover:bg-[#474fba] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">*/}
            {/*                <span className="text-white">Search</span>*/}
            {/*              </button>*/}
            {/*          </div>*/}
            {/*        </form>*/}

            {/*        /!* Spacer Icon *!/*/}
            {/*        <div className={`mt-4 mb-0.5 w-4/5 h-[0.15rem] bg-[#26272a] mx-auto`}/>*/}

            {/*        <div className="flex w-full h-full border overflow-y-auto custom-scrollbar">*/}
            {/*          <div className="flex flex-col">*/}
            {/*            <div className="w-20 h-20 bg-red-300" />*/}
            {/*            <div className="w-20 h-20 bg-red-300" />*/}
            {/*            <div className="w-20 h-20 bg-red-300" />*/}
            {/*            <div className="w-20 h-20 bg-red-300" />*/}
            {/*            <div className="w-20 h-20 bg-red-300" />*/}
            {/*            <div className="w-20 h-20 bg-red-300" />*/}
            {/*            <div className="w-20 h-20 bg-red-300" />*/}
            {/*            <div className="w-20 h-20 bg-red-300" />*/}
            {/*            <div className="w-20 h-20 bg-red-300" />*/}
            {/*            <div className="w-20 h-20 bg-red-300" />*/}
            {/*            <div className="w-20 h-20 bg-red-300" />*/}
            {/*            <div className="w-20 h-20 bg-red-300" />*/}
            {/*            <div className="w-20 h-20 bg-red-300" />*/}
            {/*          </div>*/}
            {/*        </div>*/}

            {/*      </div>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*)}*/}

          </div>

        </div>
      </div>
  )
}
