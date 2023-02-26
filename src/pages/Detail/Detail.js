import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchDetailOfOneMovieOrTvShows,
  selectDetails,
  removePrevItem,
} from "../../redux/Slices/Detail";
import { TMBD_IMG_URL } from "../../utils/constants";
import CompactBar from "../../component/CompactBar/CompactBar";
import Cast from "./Cast";
import RelatedVideos from "./RelatedVideos";
import RelatedInformation from "./RelatedInformation";
import Similar from "./Similar";
import { localStorageService } from "../../services/LocalStorage";
import { Skeleton } from "@mui/material";
import Footer from "../../component/Footer/Footer";
import LeftItem from "../../component/LeftItem/LeftItem";
import { toast } from "react-toastify";
import { axiosClient } from "../../services/_configURL";
import { toastOptions } from "../../utils/options";

export default function Detail() {
  const navigate = useNavigate();
  const { type, id } = useParams();
  const dispatch = useDispatch();
  const detailData = useSelector(selectDetails);
  const handleNavigate = () => {
    if (localStorageService.user?.get()) {
      localStorageService.user.setHistory(detailData);
    }
    navigate(`watch${type === "tv" ? "?season=1&episode=1" : ""}`);
  };
  const handleAddFavorite = async (data) => {
    const user = localStorageService.user?.get();
    if (user.accessToken && user.username) {
      axiosClient
        .post("/user/addFlim", {
          data,
        })
        .then((res) => {
          toast.success(res.data.msg, toastOptions(1500));
        })
        .catch((err) => {
          toast.error(err?.response?.data || err?.message, toastOptions(1500));
        });
    } else {
      toast.warning("You must login first to add films", toastOptions(2000));
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchDetailOfOneMovieOrTvShows({ type, id }));
    // remove details of previous item
    return () => {
      dispatch(removePrevItem())
    };
  }, [dispatch, type, id]);

  return (
    <>
      <div className="bg-[#EDF1F5] max-w-screen flex overflow-x-hidden">
        <CompactBar>
          <LeftItem />
        </CompactBar>
        <div className="px-4 pt-5 xl:ml-56 flex flex-col w-full">
          {detailData?.backdrop_path || detailData?.poster_path ? (
            <div
              className={`h-max flex flex-col md:flex-row md:bg-transparent lg:h-[26.5rem] w-full py-4 relative mt-4 md:pl-4 overflow-hidden bg-center bg-cover bg-no-repeat`}
              style={{
                backgroundImage: `${
                  detailData?.backdrop_path &&
                  `url(${TMBD_IMG_URL("w1280")}${detailData?.backdrop_path}`
                }`,
              }}
            >
              <div
                className={`absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 `}
              ></div>
              <img
                onClick={() => handleAddFavorite(detailData)}
                className="w-10 h-10 object-cover z-50 absolute top-6 right-8 md:right-1 md:top-1 cursor-pointer transition-transform duration-300 hover:scale-110"
                src="https://cdn-icons-png.flaticon.com/512/4340/4340223.png"
                alt=""
              ></img>
              {detailData?.poster_path && (
                <img
                  className="md:block w-[90%] mx-auto h-[22rem] md:h-80 md:w-56 self-center shrink-0 z-20"
                  src={`${TMBD_IMG_URL("w500")}${detailData?.poster_path}`}
                  alt=""
                ></img>
              )}

              <div className="mx-3 self-center md:ml-5 overflow-hidden flex-grow flex flex-col mt-4 md:mt-1 z-20">
                <RelatedInformation detailData={detailData} />
                <button
                  onClick={() => handleNavigate()}
                  className="text-white md:w-28 mt-3  p-4 md:p-2 uppercase cursor-pointer rounded-xl bg-gradient-to-r from-gray-700 to-gray-900 transition hover:brightness-75"
                >
                  watch
                </button>
              </div>
            </div>
          ) : (
            <Skeleton
              sx={{ mt: 3 }}
              animation={`wave`}
              variant="rounded"
              width={`full`}
              height={400}
            />
          )}
          <section className="mt-4 related-data flex flex-col">
            <Cast />
            <Similar />
            <RelatedVideos />
          </section>
        </div>
      </div>
      <Footer css="xl:ml-56" />
    </>
  );
}
