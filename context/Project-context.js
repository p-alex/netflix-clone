import { createContext } from "react";
export default createContext({
  handleLogout: () => {},
  userData: [],
  selectedMovie: {},
  handleSelectMovie: () => {},
  handleResetSelectedMovie: () => {},
  allMovies: [],
  isLoading: false,
  handleGetAllMovies: () => {},
  handleGetUserData: () => {},
  handleAddMovieToList: () => {},
  userMovieList: [],
  bannerMovie: {},
  handleSetBannerMovie: () => {},
  filters: [],
});
