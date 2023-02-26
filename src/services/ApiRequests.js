import { API_KEY } from "../utils/constants";
import { axiosFilm } from "./_configURL";

export const fetchEmbeddedMovieVideo = (id) => {
  return `https://www.2embed.to/embed/tmdb/movie?id=${id}`;
};

export const fetchEmbeddedTVShowsVideo = (id, season, ep) => {
  return `https://www.2embed.to/embed/tmdb/tv?id=${id}&s=${season}&e=${ep}`;
};

export const fetchCredits = async (type, id) => {
  const { data } = await axiosFilm.get(
    `/${type}/${id}/credits?api_key=${API_KEY}&language=en-US`
  );
  return data;
};
export const fetchRecommendations = async (type, id) => {
  const { data } = await axiosFilm.get(
    `/${type}/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`
  );
  return data;
};
export const fetchRelatedVideos = async (type, id) => {
  const { data } = await axiosFilm.get(
    `/${type}/${id}/videos?api_key=${API_KEY}&language=en-US`
  );
  return data;
};
export const fetchSimilarItems = async (type, id) => {
  const { data } = await axiosFilm.get(
    `/${type}/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`
  );
  return data;
};

export const fetchMoviesFromTMDB = async () => {
  const randomePage = Math.floor(Math.random() * 10) + 1;
  try {
    const Trending = axiosFilm.get(`/trending/movie/day?api_key=${API_KEY}`);
    const TopRated = axiosFilm.get(
      `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    );
    const Upcoming = axiosFilm.get(
      `/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
    );
    const Popular = axiosFilm.get(
      `/movie/popular?api_key=${API_KEY}&language=en-US&page=${randomePage}`
    );
    const arrMovies = await Promise.all([
      Trending,
      TopRated,
      Upcoming,
      Popular,
    ]);
    return arrMovies;
  } catch (error) {
    console.log(error);
  }
};

export const fetchTVShowsfromTMDB = async () => {
  const randomePage = Math.floor(Math.random() * 10) + 1;
  try {
    const Trending = axiosFilm.get(`/trending/tv/day?api_key=${API_KEY}`);
    const TopRated = axiosFilm.get(
      `/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    );
    const OnTheAir = axiosFilm.get(
      `/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`
    );
    const Popular = axiosFilm.get(
      `/tv/popular?api_key=${API_KEY}&language=en-US&page=${randomePage}`
    );
    const arrTVShow = await Promise.all([
      Trending,
      TopRated,
      OnTheAir,
      Popular,
    ]);
    return arrTVShow;
  } catch (error) {
    console.log(error);
  }
};
