import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import FullscreenLoader from "../../components/FullscreenLoader/FullscreenLoader";
import MobileNavBar from "../../components/MobileNavBar/MobileNavBar";
import Modal from "../../components/Modal/Modal";
import MoviesContainer from "../../components/MoviesContainer/MoviesContainer";
import NavBar from "../../components/NavBar/NavBar";
import ProjectContext from "../../context/Project-context";

export default function ActorMovies() {
  const router = useRouter();
  const context = useContext(ProjectContext);
  const { allMovies, handleGetAllMovies, isLoading, selectedMovie } = context;
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    if (allMovies.length === 0) handleGetAllMovies();
  }, []);

  useEffect(() => {
    setFilteredMovies(
      allMovies.filter((movie) => movie.cast.includes(router.query.actor))
    );
  }, [allMovies, router.query.actor]);
  return (
    <>
      {isLoading && <FullscreenLoader />}
      {selectedMovie?.name ? <Modal movie={selectedMovie} /> : null}
      <NavBar />
      <MobileNavBar />
      <MoviesContainer movies={filteredMovies} title={router.query.actor} />
    </>
  );
}
