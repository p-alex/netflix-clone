import MovieCard from "./MovieCard";
import styles from "../styles/MoviesContainer.module.css";
export default function MoviesContainer({ movies, title, marginTop }) {
  return (
    <div
      className={styles.moviesContainer}
      style={marginTop ? { marginTop } : null}
    >
      {title && <h2>{title}</h2>}
      {movies &&
        movies.map((movie) => {
          return <MovieCard key={`movie-card-${movie.name}`} movie={movie} />;
        })}
    </div>
  );
}
