import React, { useEffect, useState } from "react";
import axios from "axios";
// Headless UI
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import UpdateSequenceModal from "./Modal/UpdateSequenceModal";

const SequenceTabOne = () => {
  const [sequences, setSequences] = useState([]);
  const [templates, setTemplates] = useState([]);

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

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          "https://api.notbot.in/v1/configs/templates",
          {
            headers: {
              Authorization:
                "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY1ODA1OTUzOSwianRpIjoiOWZhMzIyMWItYTEzZC00ZTBiLWIzNDgtOWNkMTU0ZmJkNGExIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImF5YWFuQG5vdGJvdC5pbiIsIm5iZiI6MTY1ODA1OTUzOX0.RRmRL1c46AmLSzTIMDgsS4EYq8ouVOIILXgCRS3lqDo",
            },
          },
        );
        // console.log("templates data:::", resp.data);
        setTemplates(res.data.waba_templates);
        console.log("Templates::", res.data);
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
                    className="flex shadow w-full   justify-between rounded-lg text-white  px-4 py-5 text-left text-sm font-medium    hover:text-gray-600 hover:border focus:outline-none  mb-5 transition-all ease-linear duration-100 transform"
                    style={{
                      backgroundColor:
                        index % 2
                          ? "rgba(255, 255, 255, 0.10)"
                          : "rgba(255, 255, 255, 0.15)",
                    }}
                  >
                    <span className="text-lg">
                      <span className="text-white/90 font-semibold">
                        Sequence Name:{" "}
                      </span>
                      <span className="text-white/60">
                        {sequence.sequence_name}
                      </span>
                    </span>
                    <ChevronUpIcon
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-white/50 transition-all ease-in-out duration-300`}
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
                                  i % 2 ? " bg-[#d4b100]" : "bg-[#FED500]"
                                } p-2 rounded mb-[5px] transform transition-all ease-in-out duration-200 hover:scale-105 hover:cursor-pointer hover:shadow-xl text-black  font-semibold`}
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
                                  j % 2 ? " bg-[#d4b100]" : "bg-[#FED500]"
                                } p-2 rounded mb-[5px] transform transition-all ease-in-out duration-200 hover:scale-105 hover:cursor-pointer hover:shadow-xl text-black font-semibold`}
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
                          templates={templates}
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
