"use client";

import {useEffect, useState} from "react";

const mock_violations = [
  {
    type: 'Warning',
    message: 'Raid Tickets',
    extra: "Didn't earn any raid tokens today.",
    issuer: 'Obi',
    date: '2021-09-01',
  },
  {
    type: 'Warning',
    message: 'Raid Tickets',
    extra: "Didn't earn any raid tokens today.",
    issuer: 'Obi',
    date: '2021-09-01',
  },
  {
    type: 'Warning',
    message: 'Raid Tickets',
    extra: "Didn't earn any raid tokens today.",
    issuer: 'Obi',
    date: '2021-09-01',
  },
  {
    type: 'Critical',
    message: 'TW Contribution',
    extra: "Didn't contribute to TW.",
    issuer: 'Din Djarin',
    date: '2021-09-01',
  },
  {
    type: 'Critical',
    message: 'Offencive Language',
    extra: "Rude towards multiple officers.",
    issuer: 'Neo',
    date: '2021-09-01',
  },
]

async function fetchUserData() {
  const response = await fetch('http://localhost:5001/swgoh/proxy/https://swgoh.gg/api/player/466735188', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Origin': 'https://swgoh.gg',
      'X-Requested-With': 'XMLHttpRequest',
    },
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const json = await response.json();

  return json;
}

