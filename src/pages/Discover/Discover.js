import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CompactBar from "../../component/CompactBar/CompactBar";
import {
  selectAllItems,
  fetchDiscoverMoviesOrTvShows,
  removeAllItems,
  typeOfSeries,
  updatePage,
  selectPage,
  selectStatusDiscover,
} from "../../redux/Slices/Film";
import NormalCard from "../../component/Card/NormalCard";
import { useState } from "react";
import CardSkeleton from "../../component/Card/CardSkeleton";
import Filter from "../../component/Filter/Filter";
import { useNavigate } from "react-router-dom";
import useQueryString from "../../hooks/useQueryString";
import Header from "../../component/Header/Header";
import LeftItem from "../../component/LeftItem/LeftItem";

export default function Discover() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentParams = useQueryString();
  const { sort, with_genres, start, end } = currentParams;
  const validItem = useSelector(selectAllItems)?.filter(
    (data) => data?.poster_path && data?.backdrop_path
  );
  const type = useSelector(typeOfSeries);
  const page = useSelector(selectPage);
  const status = useSelector(selectStatusDiscover);

  const increasePage = useCallback(() => {
    dispatch(updatePage());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchDiscoverMoviesOrTvShows({ sort, with_genres, start, end }));
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, [dispatch, page, type, sort, with_genres, start, end]);

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      dispatch(removeAllItems());
    };
  }, [dispatch]);
  return (
    <div className="min-h-screen max-w-screen bg-[#EDF1F5]">
      <div className="flex-col flex md:flex-row w-full">
        <CompactBar>
          <LeftItem />
        </CompactBar>
        <div className="w-full h-full p-2.5 md:p-3 lg:px-4 lg:pt-0 xl:ml-56  ">
          <Filter />
          <div className="big-box mt-1 md:mt-0">
            <Header
              setIsLoading={() => {
                dispatch(removeAllItems());
                setIsLoading(true);
                navigate("/discover");
              }}
            />
            <div className="grid-layout">
              {isLoading ? (
                <CardSkeleton
                  cards={20}
                  css="mx-1 h-64 md:h-56 xl:h-60 rounded-lg"
                />
              ) : (
                validItem?.map((r, index) => (
                  <NormalCard
                    key={index}
                    data={r}
                    increasePage={increasePage}
                    isLastItem={index === validItem.length - 1}
                  />
                ))
              )}
            </div>
            {status === "fullfiled" && validItem?.length === 0 && (
              <div className="flex flex-col items-center justify-center mt-4">
                <h1 class="text-9xl font-bold text-purple-400">404</h1>
                <p className="md:text-lg lg:text-xl text-gray-800 mt-3">
                  Sorry, the items you are looking for could not be found.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
