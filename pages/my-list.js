import { useEffect, useContext } from "react";
import ProjectContext from "../context/Project-context";
import Modal from "../components/Modal/Modal";
import NavBar from "../components/NavBar/NavBar";
import MoviesContainer from "../components/MoviesContainer/MoviesContainer";
import FullscreenLoader from "../components/FullscreenLoader/FullscreenLoader";
export default function MyList() {
  const context = useContext(ProjectContext);
  const { allMovies, selectedMovie, isLoading, handleGetAllMovies } = context;
  const { movieList } = context.userData;
  useEffect(() => {
    if (allMovies.length === 0) handleGetAllMovies();
  }, []);
  return (
    <>
      {isLoading && <FullscreenLoader />}
      {selectedMovie?.name ? <Modal movie={selectedMovie} /> : null}
      <NavBar />

      <MoviesContainer movies={movieList} title={"My List"} />
    </>
  );
}
