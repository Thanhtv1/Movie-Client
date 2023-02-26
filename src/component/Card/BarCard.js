import React, { memo, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useObsever from "../../hooks/useObsever";
import { TMBD_IMG_URL } from "../../utils/constants";

function BarCard({ type, results }) {
  const [imgURL, setImgURL] = useState(
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
  );
  const imgRef = useRef();
  const entry = useObsever(imgRef, { rootMargin: "10px" });
  useEffect(() => {
    if (!entry) return;
    if (entry?.isIntersecting) {
      setImgURL(entry.target.dataset.src);
    }
  }, [entry]);
  return (
    <Link to={`/${type}/${results.id}`}>
      <span className="duration-400 transition h-28 flex cursor-pointer space-x-2 flex-row items-center rounded-lg shadow-gray-400 bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-lg hover:-translate-y-1 hover:shadow-gray-900">
        <img
          ref={imgRef}
          className="h-full w-[35%] shrink-0 rounded-l-lg object-fill"
          src={imgURL}
          data-src={`${TMBD_IMG_URL("w200")}${results.poster_path}`}
          alt=""
        />
        <div className="flex flex-col justify-around grow h-full">
          {(results.title || results.name).length > 40 ? (
            <p className={`text-sm font-semibold text-clip $`}>
              {(results.title || results.name).slice(0, 40)}...
            </p>
          ) : (
            <p className={`text-sm font-semibold text-clip $`}>
              {results.title || results.name}
            </p>
          )}

          <span className="text-xs inline-flex">
            {results.vote_average?.toFixed(1)}
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
          <p className="text-xs">
            {results.release_date || results.first_air_date}
          </p>
        </div>
      </span>
    </Link>
  );
}

export default memo(BarCard);
