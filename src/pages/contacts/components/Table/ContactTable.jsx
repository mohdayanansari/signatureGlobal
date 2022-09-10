import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { axiosInstance } from "../../../../utils/axios-instance";
//? ==================>
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ContactList = ({
  id,
  name,
  number,
  createdAt,
  username,
  unseen,
  unseen_count,
}) => {
  const [contactData, setContactData] = useState({
    name,
    number,
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const date = new Date(createdAt).toLocaleDateString("en-US");

  const handleDelete = async () => {};
  const handleChange = (e) => {
    const inName = e.target.name;
    const inValue = e.target.value;
    setContactData({
      ...contactData,
      [inName]: inValue,
    });
    console.log(contactData.name, contactData.number);
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("name", contactData.name);
    data.append("number", contactData.number);
    try {
      const result = axiosInstance.post("edit_contact", data);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex glassed ">
        {/* col-1 */}
        <div className="w-[15vw] border-r border-b flex items-center border-white/10 p-[10px]">
          <h1 className="font-bold text-white/80">{!name ? "User" : name}</h1>
        </div>
        <div className="border-b flex items-center w-[15vw] border-r border-white/10 p-[10px]">
          <p className="text-white/70">{number}</p>
        </div>
        {/* col-2 */}
        <div className="border-b flex items-center w-[10vw] border-r border-white/10 p-[10px]"></div>
        {/* col-3 */}
        <div className="border-b flex items-center w-[30vw] border-r border-white/10 p-[10px]"></div>
        {/* col-4 ::Created At:: */}
        <div className="border-b  flex items-center text-white/80 font-bold w-[15vw] border-r border-white/10 p-[10px]">
          {date}
        </div>
        {/* col-5 */}
        <div className="border-b w-[15vw] border-r border-white/10 p-[10px] flex items-center justify-center gap-[10px]">
          <button
            onClick={handleOpen}
            className="bg-white/20 rounded-xl p-[10px]"
          >
            <PencilIcon className="w-[20px] text-white/60 " />
          </button>
          <button className="bg-white/20 rounded-xl p-[10px]">
            <TrashIcon className="w-[20px] text-white/60" />
          </button>
        </div>
      </div>

      {/* Update Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleUpdate}>
            <div className="flex flex-col w-full gap-8">
              <TextField
                id="standard-basic"
                label="Name"
                name="name"
                value={contactData.name}
                onChange={handleChange}
                variant="standard"
              />
              <TextField
                id="standard-basic"
                label="Phone"
                name="number"
                value={contactData.number}
                onChange={handleChange}
                variant="standard"
              />
              <button
                type="submit"
                className="bg-[#FED500] rounded px-[10px] py-[5px] text-sm font-bold text-black/80"
              >
                Update Contact
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};

const ContactTable = ({ contacts }) => {
  console.log(contacts);

  return (
    <div className="px-[50px]">
      <div className="flex rounded-t-lg glassed bg-white/20">
        <div className="text-white w-[15vw] border-r border-white/10 p-[10px]">
          Name
        </div>
        <div className="text-white w-[15vw] border-r border-white/10 p-[10px]">
          Phone Number
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
