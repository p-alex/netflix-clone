import { useEffect, useContext } from "react";
import ProjectContext from "../context/Project-context";
import Modal from "../components/Modal/Modal";
import NavBar from "../components/NavBar/NavBar";
import MoviesContainer from "../components/MoviesContainer/MoviesContainer";
import FullscreenLoader from "../components/FullscreenLoader/FullscreenLoader";
import MobileNavBar from "../components/MobileNavBar/MobileNavBar";
export default function MyList() {
  const context = useContext(ProjectContext);
  const { allMovies, selectedMovie, isLoading, handleGetAllMovies } = context;
  const { movieList } = context.userData;
  useEffect(() => {
    if (allMovies.length === 0) handleGetAllMovies();
  }, []);
  const filterAllMovies = () => {
    if (allMovies.length && movieList) {
      const theArray = [];
      movieList.map((movieId) => {
        allMovies.map((movie) => {
          if (movie._id === movieId) {
            theArray.push(movie);
          }
        });
      });
      return theArray;
    }
  };
  return (
    <>
      {isLoading && <FullscreenLoader />}
      {selectedMovie?.name ? <Modal movie={selectedMovie} /> : null}
      <NavBar />
      <MobileNavBar />
      <MoviesContainer movies={filterAllMovies()} title={"My List"} />
    </>
  );
}
