import { useRouter } from "next/router";
import Link from "next/link";
import Button from "../../components/Button/Button";
import AddToListBtn from "../../components/AddToListBtn/AddToListBtn";
import styles from "./MovieInfoSection.module.css";
export default function MovieInfoSection({ movie }) {
  const router = useRouter();
  const {
    name,
    description,
    genres,
    cast,
    thisMovieIs,
    duration,
    release,
    maturityRating,
  } = movie;
  return (
    <div className={styles.modal__info}>
      <div className={styles.modal__info__container}>
        <h2 className={styles.modal__info__container__nameMobile}>{name}</h2>
        <div className={styles.modal__info__container__BtnContainer}>
          <Button
            type="play"
            value="Play"
            size="large"
            func={() => router.push(`/movie/${movie._id}`)}
          />

          <AddToListBtn movieId={movie._id} btnType="rounded" />
        </div>

        <div className={styles.modal__info__stats}>
          <p className={styles.modal__info__stats__release}>{release}</p>
          <p className={styles.modal__info__stats__maturityRating}>
            {maturityRating}+
          </p>
          <p className={styles.modal__info__stats__duration}>{duration}</p>
        </div>

        <div className={styles.modal__info__description}>
          <p className={styles.modal__info__description__text}>{description}</p>
        </div>
      </div>
      <div
        className={
          styles.modal__info__container +
          " " +
          styles.modal__info__container__right
        }
      >
        <p className={styles.modal__info__container__cast}>
          <span>Cast:</span>
          {cast.map((actor, id) => {
            if (id < 3) {
              return (
                <Link key={`modal-cast-${actor}`} href={`/actors/${actor}`}>
                  {actor}
                </Link>
              );
            }
            return;
          })}
          {cast.length > 3 && <a href="#modalAbout">more...</a>}
        </p>

        <p className={styles.modal__info__container__genres}>
          <span>Genres:</span>
          {genres.map((genre, id) => {
            if (id < 3) {
              return (
                <Link key={`modal-genre-${genre}`} href={`/genres/${genre}`}>
                  {genre}
                </Link>
              );
            }
            return;
          })}
          {genres.length > 3 && <a href="#modalAbout">more...</a>}
        </p>

        <p className={styles.modal__info__container__thisMovieIs}>
          <span>This movie is:</span>
          {thisMovieIs.map((item, id) => {
            if (id < 3) {
              return (
                <Link
                  key={`modal-thisMovieIs-${item}`}
                  href={`/this-movie-is/${item}`}
                >
                  {item}
                </Link>
              );
            }
            return;
          })}
          {thisMovieIs.length > 3 && <a href="#modalAbout">more...</a>}
        </p>
      </div>
    </div>
  );
}
