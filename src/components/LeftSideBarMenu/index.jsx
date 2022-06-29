import React from "react";
import { ChatIcon } from "@heroicons/react/outline";

const LeftSideBarMenu = () => {
  return (
    <div className="h-screen bg-appGray-300 hidden lg:col-span-2 lg:flex flex-col items-center pt-[25vh] shadow-xl">
      <div className="bg-appGray-200 w-[60px] h-[60px] flex justify-center items-center rounded-xl opacity-60">
        <ChatIcon className="w-6 h-6 text-appPurple-300 " />
      </div>
    </div>
  );
};

export default LeftSideBarMenu;
