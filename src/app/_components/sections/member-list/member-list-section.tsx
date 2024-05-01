import ListFooterSection from "./list-footer-section";
import useStateManager from "../../state/state-manager";
import {SharedStateKeys} from "../../state/shared-state";
import {toCountdownDisplayDescriptive, toReadableAllycode} from "../../utils";
import useComlink from "../../comlink/comlink";

export default function MemberListSection(props) {
  const { update } = props;
  const { SharedState } = useStateManager();
  const { getPortraits } = useComlink();

  const selectedGuild = SharedState.get(SharedStateKeys.SELECTED_GUILD);
  const selectedMember = SharedState.get(SharedStateKeys.SELECTED_MEMBER);

  if (!selectedGuild || !selectedGuild.member)
    return null;

  return (
    <div className="grid grid-rows-[3rem_auto_3rem] h-full">

      {/* HEADER */}
      <div className="flex w-full h-[3rem] bg-[#2b2d31] items-center border border-transparent border-b-[#1e1f22]">
        <img className="ml-4 w-4 h-4" src="/assets/images/new/members-icon.svg" alt=""/>
        <span className="ml-2 text-white font-medium">Members</span>
      </div>

      {/* CONTENT */}
      <div className="h-[calc(100vh_-_6rem)] overflow-y-auto custom-scrollbar">
        {selectedGuild.member.map((member, index) => {
          const totalMembers = selectedGuild.member.length;
          const isSelected = selectedMember?.playerId === member.playerId;

          const mb = totalMembers === index + 1 ? 'mb-0' : 'mb-1';
          const bg = isSelected ? 'bg-[#404248]' : 'bg-[#2b2d31]';

          const lastActivityTime = new Date(parseInt(member.lastActivityTime)).getTime();
          const now = Date.now();
          const activityDiff = now - lastActivityTime;

          const memberPortraitId = member.playerPortrait;
          const portraits: any = getPortraits().data;
          const portraitTexIcon = getPortraitTex(portraits, memberPortraitId);

          return (
            <div key={index}
                 className={`cursor-pointer relative ${mb} w-full h-[3.5rem] ${bg} hover:bg-[#404248]`}
                 onClick={() => {
                   if (selectedMember?.ally_code === member.ally_code) {
                     SharedState.set(SharedStateKeys.SELECTED_MEMBER, null);
                     return;
                   }
                   SharedState.set(SharedStateKeys.SELECTED_MEMBER, member);
                   update();
                 }}
            >
              <div className="absolute">
                <img className="ml-1.5 mt-1.5 w-[2.5rem] h-[2.5rem] top-1/2"
                     src={member.portrait_image}
                     alt=""/>
              </div>
              <div className="absolute">
                <img className="ml-1.5 mt-1.5 w-[2.5rem] h-[2.5rem] top-1/2"
                     src={`https://game-assets.swgoh.gg/${portraitTexIcon}.png`}
                     alt=""/>
              </div>

              <div className="absolute top-1.5">
                <span className="ml-[3.25rem] text-white text-sm">{member.playerName}</span>
              </div>
              <div className="absolute top-[1.5rem] ml-[3.25rem] font-thin text-gray-300">
                <span className="text-[0.65rem]">Last Active: </span>
                <span className="text-[0.65rem]">{toCountdownDisplayDescriptive(activityDiff)}</span>
                <span className="text-[0.65rem]"> ago</span>
              </div>

              {/*{getGuildRoleBadge(member.member_level)}*/}

              <div className={`absolute w-full h-[0.1rem] bg-[#3d3e43] mx-auto bottom-0`}/>
            </div>
          )
        })}
      </div>

      {/* FOOTER */}
      <ListFooterSection />
    </div>
  )
}

function getPortraitTex(portraits, id) {
  const array: any[] = Object.values(portraits);
  for (let value of array) {
    if (value.id === id) {
      return value.icon;
    }
  }
  return "https://placehold.co/100";
}