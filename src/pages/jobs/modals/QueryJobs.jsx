import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import Autocomplete from "@mui/material/Autocomplete";
import useStyles from "../styles";
import { axiosInstance } from "../../../utils/axios-instance";

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
const statusOptionsArray = [
  "Job Removed",
  "Executed",
  "Paused",
  "Scheduled(Resumed)",
  "Scheduled",
];

const QueryJobs = () => {
  var classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [number, setNumber] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [limit, setLimit] = useState("");

  const [quriedJobData, setQuriedJobData] = useState("");

  const onChangeNumber = (value) => {
    setNumber(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = new FormData();

    data.append("number", number.slice(1).toString());
    data.append("limit", limit.toString());
    data.append("status", inputValue.toString());

    try {
      const res = await axiosInstance.post("filter/alljobs", data);
      setQuriedJobData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Button
        onClick={handleOpen}
        className="p-2 px-5 font-semibold bg-[#FED500] text-black rounded-md shadow"
      >
        Query Jobs
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
            className="rounded-lg bg-white/70 outline-none border-none shadow-md w-[600px]"
          >
            <h1 className="text-2xl font-bold text-gray-800">
              Query Jobs Sequence
            </h1>
            <hr className="mb-2" />

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 item-center"
            >
              <label htmlFor="phone" className="text-sm -mb-[10px] mt-5">
                Enter Phone Number
              </label>
              <PhoneInput
                id="phone"
                style={{ marginTop: "5px" }}
                international
                onCountryChange={(countryCode) => {
                  console.log(countryCode);
                }}
                defaultCountry="IN"
                autoComplete="on"
                value={number}
                className={classes.phoneNumberInput}
                countryCallingCodeEditable={false}
                onChange={onChangeNumber}
                error={
                  number
                    ? isValidPhoneNumber(number)
                      ? undefined
                      : "Invalid Phone Number"
                    : ``
                }
              />
              <input
                id="limit"
                label="Limit"
                variant="standard"
                type="number"
                placeholder="Enter the limit"
                value={limit}
                min="1"
                max="50"
                onChange={(e) => setLimit(e.target.value)}
                className="px-2 py-1 bg-transparent border rounded-lg focus:outline-none border-white/20"
              />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={statusOptionsArray}
                sx={{ width: "100%" }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Status" />
                )}
              />

              <Button
                constiant="contained"
                type="submit"
                endIcon={<SendIcon />}
                className="sticky bottom-0 ml-3 text-black bg-[#FED500] transform transition-all ease-in-out duration-300 hover:scale-95"
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

export default QueryJobs;
