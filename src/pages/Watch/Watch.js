import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CompactBar from "../../component/CompactBar/CompactBar";
import {
  fetchEmbeddedMovieVideo,
  fetchEmbeddedTVShowsVideo,
} from "../../services/ApiRequests";
import MuiNav from "./MuiNav";
import Recommend from "./Recommend";
import LeftItem from "../../component/LeftItem/LeftItem";
import { Skeleton } from "@mui/material";
import useQueryString from "../../hooks/useQueryString";
import {
  fetchDetailOfOneMovieOrTvShows,
  removePrevItem,
  selectDetails,
} from "../../redux/Slices/Detail";

export default function Watch() {
  const { season, episode } = useQueryString();
  const { type, id } = useParams();
  const dispatch = useDispatch();
  const detailData = useSelector(selectDetails);
  const [video, setVideo] = useState();
  const [isLoading, setIsLoading] = useState(true);
  // const type = useSelector(typeOfSeries);
  useEffect(() => {
    const asyncFetchingEmbeddedVideo = async () => {
      setIsLoading(true);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      dispatch(fetchDetailOfOneMovieOrTvShows({ type, id }));
      switch (type) {
        case "movie":
          setVideo(fetchEmbeddedMovieVideo(id));
          break;
        case "tv":
          setVideo(fetchEmbeddedTVShowsVideo(id, season, episode));
          break;
        default:
          console.log("some errors in default case");
          return;
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    };
    asyncFetchingEmbeddedVideo();
  }, [id, episode, season, type, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(removePrevItem());
    };
  }, [dispatch]);

  return (
    <div className="max-w-screen min-h-screen flex flex-row scroll-smooth bg-[#EDF1F5]">
      <CompactBar>
        <LeftItem />
      </CompactBar>
      <div className="w-full space-y-6 xl:ml-56 p-3 md:p-6 lg:px-5">
        <div className="space-y-4 2xl:basis-1/2">
          {/* <SearchInput css={`max-w-lg mx-auto`} /> */}
          {!isLoading && video ? (
            <iframe
              src={video}
              allowFullScreen
              className="aspect-[4/3] h-auto mx-auto mt-3 w-full lg:aspect-video"
              frameBorder="0"
              title="video"
            />
          ) : (
            <Skeleton
              className="aspect-[4/3] h-auto mx-auto mt-3 w-full lg:aspect-video"
              sx={{ bgcolor: "grey.400" }}
              variant="rectangular"
            />
          )}
        </div>
        <div className="shadow shadow-gray-400 bg-[#fbfbfb] h-72 lg:h-80 overflow-y-scroll scroll-smooth">
          <MuiNav setIsLoading={setIsLoading} detailData={detailData} />
        </div>
        <Recommend />
      </div>
    </div>
  );
}