function buildCharacter(characterRegistry, data, index) {
  const displayName = data.name;
  const level = data.level;
  const stars = data.rarity;
  const relicLevel = data.relic_tier - 2;
  const gearLevel = data.gear_level;
  const isLightSide = characterRegistry[data.base_id].alignment !== "Dark Side";
  const isGalacticLegend = data.is_galactic_legend ?? false;
  const zetas = data.zeta_abilities?.length ?? 0;
  const omicrons = data.omicron_abilities?.length ?? 0;
  const isRelic = relicLevel > 0;

  const gearBadge = undefined;//getGearBadge(gearLevel, isRelic, !isLightSide, isGalacticLegend);

  return (
    <div key={index} className="relative w-[10.5rem] h-52 bg-gray-500 border-2 border-black">

      {/* CHARACTER IMAGE */}
      <img className="absolute mt-4 ml-7 w-28 h-28 rounded-full"
            src={characterRegistry[data.base_id].image}
            alt="" />

      {/* GEAR IMAGE */}
      <img className={`absolute ${gearBadge.classes}`}
            src={gearBadge.image}
            alt="" />

      {/* RELIC BADGE */}
      {(isRelic) ? (
        <img className="absolute top-[6.05rem] right-1/2 transform translate-x-1/2"
              src={isLightSide ? "/assets/images/blue-relic-badge.png" : "/assets/images/red-relic-badge.png"}
              alt="" />
      ) : (
        <img className="absolute scale-110 top-[6.8rem] right-1/2 transform translate-x-1/2"
              src="/assets/images/level-blue-badge.png"
              alt="" />
      )}

      {(zetas > 0) && (
        <div>
          <img className="absolute w-11 top-[5rem] left-[2.75rem] transform -translate-x-1/2"
                src="/assets/images/zeta-badge.png"
                alt="" />
          <span className="absolute top-[5.75rem] left-[2.75rem] transform -translate-x-1/2 text-white text-sm">{zetas}</span>
        </div>
      )}

      {(omicrons > 0) && (
        <div>
          <img className="absolute w-12 top-[5rem] right-[2.75rem] transform translate-x-1/2"
                src="/assets/images/omicron-badge.png"
                alt="" />
          <span className="absolute top-[5.75rem] right-[2.75rem] transform translate-x-1/2 text-white text-sm">{omicrons}</span>
        </div>
      )}

      {/* LEVEL */}
      <div className="absolute top-24 right-1/2 transform translate-x-1/2 translate-y-1/2">
        <span className="text-white text-xl">{isRelic ? relicLevel : level}</span>
      </div>

      {/* STARS */}
      <div className="absolute top-[9rem] right-1/2 transform translate-x-1/2 translate-y-1/2 scale-110">
        <div className="grid grid-cols-7">
          {[...Array(stars)].map((e, i) => {
            return (<div key={i}><img className="w-6" src="/assets/images/star_1.png" alt="" /></div>)
          })}
          {[...Array(7 - stars)].map((e, i) => {
            return (<div key={i}><img className="w-6" src="/assets/images/star_2.png" alt="" /></div>)
          })}
        </div>
      </div>

      {/* NAME */}
      <div className="absolute top-[9.5rem] right-1/2 transform translate-x-1/2 translate-y-1/2">
        <span className="font-bold text-white text-md whitespace-nowrap">{displayName.substring(0, 18)}</span>
      </div>

      {/* POWER */}
      <div className="absolute top-[10.5rem] right-1/2 transform translate-x-1/2 translate-y-1/2">
        <span className="font-bold text-white text-xs whitespace-nowrap">Power: {numberWithCommas(data.power)}</span>
      </div>
    </div>
  )
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function Dashboard() {
  const [ userData, setUserData ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  // const { characterRegistry, charactersLoaded } = useCharacterFetcher();

  const characterRegistry = undefined;
  const charactersLoaded = undefined;

  useEffect(() => {
    fetchUserData().then((data) => {
      setUserData(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="overflow-x-hidden">
      <nav className="relative w-full h-[4rem] bg-gray-200">
        <div className="absolute ml-6 pt-1.5">
          <div>
            <span className="w-fit h-full">Logged in as:</span>
          </div>

          <div className="w-fit cursor-pointer">
            {/*<span className="text-sm text-blue-600 border border-blue-600 p-0.5 px-1">Logout</span>*/}
            <span className="font-bold text-md">Yoda</span>
            <span className="ml-1 text-xs uppercase border border-pink-700 text-pink-700 rounded-lg px-1">Co-Council</span>
          </div>
        </div>

        <div className="absolute pt-4 left-1/2 transform -translate-x-1/2">
          <span className="text-lg font-bold">Management</span>
        </div>
      </nav>


      <header className="mt-8 relative flex h-12 ml-2 text-2xl justify-center">
        <span className="font-bold ml-4 mt-2">Currently Viewing</span>
      </header>
      {(!loading) && (
        <header className="relative flex h-12 ml-2 text-2xl justify-center">
          <span className="font-bold ml-4 mt-2">{userData.data.name}</span>
          <div className="ml-3 mt-1.5">
            <span className="text-sm">{userData.data.ally_code.toString().substring(0, 3)}-</span>
            <span className="text-sm">{userData.data.ally_code.toString().substring(3, 6)}-</span>
            <span className="text-sm">{userData.data.ally_code.toString().substring(6, 9)}</span>
          </div>
        </header>
      )}

      {(!loading) && (
        <section className="bg-white">
          <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
            <div className="grid max-w-screen-md gap-8 mx-auto text-gray-900 grid-cols-1 sm:grid-cols-3">
              <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 p-3">
                <dt className="mb-2 text-3xl md:text-4xl font-extrabold">{numberWithCommas(userData.data.galactic_power)}</dt>
                <dd className="font-light text-gray-500">Galactic Power</dd>
              </div>
              <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200">
                <dt className="mb-2 text-3xl md:text-4xl font-extrabold">{numberWithCommas(userData.data.character_galactic_power)}</dt>
                <dd className="font-light text-gray-500">Characters GP</dd>
              </div>
              <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200">
                <dt className="mb-2 text-3xl md:text-4xl font-extrabold">{numberWithCommas(userData.data.ship_galactic_power)}</dt>
                <dd className="font-light text-gray-500">Ships GP</dd>
              </div>
            </div>

            <div className="mt-4 grid max-w-screen-md gap-8 mx-auto text-gray-900 sm:grid-cols-3">
              <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 p-3">
                <dt className="mb-2 text-3xl md:text-4xl font-extrabold">#{userData.data.arena_rank}</dt>
                <dd className="font-light text-gray-500">Arena Rank</dd>
              </div>
              <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200">
                <dt className="mb-2 text-3xl md:text-4xl font-extrabold">{numberWithCommas(userData.data.guild_contribution)}</dt>
                <dd className="font-light text-gray-500">Guild Tokens Earned</dd>
              </div>
              <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200">
                <dt className="mb-2 text-3xl md:text-4xl font-extrabold">{numberWithCommas(userData.data.skill_rating)}</dt>
                <dd className="font-light text-gray-500">Current Skill Rating</dd>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* VIOLATIONS */}
      {/*<header className="flex justify-center mt-5 relative flex h-12 ml-2 text-3xl">*/}
      {/*  <span className="font-bold ml-4 mt-2">Violations ({mock_violations.length})</span>*/}
      {/*  <div onClick={() => {*/}
      {/*    console.log('add violation');*/}
      {/*  }} className="select-none cursor-pointer relative mt-2 ml-3 text-green-800 bg-green-200 border-2 border-green-800 w-8 h-8">*/}
      {/*    <span className="absolute ml-1.5 -mt-1 text-2xl">+</span>*/}
      {/*  </div>*/}
      {/*</header>*/}

      {/*<div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2 w-full px-6">*/}
      {/*  {mock_violations.map((violation, index) => {*/}
      {/*    return (*/}
      {/*      <div className="max-w-sm rounded overflow-hidden shadow-lg">*/}
      {/*        <div className="px-6 py-4">*/}
      {/*          <div className="font-bold text-xl">{violation.message}</div>*/}
      {/*          <p className="text-sm">{violation.extra}</p>*/}
      {/*          <span className="text-gray-700 text-sm italic">{violation.date}</span>*/}
      {/*        </div>*/}
      {/*        <div className="px-4 pb-2">*/}
      {/*          <div className={`flex inline-block ${violation.type === "Warning" ? 'bg-yellow-200' : 'bg-red-200'} rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2`}>*/}
      {/*            Type:*/}
      {/*            <span className="ml-1.5 font-bold">{violation.type}</span>*/}
      {/*          </div>*/}
      {/*          <div className={`flex inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2`}>*/}
      {/*            Issued by:*/}
      {/*            <span className="ml-1.5 font-bold">{violation.issuer}</span>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    )*/}
      {/*  })}*/}
      {/*</div>*/}


      <div className="mt-10 flex justify-center">
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px">
            <div className="me-2 cursor-pointer">
              <div className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300">
                Characters
              </div>
            </div>
            <div className="me-2 cursor-pointer">
              <div className="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg">
                Ships
              </div>
            </div>
          </ul>
        </div>
      </div>

      {/* CHARACTERS */}
      {/*<header className="flex justify-center mt-10 relative flex h-12 ml-2 text-3xl">*/}
      {/*  <span className="font-bold ml-4 mt-2">Characters</span>*/}
      {/*</header>*/}

      {/* "grid max-w-screen-md gap-8 mx-auto text-gray-900 grid-cols-1 sm:grid-cols-3" */}

      {(!loading && charactersLoaded) && (
        <div className="m-2 overflow-hidden overflow-x-auto mx-auto
                        max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl
                        grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-9">

          {Object.entries(userData.units.sort(function(a, b){return b.data.power - a.data.power})).map(([key, value], index) => {
            const data = value.data;

            // Ignore ships
            if (data.combat_type !== 1)
              return null;

            return (
              <div key={index} className="flex items-center justify-center">
                <div className="w-full pb-2">
                  {buildCharacter(characterRegistry, data, index)}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  );
}
