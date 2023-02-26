import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardSkeleton from "../../component/Card/CardSkeleton";
import { selectCasts, updateCredits } from "../../redux/Slices/Detail";
import { fetchCredits } from "../../services/ApiRequests";
import { TMBD_IMG_URL } from "../../utils/constants";
import { trackWindowScroll } from "react-lazy-load-image-component";
import { useParams } from "react-router-dom";

function Cast({ css }) {
  const { type, id } = useParams();
  const dispatch = useDispatch();
  const castItem = useSelector(selectCasts);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const asyncFetchingCredits = async () => {
      setIsLoading(true)
      try {
        const { cast } = await fetchCredits(type, id);
        dispatch(updateCredits(cast.slice(0, 8)));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    asyncFetchingCredits();
  }, [dispatch, type, id]);
  return (
    <div className={`w-full flex flex-col overflow-hidden ${css ? css : ""}`}>
      <h1 className="text-xl font-medium py-2">Cast</h1>
      <ul className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-3">
        {isLoading && <CardSkeleton cards={8} css="h-20 rounded-md" />}
        {!isLoading && castItem && castItem.length > 0 ? (
          castItem
            .filter((c) => c.profile_path !== null)
            .map((c) => (
              <li
                key={c.id}
                className="flex justify-between items-center rounded-md bg-[#fafafa]"
              >
                <div className="flex items-center">
                  <div className="relative inline-block">
                    {c.profile_path && (
                      <img
                        src={`${TMBD_IMG_URL("w200")}/${c.profile_path}`}
                        className="w-16 object-fill rounded-l-md"
                        alt=""
                      />
                    )}
                  </div>
                  <div className="ml-1.5 h-full flex flex-col justify-between space-y-5">
                    <p className="font-semibold block text-xs lg:text-sm text-clip text-[#5c728a]">
                      {c.original_name}
                    </p>
                    <span className="text-[#5c728a] text-xs block mt-0.5">
                      as {c?.character}
                    </span>
                  </div>
                </div>
              </li>
            ))
        ) : (
         <p>No data Found</p>
        )}
      </ul>
    </div>
  );
}

export default memo(trackWindowScroll(Cast));
