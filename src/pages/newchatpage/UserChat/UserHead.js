import React from "react";

const UserHead = ({ name , number , timestamp , chatDisabled }) => {
  // console.log(activeUser);
  return (
    <div className="flex items-center bg-appGray-700 w-full h-[80px] px-[30px] text-white text-opacity-80 font-[24px]  gap-4 shadow-xl border-b border-white border-opacity-10">
        <div className="w-[40px] h-[40px] bg-appPurple-200 rounded-full flex justify-center items-center text-white text-opacity-80">
            {number ? name.toString()[0] : "R"}

        </div>
        <div>
            <div className={"flex justify-start items-center"}>
                <h1 className={"font-bold"}>{number ? name : "Recipient name"}</h1>
                {!chatDisabled && <div className="w-[10px] h-[10px] bg-green-500 rounded-full ml-[10px]"/>}
            </div>
            {timestamp && (
                chatDisabled ? <p className={"text-sm"}>Your chat is disabled</p>
                    : (<>
                        <p className={"text-sm "}>{`Your chat will be active till ${timestamp}`}</p>
                    </>)
            )}
        </div>
    </div>
  );
};

export default UserHead;
