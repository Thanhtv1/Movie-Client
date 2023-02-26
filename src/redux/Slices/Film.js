import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosFilm } from "../../services/_configURL";
import { API_KEY } from "../../utils/constants";

export const fetchDiscoverMoviesOrTvShows = createAsyncThunk(
  "film/fetchDiscoverMoviesOrTvShows",
  async (objParams, thunkAPI) => {
    try {
      const { type, page } = thunkAPI.getState().filmReducer;
      const { sort, with_genres, start, end } = objParams;
      const response = await axiosFilm.get(
        `/discover/${type}?api_key=${API_KEY}&language=en-US&include_adult=false&sort_by=${
          sort || "popularity.desc"
        }&with_genres=${
          with_genres || ""
        }&with_runtime.gte=0&primary_release_date.gte=${
          start || ""
        }&primary_release_date.lte=${end || ""}&air_date.lte=${
          end || ""
        }&page=${page || 1}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  type: localStorage.getItem("type") || "movie",
  page: 1,
  status: "idle",
  allMoviesOrTvShows: [],
  objMovieSlide: {},
  objTVShowSlide: {},
};

const filmSlice = createSlice({
  name: "film",
  initialState: initialState,
  reducers: {
    updateType: (state, action) => {
      state.type = action.payload;
    },
    updatePage: (state, action) => {
      if (!action.payload) {
        state.page++;
      } else {
        state.page = action.payload;
      }
    },
    updateStatus: (state, action) => {
      state.status = action;
    },
    updateObjMovieSlide: (state, action) => {
      const [trenDing, topRated, upComing, popular] = action.payload;
      state.objMovieSlide.trenDing = trenDing;
      state.objMovieSlide.topRated = topRated;
      state.objMovieSlide.upComing = upComing;
      state.objMovieSlide.popular = popular;
      state.objTVShowSlide = {};
    },
    updateObjTVShowSlide: (state, action) => {
      const [trenDing, topRated, onTheAir, popular] = action.payload;
      state.objTVShowSlide.trenDing = trenDing;
      state.objTVShowSlide.topRated = topRated;
      state.objTVShowSlide.onTheAir = onTheAir;
      state.objTVShowSlide.popular = popular;
      state.objMovieSlide = {};
    },
    removeAllItems: (state) => {
      state.page = 1;
      state.status = "idle";
      state.allMoviesOrTvShows = [];
    },
  },
  extraReducers: {
    [fetchDiscoverMoviesOrTvShows.pending]: (state) => {
      state.status = "pending";
    },

    [fetchDiscoverMoviesOrTvShows.fulfilled]: (state, { payload }) => {
      state.status = "fullfiled";
      state.allMoviesOrTvShows = [
        ...state.allMoviesOrTvShows,
        ...payload.results,
      ];
    },
    [fetchDiscoverMoviesOrTvShows.rejected]: (state) => {
      console.log("all items error");
      state.status = "fullfiled";
    },
  },
});

export const {
  updateType,
  updatePage,
  updateObjMovieSlide,
  updateObjTVShowSlide,
  removeAllItems,
} = filmSlice.actions;
export const typeOfSeries = (state) => state.filmReducer.type;
export const selectPage = (state) => state.filmReducer.page;
export const selectParamsRedux = (state) => state.filmReducer.objParams;
export const selectAllItems = (state) => state.filmReducer.allMoviesOrTvShows;
export const arrMovieItems = (state) => state.filmReducer.arrItem;
export const selectMovies = (state) => state.filmReducer.objMovieSlide;
export const selectTVShows = (state) => state.filmReducer.objTVShowSlide;
export const selectStatusDiscover = (state) => state.filmReducer.status;
export default filmSlice.reducer;
