"use client";

import useStateManager from "../../state/state-manager";
import {ContentStates, ListStates} from "../../state/page-state";
import {SharedStateKeys} from "../../state/shared-state";

export default function ServerListLogo(props) {
  const { update } = props;
  const { PageState, SharedState } = useStateManager();

  const isDashboard = PageState.getListPage() === ListStates.DASHBOARD;
  const highlightColor = isDashboard ? 'bg-[#5a64ea]' : 'bg-[#313338]';

  return (
    <div className={`cursor-pointer relative w-full h-fit tooltip-group`}
         onClick={() => {
           SharedState.set(SharedStateKeys.SELECTED_MEMBER, null);
           SharedState.set(SharedStateKeys.SELECTED_GUILD, null);

           PageState.setListPage(ListStates.DASHBOARD);
           PageState.setContentPage(ContentStates.PATCH_NOTES);

           update();
         }}
    >

      {/* GRAY BAR NEXT TO ICON */}
      {(isDashboard) && (
        <div className={`absolute w-1 h-[2.5rem] bg-[#f2f3f5] mt-[0.3rem] rounded-r-2xl`}/>
      )}

      <div className={`relative w-[3.25rem] h-[3.25rem] rounded-2xl mx-auto mt-3 ${highlightColor}`}>
        {/*<img className="absolute w-[2.5rem] h-[2.3rem] top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%]"*/}
        {/*     src="/assets/images/new/panel-logo.png"*/}
        {/*     alt=""/>*/}
      </div>

      <div className="absolute tooltip w-fit h-fit py-2 px-4 bg-black rounded-xl top-[0.35rem] left-[5rem]">
        <span className="text-white whitespace-nowrap">Dashboard</span>
      </div>
    </div>
  )
}
