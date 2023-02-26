import React, { memo } from "react";
import { useEffect, useState } from "react";
import { axiosFilm } from "../../services/_configURL";
import { API_KEY } from "../../utils/constants";
import { removeAllItems, typeOfSeries } from "../../redux/Slices/Film";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import useQueryString from "../../hooks/useQueryString";
function Genres() {
  const dispatch = useDispatch();
  const type = useSelector(typeOfSeries);
  const currentParams = useQueryString();
  const [genresArr, setGenresArr] = useState([]);
  const [clickedGenres, setClickedGenres] = useState([]);
  const [_, setSearchParams] = useSearchParams();

  const handleClickGenres = (id) => {
    let genreParams;
    const isExist = clickedGenres.find((g) => g === id);
    if (isExist) {
      const filteredGen = clickedGenres.filter((g) => g !== id);
      setClickedGenres(filteredGen);
      genreParams = filteredGen;
    } else {
      genreParams = [...clickedGenres, id];
      setClickedGenres((prev) => [...prev, id]);
    }
    // console.log(currentParams);
    // let params = new URLSearchParams(currentParams);
    // let keysForDel = [];
    // params.forEach((value, key) => {
    //   if (value === "") {
    //     keysForDel.push(key);
    //   }
    // });

    // keysForDel.forEach((key) => {
    //   params.delete(key);
    // });

    // console.log(params.toString());
    if (genreParams.length === 0) {
      const { with_genres, ...rest } = currentParams;
      setSearchParams({
        ...rest,
      });
    } else {
      setSearchParams({
        ...currentParams,
        with_genres: genreParams.toString(),
      });
    }
    dispatch(removeAllItems());
  };

  useEffect(() => {
    if (currentParams?.with_genres) {
      setClickedGenres(
        currentParams?.with_genres?.split(",").map((g) => g * 1)
      );
    } else {
      setClickedGenres([]);
    }
  }, [currentParams.with_genres]);

  useEffect(() => {
    const asyncFetchingGenres = async () => {
      try {
        const {
          data: { genres },
        } = await axiosFilm.get(
          `/genre/${type}/list?api_key=${API_KEY}&language=en-US`
        );
        setGenresArr(genres);
      } catch (error) {
        console.log(error);
      }
    };
    asyncFetchingGenres();

    return () => {
      setClickedGenres([]);
    };
  }, [type]);
  return (
    <div className="w-full col-span-6">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-base">Genres</p>
      </div>
      <div
        className={`mt-2 lg:mt-0 flex gap-1 xl:gap-2 flex-wrap  xl:h-28 overflow-x-hidden `}
      >
        {genresArr?.map(({ id, name }) => (
          <button
            onClick={() => handleClickGenres(id)}
            key={id}
            className={`w-max items-center text-xs mt-1 font-semibold px-1.5 py-1 rounded-md transition-all duration-200 ${
              clickedGenres?.includes(id)
                ? "text-[#ffffff] bg-[#3db4f2]"
                : "text-[#5c728a] bg-[#fbfbfb]"
            }`}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
export default memo(Genres);
