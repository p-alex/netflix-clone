import { useState, useEffect, useContext } from "react";
import ProjectContext from "../context/Project-context";
import Modal from "../components/Modal/Modal";
import NavBar from "../components/NavBar/NavBar";
import MovieFilter from "../components/MovieFilter/MovieFilter";
import MoviesContainer from "../components/MoviesContainer/MoviesContainer";
import FullscreenLoader from "../components/FullscreenLoader/FullscreenLoader";
import MobileNavBar from "../components/MobileNavBar/MobileNavBar";
import Head from "next/head";
export default function Movies() {
  const context = useContext(ProjectContext);

  const { allMovies, selectedMovie, handleGetAllMovies, isLoading } = context;
  const [activeFilter, setActiveFilter] = useState("");
  const [filterdMovieArray, setFilteredMovieArray] = useState([]);

  const handleSetActiveFilter = (filter) => setActiveFilter(filter);

  const handleResetActiveFilter = () => setActiveFilter("");

  useEffect(() => {
    const filtered = allMovies.filter(
      (movie) =>
        movie.genres.includes(activeFilter) ||
        movie.thisMovieIs.includes(activeFilter)
    );
    setFilteredMovieArray(filtered);
  }, [activeFilter]);

  useEffect(() => {
    if (allMovies.length === 0) handleGetAllMovies();
  }, []);

  return (
    <>
      <Head>
        <title>Netflix Clone | All movies</title>
      </Head>
      {isLoading && <FullscreenLoader />}
      {selectedMovie?.name ? <Modal movie={selectedMovie} /> : null}
      <NavBar />
      <MobileNavBar />
      <MovieFilter
        handleSetActiveFilter={handleSetActiveFilter}
        activeFilter={activeFilter}
        handleResetActiveFilter={handleResetActiveFilter}
      />

      <MoviesContainer movies={activeFilter ? filterdMovieArray : allMovies} />
    </>
  );
}
