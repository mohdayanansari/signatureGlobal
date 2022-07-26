import React from "react";
import AddSequenceModal from "./components/Modal/AddSequenceModal";
// Headless UI
import { Tab } from "@headlessui/react";
// Modals Components
import SendSequenceModal from "./components/Modal/SendSequenceModal";
import SequenceTabOne from "./components/SequenceTabOne";
import JobsTabTwo from "./components/Table/JobsTabTwo";
import SearchSequenceModal from "./components/Modal/SearchSequenceModal";

const Sequence = () => {
  return (
    <div>
      {/* Nabvar */}
      <div className="flex  justify-between px-[30px] items-center h-[80px] bg-white shadow-lg w-full ">
        <SearchSequenceModal />
        <div className="flex gap-4">
          <SendSequenceModal />
          <AddSequenceModal />
        </div>
      </div>

      {/* Show data */}
      <div className="pt-10 p-20 overflow-y-auto h-[85vh]">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
            <Tab
              className={({ selected }) =>
                `${
                  selected
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                } w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2`
              }
            >
              <h1>Sequence</h1>
            </Tab>
            <Tab
              className={({ selected }) =>
                `${
                  selected
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                } w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2`
              }
            >
              <h1>Jobs</h1>
            </Tab>
          </Tab.List>
          {/* =========================================================================== */}
          {/* =========================================================================== */}
          {/* =========================================================================== */}
          <Tab.Panels className="mt-2">
            {/* --------------------------TAB--1--------------------------------- */}
            <Tab.Panel
              className={
                "rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
              }
            >
              <SequenceTabOne />
            </Tab.Panel>
            <Tab.Panel
              className={
                "rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
              }
            >
              <JobsTabTwo />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default Sequence;
