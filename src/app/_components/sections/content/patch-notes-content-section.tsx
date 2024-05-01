"use client";

import {FaCodeCompare, FaLaptopCode} from "react-icons/fa6";
import {BsBug} from "react-icons/bs";

const Type = {
  FEATURE: {
    label: 'feature',
    text: 'text-green-900',
    color: 'bg-green-300'
  },
  IMPROVEMENT: {
    label: 'improvement',
    text: 'text-blue-900',
    color: 'bg-blue-300'
  },
  BUG: {
    label: 'bug',
    text: 'text-red-900',
    color: 'bg-red-300'
  }
}
const RecentChanges = [
  {
    title: "Secure Registering & Logging in",
    time: 1709284421906,
    version: "0.2",
    type: Type.FEATURE,
  },
  {
    title: "Switched backend to Comlink",
    time: 1709283421906,
    version: "0.1",
    type: Type.IMPROVEMENT,
  },
  {
    title: "Correctly calculate member stats",
    time: 1709283421906,
    version: "0.0.1",
    type: Type.BUG,
  }
];
const CurrentTasks = [
  {
    title: "Record member stats daily",
    description: "Required for accurate & up-to-date graph information",
    type: Type.FEATURE,
  },
  {
    title: "Website Responsiveness",
    description: "Mobile support and all other aspect ratio's",
    type: Type.IMPROVEMENT,
  }
];

export default function PatchNotesContentSection(props) {
  return (
    <div className="relative flex flex-col w-full h-full">

      {/* HEADER */}
      <div className="bg-[#313338] w-full h-fit z-10">
        <div className={`relative flex w-full h-[3rem] justify-start items-center`}>
          {/*<span className="absolute ml-[2rem] left-0 text-white font-medium">Changelog</span>*/}
          <FaCodeCompare className="ml-[1rem] w-[1rem] h-[1rem] text-white" />
          <span className="ml-[1rem] text-white text-[1rem] font-medium">Changelog</span>
          <span className="ml-[0.35rem] text-gray-400 text-[1rem] font-medium">- BountyBoard v{RecentChanges[0].version}</span>
        </div>

        {/* Spacer Icon */}
        <div className={`w-full h-[0.1rem] bg-[#26272a] mx-auto`} />
      </div>

      <div className="flex-col w-full h-full px-[2rem] mt-[4rem]">

        {/* HEADERS */}
        <div className="grid grid-cols-2">
          <div className="flex flex-col w-full">
            <span className="px-[2rem] text-[1.6rem] text-white font-semibold">Recent Changes</span>
            <p className="px-[2rem] text-[0.8rem] text-gray-400">
              Our release notes for new features and updates to the BountyBoard service.
            </p>
            <div className="my-[2rem] w-full h-[0.1rem] bg-[#26272a]" />
          </div>
          <div className="flex flex-col w-full text-right">
            <span className="px-[2rem] text-[1.6rem] text-white font-semibold">Current Tasks</span>
            <p className="px-[2rem] text-[0.8rem] text-gray-400">
              Current tasks that're being worked on right now!
            </p>
            <div className="my-[2rem] w-full h-[0.1rem] bg-[#26272a]" />
          </div>
        </div>

        {/* CHANGES & TASKS */}
        <div className="grid grid-cols-2">
          <div className="px-[2rem] flex flex-col gap-10">
            {RecentChanges.map((item: any, index) => {
              const icon = item.type === Type.BUG
                ? <BsBug className="w-full h-full text-black" />
                : <FaLaptopCode className="w-full h-full text-black" />

              return (
                <div key={index} className="flex items-center">
                  <div className={`w-[3.25rem] h-[3.25rem] p-[0.55rem] ${item.type.color} rounded-full`}>
                    {icon}
                  </div>
                  <div className="ml-[1rem] flex flex-col">
                    <div className="flex flex-row items-center">
                      <span className="text-[1.25rem] text-white">Secure Registering & Logging in</span>
                      <div className={`ml-[1rem] text-[0.8rem] ${item.type.text} px-2 ${item.type.color} rounded-2xl`}>
                        <span>{item.type.label}</span>
                      </div>
                    </div>
                    <div className="flex flex-row items-center">
                      <span className="text-gray-500">{new Date(item.time).toDateString()}</span>
                      <div className="ml-[1rem] mb-[0.1rem] text-[0.7rem] text-black px-2 bg-gray-400 rounded-2xl">
                        <span>v{item.version}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="px-[2rem] flex flex-col gap-10 items-end text-right">
            {CurrentTasks.map((item: any, index) => {
              const icon = item.type === Type.BUG
                ? <BsBug className="w-full h-full text-black" />
                : <FaLaptopCode className="w-full h-full text-black" />

              return (
                <div key={index} className="flex items-center">
                  <div className="mr-[1rem] flex flex-col">
                    <div className="flex flex-row items-center justify-end">
                      <div className={`mr-[1rem] text-[0.8rem] ${item.type.text} px-2 ${item.type.color} rounded-2xl`}>
                        <span>{item.type.label}</span>
                      </div>
                      <span className="text-[1.25rem] text-white">{item.title}</span>
                    </div>
                    <span className="text-gray-500">{item.description}</span>
                  </div>
                  <div className={`w-[3.25rem] h-[3.25rem] p-[0.55rem] ${item.type.color} rounded-full`}>
                    <FaLaptopCode className="w-full h-full text-black" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}
