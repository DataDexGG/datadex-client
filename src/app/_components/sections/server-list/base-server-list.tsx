import ServerListLogo from "./server-list-logo";
import ServerListAddIcon from "./server-list-add-icon";
import ServerListSearchIcon from "./server-list-search-icon";
import GuildList from "./guild-list";

const spacer = <div className={`mb-4 w-1/2 h-[0.15rem] bg-[#313338] mx-auto mt-4`} />;

export default function BaseServerListSection(props) {
  const { update } = props;

  return (
    <div className="">
      <ServerListLogo update={update} />
      {spacer}
      <GuildList update={update} />
      {spacer}
      <ServerListAddIcon update={update} />
      <ServerListSearchIcon update={update} />
    </div>
  )
}