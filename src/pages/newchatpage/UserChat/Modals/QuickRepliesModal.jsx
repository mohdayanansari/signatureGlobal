import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { DocumentAddIcon, ReplyIcon } from "@heroicons/react/solid";
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

// ! <-----------------------=== Create_Quick_Response ===------------------------------>
const CreateQuickResponse = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [quickReply, setQuickReply] = useState("");

  const handleSubmitQuickReplies = async (e) => {
    e.preventDefault();

    let data = new FormData();

    data.append("text", quickReply);

    try {
      var config = {
        method: "post",
        url: "https://api.notbot.in/add_quick_reply",
        headers: {
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY1ODA1OTUzOSwianRpIjoiOWZhMzIyMWItYTEzZC00ZTBiLWIzNDgtOWNkMTU0ZmJkNGExIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImF5YWFuQG5vdGJvdC5pbiIsIm5iZiI6MTY1ODA1OTUzOX0.RRmRL1c46AmLSzTIMDgsS4EYq8ouVOIILXgCRS3lqDo",
        },
        data: data,
      };
      await axios(config);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        className=" h-[40px]  rounded-lg bg-purple-500 text-white bg-opacity-80 shadow-2xl backdrop-blur-xl hover:bg-opacity-70 transition duration-300"
      >
        Create <DocumentAddIcon className="text-white w-[20px] h-[20px]" />
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
            className="rounded-lg outline-none border-none shadow-md w-[600px]"
          >
            <div className="flex flex-col w-full">
              <h1 className="text-2xl text-gray-800 font-bold">
                Use a Quick Replies
              </h1>
              <hr className="mb-2 mt-2" />

              <div>
                <form onSubmit={handleSubmitQuickReplies}>
                  <TextField
                    id="outlined-basic"
                    label="Quick Reply"
                    constiant="outlined"
                    name="quickReply"
                    value={quickReply}
                    required
                    onChange={(e) => setQuickReply(e.target.value)}
                  />
                  <Button
                    constiant="contained"
                    type="submit"
                    endIcon={<SendIcon />}
                    className="bg-gray-800 text-white sticky bottom-0 ml-3"
                  >
                    Submit
                  </Button>
                </form>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

// ! <-----------------------END=== Create_Quick_Response ===END------------------------------>

const QuickRepliesModal = ({ getQuickReplyMsg }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [quickReplyData, setQuickReplyData] = useState([]);

  useEffect(() => {
    let isMount = false;
    (async () => {
      try {
        const res = await axiosInstance.get("get_quick_reply");
        if (!isMount) {
          setQuickReplyData(res.data.quick_replies);
        }
      } catch (error) {
        console.log(error);
      }
    })();

    return () => {
      isMount = true;
    };
  }, [quickReplyData]);

  const handleClick = (text) => {
    getQuickReplyMsg(text);
    handleClose();
  };

  const handleDelete = async (text) => {
    let data = new FormData();

    data.append("text", text);

    try {
      var config = {
        method: "post",
        url: "https://api.notbot.in/del_quick_reply",
        headers: {
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY1ODA1OTUzOSwianRpIjoiOWZhMzIyMWItYTEzZC00ZTBiLWIzNDgtOWNkMTU0ZmJkNGExIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImF5YWFuQG5vdGJvdC5pbiIsIm5iZiI6MTY1ODA1OTUzOX0.RRmRL1c46AmLSzTIMDgsS4EYq8ouVOIILXgCRS3lqDo",
        },
        data: data,
      };
      await axios(config);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        className="w-[20px] h-[40px]  rounded-lg bg-white bg-opacity-80 shadow-2xl backdrop-blur-xl hover:bg-opacity-70 transition duration-300"
      >
        <ReplyIcon className="text-appPurple-400 w-[20px] h-[20px]" />
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
            className="rounded-lg outline-none border-none shadow-md w-[600px] h-[70vh]"
          >
            <div className="flex items-center justify-between">
              <h1 className="text-2xl text-gray-800 font-bold">
                Use a Quick Replies
              </h1>
              <div>
                <CreateQuickResponse />
              </div>
            </div>
            <hr className="mb-2 mt-2" />
            <div>
              {quickReplyData.length >= 1
                ? quickReplyData.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between w-full items-center mb-2"
                    >
                      <button
                        onClick={() => handleClick(item)}
                        className="hover:text-purple-500 hover:text-xl transition-all duration-100 transform ease-in-out"
                      >
                        {item}
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        className="bg-red-200 text-red-600 p-1 rounded-md border border-red-300 px-4 hover:bg-red-300 font-bold transition-all duration-100 transform ease-in-out"
                      >
                        Delete
                      </button>
                    </div>
                  ))
                : "Loading..."}
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default QuickRepliesModal;
