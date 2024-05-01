"use client";

import {useEffect, useState} from "react";
import useComlink from "../_components/comlink/comlink";

function getCharacter(unit, comlink) {
    const skill_data = comlink.getSkills().data;
    const unit_data = comlink.getUnits().data;
    const localization_data = comlink.getLocalization().data;

    let image = "";
    let displayName = unit.definitionId;
    let combatType = unit.combatType;
    let stars = 1;
    let maxStars = 7;

    for (let i = 0; i < unit_data.length; i++) {
        if (unit_data[i].id === unit.definitionId) {
            console.log(unit_data[i]);
            image = unit_data[i].thumbnailName;
            displayName = localization_data[`${unit_data[i].nameKey}`];
            combatType = unit_data[i].combatType;
            stars = unit_data[i].rarity;
            maxStars = unit_data[i].maxRarity;
            break;
        }
    }

    if (combatType !== 1)
        return null;

    const { zetas, omicrons } = comlink.PlayerHelper.getUnitOmicronsAndZetas(unit, skill_data);

    return (
        <div className="mx-4 flex p-4 w-[10rem] h-[12rem]">
            <div className="relative w-full h-full my-2">
                <img className={`absolute rounded-full w-[8rem] h-[8rem] border-2 border-gray-400`} src={`https://cdn.datadex.gg/swgoh/${image}.png`} alt="" />

                {/* GEAR & RELIC SIDES */}
                {/*<img className={`absolute w-[3.25rem] -left-2.5 top-1`} src="https://cdn.datadex.gg/dex-swgoh/gear-3-left.png" alt="" />*/}
                {/*<img className={`absolute w-[3.25rem] -right-2.5 top-1`} src="https://cdn.datadex.gg/dex-swgoh/gear-3-right.png" alt="" />*/}
                <img className={`absolute w-[5.25rem] -left-7 -top-4`} src="https://cdn.datadex.gg/dex-swgoh/gear-13-blue-left.png" alt="" />
                <img className={`absolute w-[5.25rem] -right-7 -top-4`} src="https://cdn.datadex.gg/dex-swgoh/gear-13-blue-right.png" alt="" />

                {/* OUTER RELIC SIDES */}
                <img className={`absolute w-[3.5rem] -left-[1.85rem] -top-3`} src="https://cdn.datadex.gg/dex-swgoh/outter-relic-yellow-left.png" alt="" />
                <img className={`absolute w-[3.5rem] -right-[1.85rem] -top-3`} src="https://cdn.datadex.gg/dex-swgoh/outter-relic-yellow-right.png" alt="" />

                {/* Level Background */}
                {/*<img className={`absolute w-[3.25rem] bottom-3 right-1/2 transform translate-x-1/2`} src="https://cdn.datadex.gg/dex-swgoh/blue-relic-level-background.png" alt="" />*/}
                {/*<img className={`absolute w-[3.25rem] bottom-3 right-1/2 transform translate-x-1/2`} src="https://cdn.datadex.gg/dex-swgoh/red-relic-level-background.png" alt="" />*/}
                {/*<img className={`absolute w-[3.25rem] bottom-3 right-1/2 transform translate-x-1/2`} src="https://cdn.datadex.gg/dex-swgoh/yellow-relic-level-background.png" alt="" />*/}
                {/*<img className={`absolute w-[3.75rem] bottom-2 right-1/2 transform translate-x-1/2`} src="https://cdn.datadex.gg/dex-swgoh/white-relic-level-background.png" alt="" />*/}
                {/*<img className={`absolute w-[2.5rem] bottom-5 right-1/2 transform translate-x-1/2`} src="https://cdn.datadex.gg/dex-swgoh/yellow-level-background.png" alt="" />*/}
                <img className={`absolute w-[2.5rem] bottom-5 right-1/2 transform translate-x-1/2`} src="https://cdn.datadex.gg/dex-swgoh/level-background.png" alt="" />

                {/* Level & Relic Level */}
                <div className={`absolute bottom-7 right-1/2 transform translate-x-1/2`}>
          <span className="text-white text-sm font-semibold" style={{
              textShadow: "1px 1px 3px black"
          }}>{unit.currentLevel}</span>
                </div>

                {/* Display Name */}
                <div className={`absolute flex -top-[1.5rem] w-full justify-center`}>
          <span className="text-[#9bffff] text-sm font-semibold truncate" style={{
              textShadow: "1px 1px 3px black"
          }}>{displayName}</span>
                </div>

                {/* Stars */}
                <div className="absolute flex w-full bottom-0 right-1/2 transform translate-x-1/2">
                    {Array.from({length: stars}).map((i, index) => (
                        <img key={index} className={`w-[1.25rem]`} src="https://cdn.datadex.gg/dex-swgoh/star.png" alt="" />
                    ))}
                    {Array.from({length: maxStars - stars}).map((i, index) => (
                        <img key={index} className={`-ml-0.5 w-[1.25rem]`} src="https://cdn.datadex.gg/dex-swgoh/empty-star.png" alt="" />
                    ))}
                </div>

                {/* OMICRON */}
                {(omicrons > 0) && (
                    <div className="absolute -right-0 bottom-7">
                        <img className={`w-[2.8rem]`} src="https://cdn.datadex.gg/dex-swgoh/omicron.png" alt="" />
                        <div className={`absolute top-1.5 right-1/2 transform translate-x-1/2`}>
            <span className="text-white text-xs font-normal" style={{
                textShadow: "1px 1px 3px black"
            }}>{omicrons}</span>
                        </div>
                    </div>
                )}

                {/* ZETA */}
                {(zetas > 0) && (
                    <div className="absolute -left-0 bottom-7">
                        <img className={`w-[2.8rem]`} src="https://cdn.datadex.gg/dex-swgoh/zeta.png" alt="" />
                        <div className={`absolute top-2 right-1/2 transform translate-x-1/2`}>
            <span className="text-white text-xs font-normal" style={{
                textShadow: "1px 1px 3px black"
            }}>{zetas}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default function Home() {
    const comlink = useComlink();

    const [ player, setPlayer ] = useState(undefined);

    useEffect(() => {
        if (player) return;
        (async () => {
            const player = await comlink.getPlayer("466-735-188");
            setPlayer(player);
            console.log(player);
        })();
    }, [])

    const list = [1,1,1,1]
    return (
        <>
            <div className="flex flex-wrap gap-3 m-3 justify-center">
                {(player) && player.rosterUnit.map((unit, index) => {
                    const character = getCharacter(unit, comlink);
                    if (!character) return null;

                    return (
                        <div key={index} className="scale-75 -mx-[1.5rem] -my-[1.5rem] bg-gray-600">
                            {character}
                        </div>
                    )
                })}
            </div>

            {/*<div className="flex flex-wrap gap-3 m-3 justify-center">*/}
            {/*  {list.map((i, index) => {*/}
            {/*    return (*/}
            {/*      <div key={index} className="bg-gray-600">*/}
            {/*        {getCharacter()}*/}
            {/*      </div>*/}
            {/*    )*/}
            {/*  })}*/}
            {/*</div>*/}

            {/*<div className="flex flex-wrap gap-3 m-3 justify-center">*/}
            {/*  {list.map((i, index) => {*/}
            {/*    return (*/}
            {/*      <div key={index} className="scale-95 -mx-[0.29rem] -my-[0.29rem] bg-gray-600">*/}
            {/*        {getCharacter()}*/}
            {/*      </div>*/}
            {/*    )*/}
            {/*  })}*/}
            {/*</div>*/}

            {/*<div className="flex flex-wrap gap-3 m-3 justify-center">*/}
            {/*  {list.map((i, index) => {*/}
            {/*    return (*/}
            {/*      <div key={index} className="scale-90 -mx-[0.6rem] -my-[0.6rem] bg-gray-600">*/}
            {/*        {getCharacter()}*/}
            {/*      </div>*/}
            {/*    )*/}
            {/*  })}*/}
            {/*</div>*/}

            {/*<div className="flex flex-wrap gap-3 m-3 justify-center">*/}
            {/*  {list.map((i, index) => {*/}
            {/*    return (*/}
            {/*      <div key={index} className="scale-75 -mx-[1.5rem] -my-[1.5rem] bg-gray-600">*/}
            {/*        {getCharacter()}*/}
            {/*      </div>*/}
            {/*    )*/}
            {/*  })}*/}
            {/*</div>*/}

            {/*<div className="flex flex-wrap gap-3 m-3 justify-center">*/}
            {/*  {list.map((i, index) => {*/}
            {/*    return (*/}
            {/*      <div key={index} className="scale-50 -mx-[3rem] -my-[3rem] bg-gray-600">*/}
            {/*        {getCharacter()}*/}
            {/*      </div>*/}
            {/*    )*/}
            {/*  })}*/}
            {/*</div>*/}
        </>
    )
}
