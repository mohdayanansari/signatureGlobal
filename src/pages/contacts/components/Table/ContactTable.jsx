import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import React from "react";

const ContactList = ({
  id,
  name,
  number,
  createdAt,
  username,
  unseen,
  unseen_count,
}) => {
  const date = new Date(createdAt).toLocaleDateString("en-US");
  return (
    <div className="flex glassed ">
      {/* col-1 */}
      <div className="w-[30vw] border-r border-white/10 p-[10px]">
        <h1 className="text-white/80 font-bold">{name}</h1>
        <p className="text-white/70">{number}</p>
      </div>
      {/* col-2 */}
      <div className="w-[10vw] border-r border-white/10 p-[10px]"></div>
      {/* col-3 */}
      <div className="w-[30vw] border-r border-white/10 p-[10px]"></div>
      {/* col-4 ::Created At:: */}
      <div className="flex items-center text-white/80 font-bold w-[15vw] border-r border-white/10 p-[10px]">{date}</div>
      {/* col-5 */}
      <div className="w-[15vw] border-r border-white/10 p-[10px] flex items-center justify-center gap-[10px]">
        <button className="bg-white/20 rounded-xl p-[10px]">
          <PencilIcon className="w-[20px] text-white/60 " />
        </button>
        <button className="bg-white/20 rounded-xl p-[10px]">
          <TrashIcon className="w-[20px] text-white/60" />
        </button>
      </div>
    </div>
  );
};

const ContactTable = ({ contacts }) => {
  console.log(contacts);

  return (
    <div className="px-[50px]">
      <div className="flex glassed rounded-t-lg bg-white/20">
        <div className="text-white w-[30vw] border-r border-white/10 p-[10px]">
          Basic Info
        </div>
        <div className="text-white w-[10vw] border-r border-white/10 p-[10px]">
          Status
        </div>
        <div className="text-white w-[30vw] border-r border-white/10 p-[10px]">
          Custom Attributes
        </div>
        <div className="text-white w-[15vw] border-r border-white/10 p-[10px]">
          Created Date
        </div>
        <div className="flex justify-center items-center text-white w-[15vw] border-r border-white/10 p-[10px]">
          Edit/Delete
        </div>
      </div>
      {contacts.map((contact, index) => (
        <ContactList
          key={contact?._id}
          id={contact?._id}
          name={contact?.name}
          number={contact?.number}
          createdAt={contact?.created_at}
          username={contact?.username}
          unseen={contact?.unseen}
          unseen_count={contact?.unseen_count}
        />
      ))}
    </div>
  );
};

export default ContactTable;
