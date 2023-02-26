import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header/Header";
import { useEffect } from "react";
import {
  removeRightBarItem,
  selectMovies,
  selectTVShows,
  typeOfSeries,
  updateObjMovieSlide,
  updateObjTVShowSlide,
} from "../../redux/Slices/Film";
import {
  fetchMoviesFromTMDB,
  fetchTVShowsfromTMDB,
} from "../../services/ApiRequests";
import MainSlider from "../Slider/MainSlider";
import CardSlider from "../Slider/CardSlider";
import CardSkeleton from "../Card/CardSkeleton";
import Footer from "../Footer/Footer";
import { MdExplore } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function HomeMain() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const movie = useSelector(selectMovies);
  const tvShow = useSelector(selectTVShows);
  const type = useSelector(typeOfSeries);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [dispatch]);

  useEffect(() => {
    const asyncFetchingMoviesOrTVShows = async () => {
      let res = null;
      switch (type) {
        case "movie":
          // if (Object.keys(movie).length > 0) {
          //   setIsLoading(true);
          //   return;
          // }
          res = await fetchMoviesFromTMDB();
          dispatch(updateObjMovieSlide(res?.map((item) => item.data)));
          break;
        case "tv":
          // if (Object.keys(tvShow).length > 0) {
          //   setIsLoading(true);
          //   return;
          // }
          res = await fetchTVShowsfromTMDB();
          dispatch(updateObjTVShowSlide(res?.map((item) => item.data)));
          break;
        default:
          console.log("some errors in default case");
          return;
      }
      setIsLoading(true);
    };
    asyncFetchingMoviesOrTVShows();
  }, [dispatch, type]);

  return (
    <div className="h-full lg:min-h-screen md:pt-2 overflow-hidden bg-[#EDF1F5] w-full lg:mr-56 xl:ml-56 xl:mr-64">
      <div className="md:hidden flex mx-2 justify-center items-center mt-3.5">
        <div className="flex items-center space-x-2">
          <img
            className="mb-2"
            src="https://cdn-icons-png.flaticon.com/512/3845/3845894.png"
            width={50}
            height={50}
            alt=""
          />
          <span className="text-effect text-2xl text-animation">T-CHILL</span>
        </div>
      </div>
      <Header setIsLoading={() => setIsLoading((prev) => !prev)} />
      <div className="main-slide brightness-90 px-1 overflow-x-hidden">
        {isLoading ? (
          <MainSlider />
        ) : (
          <CardSkeleton css="h-80 w-full bg-[#e2e5e7] rounded-3xl md:h-72 lg:h-80" />
        )}
      </div>
      <div className="normal-slide px-2 mt-3.5 overflow-hidden">
        <ul>
          {isLoading ? (
            <li className="trending-slide lg:min-h-[21rem] overflow-hidden">
              <div className="flex justify-between items-center mx-2">
                <p className="text-base uppercase mb-2 font-bold text-gray-500 pt-3">
                  trending
                </p>
                <MdExplore
                  onClick={() => navigate("/discover")}
                  className="w-6 h-6 object-cover cursor-pointer"
                />
              </div>
              <CardSlider data={movie.trenDing || tvShow.trenDing} />
            </li>
          ) : (
            <CardSkeleton css="h-60 mt-5 w-full bg-[#e2e5e7]" />
          )}
          {isLoading ? (
            <li className="trending-slide lg:min-h-[21rem] mt-3.5 overflow-hidden">
              <div className="flex justify-between items-center mx-2">
                <p className="text-base uppercase mb-2 font-bold text-gray-500 pt-3">
                  Top Rated
                </p>
                <MdExplore
                  onClick={() => navigate("/discover")}
                  className="w-6 h-6 object-cover cursor-pointer"
                />
              </div>
              <CardSlider data={movie.topRated || tvShow.topRated} />
            </li>
          ) : (
            <CardSkeleton css="h-60 mt-5 w-full bg-[#e2e5e7]" />
          )}
          {isLoading ? (
            <li className="trending-slide mt-3.5 lg:min-h-[21rem] overflow-hidden">
              <div className="flex justify-between items-center mx-2">
                <p className="text-base uppercase mb-2 font-bold text-gray-500 pt-3">
                  {type === "tv" ? "on the air" : "upcoming"}
                </p>
                <MdExplore
                  onClick={() => navigate("/discover")}
                  className="w-6 h-6 object-cover cursor-pointer"
                />
              </div>
              {type === "tv" ? (
                <CardSlider data={movie.onTheAir || tvShow.onTheAir} />
              ) : (
                <CardSlider data={movie.upComing || tvShow.upComing} />
              )}
            </li>
          ) : (
            <CardSkeleton css="h-60 mt-5 w-full bg-[#e2e5e7]" />
          )}
        </ul>
      </div>
      <Footer css={`mt-10`} />
    </div>
  );
}
