import React, {  useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMovies,
  selectTVShows,
  typeOfSeries,
} from "../../redux/Slices/Film";
import { HiDotsVertical } from "react-icons/hi";
import BarCard from "../Card/BarCard";
import { Link, useNavigate } from "react-router-dom";
import CardSkeleton from "../Card/CardSkeleton";
import SearchInput from "../Input/SearchInput";

export default function RightBar() {
  // const [isLoading ,setIsLoading] = useState(true)
  const movies = useSelector(selectMovies);
  const tvShows = useSelector(selectTVShows);
  const type = useSelector(typeOfSeries);
  const navigate = useNavigate();
  const searchInput = useRef(null);

  const renderRightBarContent = () => {
    if (type === "movie") {
      return movies?.popular?.results.length > 0 ? (
        movies.popular.results.slice(0, 3).map((movie) => (
          <div key={movie.id}>
            <BarCard type={type} results={movie} />
          </div>
        ))
      ) : (
        <CardSkeleton cards={3} css="h-28 w-full shrink-0 rounded-l-lg" />
      );
    } else if (type === "tv") {
      return tvShows?.popular?.results.length > 0 ? (
        tvShows.popular.results.slice(0, 3).map((tv) => (
          <div key={tv.id}>
            <BarCard type={type} results={tv} />
          </div>
        ))
      ) : (
        <CardSkeleton cards={3} css="h-28 w-full shrink-0 rounded-l-lg" />
      );
    }
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchInput?.current?.value) {
      return;
    }
    navigate(`/search?query=${searchInput?.current.value}&page=${1}`);
  };
  return (
    <div className="hidden lg:fixed h-screen top-0 right-0 border border-l-gray-200 bg-white px-3.5 shrink-0 lg:block lg:w-56 xl:w-64">
      <div className="w-full relative lg:mt-6 xl:mt-3 flex flex-col space-y-5 xl:space-y-3">
        <SearchInput
          css={"w-full"}
          searchInput={searchInput}
          handleSubmit={handleSubmit}
        />

        <p className="font-semibold text-sm uppercase flex justify-between text-[#4b5563]">
          Popular <HiDotsVertical className="text-base" />
        </p>
        {renderRightBarContent()}
        <Link className="text-xs font-bold text-white" to="/discover">
          <button className="w-full py-3 px-1 uppercase bg-gray-900 cursor-pointer rounded-sm">
            see more
          </button>
        </Link>
      </div>
    </div>
  );
}
