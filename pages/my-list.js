import { useContext } from "react";
import ProjectContext from "../context/Project-context";
import Modal from "../components/Modal";
import NavBar from "../components/NavBar";
import MoviesContainer from "../components/MoviesContainer";
export default function MyList() {
  const context = useContext(ProjectContext);
  const { selectedMovie } = context;
  const { movieList } = context.userData;
  return (
    <>
      {selectedMovie?.name ? <Modal movie={selectedMovie} /> : null}
      <NavBar />

      <MoviesContainer movies={movieList} title={"My List"} />
    </>
  );
}
