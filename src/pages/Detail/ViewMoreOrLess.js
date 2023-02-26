import React, { useState } from "react";

export default function ViewMoreOrLess({ limitText, children }) {
  const [shouldViewMoreOrLess, setShouldViewMoreOrLess] = useState(false);
  const handleViewMoreOrLess = () => {
    setShouldViewMoreOrLess((prevState) => !prevState);
  };
  return (
    <div className="text-sm font-semibold mt-2">
      {shouldViewMoreOrLess ? children : `${children?.substr(0, limitText)}...`}
      <button
        className="text-slate-400 lg:ml-1 px-2 py-1 rounded-md"
        onClick={handleViewMoreOrLess}
      >
        {shouldViewMoreOrLess ? "View Less" : "View More"}
      </button>
    </div>
  );
}
