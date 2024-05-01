import SigninContentSection from "./signin-content-section";
import useStateManager from "../../state/state-manager";
import {ContentStates} from "../../state/page-state";
import PatchNotesContentSection from "./patch-notes-content-section";
import GuildHomeContentSection from "./guild/guild-home-content-section";
import SwgohHomeContentSection from "./swgoh-home-content-section";

export default function BaseContentSection(props) {
  const { update } = props;
  const { PageState } = useStateManager();

  return (
    <div className="w-full h-full">
      {PageState.getContentPage() === ContentStates.SIGNUP && <SigninContentSection update={update} />}
      {PageState.getContentPage() === ContentStates.SWGOH_HOME && <SwgohHomeContentSection update={update} />}
      {PageState.getContentPage() === ContentStates.PATCH_NOTES && <PatchNotesContentSection update={update} />}
      {PageState.getContentPage() === ContentStates.GUILD_HOME && <GuildHomeContentSection update={update} />}
    </div>
  )
}