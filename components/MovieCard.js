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
        <div className={styles.card__controls}>
          <button>
            <i className="fas fa-play"></i>
          </button>
          <button onClick={handleSelectMovie}>
            <i className="fas fa-angle-down"></i>
          </button>
        </div>

        <div className={styles.card__stats}>
          <span>{released}</span>
          <span>{maturityRating}+</span>
          <span>{duration}</span>
        </div>
        <div className={styles.card__thisMovieIs}>
          {thisMovieIs.map((item, id) => {
            return <p key={(item, id)}>{item}</p>;
          })}
        </div>
      </div>
    </div>
  );
}
