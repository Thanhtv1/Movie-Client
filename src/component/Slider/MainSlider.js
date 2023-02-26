import Slider from "react-slick";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { mainSliderSettings } from "./configSlider";
import {
  selectMovies,
  selectTVShows,
  typeOfSeries,
} from "../../redux/Slices/Film";
import MainCard from "../Card/MainCard";

export default function MainSlider() {
  const type = useSelector(typeOfSeries);
  const movies = useSelector(selectMovies);
  const tvShows = useSelector(selectTVShows);
  const renderMoviesOrTvShows = () => {
    if (type === "movie") {
      return movies?.upComing?.results
        .filter((movie) => movie?.backdrop_path && movie?.poster_path)
        .map((movie) => (
          <div key={movie.id}>
            <MainCard data={movie} />
          </div>
        ));
    } else if (type === "tv") {
      return tvShows?.popular?.results
        .filter((tv) => tv?.backdrop_path && tv?.poster_path)
        .map((tv) => (
          <div key={tv.id}>
            <MainCard data={tv} />
          </div>
        ));
    }
  };

  return (
    <Slider className="h-full mx-2" {...mainSliderSettings}>
      {renderMoviesOrTvShows()}
    </Slider>
  );
}
