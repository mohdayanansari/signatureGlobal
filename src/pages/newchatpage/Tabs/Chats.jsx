import React from "react";
import { SearchIcon } from "@heroicons/react/outline";
// Importing Typing Chat Animated Component
import TypingAnimation from "../../../components/TypingAnimation";

const Chats = (props) => {
  const recentUsers = props.users.users;

  // console.log("🚀🚀", peoples);

  return (
    <div className="">
      {/* contaiber - 1  */}
      <div className="h-[100px] ">
        <h2 className="text-white opacity-80 text-[22px] font-semibold">
          Chats
        </h2>

        {/* Search Field */}
        <div className="relative text-gray-600 focus-within:text-gray-400 mt-5">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <button
              type="submit"
              className="p-1 focus:outline-none focus:shadow-outline"
            >
              <SearchIcon className="w-6 h-6 " />
            </button>
          </span>
          <input
            type="search"
            name="searchChat"
            placeholder="Search message or users"
            id=""
            className="py-3 text-base text-opacity-80 text-white bg-appGray-300 w-full rounded-md pl-12 focus:outline-none 
          focus:text-white"
          />
        </div>
      </div>
      {/* Recent Chat Section */}

      <div className="h-[30px]">
        <h4 className="text-white opacity-80 text-[16px] mt-5 font-semibold overflow-auto">
          Recent
        </h4>
      </div>
      <div className="overflow-y-auto custom-scroll scrollbar scrollbar-thumb-appPurple-200 scrollbar-track-transparent scrollbar-thin scrollbar-thumb-rounded">
        {/* -------- */}
        {recentUsers.map((user, index) => (
          <div key={user.id} className=" py-[10px] my-[5px] flex w-full ">
            {/* User Image Container */}
            <div>
              {user.profilePicture === "Null" ? (
                //todo Using this image if image is not available!!! TO FIX::  Show the first letter of the user instead
                // <img src="../../../assets/images/users/avatar-8.jpg" alt="asdad" />
                <div className="w-[40px] h-[40px] bg-appPurple-200 rounded-full flex justify-center items-center text-white text-opacity-80">
                  A
                </div>
              ) : (
                <img
                  src={user.profilePicture}
                  alt={user.name}
                  className="rounded-full w-[40px]"
                />
              )}
            </div>
            {/* User Image Container ENDS-- */}
            <div className="mt-[-5px] pl-4 w-full text-white text-opacity-80">
              <div className="flex justify-between pr-[10px]">
                <h1 className="font-bold ">{user.name}</h1>
                <div className="">
                  <p className="text-xs ">
                    {user.messages[user.messages.length - 1].time}
                  </p>
                </div>
              </div>
              {/* Last Message Or ---Typing State--- */}
              <div className="flex w-full justify-between pr-[10px]">
                {user.isTyping ? (
                  <>
                    <div className="flex items-center ">
                      <span className="text-appPurple-400 text-sm">typing</span>
                      <TypingAnimation />
                    </div>
                  </>
                ) : (
                  <p className=" text-sm">
                    {user.messages[user.messages.length - 1].message}
                  </p>
                )}
                {user.unRead === 0 ? (
                  ""
                ) : (
                  <div className="bg-red-500 h-[20px] w-[20px] text-red-600 font-bold bg-opacity-20 rounded-full flex justify-center items-center text-xs">
                    {user.unRead}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chats;
