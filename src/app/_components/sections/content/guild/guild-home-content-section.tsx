import { FaArrowUp, FaArrowDown } from "react-icons/fa6";
import { ImStatsBars } from "react-icons/im";
import useStateManager from "../../../state/state-manager";
import {SharedStateKeys} from "../../../state/shared-state";
import {getPercentage, numberWithCommas} from "../../../utils";
import {useEffect, useState} from "react";
import _ from "lodash";
import useComlink from "../../../comlink/comlink";

const Stat = {
  GALACTIC_POWER: { key: 'galactic_power', label: 'Galactic Power' },
  GALACTIC_POWER_CHAR: { key: 'character_galactic_power', label: 'Character Power' },
  GALACTIC_POWER_SHIP: { key: 'ship_galactic_power', label: 'Ship Power' },
  MEMBERS: { key: 'members', label: 'Members' },
  ZETAS: { key: 'zetas', label: 'Zetas' },
  OMICRONS: { key: 'omicrons', label: 'Omicrons' },
  RELIC_15: { key: 'relic_1_5', label: 'Relics (1 - 5)' },
  RELIC_67: { key: 'relic_6_7', label: 'Relics (6 - 7)' },
  RELIC_89: { key: 'relic_8_9', label: 'Relics (8 - 9)' },
  GALACTIC_LEGENDS: 10,
  U_GALACTIC_LEGENDS: 11,
  AVERAGE_SKILL: 12,
};

