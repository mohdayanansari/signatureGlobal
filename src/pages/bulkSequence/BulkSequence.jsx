import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import "./styles/bulkStyles.css";
import axios from "axios";

const BulkSequence = () => {
  const [bulkCSV, setBulkCSV] = useState(null);
  const [bulkInput, setBulkInput] = useState({
    template_name: "",
    namespace: "",
    language: "",
    brodcast_name: "",
  });
  const [dateValue, setDateValue] = useState(new Date());
  const [timeValue, setTimeValue] = useState(new Date());

  const handleChange = (evt) => {
    const value = evt.target.value;
    setBulkInput({
      ...bulkInput,
      [evt.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = new FormData();

    // const date = `${dateValue.getFullYear()}-${dateValue.getMonth()}-${dateValue.getDate()}`;
    const year = dateValue.getFullYear();
    const month =
      dateValue.getMonth() < 10
        ? `0${dateValue.getMonth()}`
        : dateValue.getMonth();
    const day =
      dateValue.getDate() < 10
        ? `0${dateValue.getDate()}`
        : dateValue.getDate();
    const date = `${year}-${month}-${day}`;
    let hours = timeValue.getHours();
    let mins = timeValue.getMinutes();
    hours = hours / 10 < 1 ? `0${hours}` : hours;
    mins = mins / 10 < 1 ? `0${mins}` : mins;
    console.log("mins::", mins, "hours::", hours);
    const time = `${hours}:${mins}:00`;

    // console.log("bulkcsv", bulkCSV);
    data.append("file", bulkCSV);
    data.append("template_name", bulkInput.template_name);
    data.append("namespace", bulkInput.namespace);
    data.append("language", bulkInput.language);
    data.append("brodcast_name", bulkInput.brodcast_name);
    data.append("start_datetime", date + " " + time);

    var config = {
      method: "post",
      url: "https://test.notbot.in/sequence/broadcast",
      headers: {
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY1MDM2MTMyOCwianRpIjoiM2EyOWM1ZDctM2U5Ni00NGU1LTgzNTUtZThhZmFmMDcxMjMyIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImZvb0Bmb28uZm9vIiwibmJmIjoxNjUwMzYxMzI4fQ.QIPBc1-ykwUe5KcCEXlHPkeFC280c5Mrmic_UNZ__N4",
      },
      data: data,
    };

    console.log("Date::", date);
    console.log("Time::", time);
    try {
      await axios(config);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen ">
      {/* Navbar */}
      <div className="h-[60px] flex items-center px-[30px] border-b border-white/20 py-[20px]">
        <h1 className="text-lg font-semibold text-white/80">
          Send Sequence in Bulk
        </h1>
      </div>
      {/* Navbar END*/}

      {/* form */}
      <div className="py-5 overflow-y-auto h-[90vh]">
        <form
          onSubmit={handleSubmit}
          className="bg-white/60 p-10 rounded-md mx-[30px] max-w-max bg-opacity-90"
        >
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
            className="flex flex-col gap-4 w-[800px]"
          >
            <div className="flex w-full">
              <TextField
                id="standard-basic"
                label="Template Name"
                variant="standard"
                className="w-full "
                name="template_name"
                value={bulkInput.template_name}
                onChange={handleChange}
              />
              <TextField
                id="standard-basic"
                label="Namespace"
                variant="standard"
                className="w-full"
                name="namespace"
                value={bulkInput.namespace}
                onChange={handleChange}
              />
            </div>
            <div className="flex w-full mb-10">
              <TextField
                id="standard-basic"
                label="Language"
                variant="standard"
                className="w-full"
                name="language"
                value={bulkInput.language}
                onChange={handleChange}
              />
              <TextField
                id="standard-basic"
                label="Broadcast Name"
                variant="standard"
                className="w-full"
                name="brodcast_name"
                value={bulkInput.brodcast_name}
                onChange={handleChange}
              />
            </div>
            <div className="w-full flex gap-4 mb-10 items-center">
              <div className="file-input">
                <input
                  type="file"
                  id="file-input"
                  className="file-input__input text-white"
                  accept=".csv"
                  onChange={(e) => setBulkCSV(e.target.files[0])}
                />
                <label className="file-input__label " for="file-input">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="upload"
                    className="svg-inline--fa fa-upload fa-w-16"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                    ></path>
                  </svg>
                  <span>
                    {(() => {
                      if (bulkCSV) {
                        return <>{bulkCSV?.name}</>;
                      } else {
                        return "Select a file";
                      }
                    })()}
                  </span>
                </label>
              </div>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Select Date"
                  value={dateValue}
                  inputFormat="yyyy-MM-dd"
                  mask="____-__-__"
                  onChange={(newValue) => setDateValue(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                  className="w-full"
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
            </div>
            <Button
              constiant="contained"
              type="submit"
              endIcon={<SendIcon />}
              className="sticky bottom-0 ml-3 text-black bg-[#FED500] transform transition-all ease-in-out duration-300 hover:scale-95"
            >
              Submit
            </Button>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default BulkSequence;
