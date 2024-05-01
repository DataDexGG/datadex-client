import useComlink from "../../comlink/comlink";
import useStateManager from "../../state/state-manager";
import {ContentStates, ListStates} from "../../state/page-state";

export default function ListFooterSection() {
  const { getSelf, isLoggedIn } = useComlink();
  const { PageState } = useStateManager();

  if (isLoggedIn()) {
    return (
      <div className="bg-[#232428] w-full">
        <div className={`flex w-full h-[3rem] items-center border border-transparent border-t-[#37393f]`}>
          <span className="ml-2 text-white">{getSelf().name ?? "Guest"}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#232428] w-full">
      <div className={`flex w-full h-[3rem] items-center border border-transparent border-t-[#37393f]`}
           onClick={() => {
             PageState.setListPage(ListStates.DASHBOARD);
             PageState.setContentPage(ContentStates.SIGNUP);
           }}>
        <span className="ml-2 text-white">Login</span>
      </div>
    </div>
  )
}