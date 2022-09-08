import React from "react";
import Backdrop from "@mui/material/Backdrop";

import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

import Typography from "@mui/material/Typography";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Button, Box, TextField, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useState } from "react";
import { axiosInstance } from "../../../utils/axios-instance";
import axios from "axios";

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

const UserHead = ({ name, number, timestamp, chatDisabled }) => {
  const templateData = useSelector((state) => state.broadcast.templateMessages);

  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedTemplate, setSelectedTemplate] = useState(undefined);

  // console.log(chatDisabled);

  const data = templateData?.waba_templates ? templateData?.waba_templates : [];
  const onChangeTemplate = (e, newValue) => {
    console.log("tttttttttttttt:::", e, " vvvvvv::::::::::", newValue);
    setSelectedTemplate(newValue);
  };

  const handleResumeSession = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      // broadcast_name: "none",
      language: String(selectedTemplate.language),
      namespace: String(selectedTemplate.namespace),
      template_name: String(selectedTemplate.name),
      to: Number(number),
    };
    const token = localStorage.getItem("id_token");
    try {
      await axios.post("https://api.notbot.in/v1/send_template", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsLoading(false);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex  items-center justify-between  w-full h-[80px] px-[30px] text-white text-opacity-80 font-[24px]   shadow-xl border-b border-white border-opacity-10">
      <div className="flex items-center gap-4">
        <div className="w-[40px] h-[40px] bg-appPurple-200 rounded-full flex justify-center items-center text-white text-opacity-80">
          {number ? name.toString()[0] : "R"}
        </div>
        <div>
          <div className={"flex justify-start items-center"}>
            <h1 className={"font-bold"}>{number ? name : "Recipient name"}</h1>
            {!chatDisabled && (
              <div className="w-[10px] h-[10px] bg-green-500 rounded-full ml-[10px]" />
            )}
          </div>
          {timestamp &&
            (chatDisabled ? (
              <p className={"text-sm"}>Your chat is disabled</p>
            ) : (
              <>
                <p
                  className={"text-sm "}
                >{`Your chat will be active till ${timestamp}`}</p>
              </>
            ))}
        </div>
      </div>
      {/* Button to resume chat session */}
      {timestamp && chatDisabled ? (
        <>
          <Button
            onClick={handleOpen}
            className="rounded px-[10px] py-[5px] bg-[#FED500] text-black/80 font-bold  text-sm"
          >
            Resume Session
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
              <Box sx={style}>
                <div className="w-[500px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded p-10">
                  <Typography
                    size={"sm"}
                    className="mb-3 text-lg font-bold text-black "
                  >
                    Enter phone number
                  </Typography>
                  <form onSubmit={handleResumeSession}>
                    <TextField
                      id="outlined-basic"
                      label="Phone Number"
                      value={number}
                      variant="outlined"
                      className="w-full mt-5 mb-2"
                    />
                    <br />
                    <Autocomplete
                      id="combo-box-demo"
                      options={data}
                      size={"small"}
                      onChange={onChangeTemplate}
                      getOptionLabel={(option) => option.name.toString()}
                      fullWidth
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select Template"
                          variant="outlined"
                        />
                      )}
                    />
                    <div className="flex justify-end w-full">
                      <button
                        type="submit"
                        className="rounded px-[10px] py-[5px] bg-[#FED500] text-black/80 font-bold mt-5"
                      >
                        {isLoading ? (
                          <CircularProgress
                            style={{ width: "15px", height: "15px" }}
                            className="!text-black "
                          />
                        ) : (
                          " Resume Session"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </Box>
            </Fade>
          </Modal>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default UserHead;
