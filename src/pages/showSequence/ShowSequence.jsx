import axios from "axios";
import React, { useEffect, useState } from "react";

const ShowSequence = () => {
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

  return (
    <div>
      {/* Nabvar */}
      <div className="flex  justify-between px-[30px] items-center h-[80px] bg-white shadow-lg w-full ">
        <h1 className="text-xl font-bold text-gray-700">List of Sequences</h1>
      </div>
      {/* ================ */}
      <div className="p-5 overflow-y-auto h-[90vh]">
        {sequences.length > 0 &&
          sequences.map((item, index) => (
            <div
              key={index}
              className={`${
                index % 2 ? "bg-purple-200" : "bg-purple-100"
              }  transition-all duration-100 transform  ease-in-out hover:cursor-pointer hover:bg-purple-400 hover:shadow hover:z-10 hover:rounded-md font-bold text-lg text-gray-700 hover:text-white hover:text-2xl px-10 py-5` }
            >
              <div>
                <h1>
                  {" "}
                  <span>{index + 1}.</span> {item.sequence_name}
                </h1>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ShowSequence;
