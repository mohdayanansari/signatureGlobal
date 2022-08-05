import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch } from "react-redux";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

const Jobs = ({ templates, sequenceName, index, deleteJob }) => {
  const [template, setTemplate] = useState({ name: "" });
  const [inputValue, setInputValue] = useState("");
  const [day, setDay] = useState(0);
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);
  const [hour, setHour] = useState(0);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "ADD_JOB",
      payload: {
        template,
        day,
        sec,
        min,
        hour,
        index,
      },
    });
  }, [template, day, sec, min, hour, index, dispatch]);


  return (
    <div className="flex bg-gray-200 p-3 rounded-lg ">
      <div className="flex-1 flex flex-col gap-4">
        {/* <InputLabel id="choose_template">Choose Template</InputLabel>
        <Select
          labelId="choose_template"
          id="choose_template"
          value={template}
          label="Choose Template"
          onChange={(e) => {
            console.log(e.target.value);
            setTemplate(e.target.value);
            console.log("temp::::: ", template);
          }}
        >
          {templates.map((temp, index) => (
            <MenuItem
              value={`${temp.name}_${temp.language}`}
              key={index}
            >
              {`${temp.name}_${temp.language}`}
            </MenuItem>
          ))}
        </Select> */}
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={templates?.map((template, i) => ({
            label: `${template.name}_${template.language}`,
            index: i,
          }))}
          value={template.name}
          onChange={(e, option) => {
            // console.log(e.target, "new value::", newValue);
            option !== null
              ? setTemplate({ ...templates[option.index] })
              : setTemplate({ name: "" });
            setTemplate({ ...templates[index] });
            console.log("INDEX::", option);
          }}
          // inputValue={inputValue}
          // onInputChange={(event, newInputValue) => {
          //   setInputValue(newInputValue);
          // }}
          sx={{ width: 400 }}
          renderInput={(params) => (
            <TextField {...params} label="Choose Template" />
          )}
        />

        <TextField
          id="outlined-basic"
          label="Days"
          variant="outlined"
          type="number"
          value={Number(day)}
          onChange={(e) => {
            setDay(parseInt(e.target.value));
          }}
        />
        <TextField
          id="outlined-basic"
          label="Hours"
          variant="outlined"
          type="number"
          value={Number(hour)}
          onChange={(e) => {
            setHour(parseInt(e.target.value));
          }}
        />
        <TextField
          id="outlined-basic"
          label="Minute"
          variant="outlined"
          type="number"
          value={Number(min)}
          onChange={(e) => {
            setMin(parseInt(e.target.value));
          }}
        />
        <TextField
          id="outlined-basic"
          label="Seconds"
          variant="outlined"
          type="number"
          value={Number(sec)}
          onChange={(e) => {
            setSec(parseInt(e.target.value));
          }}
        />
      </div>
      {index > 0 && (
        <button
          className=" shadow-md bg-red-300 text-red-600 font-bold text-xl rounded-full w-[30px] h-[30px] flex justify-center items-center hover:bg-red-400"
          type="button"
          onClick={() => deleteJob(index)}
        >
          -
        </button>
      )}
    </div>
  );
};

export default Jobs;
