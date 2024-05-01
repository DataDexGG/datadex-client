// "use client";
//
// import { FaArrowUp, FaArrowDown } from "react-icons/fa6";
// import { ImStatsBars } from "react-icons/im";
// import {useEffect, useState} from "react";
// import useGuildMembersFetcher from "../../member/members-fetcher";
// import {numberWithCommas} from "../../utils";
// import {MemberProfile, Unit} from "../../member/member-profile";
// import {getLeagueFromSkillLevel} from "../../league/champions-league";
// import GuildGalacticPowerGraph from "../../graphs/guild-galactic-power";
// import GuildGalacticPowerCharactersGraph from "../../graphs/guild-galactic-power-characters";
//
// const Stat = {
//   GALACTIC_POWER: 'gp',
//   GALACTIC_POWER_CHAR: 'gpc',
//   GALACTIC_POWER_SHIP: 'gps',
//   MEMBERS: 'm',
//   ZETAS: 'z',
//   OMICRONS: 'o',
//   RELIC_05: 'r05',
//   RELIC_67: 'r67',
//   RELIC_89: 'r89',
//   GALACTIC_LEGENDS: 'gl',
//   U_GALACTIC_LEGENDS: 'ugl',
//   AVERAGE_SKILL: 's',
// };
//
// export default function GuildBody(props) {
//   const { selectedGuild } = props;
//
//   const { members, membersLoaded } = useGuildMembersFetcher(selectedGuild);
//
//   const [ selectedTab, setSelectedTab ] = useState(null);
//   const [ characterPower, setCharacterPower ] = useState({current: 0, week: 0, month: 0});
//   const [ shipPower, setShipPower ] = useState({current: 0, week: 0, month: 0});
//   const [ zetas, setZetas ] = useState({current: 0, week: 0, month: 0});
//   const [ omicrons, setOmicrons ] = useState({current: 0, week: 0, month: 0});
//   const [ r05, setR05 ] = useState({current: 0, week: 0, month: 0});
//   const [ r67, setR67 ] = useState({current: 0, week: 0, month: 0});
//   const [ r89, setR89 ] = useState({current: 0, week: 0, month: 0});
//   const [ galacticLegends, setGalacticLegends ] = useState({current: 0, week: 0, month: 0});
//   const [ ultimateGalacticLegends, setUltimateGalacticLegends ] = useState({current: 0, week: 0, month: 0});
//   const [ averageSkill, setAverageSkill ] = useState({current: 0, week: 0, month: 0});
//
//   useEffect(() => {
//     if (!membersLoaded) return;
//
//     const current = {
//       characterPower: 0, shipPower: 0, zetas: 0, omicrons: 0,
//       gLegends: 0, ugLegends: 0, skill: 0,
//       r05: 0, r67: 0, r89: 0
//     };
//     members.forEach((member: MemberProfile) => {
//       current.characterPower += member.data.character_galactic_power;
//       current.shipPower += member.data.ship_galactic_power;
//       current.skill += member.data?.skill_rating;
//       member.units.forEach((unit: Unit) => {
//         current.zetas += unit.data?.zeta_abilities?.length ?? 0;
//         current.omicrons += unit.data?.omicron_abilities?.length ?? 0;
//
//         const relicLevel = Math.max((unit.data?.relic_tier ?? 0) - 2, 0);
//         const isGL = unit.data?.is_galactic_legend ?? false;
//         const isUGL = unit.data?.has_ultimate ?? false;
//
//         current.r05 += (relicLevel >= 1 && relicLevel <= 5) ? 1 : 0;
//         current.r67 += (relicLevel >= 6 && relicLevel <= 7) ? 1 : 0;
//         current.r89 += (relicLevel >= 8 && relicLevel <= 9) ? 1 : 0;
//         current.gLegends += (isGL) ? 1 : 0;
//         current.ugLegends += (isGL && isUGL) ? 1 : 0;
//       });
//     });
//     setCharacterPower({
//       current: current.characterPower,
//       week: 0,
//       month: 0
//     });
//     setShipPower({
//       current: current.shipPower,
//       week: 0,
//       month: 0
//     });
//     setZetas({
//       current: current.zetas,
//       week: 0,
//       month: 0
//     });
//     setOmicrons({
//       current: current.omicrons,
//       week: 0,
//       month: 0
//     });
//     setR05({
//       current: current.r05,
//       week: 0,
//       month: 0
//     });
//     setR67({
//       current: current.r67,
//       week: 0,
//       month: 0
//     });
//     setR89({
//       current: current.r89,
//       week: 0,
//       month: 0
//     });
//     setGalacticLegends({
//       current: current.gLegends,
//       week: 0,
//       month: 0
//     });
//     setUltimateGalacticLegends({
//       current: current.ugLegends,
//       week: 0,
//       month: 0
//     });
//     setAverageSkill({
//       current: (current.skill / selectedGuild.data.members.length),
//       week: 0,
//       month: 0
//     });
//   }, [membersLoaded]);
//
//   return (
//     <div className="relative w-full h-full">
//
//       {/* HEADER */}
//       <div className="absolute bg-[#313338] w-full h-full z-10">
//         <div className={`relative flex w-full h-[3rem] items-center`}>
//           <div className="absolute">
//             <img className="bg-[#dcdee1] rounded-lg p-0.5 ml-4 w-8 h-8" src={`https://swgoh.gg/static/img/assets/tex.${selectedGuild.data.banner_logo_id}.png`} alt="" />
//           </div>
//           <span className="ml-16 text-white font-medium">{selectedGuild.data.name}</span>
//           <span className="ml-2 text-white font-thin text-sm">{selectedGuild.data.external_message}</span>
//         </div>
//
//         {/* Spacer Icon */}
//         <div className={`w-full h-[0.1rem] bg-[#26272a] mx-auto`} />
//       </div>
//
//       {/*<div className="mt-[3.25rem]" />*/}
//
//       <div className="absolute pt-12 w-full h-full z-10">
//         <div className="relative p-3 w-full h-full overflow-y-auto custom-scrollbar">
//           <div className="h-full">
//             <div className="grid grid-cols-3 gap-3">
//
//               <div onClick={() => {
//                 if (selectedTab === Stat.GALACTIC_POWER) {
//                   setSelectedTab(null);
//                   return;
//                 }
//                 setSelectedTab(Stat.GALACTIC_POWER);
//               }} className={`cursor-pointer relative flex flex-col w-full h-[6rem] ${selectedTab === Stat.GALACTIC_POWER ? 'bg-[#313338]' : 'bg-[#2d2e33]'} border-2 border-[#26272a]`}>
//                 <span className="ml-2 mt-2 text-gray-300 text-sm font-semibold uppercase">Galactic Power</span>
//                 <span
//                   className="ml-2 text-white text-lg font-extrabold">{numberWithCommas(selectedGuild.data.galactic_power)}</span>
//                 <div className="absolute flex items-center bottom-2.5 left-0 m-2 text-[0.6rem]">
//                   <FaArrowUp className="text-green-400"/>
//                   <span className="ml-1 text-green-400">1.1%</span>
//                   <span className="ml-2 text-gray-500">Since last week</span>
//                 </div>
//                 <div className="absolute flex items-center bottom-1 left-0 ml-2 text-[0.6rem]">
//                   <FaArrowUp className="text-green-400"/>
//                   <span className="ml-1 text-green-400">1.1%</span>
//                   <span className="ml-2 text-gray-500">Since last month</span>
//                 </div>
//                 <div className="absolute top-0 right-0 m-2 p-2 bg-[#26272a]">
//                   <ImStatsBars className="text-3xl text-white"/>
//                 </div>
//               </div>
//
//               <div onClick={() => {
//                 if (selectedTab === Stat.GALACTIC_POWER_CHAR) {
//                   setSelectedTab(null);
//                   return;
//                 }
//                 setSelectedTab(Stat.GALACTIC_POWER_CHAR);
//               }} className={`cursor-pointer relative flex flex-col w-full h-[6rem] ${selectedTab === Stat.GALACTIC_POWER_CHAR ? 'bg-[#313338]' : 'bg-[#2d2e33]'} border-2 border-[#26272a]`}>
//                 <div className="ml-2 mt-2 text-gray-300 text-sm font-semibold uppercase">
//                   <span className="">Galactic Power (Characters)</span>
//                 </div>
//                 <span className="ml-2 text-white text-lg font-extrabold">{numberWithCommas(characterPower.current)}</span>
//                 <div className="absolute flex items-center bottom-2.5 left-0 m-2 text-[0.6rem]">
//                   <FaArrowUp className="text-green-400"/>
//                   <span className="ml-1 text-green-400">1.1%</span>
//                   <span className="ml-2 text-gray-500">Since last week</span>
//                 </div>
//                 <div className="absolute flex items-center bottom-1 left-0 ml-2 text-[0.6rem]">
//                   <FaArrowUp className="text-green-400"/>
//                   <span className="ml-1 text-green-400">1.1%</span>
//                   <span className="ml-2 text-gray-500">Since last month</span>
//                 </div>
//                 <div className="absolute top-0 right-0 m-2 p-2 bg-[#26272a]">
//                   <ImStatsBars className="text-3xl text-white"/>
//                 </div>
//               </div>
//
//               <div onClick={() => {
//                 if (selectedTab === Stat.GALACTIC_POWER_SHIP) {
//                   setSelectedTab(null);
//                   return;
//                 }
//                 setSelectedTab(Stat.GALACTIC_POWER_SHIP);
//               }} className={`cursor-pointer relative flex flex-col w-full h-[6rem] ${selectedTab === Stat.GALACTIC_POWER_SHIP ? 'bg-[#313338]' : 'bg-[#2d2e33]'} border-2 border-[#26272a]`}>
//                 <span className="ml-2 mt-2 text-gray-300 text-sm font-semibold uppercase">Galactic Power Ships</span>
//                 <span className="ml-2 text-white text-lg font-extrabold">{numberWithCommas(shipPower.current)}</span>
//                 <div className="absolute flex items-center bottom-2.5 left-0 m-2 text-[0.6rem]">
//                   <FaArrowUp className="text-green-400"/>
//                   <span className="ml-1 text-green-400">1.1%</span>
//                   <span className="ml-2 text-gray-500">Since last week</span>
//                 </div>
//                 <div className="absolute flex items-center bottom-1 left-0 ml-2 text-[0.6rem]">
//                   <FaArrowUp className="text-green-400"/>
//                   <span className="ml-1 text-green-400">1.1%</span>
//                   <span className="ml-2 text-gray-500">Since last month</span>
//                 </div>
//                 <div className="absolute top-0 right-0 m-2 p-2 bg-[#26272a]">
//                   <ImStatsBars className="text-3xl text-white"/>
//                 </div>
//               </div>
//
//               <div onClick={() => {
//                 if (selectedTab === Stat.MEMBERS) {
//                   setSelectedTab(null);
//                   return;
//                 }
//                 setSelectedTab(Stat.MEMBERS);
//               }} className={`cursor-pointer relative flex flex-col w-full h-[6rem] ${selectedTab === Stat.MEMBERS ? 'bg-[#313338]' : 'bg-[#2d2e33]'} border-2 border-[#26272a]`}>
//                 <span className="ml-2 mt-2 text-gray-300 text-sm font-semibold uppercase">Members</span>
//                 <span className="ml-2 text-white text-lg font-extrabold">{selectedGuild.data.members.length}</span>
//                 <div className="absolute flex items-center bottom-2.5 left-0 m-2 text-[0.6rem]">
//                   <FaArrowUp className="text-green-400"/>
//                   <span className="ml-1 text-green-400">1.1%</span>
//                   <span className="ml-2 text-gray-500">Since last week</span>
//                 </div>
//                 <div className="absolute flex items-center bottom-1 left-0 ml-2 text-[0.6rem]">
//                   <FaArrowUp className="text-green-400"/>
//                   <span className="ml-1 text-green-400">1.1%</span>
//                   <span className="ml-2 text-gray-500">Since last month</span>
//                 </div>
//                 <div className="absolute top-0 right-0 m-2 p-2 bg-[#26272a]">
//                   <ImStatsBars className="text-3xl text-white"/>
//                 </div>
//               </div>
//
//               <div onClick={() => {
//                 if (selectedTab === Stat.ZETAS) {
//                   setSelectedTab(null);
//                   return;
//                 }
//                 setSelectedTab(Stat.ZETAS);
//               }} className={`cursor-pointer relative flex flex-col w-full h-[6rem] ${selectedTab === Stat.ZETAS ? 'bg-[#313338]' : 'bg-[#2d2e33]'} border-2 border-[#26272a]`}>
//                 <span className="ml-2 mt-2 text-gray-300 text-sm font-semibold uppercase">Total Zetas</span>
//                 <span className="ml-2 text-white text-lg font-extrabold">{numberWithCommas(zetas.current)}</span>
//                 <div className="absolute flex items-center bottom-2.5 left-0 m-2 text-[0.6rem]">
//                   <FaArrowUp className="text-green-400"/>
//                   <span className="ml-1 text-green-400">1.1%</span>
//                   <span className="ml-2 text-gray-500">Since last week</span>
//                 </div>
//                 <div className="absolute flex items-center bottom-1 left-0 ml-2 text-[0.6rem]">
//                   <FaArrowUp className="text-green-400"/>
//                   <span className="ml-1 text-green-400">1.1%</span>
//                   <span className="ml-2 text-gray-500">Since last month</span>
//                 </div>
//                 <div className="absolute top-0 right-0 m-2 p-2 bg-[#26272a]">
//                   <ImStatsBars className="text-3xl text-white"/>
//                 </div>
//               </div>
//
//               <div onClick={() => {
//                 if (selectedTab === Stat.OMICRONS) {
//                   setSelectedTab(null);
//                   return;
//                 }
//                 setSelectedTab(Stat.OMICRONS);
//               }} className={`cursor-pointer relative flex flex-col w-full h-[6rem] ${selectedTab === Stat.OMICRONS ? 'bg-[#313338]' : 'bg-[#2d2e33]'} border-2 border-[#26272a]`}>
//                 <span className="ml-2 mt-2 text-gray-300 text-sm font-semibold uppercase">Total Omicrons</span>
//                 <span className="ml-2 text-white text-lg font-extrabold">{numberWithCommas(omicrons.current)}</span>
//                 <div className="absolute flex items-center bottom-2.5 left-0 m-2 text-[0.6rem]">
//                   <FaArrowUp className="text-green-400"/>
//                   <span className="ml-1 text-green-400">1.1%</span>
//                   <span className="ml-2 text-gray-500">Since last week</span>
//                 </div>
//                 <div className="absolute flex items-center bottom-1 left-0 ml-2 text-[0.6rem]">
//                   <FaArrowUp className="text-green-400"/>
//                   <span className="ml-1 text-green-400">1.1%</span>
//                   <span className="ml-2 text-gray-500">Since last month</span>
//                 </div>
//                 <div className="absolute top-0 right-0 m-2 p-2 bg-[#26272a]">
//                   <ImStatsBars className="text-3xl text-white"/>
//                 </div>
//               </div>
//
//               <div onClick={() => {
//                 if (selectedTab === Stat.RELIC_05) {
//                   setSelectedTab(null);
//                   return;
//                 }
//                 setSelectedTab(Stat.RELIC_05);
//               }} className={`cursor-pointer relative flex flex-col w-full h-[6rem] ${selectedTab === Stat.RELIC_05 ? 'bg-[#313338]' : 'bg-[#2d2e33]'} border-2 border-[#26272a]`}>
//                 <span className="ml-2 mt-2 text-gray-300 text-sm font-semibold uppercase">Relic 0-5 Characters</span>
//                 <span className="ml-2 text-white text-lg font-extrabold">{numberWithCommas(r05.current)}</span>
//                 <div className="absolute flex items-center bottom-2.5 left-0 m-2 text-[0.6rem]">
//                   <FaArrowUp className="text-green-400"/>
//                   <span className="ml-1 text-green-400">1.1%</span>
//                   <span className="ml-2 text-gray-500">Since last week</span>
//                 </div>
//                 <div className="absolute flex items-center bottom-1 left-0 ml-2 text-[0.6rem]">
//                   <FaArrowUp className="text-green-400"/>
//                   <span className="ml-1 text-green-400">1.1%</span>
//                   <span className="ml-2 text-gray-500">Since last month</span>
//                 </div>
//                 <div className="absolute top-0 right-0 m-2 p-2 bg-[#26272a]">
//                   <ImStatsBars className="text-3xl text-white"/>
//                 </div>
//               </div>
//
//               <div onClick={() => {
//                 if (selectedTab === Stat.RELIC_67) {
//                   setSelectedTab(null);
//                   return;
//                 }
//                 setSelectedTab(Stat.RELIC_67);
//               }} className={`cursor-pointer relative flex flex-col w-full h-[6rem] ${selectedTab === Stat.RELIC_67 ? 'bg-[#313338]' : 'bg-[#2d2e33]'} border-2 border-[#26272a]`}>
//                 <span className="ml-2 mt-2 text-gray-300 text-sm font-semibold uppercase">Relic 6-7 Characters</span>
//                 <span className="ml-2 text-white text-lg font-extrabold">{numberWithCommas(r67.current)}</span>
//                 <div className="absolute flex items-center bottom-2.5 left-0 m-2 text-[0.6rem]">
//                   <FaArrowUp className="text-green-400"/>
//                   <span className="ml-1 text-green-400">1.1%</span>
//                   <span className="ml-2 text-gray-500">Since last week</span>
//                 </div>
//                 <div className="absolute flex items-center bottom-1 left-0 ml-2 text-[0.6rem]">
//                   <FaArrowUp className="text-green-400"/>
//                   <span className="ml-1 text-green-400">1.1%</span>
//                   <span className="ml-2 text-gray-500">Since last month</span>
//                 </div>
//                 <div className="absolute top-0 right-0 m-2 p-2 bg-[#26272a]">
//                   <ImStatsBars className="text-3xl text-white"/>
//                 </div>
//               </div>
//
//               <div onClick={() => {
//                 if (selectedTab === Stat.RELIC_89) {
//                   setSelectedTab(null);
//                   return;
//                 }
//                 setSelectedTab(Stat.RELIC_89);
//               }} className={`cursor-pointer relative flex flex-col w-full h-[6rem] ${selectedTab === Stat.RELIC_89 ? 'bg-[#313338]' : 'bg-[#2d2e33]'} border-2 border-[#26272a]`}>
//                 <span className="ml-2 mt-2 text-gray-300 text-sm font-semibold uppercase">Relic 8-9 Characters</span>
//                 <span className="ml-2 text-white text-lg font-extrabold">{numberWithCommas(r89.current)}</span>
//                 <div className="absolute flex items-center bottom-2.5 left-0 m-2 text-[0.6rem]">
//                   <FaArrowUp className="text-green-400"/>
//                   <span className="ml-1 text-green-400">1.1%</span>
//                   <span className="ml-2 text-gray-500">Since last week</span>
//                 </div>
//                 <div className="absolute flex items-center bottom-1 left-0 ml-2 text-[0.6rem]">
//                   <FaArrowUp className="text-green-400"/>
//                   <span className="ml-1 text-green-400">1.1%</span>
//                   <span className="ml-2 text-gray-500">Since last month</span>
//                 </div>
//                 <div className="absolute top-0 right-0 m-2 p-2 bg-[#26272a]">
//                   <ImStatsBars className="text-3xl text-white"/>
//                 </div>
//               </div>
//
//               <div onClick={() => {
//                 if (selectedTab === Stat.GALACTIC_LEGENDS) {
//                   setSelectedTab(null);
//                   return;
//                 }
//                 setSelectedTab(Stat.GALACTIC_LEGENDS);
//               }} className={`cursor-pointer relative flex flex-col w-full h-[6rem] ${selectedTab === Stat.GALACTIC_LEGENDS ? 'bg-[#313338]' : 'bg-[#2d2e33]'} border-2 border-[#26272a]`}>
//                 <span className="ml-2 mt-2 text-gray-300 text-sm font-semibold uppercase">Galactic Legends</span>
//                 <span className="ml-2 text-white text-lg font-extrabold">{numberWithCommas(galacticLegends.current)}</span>
//                 <div className="absolute flex items-center bottom-2.5 left-0 m-2 text-[0.6rem]">
//                   <FaArrowUp className="text-green-400"/>
//                   <span className="ml-1 text-green-400">1.1%</span>
//                   <span className="ml-2 text-gray-500">Since last week</span>
//                 </div>
//                 <div className="absolute flex items-center bottom-1 left-0 ml-2 text-[0.6rem]">
//                   <FaArrowUp className="text-green-400"/>
//                   <span className="ml-1 text-green-400">1.1%</span>
//                   <span className="ml-2 text-gray-500">Since last month</span>
//                 </div>
//                 <div className="absolute top-0 right-0 m-2 p-2 bg-[#26272a]">
//                   <ImStatsBars className="text-3xl text-white"/>
//                 </div>
//               </div>
//
//               <div onClick={() => {
//                 if (selectedTab === Stat.U_GALACTIC_LEGENDS) {
//                   setSelectedTab(null);
//                   return;
//                 }
//                 setSelectedTab(Stat.U_GALACTIC_LEGENDS);
//               }} className={`cursor-pointer relative flex flex-col w-full h-[6rem] ${selectedTab === Stat.U_GALACTIC_LEGENDS ? 'bg-[#313338]' : 'bg-[#2d2e33]'} border-2 border-[#26272a]`}>
//                 <span className="ml-2 mt-2 text-gray-300 text-sm font-semibold uppercase">Ultimate Galactic Legends</span>
//                 <span className="ml-2 text-white text-lg font-extrabold">{numberWithCommas(ultimateGalacticLegends.current)}</span>
//                 <div className="absolute flex items-center bottom-2.5 left-0 m-2 text-[0.6rem]">
//                   <FaArrowUp className="text-green-400"/>
//                   <span className="ml-1 text-green-400">1.1%</span>
//                   <span className="ml-2 text-gray-500">Since last week</span>
//                 </div>
//                 <div className="absolute flex items-center bottom-1 left-0 ml-2 text-[0.6rem]">
//                   <FaArrowUp className="text-green-400"/>
//                   <span className="ml-1 text-green-400">1.1%</span>
//                   <span className="ml-2 text-gray-500">Since last month</span>
//                 </div>
//                 <div className="absolute top-0 right-0 m-2 p-2 bg-[#26272a]">
//                   <ImStatsBars className="text-3xl text-white"/>
//                 </div>
//               </div>
//
//               <div onClick={() => {
//                 if (selectedTab === Stat.AVERAGE_SKILL) {
//                   setSelectedTab(null);
//                   return;
//                 }
//                 setSelectedTab(Stat.AVERAGE_SKILL);
//               }} className={`cursor-pointer relative flex flex-col w-full h-[6rem] ${selectedTab === Stat.AVERAGE_SKILL ? 'bg-[#313338]' : 'bg-[#2d2e33]'} border-2 border-[#26272a]`}>
//                 <span className="ml-2 mt-2 text-gray-300 text-sm font-semibold uppercase">Average Skill</span>
//                 <span className="ml-2 text-white text-lg font-extrabold">{numberWithCommas(Math.round(averageSkill.current))} {getLeagueFromSkillLevel(averageSkill.current).name}</span>
//                 <div className="absolute flex items-center bottom-2.5 left-0 m-2 text-[0.6rem]">
//                   <FaArrowUp className="text-green-400"/>
//                   <span className="ml-1 text-green-400">1.1%</span>
//                   <span className="ml-2 text-gray-500">Since last week</span>
//                 </div>
//                 <div className="absolute flex items-center bottom-1 left-0 ml-2 text-[0.6rem]">
//                   <FaArrowUp className="text-green-400"/>
//                   <span className="ml-1 text-green-400">1.1%</span>
//                   <span className="ml-2 text-gray-500">Since last month</span>
//                 </div>
//                 <div className="absolute top-0 right-0 m-2 p-2 bg-[#26272a]">
//                   <ImStatsBars className="text-3xl text-white"/>
//                 </div>
//               </div>
//
//             </div>
//
//             <div className="relative mt-3 pb-3 h-fit z-20">
//               {(selectedTab !== null) && (
//                 <div>
//                   {(selectedTab === Stat.GALACTIC_POWER) && <GuildGalacticPowerGraph/>}
//                   {(selectedTab === Stat.GALACTIC_POWER_CHAR) && <GuildGalacticPowerCharactersGraph />}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
