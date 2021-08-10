import styles from "../styles/MovieCard.module.css";
export default function MovieCard({
  name,
  nameSlug,
  thisMovieIs,
  maturityRating,
  duration,
  released,
  fromSliderWithId,
  handleSelectMovie,
}) {
  return (
    <div className={styles.card} id={`card${fromSliderWithId}`}>
      <div className={styles.card__image}>
        <img src={`/movies/${nameSlug}/${nameSlug}-mini.jpg`} alt={name} />
      </div>
      <div className={styles.card__body} id={`card_body${fromSliderWithId}`}>
        <div className={styles.card__body__controls}>
          <button>
            <i className="fas fa-play"></i>
          </button>
          <button onClick={handleSelectMovie}>
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
