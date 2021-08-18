import { useContext } from "react";
import ProjectContext from "../context/Project-context";
import styles from "../styles/MovieCard.module.css";
import AddToListBtn from "./AddToListBtn";
export default function MovieCard({ movie, fromSliderWithId }) {
  const context = useContext(ProjectContext);

  const { handleSelectMovie } = context;
  const { name, nameSlug, maturityRating, duration, thisMovieIs } = movie;
  return (
    <div
      className={styles.card}
      id={fromSliderWithId ? `card${fromSliderWithId}` : `card${name}`}
      style={fromSliderWithId ? null : { width: "auto" }}
    >
      <div className={styles.card__image}>
        <button
          className={styles.card__image__openModalBtn}
          onClick={() => handleSelectMovie(movie)}
        >
          {name}
        </button>
        <img src={`/movies/${nameSlug}/${nameSlug}-mini.jpg`} alt={name} />
      </div>
      <div className={styles.card__body} id={`card_body${fromSliderWithId}`}>
        <div className={styles.card__body__controls}>
          <div className={styles.card__body__controls__container}>
            <button className={styles.card__body__controls__container__playBtn}>
              <i className="fas fa-play"></i>
            </button>
            <AddToListBtn movie={movie} />
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
          {thisMovieIs.map((item) => {
            return <p key={`card-body-${item}`}>{item}</p>;
          })}
        </div>
      </div>
    </div>
  );
}
