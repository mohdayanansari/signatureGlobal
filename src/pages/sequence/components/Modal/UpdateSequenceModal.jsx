import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import Jobs from "../Jobs/Jobs";
import { useSelector } from "react-redux";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
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

const UpdateSequenceModal = ({ sequenceData, index, templates }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [sequence, setSequence] = useState("");
  const [jobCount, setJobCount] = useState(1);
  const [dateValue, setDateValue] = useState(new Date());
  const [timeValue, setTimeValue] = useState(new Date());

  const JobsArray = useSelector((state) => state.jobs.jobs);

  const addJob = () => {
    setJobCount(jobCount + 1);
  };

  const deleteJob = (index) => {
    dispatch({
      type: "DELETE_JOB",
      payload: { index },
    });
    setJobCount(jobCount - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const date = `${dateValue.getFullYear()}-${dateValue.getMonth()}-${dateValue.getDate()}`;
    let hours = timeValue.getHours();
    let mins = timeValue.getMinutes();
    hours = hours / 10 < 1 ? "0" + hours : hours;
    mins = mins / 10 < 1 ? "0" + mins : mins;
    console.log("mins::", mins, "hours::", hours);
    const time = `${hours}:${mins}:00`;

    const data = JSON.stringify({
      sequence_name: sequence,
      start_datetime: date + " " + time,
      sequence_details: JobsArray,
    });

    try {
      await axiosInstance.post("updatesequence", data);
    } catch (error) {
      console.log(error);
    }
  };

  const generateArray = useCallback(() => {
    let array = [];
    for (let i = 1; i <= jobCount; i++) {
      array.push(i);
    }
    return array;
  }, [jobCount]);

  return (
    <div>
      <Button
        onClick={handleOpen}
        className="bg-white shadow-lg border-2 border-black. first-letter: p-4 rounded-md text-gray-600 font-bold"
      >
        Update {sequenceData.sequence_name} Sequence
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
            <h1 className="text-2xl text-gray-800 font-bold">
              Update Sequence
            </h1>
            <hr className="mb-2" />
            <form
              onSubmit={handleSubmit}
              className="flex flex-col pt-5 pr-2 w-full gap-4 overflow-y-auto h-[80vh]"
            >
              <TextField
                id="outlined-basic"
                label="Sequence Name"
                constiant="outlined"
                name="sequenceName"
                value={sequenceData.sequence_name}
                required
                onChange={(e) => setSequence(e.target.value)}
              />
              {/* date time */}

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Select Date"
                  value={dateValue}
                  inputFormat="yyyy-MM-dd"
                  mask="____-__-__"
                  onChange={(newValue) => setDateValue(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />

                <TimePicker
                  label="Select Time"
                  value={timeValue}
                  ampm={false}
                  onChange={(newValue) => setTimeValue(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
                {/* <TimePicker
                  value={timeValue}
                  format="hh:mm:ss"
                  onChange={(newValue) => {
                    setTimeValue(newValue);
                  }}
                /> */}
              </LocalizationProvider>
              {/* Sequence Details */}
              <div className="bg-gray-100 flex flex-col gap-4 p-5 rounded-md">
                <h1 className="text-2xl text-gray-800 font-bold">
                  Sequence Details
                </h1>
                {generateArray().map((jobNumber, index) => (
                  <Jobs
                    key={index}
                    templates={templates}
                    sequenceName={sequence}
                    index={jobNumber - 1}
                    deleteJob={deleteJob}
                    // key={jobNumber - 1}
                  />
                ))}
                <button
                  className=" shadow-md bg-[#FED500] text-black font-bold text-xl rounded-full w-[30px] h-[30px] flex justify-center items-center hover:bg-[#b49600]"
                  type="button"
                  onClick={addJob}
                >
                  +
                </button>
              </div>

              <Button
                constiant="contained"
                type="submit"
                endIcon={<SendIcon />}
                className="bg-[#FED500] shadow text-black sticky bottom-0 ml-3"
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

export default UpdateSequenceModal;
