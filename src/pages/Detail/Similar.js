import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSimilar, updateSimilarItem } from "../../redux/Slices/Detail";
import { fetchSimilarItems } from "../../services/ApiRequests";
import { useNavigate, useParams } from "react-router-dom";
import { TMBD_IMG_URL } from "../../utils/constants";
import CardSkeleton from "../../component/Card/CardSkeleton";
import {
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component";

function Similar({ scrollPosition }) {
  const [isLoading, setIsLoading] = useState(true);
  console.log(isLoading);
  const navigate = useNavigate();
  const { type, id } = useParams();
  const dispatch = useDispatch();
  const similarItems = useSelector(selectSimilar)?.filter(
    (data) => data?.backdrop_path && data?.poster_path
  );
  useEffect(() => {
    const asyncFetchingSimilarItems = async () => {
      setIsLoading(true)
      try {
        const { results } = await fetchSimilarItems(type, id);
        dispatch(updateSimilarItem(results));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    asyncFetchingSimilarItems();
  }, [dispatch, type, id]);
  return (
    <div className="mt-3">
      <h1 className="text-xl font-medium py-3">Similar</h1>
      <div className="flex items-center">
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {isLoading && (
            <CardSkeleton cards={12} css="h-24 w-44 lg:w-52" />
          )}
          {!isLoading && similarItems && similarItems.length > 0 ? (
            similarItems.map((c) => (
              <li
                onClick={() => navigate(`/${type}/${c.id}`)}
                key={c.id}
                className="flex flex-col space-y-1 cursor-pointer rounded-md"
              >
                <div className="bg-gray-700 relative rounded-md">
                  <LazyLoadImage
                    className={`hover:translate-x-1 hover:-translate-y-1 duration-100 rounded-md brightness-90`}
                    alt=""
                    delayTime={200}
                    src={`${TMBD_IMG_URL("w400")}${c.backdrop_path}`}
                    scrollPosition={scrollPosition}
                  />
                  <span className="text-xs text-slate-100 absolute font-bold top-2 right-2 inline-flex">
                    {c?.vote_average?.toFixed(1)}
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
                <p
                  className={`hover:text-[#893218] text-sm font-semibold text-gray-800 pt-0.5 text-clip`}
                >
                  {(c.title || c.name)?.length > 50
                    ? (c.title || c.name)?.substring(0, 50) + `...`
                    : c.title || c.name}
                </p>
                <p className="hover:text-[#893218] text-sm text-gray-800 pt-0.5">
                  {c.release_date || c.first_air_date}
                </p>
              </li>
            ))
          ) : (
            <p className="text-left">No data Found</p>
          )}
        </ul>
      </div>
    </div>
  );
}
export default memo(trackWindowScroll(Similar));
