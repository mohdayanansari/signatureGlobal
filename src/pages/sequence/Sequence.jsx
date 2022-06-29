import React, { useEffect, useState } from "react";
import AddSequenceModal from "./components/Modal/AddSequenceModal";
import axios from "axios";
// MUI COMPONENTS--
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// Headless UI
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import UpdateSequenceModal from "./components/Modal/UpdateSequenceModal";

const Sequence = () => {
  const [sequences, setSequences] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    (async () => {
      var config = {
        method: "get",
        url: "https://api.notbot.in/getsequence",
        headers: {
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY1MDM2MTMyOCwianRpIjoiM2EyOWM1ZDctM2U5Ni00NGU1LTgzNTUtZThhZmFmMDcxMjMyIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImZvb0Bmb28uZm9vIiwibmJmIjoxNjUwMzYxMzI4fQ.QIPBc1-ykwUe5KcCEXlHPkeFC280c5Mrmic_UNZ__N4",
        },
      };
      try {
        const res = await axios(config);
        setSequences(res.data.sequence);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // Handling table data
  function createData(name, username, template, timeDifference) {
    return { name, username, template, timeDifference };
  }

  useEffect(() => {
    let temp = [];
    if (sequences.length > 0) {
      sequences.forEach((item) => {
        if (Array.isArray(item.sequence_details)) {
          temp = [
            ...temp,
            ...item.sequence_details.map((sequence) =>
              createData(
                item.sequence_name,
                item.username,
                sequence.template,
                formatTimeDiff(sequence.timediff),
              ),
            ),
          ];
        }
      });
    }
    setRows(temp);
  }, [sequences]);

  // console.log(rows)
  const formatTimeDiff = (timeDiff) =>
    Object.entries(timeDiff).reduce((finalTime, [unit, value]) => {
      // console.log(unit, value);
      // console.log(`${finalTime} ${value} ${unit}`);
      return `${finalTime} ${value} ${unit}`;
    }, "");

  return (
    <div>
      {/* Nabvar */}
      <div className="flex justify-end px-[30px] items-center h-[80px] bg-white shadow-lg w-full ">
        <AddSequenceModal />
      </div>

      {/* Show data */}
      <div className="pt-10 p-20 overflow-y-auto h-[85vh]">
        {sequences.length > 0 &&
          sequences.map((sequence, index) => (
            <div key={index}>
              {/* Headless Starts------------------------------------> */}

              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button
                      className="flex shadow w-full ring ring-offset-2  justify-between rounded-lg text-white  px-4 py-5 text-left text-sm font-medium ring-purple-200  hover:bg-white hover:text-gray-600 hover:border focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 mb-5 transition-all ease-linear duration-100 transform"
                      style={{
                        backgroundColor: index % 2 ? "#8058c4" : "#a16ef5",
                      }}
                    >
                      <span className="text-xl">
                        <span className="font-bold">Sequence Name: </span>
                        {sequence.sequence_name}
                      </span>
                      <ChevronUpIcon
                        className={`${
                          open ? "rotate-180 transform" : ""
                        } h-5 w-5 text-purple-900 transition-all ease-in-out duration-300`}
                      />
                    </Disclosure.Button>
                    <Transition
                      enter="transition duration-300 ease-in-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-300 ease-in-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0 ease-in-out"
                    >
                      <Disclosure.Panel className="px-4 pt-4 pb-6 text-sm text-gray-500 ">
                        {/* <div className="flex gap-1 shadow border border-gray-100 p-4 rounded-md mb-5">
                          <span className="font-bold">Username:</span>{" "}
                          {sequence.username}
                        </div> */}
                        {/* Templates */}
                        <div className="flex gap-1 shadow-md border border-gray-100 p-4 rounded-md">
                          <div className=" w-[400px]">
                            <h1 className="font-bold text-xl mb-2">
                              Templates
                            </h1>
                            {Array.isArray(sequence.sequence_details) &&
                              sequence.sequence_details.map((sqItem, i) => (
                                <div
                                  key={i}
                                  className={`${
                                    i % 2 ? " bg-purple-200" : "bg-purple-300"
                                  } p-2 rounded mb-[5px] transform transition-all ease-in-out duration-200 hover:scale-105 hover:cursor-pointer hover:shadow-xl text-purple-500 font-bold`}
                                >
                                  {sqItem.template}
                                </div>
                              ))}
                          </div>
                          <div className="  w-[400px]">
                            <h1 className="font-bold text-xl mb-2">
                              Time Difference
                            </h1>
                            {Array.isArray(sequence.sequence_details) &&
                              sequence.sequence_details.map((sqItem, j) => (
                                <div
                                  key={j}
                                  className={`${
                                    j % 2 ? " bg-purple-200" : "bg-purple-300"
                                  } p-2 rounded mb-[5px] transform transition-all ease-in-out duration-200 hover:scale-105 hover:cursor-pointer hover:shadow-xl text-purple-500 font-bold`}
                                >
                                  {formatTimeDiff(sqItem.timediff)}
                                </div>
                              ))}
                          </div>
                        </div>
                        {/* update button */}
                        <div className="pt-10 flex justify-end">
                          <UpdateSequenceModal sequenceData={sequence} index={index} />
                        </div>
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Sequence;
