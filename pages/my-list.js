import { useContext } from "react";
import ProjectContext from "../context/Project-context";
import Modal from "../components/Modal";
import NavBar from "../components/NavBar";
import MovieCard from "../components/MovieCard";
import styles from "../styles/MyList.module.css";
export default function MyList() {
  const context = useContext(ProjectContext);
  const { selectedMovie } = context;
  const { movieList } = context.userData;
  return (
    <>
      {selectedMovie?.name ? <Modal movie={selectedMovie} /> : null}
      <NavBar />

      <div className={styles.movieContainer}>
        <h1>My List</h1>
        {movieList &&
          movieList.map((movie) => {
            return <MovieCard key={`movie-card-${movie.name}`} movie={movie} />;
          })}
      </div>
    </>
  );
}
