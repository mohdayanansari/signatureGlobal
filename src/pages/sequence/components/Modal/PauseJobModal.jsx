import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";

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

const PauseJobModal = ({jobPhone}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [phone, setPhone] = useState("");

  // * handle pause job fn
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        className="bg-white w-[200px] shadow-lg border border-gray-100 first-letter: p-4 rounded-md text-gray-600 font-bold transform transition-all duration-300 ease-in-out hover:bg-purple-200 hover:scale-95"
      >
        Pause Job
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
            <h1 className="text-2xl text-gray-800 font-bold">Pause Job</h1>
            <hr className="mb-2" />
            <form
              onSubmit={handleSubmit}
              className="flex flex-col pt-5 pr-2 w-full gap-4 overflow-y-auto h-[80vh]"
            >
              <TextField
                id="outlined-basic"
                label="Phone Number"
                constiant="outlined"
                name="phone"
                value={jobPhone}
                required
                // onChange={(e) => setPhone(e.target.value)}
              />

              <Button
                constiant="contained"
                type="submit"
                endIcon={<SendIcon />}
                className="bg-purple-500 shadow text-white sticky bottom-0 ml-3"
              >
                Submit
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default PauseJobModal;
