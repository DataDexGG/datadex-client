import useStateManager from "../../state/state-manager";
import {ListStates} from "../../state/page-state";
import DashboardNavSection from "./dashboard-nav-section";
import MemberListSection from "./member-list-section";

export default function BaseListSection(props) {
  const { update } = props;
  const { PageState } = useStateManager();

  return (
    <div className="w-full h-full">
      {PageState.getListPage() === ListStates.DASHBOARD && <DashboardNavSection update={update} />}
      {/*{PageState.getListPage() === ListStates.GUILD_MEMBERS && <MemberListSection update={update} />}*/}
    </div>
  )
}