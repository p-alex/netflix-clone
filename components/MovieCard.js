import styles from "../styles/MovieCard.module.css";
import AddToListBtn from "./AddToListBtn";
export default function MovieCard({
  name,
  nameSlug,
  thisMovieIs,
  maturityRating,
  duration,
  released,
  fromSliderWithId,
  handleSelectMovie,
  _id,
}) {
  return (
    <div className={styles.card} id={`card${fromSliderWithId}`}>
      <div className={styles.card__image}>
        <img src={`/movies/${nameSlug}/${nameSlug}-mini.jpg`} alt={name} />
      </div>
      <div className={styles.card__body} id={`card_body${fromSliderWithId}`}>
        <div className={styles.card__body__controls}>
          <div className={styles.card__body__controls__container}>
            <button className={styles.card__body__controls__container__playBtn}>
              <i className="fas fa-play"></i>
            </button>
            <AddToListBtn id={_id} />
          </div>

          <button
            className={styles.card__body__controls__moreInfo}
            onClick={handleSelectMovie}
          >
            <i className="fas fa-angle-down"></i>
          </button>
        </div>

        <div className={styles.card__body__stats}>
          <span>{released}</span>
          <span>{maturityRating}+</span>
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
