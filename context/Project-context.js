import { createContext } from "react";
export default createContext({
  handleLogout: () => {},
  handleSelectMovie: () => {},
  userData: [],
  selectedMovie: {},
  handleResetSelectedMovie: () => {},
});
