import useStateManager from "../../state/state-manager";
import useComlink from "../../comlink/comlink";
import {SharedStateKeys} from "@/app/_components/state/shared-state";
import {ContentStates, ListStates} from "@/app/_components/state/page-state";

export default function GuildList(props) {
  const { update } = props;
  const { PageState, SharedState } = useStateManager();
  const { getCachedGuilds } = useComlink();

  return (
    <div>
      {Object.values(getCachedGuilds()).map((g, index) => {
        const guild: any = g;
        const id = guild.profile.id;

        const selectedGuild = SharedState.get(SharedStateKeys.SELECTED_GUILD);
        const selectedGuildId = selectedGuild?.profile?.id ?? 'null';

        const isSelected = id === selectedGuildId;

        const rounded = isSelected ? 'rounded-2xl' : 'rounded-full';

        return (
          <div key={index} className={`cursor-pointer relative w-full h-fit tooltip-group`}
               onClick={() => {
                 SharedState.set(SharedStateKeys.SELECTED_GUILD, guild);
                 SharedState.set(SharedStateKeys.SELECTED_MEMBER, null);

                 PageState.setListPage(ListStates.GUILD_MEMBERS);
                 PageState.setContentPage(ContentStates.GUILD_HOME);
                 update();
               }}
          >

            {/* GRAY BAR NEXT TO ICON */}
            {(isSelected === true) && <div className={`absolute w-1 h-[2.5rem] bg-[#f2f3f5] mt-[0.3rem] rounded-r-2xl`}/>}

            <div className={`relative w-[3.25rem] h-[3.25rem] mx-auto mt-3 bg-[#dcdee1] ${rounded}`}>
              <img className={`absolute w-[2.5rem] h-[2.3rem] top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%]`}
                   src={`https://swgoh.gg/static/img/assets/tex.${guild.profile.bannerLogoId}.png`}
                   alt=""/>
            </div>

            <div className="absolute tooltip w-fit h-fit py-2 px-4 bg-black rounded-xl top-[0.35rem] left-[5rem]">
              <span className="text-white whitespace-nowrap">{guild.profile.name}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}