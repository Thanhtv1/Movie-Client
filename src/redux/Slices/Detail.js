import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosFilm } from "../../services/_configURL";
import { API_KEY } from "../../utils/constants";

export const fetchDetailOfOneMovieOrTvShows = createAsyncThunk(
  "film/getDetailOfOneMovie",
  async ({ type, id }) => {
    try {
      const {data} = await axiosFilm.get(
        `/${type}/${id}?api_key=${API_KEY}&language=en-US`
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const detailSlice = createSlice({
  name: "detail",
  initialState: {
    Details: {},
    similarItem: [],
    relatedVideos: [],
    Casts: [],
  },
  reducers: {
    updateRelatedVideos: (state, action) => {
      state.relatedVideos = action.payload;
    },
    updateSimilarItem: (state, action) => {
      state.similarItem = action.payload;
    },
    updateCredits: (state, action) => {
      state.Casts = action.payload;
    },
    removePrevItem: (state) => {
      state.Details = {};
      state.Casts = [];
      state.similarItem = [];
      state.relatedVideos = [];
    },
  },
  extraReducers: {
    [fetchDetailOfOneMovieOrTvShows.fulfilled]: (state, { payload }) => {
      state.Details = payload;
    },
    [fetchDetailOfOneMovieOrTvShows.rejected]: () => {
      console.log("detail error");
    },
  },
});

export const {
  updateRelatedVideos,
  updateSimilarItem,
  updateCredits,
  removePrevItem,
} = detailSlice.actions;

export const selectSimilar = (state) => state.detailReducer.similarItem;
export const selectDetails = (state) => state.detailReducer.Details;
export const selectVideos = (state) => state.detailReducer.relatedVideos;
export const selectCasts = (state) => state.detailReducer.Casts;
export default detailSlice.reducer;
