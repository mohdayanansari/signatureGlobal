import React from "react";
import QueryJobs from "./modals/QueryJobs";

const Jobs = () => {
  return (
    <div>
      {/* Nabvar */}
      <div className="flex  justify-between px-[30px] items-center h-[80px] border-b border-white border-opacity-20 shadow-lg w-full ">
        <h1 className="text-lg font-semibold text-white/80">Jobs Sequence</h1>
        <div className="flex gap-4">
          <QueryJobs />
        </div>
      </div>
    </div>
  );
};

export default Jobs;
