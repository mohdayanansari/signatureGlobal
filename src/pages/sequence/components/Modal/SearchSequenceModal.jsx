import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { axiosInstance } from "../../../../utils/axios-instance";

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
const SearchSequenceModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchSequenceRes, setSearchSequenceRes] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.get(`alljobs/${phone}`);
      setSearchSequenceRes(res.data);
      console.log(res.data);
      setIsLoading(true);
      console.log(new Date("2022-04-09 12:41:51.959000"));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        className="p-2 bg-[#FED500] text-black rounded-md  px-5 font-semibold shadow transform transition-all duration-300 hover:scale-95 "
      >
        Search Sequence
      </Button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box
            sx={style}
            className="rounded-lg outline-none border-none shadow-md w-[90vw] h-[90vh] mx-auto bg-white/80 backdrop-blur-sm"
          >
            <h1 className="text-2xl text-gray-800 font-bold">
              Search Sequence
            </h1>
            <hr className="mb-2" />
            <form
              onSubmit={handleSubmit}
              className="flex flex-col pt-5 pr-2 w-full gap-4"
            >
              <TextField
                id="outlined-basic"
                label="Phone Number"
                constiant="outlined"
                name="phone"
                value={phone}
                required
                onChange={(e) => setPhone(e.target.value)}
              />

              <Button
                constiant="contained"
                type="submit"
                endIcon={<SendIcon />}
                className="bg-[#FED500] shadow text-black sticky bottom-0 ml-3"
              >
                Submit
              </Button>
            </form>
            {isLoading ? (
              <div className=" mt-4 flex gap-2">
                <div className="bg-purple-200 w-1/2 p-5 rounded-lg  overflow-y-auto h-[60vh] ">
                  <div className="sticky top-0 py-4 mb-2 z-10 bg-purple-500 p-2 rounded-md flex justify-center items-center">
                    <h1 className="font-bold text-xl text-white ">
                      Scheduled Sequences
                    </h1>
                  </div>
                  {searchSequenceRes
                    .filter((item) => item.status === "Scheduled")
                    .map((item, i) => (
                      <div
                        key={i}
                        className="bg-purple-100 p-2 rounded-lg mb-4 shadow mx-5 text-purple-400 flex flex-col gap-2 border border-purple-400"
                      >
                        <div className="bg-white rounded p-2 transform transition-all ease-in-out duration-300 hover:scale-105 hover:cursor-pointer hover:shadow-md">
                          <span className="font-bold">ID: </span> {item._id}
                        </div>
                        <div className="bg-white rounded p-2 transform transition-all ease-in-out duration-300 hover:scale-105 hover:cursor-pointer hover:shadow-md">
                          <span className="font-bold">Job ID: </span>{" "}
                          {item.job_id}
                        </div>
                        <div className="bg-white rounded p-2 transform transition-all ease-in-out duration-300 hover:scale-105 hover:cursor-pointer hover:shadow-md">
                          <span className="font-bold">Username: </span>{" "}
                          {item.username}
                        </div>
                        <div className="bg-white rounded p-2 transform transition-all ease-in-out duration-300 hover:scale-105 hover:cursor-pointer hover:shadow-md">
                          <span className="font-bold">Scheduled At: </span>{" "}
                          {item.scheduled_at}
                        </div>
                        <div className="bg-white rounded p-2 transform transition-all ease-in-out duration-300 hover:scale-105 hover:cursor-pointer hover:shadow-md">
                          <span className="font-bold">Sequence Name: </span>{" "}
                          {item.sequence}
                        </div>
                        <div className="bg-white rounded p-2 transform transition-all ease-in-out duration-300 hover:scale-105 hover:cursor-pointer hover:shadow-md">
                          <span className="font-bold">Sequence Name: </span>{" "}
                          {item.sequence}
                        </div>
                        <div className="bg-white rounded p-2 transform transition-all ease-in-out duration-300 hover:scale-105 hover:cursor-pointer hover:shadow-md">
                          <span className="font-bold">Status: </span>{" "}
                          {item.status}
                        </div>
                        <div className="bg-white rounded p-2 transform transition-all ease-in-out duration-300 hover:scale-105 hover:cursor-pointer hover:shadow-md">
                          <span className="font-bold">Template Message: </span>{" "}
                          {item.template_msg}
                        </div>
                      </div>
                    ))}
                </div>
                {/* Second tab Executed */}
                <div className="bg-purple-200 w-1/2 p-5 rounded-lg overflow-y-auto h-[60vh]">
                  <div className="sticky top-0 py-4 mb-2 z-10 bg-purple-500 p-2 rounded-md flex justify-center items-center">
                    <h1 className="font-bold text-xl text-white">
                      Executed Sequences
                    </h1>
                  </div>
                  {searchSequenceRes
                    .filter((item) => item.status === "Executed / Removed")
                    .sort(
                      (itemA, itemB) =>
                        new Date(itemA.scheduled_at) -
                        new Date(itemB.scheduled_at),
                    )
                    .map((item, i) => (
                      <div
                        key={i}
                        className="bg-purple-100 p-2 rounded-lg mb-4 shadow mx-5 text-purple-400 flex flex-col gap-2 border border-purple-400"
                      >
                        <div className="bg-white rounded p-2 transform transition-all ease-in-out duration-300 hover:scale-105 hover:cursor-pointer hover:shadow-md">
                          <span className="font-bold">ID: </span> {item._id}
                        </div>
                        <div className="bg-white rounded p-2 transform transition-all ease-in-out duration-300 hover:scale-105 hover:cursor-pointer hover:shadow-md">
                          <span className="font-bold">Job ID: </span>{" "}
                          {item.job_id}
                        </div>
                        <div className="bg-white rounded p-2 transform transition-all ease-in-out duration-300 hover:scale-105 hover:cursor-pointer hover:shadow-md">
                          <span className="font-bold">Username: </span>{" "}
                          {item.username}
                        </div>
                        <div className="bg-white rounded p-2 transform transition-all ease-in-out duration-300 hover:scale-105 hover:cursor-pointer hover:shadow-md">
                          <span className="font-bold">Scheduled At: </span>{" "}
                          {item.scheduled_at}
                        </div>
                        <div className="bg-white rounded p-2 transform transition-all ease-in-out duration-300 hover:scale-105 hover:cursor-pointer hover:shadow-md">
                          <span className="font-bold">Sequence Name: </span>{" "}
                          {item.sequence}
                        </div>
                        <div className="bg-white rounded p-2 transform transition-all ease-in-out duration-300 hover:scale-105 hover:cursor-pointer hover:shadow-md">
                          <span className="font-bold">Sequence Name: </span>{" "}
                          {item.sequence}
                        </div>
                        <div className="bg-white rounded p-2 transform transition-all ease-in-out duration-300 hover:scale-105 hover:cursor-pointer hover:shadow-md">
                          <span className="font-bold">Status: </span>{" "}
                          {item.status}
                        </div>
                        <div className="bg-white rounded p-2 transform transition-all ease-in-out duration-300 hover:scale-105 hover:cursor-pointer hover:shadow-md">
                          <span className="font-bold">Template Message: </span>{" "}
                          {item.template_msg}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              ""
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default SearchSequenceModal;
