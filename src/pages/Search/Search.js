import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import NormalCard from "../../component/Card/NormalCard";
import CompactBar from "../../component/CompactBar/CompactBar";
import Header from "../../component/Header/Header";
import LeftItem from "../../component/LeftItem/LeftItem";
import { typeOfSeries } from "../../redux/Slices/Film";
import useQueryString from "../../hooks/useQueryString";
import {
  removeOldArr,
  searchMoviesOrTvShows,
  selectSearchRensponse,
} from "../../redux/Slices/Search";
import SearchInput from "../../component/Input/SearchInput";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
export default function Search() {
  const dispatch = useDispatch();
  const { query, page } = useQueryString();
  const arrSearchItems = useSelector(selectSearchRensponse) || [];
  const type = useSelector(typeOfSeries);
  const [_, setSearchParams] = useSearchParams();
  const [isLoaded, setIsLoaded] = useState(false);

  const handleChangePages = (event, value) => {
    setSearchParams({ query, page: value });
    dispatch(removeOldArr());
  };
  // console.log(arrSearchItems);
  useEffect(() => {
    if (query) {
      dispatch(searchMoviesOrTvShows({ query, page }));
      setIsLoaded(true);
    }
    if (!query) {
      dispatch(removeOldArr());
    }
    window.scrollTo(0, 0);
    return () => {
      setIsLoaded(false);
    };
  }, [query, page, dispatch, type]);

  useEffect(() => {
    return () => {
      dispatch(removeOldArr());
    };
  }, [dispatch, type]);

  return (
    <div className="min-h-screen bg-[#EDF1F5] max-w-screen">
      <div className="flex-col flex md:flex-row">
        <CompactBar>
          <LeftItem />
        </CompactBar>
        <div className="w-full mt-3 lg:mt-0 h-full p-2 lg:p-6 xl:ml-56 text-center">
          <div className="big-box mb-3">
            <Header />
            <p className="text-4xl text-[#516170] mt-3 font-semibold">
              Find The Films That You Wish To
            </p>
            <div className="flex justify-center items-center">
              <SearchInput css={"w-[90%] lg:w-[40%] mt-5"} />
            </div>

            <div className="w-full mt-6 lg:mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-3 gap-x-2 md:gap-3">
              {arrSearchItems?.results?.length > 0 &&
                arrSearchItems?.results
                  .filter((i) => i?.poster_path)
                  .map((item) => <NormalCard key={item.id} data={item} />)}
            </div>

            {isLoaded && arrSearchItems?.results?.length === 0 && (
              <div className="flex flex-col items-center justify-center mt-4">
                <h1 class="text-9xl font-bold text-purple-400">404</h1>
                <p className="md:text-lg lg:text-xl text-gray-800 mt-3">
                  Sorry, the items you are looking for could not be found.
                </p>
              </div>
            )}
            {arrSearchItems?.total_pages !== 0 &&
              arrSearchItems?.results?.length > 0 && (
                <Stack className="mx-auto mt-5" spacing={3}>
                  <Pagination
                    page={arrSearchItems?.page || page}
                    count={arrSearchItems?.total_pages || null}
                    variant="outlined"
                    color="primary"
                    onChange={handleChangePages}
                  />
                </Stack>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
