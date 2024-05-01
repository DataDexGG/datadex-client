import ListFooterSection from "./list-footer-section";
import {ContentStates} from "../../state/page-state";
import useStateManager from "../../state/state-manager";
import {MdExpandMore, MdOutlineSpaceDashboard} from "react-icons/md";
import {FaHome, FaUserCog} from "react-icons/fa";
import {GiProgression} from "react-icons/gi";
// import {FaHome, FaUserCog} from "react-icons/fa";
// import {MdExpandMore, MdOutlineSpaceDashboard} from "react-icons/md";
// import {GiProgression} from "react-icons/gi";

const Categories = {
  NEW_TOOLS: {
    key: 'new_tools',
    label: '⭐ New Tools ⭐'
  },
  POPULAR_TOOLS: {
    key: 'popular_tools',
    label: 'Popular Tools'
  },
  SOMETHING_1: {
    key: 'something_1',
    label: 'Another Category'
  },
};

const NavItems = [
  {
    label: 'Home',
    category: null,
    state: ContentStates.SWGOH_HOME,
    top: true,
  },
  {
    label: 'Journey Guide Tracker',
    category: Categories.NEW_TOOLS,
    state: ContentStates.GL_PROGRESS,
  },
  {
    label: 'Something here',
    category: Categories.POPULAR_TOOLS,
    state: ContentStates.SOMETHING_HERE,
  },
  {
    label: 'Something here',
    category: Categories.POPULAR_TOOLS,
    state: ContentStates.SOMETHING_HERE,
  },
  {
    label: 'Something here',
    category: Categories.POPULAR_TOOLS,
    state: ContentStates.SOMETHING_HERE,
  },
  {
    label: 'Something here',
    category: Categories.POPULAR_TOOLS,
    state: ContentStates.SOMETHING_HERE,
  },
  {
    label: 'Something here',
    category: Categories.SOMETHING_1,
    state: ContentStates.SOMETHING_HERE,
  },
  {
    label: 'Something here',
    category: Categories.SOMETHING_1,
    state: ContentStates.SOMETHING_HERE,
  },
];

export default function DashboardNavSection(props) {
  const { update } = props;
  const { PageState } = useStateManager();

  const page = PageState.getContentPage();

  return (
    <div className="grid grid-rows-[3rem_auto_3rem]">

      {/* HEADER */}
      <div className="flex w-full h-[3rem] bg-[#2b2d31] items-center border border-transparent border-b-[#1e1f22]">
        <MdOutlineSpaceDashboard className="ml-4 w-4 h-4 text-white" />
        <span className="ml-2 text-white text-sm font-extrabold">SWGOH Dashboard</span>
      </div>

      <div className="h-[calc(100vh_-_6rem)] w-full overflow-y-auto custom-scrollbar">
        <div className="mb-4" />

        {NavItems.map((item, index) => {
          if (!item.top)
            return;

          const bg = page === item.state ? 'bg-[#404248]' : '';
          const text = page === item.state ? 'text-white' : 'text-[#959ba3]';

          let icon = undefined;
          if (item.label === 'Home') icon = <FaHome className="w-5 h-5 text-[#959ba3]" />;

          return (
            <div key={index}
                 className="cursor-pointer w-full h-fit relative flex items-center rounded-lg"
                 onClick={() => {
                   PageState.setContentPage(item.state);
                   update();
                 }}
            >
              <div className={`mx-2 py-[0.35rem] px-2.5 flex w-full items-center rounded
                                    hover:bg-[#404248] ${bg} 
                                    hover:text-[#dcdee1] ${text}`}>
                {icon}
                <span className="ml-[0.6rem] text-sm font-medium">{item.label}</span>
              </div>
            </div>
          )
        })}

        <div className="mb-4" />
        <div className="px-5"><div className={`w-full h-[0.1rem] bg-[#3d3e43] bottom-0`}/></div>
        <div className="mb-4" />

        {Object.values(Categories).map((category, category_index) => {
          let itemsInCategory = 0;
          for (let i = 0; i < NavItems.length; i++) {
            if (NavItems[i].category === category)
              itemsInCategory++;
          }

          if (itemsInCategory === 0)
            return undefined;

          return (
            <div key={category_index} className="">
              <div className="mb-[0.1rem] flex items-center">
                <MdExpandMore className="text-[#959ba3]" />
                <span className="ml-1 text-xs text-[#959ba3] uppercase">{category.label}</span>
              </div>

              {NavItems.map((item, index) => {
                if (item.category !== category)
                  return undefined;

                const bg = page === item.state ? 'bg-[#404248]' : '';
                const text = page === item.state ? 'text-white' : 'text-[#959ba3]';

                let icon = undefined;
                if (item.label === 'Journey Guide Tracker') icon = <GiProgression className="w-5 h-5 text-[#959ba3]" />
                else if (item.label === 'Something here') icon = <FaUserCog className="w-5 h-5 text-[#959ba3]" />

                return (
                  <div key={index}
                       className={`cursor-pointer w-full h-fit
                                   relative flex items-center rounded-lg`}
                       onClick={() => {
                         PageState.setContentPage(item.state);
                         update();
                       }}
                  >
                    <div className={`mx-2 py-[0.35rem] px-2.5 flex w-full items-center rounded
                                    hover:bg-[#404248] ${bg} 
                                    hover:text-[#dcdee1] ${text}`}>
                      {icon}
                      <span className="ml-[0.6rem] text-sm font-medium">{item.label}</span>
                    </div>
                  </div>
                )
              })}

              <div className="mb-4" />
            </div>
          )
        })}
      </div>

      <ListFooterSection />
    </div>
  )
}