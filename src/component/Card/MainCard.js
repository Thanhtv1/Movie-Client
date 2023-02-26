import React, { useEffect, useRef, useState } from "react";
import { TMBD_IMG_URL } from "../../utils/constants";
import { useSelector } from "react-redux";
import { typeOfSeries } from "../../redux/Slices/Film";
import { useNavigate } from "react-router-dom";
import useObsever from "../../hooks/useObsever";
export default function CardMainSlide({ data }) {
  const navigate = useNavigate();
  const type = useSelector(typeOfSeries);
  const currentRef = useRef();
  const entry = useObsever(currentRef, { rootMargin: "1px" });
  const [lazyImage, setlazyImage] = useState("");
  const imageFromTMDB = `${TMBD_IMG_URL("w1280")}${data?.backdrop_path}`;
  useEffect(() => {
    if (!entry) return;
    if (entry?.isIntersecting) {
      setlazyImage(imageFromTMDB);
      // console.log(entry);
    }
    return () => setlazyImage("");
  }, [entry, type, imageFromTMDB]);
  const renderSlide = () => {
    return (
      <main
        ref={currentRef}
        data-src=""
        style={{
          backgroundImage: `url(${lazyImage})`,
        }}
        className="flex h-72 w-full flex-row items-end rounded-3xl bg-cover bg-center transition-all duration-500 ease-in-out"
      >
        {lazyImage && (
          <div className="space-y-6 p-12">
            <p className="text-xl font-bold text-white text-clip antialiased drop-shadow-2xl  md:text-4xl">
              {data.title || data.name}
            </p>
            <p className="text-sm w-max my-4 p-1 border font-semibold border-white text-white bg-slate-900 bg-opacity-50 cursor-pointer rounded-full">
              {data.release_date || data.first_air_date}
            </p>
            <button
              onClick={() => navigate(`/${type}/${data.id}`)}
              className="flex justify-center w-28 cursor-pointer p-3 rounded-full bg-gray-900 text-lg font-semibold text-white shadow-lg shadow-gray-500 transition hover:scale-105 hover:shadow-gray-300"
            >
              Watch
            </button>
          </div>
        )}
      </main>
    );
  };
  return renderSlide();
}
