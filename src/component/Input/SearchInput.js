import React, { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMatch, useNavigate } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import useQueryString from "../../hooks/useQueryString";
import { typeOfSeries } from "../../redux/Slices/Film";
import { axiosFilm } from "../../services/_configURL";
import { API_KEY } from "../../utils/constants";

function SearchInput() {
  const dispatch = useDispatch();
  const [preview, setPreview] = useState([]);
  const isMatch = Boolean(useMatch(`/search`));
  const inputRef = useRef(null);
  const [isFocus, setIsFocus] = useState(false);
  const type = useSelector(typeOfSeries);
  const navigate = useNavigate();
  const { query } = useQueryString();
  const [searchInput, setSearchInput] = useState(query || "");
  const debouncedSearch = useDebounce(searchInput, 400);

  const handleChangeInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleClearInput = (e) => {
    e.preventDefault();
    if (!debouncedSearch) {
      return;
    }
    inputRef.current?.focus();
    setSearchInput("");
    setPreview([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchInput) {
      return;
    }
    if (isFocus) {
      setIsFocus(false);
    }
    navigate(`/search?query=${searchInput}&page=${1}`);
  };

  const handleClickSearchItem = (name) => {
    setIsFocus(false);
    navigate(`/search?query=${name}`);
  };
  // console.log(inputRef.current);
  useEffect(() => {
    const fetchingPreviewSearch = async () => {
      if (debouncedSearch) {
        const { data } = await axiosFilm.get(
          `/search/${type}?api_key=${API_KEY}&language=en-US&query=${debouncedSearch}&include_adult=false&page=${1}`
        );
        setPreview(
          data.results
            ?.slice(0, 8)
            ?.filter(({ poster_path }) => poster_path !== null)
        );
      } else {
        setPreview([]);
        return;
      }
    };
    fetchingPreviewSearch();
  }, [dispatch, debouncedSearch, type]);

  return (
    <div
      className={`${isMatch ? "w-[85%] lg:w-1/2 mt-5" : "w-full"} relative `}
    >
      <div className="absolute z-50 left-0 top-10 w-full">
        <ul
          className={`${
            preview?.length > 0 && isFocus ? "block" : "hidden"
          } border border-gray-200 rounded overflow-hidden shadow-md`}
        >
          {preview?.length > 0 &&
            preview.map((pre) => (
              <li
                onMouseDown={() => handleClickSearchItem(pre.title || pre.name)}
                key={pre.id}
                className="cursor-pointer text-sm px-3 py-2 bg-white hover:bg-sky-100 hover:text-sky-900 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out truncate"
              >
                {pre.title || pre.name}
              </li>
            ))}
        </ul>
      </div>
      <form onSubmit={handleSubmit} className="w-full flex">
        <input
          ref={inputRef}
          value={searchInput}
          onChange={handleChangeInput}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          type="text"
          placeholder="Search..."
          className="rounded-l-lg w-[75%] p-2 border-t mr-0 border-b border-l text-gray-800 border-gray-300 bg-[#fbfbfb]"
        />
        <button
          onClick={handleClearInput}
          type="button"
          className="w-[25%] rounded-r-lg bg-[#3db4f2] hover:brightness-90 font-medium border-[#3db4f2] text-[#ffffff] border-t border-b border-r"
        >
          Clear
        </button>
      </form>
    </div>
  );
}
export default memo(SearchInput);
