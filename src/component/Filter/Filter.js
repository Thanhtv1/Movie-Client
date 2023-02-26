import React from "react";
import Genres from "./Genres";
import Date from "./Date";
import Sort from "./Sort";

export default function Filter() {
  return (
    <div
      className={`lg:mt-5 grid md:gap-y-0 grid-cols-1 lg:grid-cols-12 gap-x-5 space-y-4 lg:space-y-0 duration-300 px-4 lg:px-5 py-5 lg:py-1.5 z-50 filter_box`}
    >
      <Sort />
      <Genres />
      <Date />
    </div>
  );
}
