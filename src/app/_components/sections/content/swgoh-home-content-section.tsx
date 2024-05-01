"use client";

import {FaHome} from "react-icons/fa";
import {useEffect, useState} from "react";

export default function SwgohHomeContentSection(props) {
  const { update } = props;

  const [ characters, setCharacters ] = useState(undefined);

  useEffect(() => {
    console.log("start");

    (async () => {
      const response = await fetch("https://api.datadex.gg/v1/swgoh/units", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          minified: true,
        }),
      });

      const json = await response.json();
      console.log(json);

      setCharacters(json);
    })();
  }, []);

  return (
    <div className="relative flex flex-col w-full h-full">

      {/* HEADER */}
      <div className="flex w-full h-[3rem] bg-[#2b2d31] items-center border border-transparent border-b-[#1e1f22]">
        <FaHome className="ml-[1rem] w-5 h-5 text-white" />
        <span className="ml-2 text-white text-sm font-extrabold">Home</span>
      </div>

      <div className="p-[1rem] pr-0 h-[calc(100vh_-_3rem)] overflow-y-auto custom-scrollbar">
        <span className="text-yellow-200">{`<Content goes here>`}</span>

        <div className="flex flex-wrap gap-[1rem] w-full">
          {(characters) && Object.values(characters).map((character: any, index) => {
            return (
                <div key={index} className="w-[calc(33.3%_-_1rem)] bg-primary-5 border-2 border-primary-3">
                  <img className="w-[5rem] h-[5rem] rounded-full" src={`https://cdn.datadex.gg/swgoh/${character.thumbnail}.png`} alt="" />
                  <span className="text-red-300">#{index} {character.name}</span>
                </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}
