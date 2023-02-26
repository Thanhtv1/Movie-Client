import React, { memo } from "react";
import Slider from "react-slick";
import { cardSliderSettings } from "./configSlider";
import NormalCard from "../Card/NormalCard";
import { useSelector } from "react-redux";
import { typeOfSeries } from "../../redux/Slices/Film";

function CardSlider({ data }) {
  const type = useSelector(typeOfSeries);

  const renderMoviesOrTvShows = () => {
    if (type === "movie") {
      return (
        data?.results?.length > 0 &&
        data?.results
          .filter((movie) => movie.poster_path !== null && movie.backdrop_path !== null )
          .map((item) => (
            <div key={item.id}>
              <NormalCard rootMargin="110px" data={item} />
            </div>
          ))
      );
    } else if (type === "tv") {
      return data?.results
        .filter((tv) => tv.poster_path !== null && tv.backdrop_path !== null)
        .map((item) => (
          <div key={item.id}>
            <NormalCard rootMargin="110px" data={item} />
          </div>
        ));
    }
  };
  return <Slider {...cardSliderSettings}>{renderMoviesOrTvShows()}</Slider>;
}

export default memo(CardSlider);
