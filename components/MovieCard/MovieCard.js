import { useContext } from "react";
import ProjectContext from "../../context/Project-context";
import styles from "./MovieCard.module.css";
import AddToListBtn from "../AddToListBtn/AddToListBtn";
import { useRouter } from "next/router";
export default function MovieCard({ movie, fromSliderWithId, isMouseDown }) {
  const context = useContext(ProjectContext);
  const router = useRouter();
  const { handleSelectMovie } = context;
  const { name, nameSlug, maturityRating, duration, thisMovieIs, _id } = movie;
  return (
    <div
      className={styles.card}
      id={fromSliderWithId ? `card${fromSliderWithId}` : `card${name}`}
      style={fromSliderWithId ? null : { width: "auto" }}
    >
      <div className={styles.card__image}>
        <button
          className={styles.card__image__openModalBtn}
          onClick={
            isMouseDown === false ? () => handleSelectMovie(movie) : null
          }
        >
          {name}
        </button>
        <img src={`/movies/${nameSlug}/${nameSlug}-mini.jpg`} alt={name} />
      </div>
      <div className={styles.card__body} id={`card_body${fromSliderWithId}`}>
        <div className={styles.card__body__controls}>
          <div className={styles.card__body__controls__container}>
            <button
              className={styles.card__body__controls__container__playBtn}
              onClick={() => router.push(`/movie/${_id}`)}
            >
              <i className="fas fa-play"></i>
            </button>
            <AddToListBtn movie={movie} btnType="rounded" />
          </div>

          <button
            className={styles.card__body__controls__moreInfo}
            onClick={() => handleSelectMovie(movie)}
          >
            <i className="fas fa-angle-down"></i>
          </button>
        </div>

        <div className={styles.card__body__stats}>
          <span className={styles.card__body__stats__maturityRating}>
            {maturityRating}+
          </span>
          <span>{duration}</span>
        </div>
        <div className={styles.card__body__thisMovieIs}>
          {thisMovieIs.map((item, id) => {
            if (id < 3) {
              return <p key={`card-body-${item}`}>{item}</p>;
            }
            return;
          })}
        </div>
      </div>
    </div>
  );
}
