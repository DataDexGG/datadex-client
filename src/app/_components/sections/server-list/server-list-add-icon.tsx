"use client";

export default function ServerListAddIcon(props) {
  const { update } = props;

  return (
    <div className={`cursor-pointer relative w-full h-fit tooltip-group`}
         onClick={() => {
           // Search for guild and add.
         }}
    >
      <div className={`relative w-[3.25rem] h-[3.25rem] rounded-full mx-auto mt-3 bg-[#313338]`}>
        <div className={`absolute w-[0.15rem] h-[1.3rem] bg-green-300 top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%]`}/>
        <div className={`absolute w-[1.3rem] h-[0.15rem] bg-green-300 top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%]`}/>
      </div>

      <div className="absolute tooltip w-fit h-fit py-2 px-4 bg-black rounded-xl top-[0.35rem] left-[5rem]">
        <span className="text-white whitespace-nowrap">Add a Guild</span>
        <p className="text-white text-xs whitespace-nowrap">Currently in development</p>
      </div>
    </div>
  )
}