export default function GuildHomeContentSection(props) {
  const { update } = props;
  const { SharedState } = useStateManager();
  const { getPlayerById, PlayerHelper, getSkills, getEnums } = useComlink();

  const guild = SharedState.get(SharedStateKeys.SELECTED_GUILD);
  if (!guild) return null;

  const [ stats, setStats ] = useState<any>({});
  const [ selectedStat, setSelectedStat ] = useState(undefined);

  const [ isStatsLoading, setIsStatsLoading ] = useState({ current: true, week: true, month: true });

  useEffect(() => {
    (async () => {
      const skills_data = getSkills().data;
      const enums_data = getEnums().data;

      const start = Date.now();

      const template: any = {
        galactic_power: 0,
        ship_galactic_power: 0,
        character_galactic_power: 0,
        members: 0,
        zetas: 0,
        omicrons: 0,
        relic_1_5: 0,
        relic_6_7: 0,
        relic_8_9: 0,
      };

      const current: any = _.cloneDeep(template);
      const week: any = _.cloneDeep(template);  //7d  ago from now
      const month: any = _.cloneDeep(template); //30d ago from now

      // CURRENT
      {
        const getPlayerPromises = [];

        current.members = guild.member.length;

        for (let i = 0; i < guild.member.length; i++) {
          const member = guild.member[i];

          const galactic_power = parseInt(member.galacticPower);
          const ship_galactic_power = parseInt(member.shipGalacticPower);
          const character_galactic_power = parseInt(member.characterGalacticPower);

          current.galactic_power += galactic_power;
          current.ship_galactic_power += ship_galactic_power;
          current.character_galactic_power += character_galactic_power;

          getPlayerPromises.push(getPlayerById(member.playerId));
        }

        const players = await Promise.all(getPlayerPromises);

        for (let i = 0; i < players.length; i++) {
          const player = players[i];
          const { zetas, omicrons } = PlayerHelper.getPlayerOmicronsAndZetas(player, skills_data);
          current.zetas += zetas;
          current.omicrons += omicrons;

          const { relic_1_5, relic_6_7, relic_8_9 } = PlayerHelper.getRelicCount(player, enums_data);
          current.relic_1_5 += relic_1_5;
          current.relic_6_7 += relic_6_7;
          current.relic_8_9 += relic_8_9;
        }
      }

      // WEEK
      {}

      // MONTH
      {}

      const compiled = { current, week, month };
      setStats(compiled);
      // setIsStatsLoading((prev) => {
      //   prev.current = false;
      //   return prev;
      // });

      console.log(`Took: ${Date.now() - start}ms`);
    })();
  }, []);

  return (
    <div className="grid grid-rows-[3rem_auto]">

      {/* HEADER */}
      <div className="flex w-full h-[3rem] bg-[#313338] items-center border border-transparent border-b-[#26272a]">
        <img className="ml-[1rem] bg-[#dcdee1] rounded-lg p-0.5 w-6 h-6"
             src={`https://swgoh.gg/static/img/assets/tex.${guild.profile.bannerLogoId}.png`}
             alt="" />

        <span className="mx-[1rem] text-white">{guild.profile.name}</span>

        <div className={`w-[0.1rem] h-full bg-[#26272a]`} />
      </div>

      <div className="h-[calc(100vh_-_3rem)] p-4 overflow-y-auto custom-scrollbar">
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

          {createStatBox(selectedStat, setSelectedStat, stats, isStatsLoading, Stat.GALACTIC_POWER)}
          {createStatBox(selectedStat, setSelectedStat, stats, isStatsLoading, Stat.GALACTIC_POWER_CHAR)}
          {createStatBox(selectedStat, setSelectedStat, stats, isStatsLoading, Stat.GALACTIC_POWER_SHIP)}
          {createStatBox(selectedStat, setSelectedStat, stats, isStatsLoading, Stat.MEMBERS)}
          {createStatBox(selectedStat, setSelectedStat, stats, isStatsLoading, Stat.ZETAS)}
          {createStatBox(selectedStat, setSelectedStat, stats, isStatsLoading, Stat.OMICRONS)}
          {createStatBox(selectedStat, setSelectedStat, stats, isStatsLoading, Stat.RELIC_15)}
          {createStatBox(selectedStat, setSelectedStat, stats, isStatsLoading, Stat.RELIC_67)}
          {createStatBox(selectedStat, setSelectedStat, stats, isStatsLoading, Stat.RELIC_89)}

        </div>
      </div>

      {/* HEADER */}
      {/*<div className="absolute bg-[#313338] w-full h-full z-10">*/}
      {/*  <div className={`relative flex w-full h-[3rem] items-center`}>*/}
      {/*    <div className="absolute">*/}
      {/*      <img className="bg-[#dcdee1] rounded-lg p-0.5 ml-4 w-8 h-8"*/}
      {/*           src={`https://swgoh.gg/static/img/assets/tex.${guild.profile.bannerLogoId}.png`}*/}
      {/*           alt="" />*/}
      {/*    </div>*/}
      {/*    <span className="ml-16 text-white font-medium">{guild.profile.name}</span>*/}
      {/*    <span className="ml-2 text-white font-thin text-sm">{guild.profile.externalMessageKey}</span>*/}
      {/*  </div>*/}

      {/*  /!* Spacer Icon *!/*/}
      {/*  <div className={`w-full h-[0.1rem] bg-[#26272a] mx-auto`} />*/}
      {/*</div>*/}

      {/*<div className="mt-[3.25rem]" />*/}

      {/*<div className="absolute pt-12 w-full h-full z-10">*/}
      {/*  <div className="relative p-3 w-full h-full overflow-y-auto custom-scrollbar">*/}
      {/*    <div className="h-full">*/}
      {/*      <div className="grid grid-cols-3 gap-3">*/}

              {/*<div className={`cursor-pointer relative flex flex-col w-full h-[6rem] ${selectedStat === Stat.GALACTIC_POWER ? 'bg-[#313338]' : 'bg-[#2d2e33]'} border-2 border-[#26272a]`}>*/}
              {/*  <span className="ml-2 mt-2 text-gray-300 text-sm font-semibold uppercase">Galactic Power</span>*/}
              {/*  <span className="ml-2 text-white text-lg font-extrabold">{numberWithCommas(stats?.current?.galactic_power ?? 0)}</span>*/}
              {/*  <div className="absolute flex items-center bottom-2.5 left-0 m-2 text-[0.6rem]">*/}
              {/*    <FaArrowUp className="text-green-400"/>*/}
              {/*    <span className="ml-1 text-green-400">1.1%</span>*/}
              {/*    <span className="ml-2 text-gray-500">Since last week</span>*/}
              {/*  </div>*/}
              {/*  <div className="absolute flex items-center bottom-1 left-0 ml-2 text-[0.6rem]">*/}
              {/*    <FaArrowUp className="text-green-400"/>*/}
              {/*    <span className="ml-1 text-green-400">1.1%</span>*/}
              {/*    <span className="ml-2 text-gray-500">Since last month</span>*/}
              {/*  </div>*/}
              {/*  <div className="absolute top-0 right-0 m-2 p-2 bg-[#26272a]">*/}
              {/*    <ImStatsBars className="text-3xl text-white"/>*/}
              {/*  </div>*/}
              {/*</div>*/}

      {/*        <div className={`cursor-pointer relative flex flex-col w-full h-[6rem] ${selectedStat === Stat.GALACTIC_POWER_CHAR ? 'bg-[#313338]' : 'bg-[#2d2e33]'} border-2 border-[#26272a]`}>*/}
      {/*          <div className="ml-2 mt-2 text-gray-300 text-sm font-semibold uppercase">*/}
      {/*            <span className="">Galactic Power (Characters)</span>*/}
      {/*          </div>*/}
      {/*          <span className="ml-2 text-white text-lg font-extrabold">{numberWithCommas(stats?.current?.character_galactic_power ?? 0)}</span>*/}
      {/*          <div className="absolute flex items-center bottom-2.5 left-0 m-2 text-[0.6rem]">*/}
      {/*            <FaArrowUp className="text-green-400"/>*/}
      {/*            <span className="ml-1 text-green-400">1.1%</span>*/}
      {/*            <span className="ml-2 text-gray-500">Since last week</span>*/}
      {/*          </div>*/}
      {/*          <div className="absolute flex items-center bottom-1 left-0 ml-2 text-[0.6rem]">*/}
      {/*            <FaArrowUp className="text-green-400"/>*/}
      {/*            <span className="ml-1 text-green-400">1.1%</span>*/}
      {/*            <span className="ml-2 text-gray-500">Since last month</span>*/}
      {/*          </div>*/}
      {/*          <div className="absolute top-0 right-0 m-2 p-2 bg-[#26272a]">*/}
      {/*            <ImStatsBars className="text-3xl text-white"/>*/}
      {/*          </div>*/}
      {/*        </div>*/}

      {/*        <div className={`cursor-pointer relative flex flex-col w-full h-[6rem] ${selectedStat === Stat.GALACTIC_POWER_SHIP ? 'bg-[#313338]' : 'bg-[#2d2e33]'} border-2 border-[#26272a]`}>*/}
      {/*          <span className="ml-2 mt-2 text-gray-300 text-sm font-semibold uppercase">Galactic Power Ships</span>*/}
      {/*          <span className="ml-2 text-white text-lg font-extrabold">{numberWithCommas(stats?.current?.ship_galactic_power ?? 0)}</span>*/}
      {/*          <div className="absolute flex items-center bottom-2.5 left-0 m-2 text-[0.6rem]">*/}
      {/*            <FaArrowUp className="text-green-400"/>*/}
      {/*            <span className="ml-1 text-green-400">1.1%</span>*/}
      {/*            <span className="ml-2 text-gray-500">Since last week</span>*/}
      {/*          </div>*/}
      {/*          <div className="absolute flex items-center bottom-1 left-0 ml-2 text-[0.6rem]">*/}
      {/*            <FaArrowUp className="text-green-400"/>*/}
      {/*            <span className="ml-1 text-green-400">1.1%</span>*/}
      {/*            <span className="ml-2 text-gray-500">Since last month</span>*/}
      {/*          </div>*/}
      {/*          <div className="absolute top-0 right-0 m-2 p-2 bg-[#26272a]">*/}
      {/*            <ImStatsBars className="text-3xl text-white"/>*/}
      {/*          </div>*/}
      {/*        </div>*/}

      {/*      </div>*/}

      {/*      <div className="relative mt-3 pb-3 h-fit z-20">*/}
      {/*        {(selectedStat !== null) && (*/}
      {/*          <div>*/}
      {/*            /!*{(selectedTab === Stat.GALACTIC_POWER) && <GuildGalacticPowerGraph/>}*!/*/}
      {/*            /!*{(selectedTab === Stat.GALACTIC_POWER_CHAR) && <GuildGalacticPowerCharactersGraph />}*!/*/}
      {/*          </div>*/}
      {/*        )}*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
}

function createStatBox(selectedStat, setSelectedStat, stats, isStatsLoading, type) {
  const current = stats.current ? (stats?.current[type.key] ?? 0) : 0;
  const week = stats.week ? (stats?.week[type.key] ?? 0) : 0;
  const month = stats.month ? (stats?.month[type.key] ?? 0) : 0;

  let changeWeek, changeMonth;
  let percentageChangeWeek = week > 0 ? ((current - week) / week) * 100 : 0;
  let percentageChangeMonth = month > 0 ? ((current - month) / month) * 100 : 0;

  if (percentageChangeWeek > 999.99) changeWeek = ">999.99";
  else if (percentageChangeWeek < -999.99) changeWeek = "<999.99";
  else changeWeek = percentageChangeWeek.toFixed(2);

  if (percentageChangeMonth > 999.99) changeMonth = ">999.99";
  else if (percentageChangeMonth < -999.99) changeMonth = "<999.99";
  else changeMonth = percentageChangeMonth.toFixed(2);

  const weekColor = percentageChangeWeek < 0 ? 'text-red-400' : 'text-green-400';
  const iconWeek = percentageChangeWeek < 0
    ? <FaArrowDown className="text-red-400"/>
    : <FaArrowUp className="text-green-400"/>;

  const monthColor = percentageChangeMonth < 0 ? 'text-red-400' : 'text-green-400';
  const iconMonth = percentageChangeMonth < 0
    ? <FaArrowDown className="text-red-400"/>
    : <FaArrowUp className="text-green-400"/>;

  return (
    <div className={`cursor-pointer relative flex flex-col w-full h-[6rem] border-2 bg-[#2d2e33] hover:bg-[#313338]
                    ${selectedStat === type ? 'bg-[#313338]' : 'bg-[#2d2e33]'}
                    ${selectedStat === type ? 'border-gray-300' : 'border-[#26272a]'}`}
         onClick={() => {
           if (selectedStat === type) {
             setSelectedStat(undefined);
             return;
           }
           setSelectedStat(type);
         }}
    >
      <span className="ml-2 mt-2 text-gray-300/90 text-sm font-semibold uppercase">{type.label}</span>
      {isStatsLoading.current
        ? <span className="ml-2 text-white text-lg font-extrabold">{numberWithCommas(current)}</span>
        : <span className="ml-2 text-white text-lg font-extrabold">Loading...</span>
      }
      <div className="absolute flex items-center bottom-2.5 left-0 m-2 text-[0.6rem]">
        {iconWeek}
        <span className={`ml-1 ${weekColor}`}>{changeWeek}%</span>
        <span className="ml-2 text-gray-500">Since last week</span>
      </div>
      <div className="absolute flex items-center bottom-1 left-0 ml-2 text-[0.6rem]">
        {iconMonth}
        <span className={`ml-1 ${monthColor}`}>{changeMonth}%</span>
        <span className="ml-2 text-gray-500">Since last month</span>
      </div>
      <div className="absolute top-0 right-0 m-2 p-2 bg-[#26272a]">
        <ImStatsBars className="text-3xl text-white"/>
      </div>
    </div>
  )
}