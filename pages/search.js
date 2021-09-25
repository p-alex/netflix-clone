import { useState, useEffect, useContext } from "react";
import NavBar from "../components/NavBar/NavBar";
import MobileNavBar from "../components/MobileNavBar/MobileNavBar";
import ProjectContext from "../context/Project-context";
import MoviesContainer from "../components/MoviesContainer/MoviesContainer";
import Modal from "../components/Modal/Modal";
export default function search() {
  const context = useContext(ProjectContext);
  const { searchQuery, allMovies, handleGetAllMovies, selectedMovie } = context;
  const [filteredMovies, setFilteredMovies] = useState();
  useEffect(() => {
    if (allMovies.length === 0) handleGetAllMovies();
  }, []);
  useEffect(() => {
    setFilteredMovies(
      allMovies.filter((movie) =>
        movie.name
          .replace("-", "")
          .toLowerCase()
          .includes(searchQuery?.toLowerCase())
      )
    );
  }, [allMovies, searchQuery]);
  return (
    <>
      {selectedMovie?.name ? <Modal movie={selectedMovie} /> : null}
      <NavBar />
      <MobileNavBar />
      <MoviesContainer
        movies={filteredMovies}
        title={`Results for '${searchQuery}'`}
      />
    </>
  );
}
