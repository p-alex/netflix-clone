import Link from "next/link";
import styles from "./AboutMovieSection.module.css";
export default function AboutMovieSection({ movie }) {
  const { name, genres, writer, cast, thisMovieIs, maturityRating, directors } =
    movie;
  return (
    <div className={styles.modal__about} id="modalAbout">
      <h2 className={styles.modal__about__movieName}>About {name}</h2>
      <p className={styles.modal__about__director}>
        Director:
        {directors.map((director) => (
          <Link
            key={`modal-about-director-${director}`}
            href={`/directors/${director}`}
          >
            {director}
          </Link>
        ))}
      </p>
      <p className={styles.modal__about__cast}>
        Cast:
        {cast.map((actor) => (
          <Link key={`modal-about-cast-${actor}`} href={`/actors/${actor}`}>
            {actor}
          </Link>
        ))}
      </p>
      <p className={styles.modal__about__writer}>
        Writer:
        {writer.map((author) => (
          <Link
            key={`modal-about-writer-${author}`}
            href={`/writers/${author}`}
          >
            {author}
          </Link>
        ))}
      </p>
      <p className={styles.modal__about__genres}>
        Genres:
        {genres.map((genre) => (
          <Link key={`modal-about-genres-${genre}`} href={`/genres/${genre}`}>
            {genre}
          </Link>
        ))}
      </p>

      <p className={styles.modal__about__thisMovieIs}>
        This movie is:
        {thisMovieIs.map((item) => (
          <Link
            key={`modal-about-thisMovieIs-${item}`}
            href={`/this-movie-is/${item}`}
          >
            {item}
          </Link>
        ))}
      </p>
      <p className={styles.modal__about__maturityRating}>
        Maturity Rating: {maturityRating}+ Recommended for ages {maturityRating}{" "}
        and up
      </p>
    </div>
  );
}
