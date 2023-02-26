import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosFilm } from "../../services/_configURL";
import { API_KEY } from "../../utils/constants";

export const searchMoviesOrTvShows = createAsyncThunk(
  "film/searchMoviesOrTvShows",
  async (params, thunkAPI) => {
    try {
      const { type } = thunkAPI.getState().filmReducer;
      const { page, query } = params;
      const response = await axiosFilm.get(
        `/search/${type}?api_key=${API_KEY}&language=en-US&query=${query}&include_adult=false&page=${
          page || 1
        }`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
const searchSlice = createSlice({
  name: "search",
  initialState: {
    status: "idle",
    searchResponse: [],
  },
  reducers: {
    removeOldArr: (state) => {
      state.status = "idle";
      state.searchResponse = null;
    },
  },
  extraReducers: {
    [searchMoviesOrTvShows.pending]: (state) => {
      state.status = "pending";
    },
    [searchMoviesOrTvShows.fulfilled]: (state, { payload }) => {
      state.searchResponse = payload;
      state.status = "fullfiled";
    },
    [searchMoviesOrTvShows.rejected]: (state) => {
      console.log("search items error");
      state.status = "fullfiled";
    },
  },
});

export const { removeOldArr } = searchSlice.actions;
export const selectSearchRensponse = (state) =>
  state.searchReducer.searchResponse;
export const selectSearchStatus = (state) => state.searchReducer.status;
export default searchSlice.reducer;
