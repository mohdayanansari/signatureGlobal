import React, { useEffect, useState } from "react";
import axios from "axios";
// Headless UI
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import UpdateSequenceModal from "./Modal/UpdateSequenceModal";

const SequenceTabOne = () => {
  const [sequences, setSequences] = useState([]);

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

  const formatTimeDiff = (timeDiff) =>
    Object.entries(timeDiff).reduce((finalTime, [unit, value]) => {
      // console.log(unit, value);
      // console.log(`${finalTime} ${value} ${unit}`);
      return `${finalTime} ${value} ${unit}`;
    }, "");
  return (
    <>
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
                          <h1 className="font-bold text-xl mb-2">Templates</h1>
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
                        <UpdateSequenceModal
                          sequenceData={sequence}
                          index={index}
                        />
                      </div>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          </div>
        ))}
    </>
  );
};

export default SequenceTabOne;
