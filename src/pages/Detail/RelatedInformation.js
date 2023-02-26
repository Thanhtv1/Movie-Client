import React from "react";
import { useNavigate } from "react-router-dom";
import ViewMoreOrLess from "./ViewMoreOrLess";

export default function RelatedInformation({ detailData }) {
  // console.log(detailData);
  const navigate = useNavigate();
  return (
    <div className="basic-details md:pl-1 overflow-hidden flex flex-col mx-auto lg:mx-0 space-y-2.5 md:space-y-4 items-center md:items-start">
      <h2 className="text-xl lg:text-2xl text-center md:text-left font-semibold uppercase text-white">
        {detailData.title || detailData.name}
      </h2>
      <p className="border-b-gray-700 text-sm text-white uppercase font-medium">
        {detailData.release_date || detailData.first_air_date}
      </p>
      <ul className="flex flex-wrap gap-1">
        {detailData?.genres?.map(({ id, name }) => (
          <li
            onClick={() => navigate(`/discover?with_genres=${id}`)}
            key={id}
            className="w-max text-xs rounded-2xl cursor-pointer px-2 py-1 lg:mx-0 font-semibold border-slate-100 border text-slate-100 transition-transform duration-300 hover:bg-slate-200 hover:text-black hover:scale-105"
          >
            {name}
          </li>
        ))}
      </ul>
      <div className="text-white font-medium story w-full border-t">
        {detailData?.overview ? (
          <ViewMoreOrLess limitText={130}>
            {detailData?.overview}
          </ViewMoreOrLess>
        ) : (
          <p>Currently Unavailable</p>
        )}
      </div>
    </div>
  );
}
