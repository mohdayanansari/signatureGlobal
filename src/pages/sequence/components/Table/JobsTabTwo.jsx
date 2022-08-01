import React, { useEffect, useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
// Headless UI
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import PauseJobModal from "../Modal/PauseJobModal";
import ResumeJobModal from "../Modal/ResumeJobModal";
import RemoveJobModal from "../Modal/RemoveJobModal";

const JobsTabTwo = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      var config = {
        method: "get",
        url: "https://api.notbot.in/alljobs",
        headers: {
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY1MDM2MTMyOCwianRpIjoiM2EyOWM1ZDctM2U5Ni00NGU1LTgzNTUtZThhZmFmMDcxMjMyIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImZvb0Bmb28uZm9vIiwibmJmIjoxNjUwMzYxMzI4fQ.QIPBc1-ykwUe5KcCEXlHPkeFC280c5Mrmic_UNZ__N4",
        },
      };
      try {
        const res = await axios(config);
        setJobs(res.data);
        setIsLoading(true);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  console.log("JOBS::::::", jobs);

  return isLoading ? (
    <>
      {jobs.map((job, index) => (
        <div key={index}>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button
                  className="flex shadow w-full   justify-between rounded-lg text-white  px-4 py-5 text-left text-sm font-medium hover:text-gray-600 hover:border focus:outline-none  mb-5 transition-all ease-linear duration-100 transform"
                  style={{
                    backgroundColor:
                      index % 2
                        ? "rgba(255, 255, 255, 0.10)"
                        : "rgba(255, 255, 255, 0.15)",
                  }}
                >
                  <span className="text-lg">
                    <span className="text-white/90 font-semibold">Sequence Name: </span>
                    <span className="text-white/60">{job.sequence}</span>
                  </span>
                  <ChevronUpIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    }h-5 w-5 text-white/50 transition-all ease-in-out duration-300`}
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
                    <div className="flex gap-1 shadow-md border border-gray-100/20 p-4 rounded-md">
                      <div className=" w-[400px]">
                        <h1 className="font-bold text-xl mb-2">ID</h1>
                        <div
                          className={`bg-[#FED500] p-2 rounded mb-[5px] transform transition-all ease-in-out duration-200 hover:scale-105 hover:cursor-pointer hover:shadow-xl text-black font-bold`}
                        >
                          {job._id}
                        </div>
                      </div>
                      <div className="  w-[400px]">
                        <h1 className="font-bold text-xl mb-2">Status</h1>
                        <div
                          className={` bg-purple-200 p-2 rounded mb-[5px] transform transition-all ease-in-out duration-200 hover:scale-105 hover:cursor-pointer hover:shadow-xl text-purple-500 font-bold`}
                        >
                          {job.status}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 shadow-md border border-gray-100/20 p-4 rounded-md mt-5">
                      <div className=" w-1/2">
                        <h1 className="font-bold text-xl mb-2">JOB ID</h1>
                        <div
                          className={`bg-[#FED500] p-2 rounded mb-[5px] transform transition-all ease-in-out duration-200 hover:scale-105 hover:cursor-pointer hover:shadow-xl text-black font-bold`}
                        >
                          {job.job_id}
                        </div>
                      </div>
                      <div className=" w-1/2">
                        <h1 className="font-bold text-xl mb-2">Phone Number</h1>
                        <div
                          className={`bg-purple-200 p-2 rounded mb-[5px] transform transition-all ease-in-out duration-200 hover:scale-105 hover:cursor-pointer hover:shadow-xl text-purple-500 font-bold`}
                        >
                          {job.phone}
                        </div>
                      </div>
                      <div className=" w-1/2">
                        <h1 className="font-bold text-xl mb-2">
                          Template Message
                        </h1>
                        <div
                          className={`bg-[#FED500] p-2 rounded mb-[5px] transform transition-all ease-in-out duration-200 hover:scale-105 hover:cursor-pointer hover:shadow-xl text-black font-bold`}
                        >
                          {job.template_msg}
                        </div>
                      </div>
                      <div className=" w-1/2">
                        <h1 className="font-bold text-xl mb-2">Scheduled At</h1>
                        <div
                          className={`bg-purple-200 p-2 rounded mb-[5px] transform transition-all ease-in-out duration-200 hover:scale-105 hover:cursor-pointer hover:shadow-xl text-purple-500 font-bold`}
                        >
                          {job.scheduled_at}
                        </div>
                      </div>
                    </div>
                  </Disclosure.Panel>
                  {/* ================BUTTONS================== */}
                  <div className="flex gap-4 justify-center bg-gray-100/10 py-10 mb-5 mx-auto w-3/5 rounded-xl">
                    <PauseJobModal jobPhone={job.phone} />
                    <ResumeJobModal jobPhone={job.phone} />
                    <RemoveJobModal jobPhone={job.phone} />
                  </div>
                </Transition>
              </>
            )}
          </Disclosure>
        </div>
      ))}
    </>
  ) : (
    <div className="flex flex-col justify-center items-center">
      <span className="text-4xl text-gray-700 font-bold">Loading</span>
      <ThreeDots height="80" width="80" color="grey" ariaLabel="loading" />
    </div>
  );
};

export default JobsTabTwo;
