import React from "react";

const Header = () => {
  return (
    <div className="justify-between h-[60px] border-b border-white/10 px-[40px] flex items-center mb-[20px]">
      <div>
        <h1 className="text-white text-lg font-bold">Contacts</h1>
      </div>
      <div>
        <button className="bg-[#FED500] rounded px-[10px] py-[5px] text-sm font-bold text-black/80">
          +Add Contact
        </button>
      </div>
    </div>
  );
};

export default Header;
