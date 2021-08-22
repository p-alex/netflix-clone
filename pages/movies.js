import { useState, useEffect, useContext } from "react";
import ProjectContext from "../context/Project-context";
import Modal from "../components/Modal";
import NavBar from "../components/NavBar";
import MovieFilter from "../components/MovieFilter";
import MoviesContainer from "../components/MoviesContainer";

export default function Movies() {
  const context = useContext(ProjectContext);
  const { allMovies, selectedMovie, handleGetAllMovies } = context;
  const [activeFilter, setActiveFilter] = useState("");
  const [filterdMovieArray, setFilteredMovieArray] = useState([]);

  const handleSetActiveFilter = (filter) => setActiveFilter(filter);
  const handleResetActiveFilter = () => setActiveFilter("");

  console.log(activeFilter);
  useEffect(() => {
    const filtered = allMovies.filter(
      (movie) =>
        movie.genres.includes(activeFilter) ||
        movie.thisMovieIs.includes(activeFilter)
    );
    console.log(filtered);
    setFilteredMovieArray(filtered);
  }, [activeFilter]);
  useEffect(() => {
    if (allMovies.length === 0) handleGetAllMovies();
  }, []);
  return (
    <>
      {selectedMovie?.name ? <Modal movie={selectedMovie} /> : null}
      <NavBar />
      <MovieFilter
        handleSetActiveFilter={handleSetActiveFilter}
        activeFilter={activeFilter}
        handleResetActiveFilter={handleResetActiveFilter}
      />

      <MoviesContainer
        movies={activeFilter ? filterdMovieArray : allMovies}
        marginTop={"230px"}
      />
    </>
  );
}
