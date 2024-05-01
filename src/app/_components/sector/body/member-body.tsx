"use client";

import RaidTokenWeeklyGraph from "../../graphs/raid-tokens";
import GalacticPowerGraph from "../../graphs/galactic-power";
import GalacticPowerCharactersGraph from "../../graphs/galactic-power-characters";
import GalacticPowerShipsGraph from "../../graphs/galactic-power-ships";

export default function MemberBody(props) {
  const { selectedGuild, selectedMember } = props;

  return (
    <div className="">

      {/* HEADER */}
      <div className="absolute bg-[#313338] w-full z-10">
        <div className={`relative flex w-full h-[3rem] items-center`}>
          <div className="absolute">
            <img className="ml-4 w-8 h-8" src={selectedMember.portrait_image} alt="" />
          </div>
          <div className="absolute">
            <img className="ml-4 w-8 h-8" src={selectedMember.league_frame_image} alt="" />
          </div>
          <span className="ml-16 text-white font-medium">{selectedMember.player_name}</span>
          <span className="ml-2 text-white font-thin text-sm">{selectedMember.ally_code}</span>
        </div>

        {/* Spacer Icon */}
        <div className={`w-full h-[0.1rem] bg-[#26272a] mx-auto`} />
      </div>

      {/* BODY */}
      <div className="absolute pt-[4rem] w-full h-full p-3">

        <RaidTokenWeeklyGraph guild={selectedGuild} member={selectedMember} />

        <div className="mt-3 grid grid-cols-3 gap-3">
          <GalacticPowerGraph guild={selectedGuild} member={selectedMember} />
          <GalacticPowerCharactersGraph />
          <GalacticPowerShipsGraph />
        </div>

      </div>
    </div>
  )
}
