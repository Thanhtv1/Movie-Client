import React, { memo, useEffect, useRef, useState } from "react";
import { TMBD_IMG_URL } from "../../utils/constants";
import { useSelector } from "react-redux";
import { typeOfSeries } from "../../redux/Slices/Film";
import { Link, useMatch } from "react-router-dom";
import useObsever from "../../hooks/useObsever";
import {
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-lazy-load-image-component/src/effects/blur.css";

function NormalCard({
  data,
  isLastItem,
  increasePage,
  rootMargin,
}) {
  const imgRef = useRef();
  const type = useSelector(typeOfSeries);
  const entry = useObsever(imgRef, { rootMargin: rootMargin || "50px" });
  const isMatchHome = Boolean(useMatch(`/`));
  const [isInView, setIsInview] = useState(false);

  useEffect(() => {
    if (!entry) return;
    if (
      isLastItem &&
      entry?.isIntersecting &&
      typeof increasePage === "function"
    ) {
      increasePage()
    }
  }, [entry, isLastItem, type]);

  useEffect(() => {
    if (entry?.isIntersecting && data?.poster_path) {
      setTimeout(() => {
        setIsInview(true);
      }, 100);
    }
  }, [entry,data?.poster_path]);

  return (
    <div className={`${isMatchHome ? "mx-1" : ""}`}>
      <Link to={`/${type}/${data.id}`}>
        <div className="relative group overflow-hidden rounded-lg">
          <LazyLoadImage
            delayTime={200}
            width={`full`}
            className="w-full h-64 object-fill rounded-lg brightness-[0.9] group-hover:scale-105 group-hover:brightness-100 transition-all"
            src={`${data?.poster_path && TMBD_IMG_URL("w342")}${
              data?.poster_path
            }`}
            alt=""
          />
          <div
            className={`absolute top-0 z-20 left-0 transition duration-200 h-64 ${
              isInView
                ? "bg-transparent invisible"
                : " bg-white/30 rounded-lg backdrop-filter visible backdrop-blur-md cursor-pointer overflow-hidden w-full"
            }`}
          ></div>
          <div className="absolute top-3 left-3 text-sm bg-gray-800/70 px-2 py-1 rounded-full text-white font-medium">
            {(data.release_date || data.first_air_date)?.substring(0, 4)}
          </div>
          <div className="absolute top-3 right-3 text-sm bg-gray-800/70 px-2 py-1 rounded-full text-white font-medium">
            <span className="inline-flex items-center">
              {data?.vote_average?.toFixed(1)}
              <svg
                className="ml-1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width={16}
                height={16}
              >
                <defs>
                  <linearGradient
                    id="b"
                    x1="-1483.396"
                    x2="-1155.767"
                    y1="1056.787"
                    y2="1056.787"
                    gradientUnits="userSpaceOnUse"
                    xlinkHref="#a"
                  />
                  <linearGradient id="a">
                    <stop offset={0} stopColor="#fcd635" />
                    <stop offset={1} stopColor="#f7a928" />
                  </linearGradient>
                </defs>
                <path
                  fill="url(#b)"
                  d="M-1220 1212.362c-11.656 8.326-86.446-44.452-100.77-44.568-14.324-.115-89.956 51.449-101.476 42.936-11.52-8.513 15.563-95.952 11.247-109.61-4.316-13.658-76.729-69.655-72.193-83.242 4.537-13.587 96.065-14.849 107.721-23.175 11.656-8.325 42.535-94.497 56.86-94.382 14.323.116 43.807 86.775 55.327 95.288 11.52 8.512 103.017 11.252 107.334 24.91 4.316 13.658-68.99 68.479-73.527 82.066-4.536 13.587 21.133 101.451 9.477 109.777z"
                  color="#000"
                  overflow="visible"
                  transform="matrix(.04574 0 0 .04561 68.85 -40.34)"
                />
              </svg>
            </span>
          </div>
          <div
            className={`absolute bottom-0 left-0 ${
              (data.title || data.name).length > 26 ? "pb-2" : "pb-3"
            } rounded-b-lg pt-2 transition-all duration-300 dark-bottom-card w-full`}
          >
            <div className="mx-auto">
              <h2
                ref={imgRef}
                className={`text-base text-center text-slate-100 font-medium block text-clip pt-3`}
              >
                {(data.title || data.name).length > 26
                  ? (data.title || data.name).substring(0, 26) + `...`
                  : data.title || data.name}
              </h2>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
export default memo(trackWindowScroll(NormalCard));
