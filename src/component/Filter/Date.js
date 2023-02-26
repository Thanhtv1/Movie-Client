import React, { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { removeAllItems } from "../../redux/Slices/Film";
import useQueryString from "../../hooks/useQueryString";
import { useSearchParams } from "react-router-dom";
function Date() {
  const dispatch = useDispatch();
  const [_, setSearchParams] = useSearchParams();
  const currentParams = useQueryString();
  const [date, setDate] = useState({
    start: "",
    end: "",
  });

  const handleDateChange = (e) => {
    dispatch(removeAllItems());
    setDate({
      ...date,
      [e.target.name]: e.target.value,
    });

    if (!e.target.value) {
      if (e.target.name === "start") {
        const { start, ...rest } = currentParams;
        setSearchParams({
          ...rest,
        });
      } else if (e.target.name === "end") {
        const { end, ...rest } = currentParams;
        setSearchParams({
          ...rest,
        });
      }
      return;
    }
    setSearchParams({
      ...currentParams,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex flex-col space-y-3 col-span-3">
      <p className="font-semibold text-base">Release Dates</p>
      <div className={`date-top flex items-center justify-between`}>
        <span className="mr-1 text-gray-800">From</span>
        <div className="relative">
          <input
            value={date.start}
            onChange={handleDateChange}
            name="start"
            type="date"
            className="border border-gray-300 sm:text-sm rounded-lg block w-full lg:w-40 pl-10 p-2.5 bg-[#fbfbfb] text-[#5c728a]"
            placeholder="Select date start"
          />
        </div>
      </div>
      <div className={`date-top flex items-center justify-between`}>
        <span className="mr-1 text-gray-700">To</span>
        <div className="relative">
          <input
            value={date.end}
            onChange={handleDateChange}
            name="end"
            type="date"
            className="border border-gray-300 sm:text-sm rounded-lg block w-full lg:w-40 pl-10 p-2.5 bg-[#fbfbfb] text-[#5c728a]"
            placeholder="Select date start"
          />
        </div>
      </div>
    </div>
  );
}

export default memo(Date);
