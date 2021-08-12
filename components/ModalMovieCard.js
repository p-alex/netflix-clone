import styles from "../styles/ModalMovieCard.module.css";
export default function ModalMovieCard({ movie, isMinThree }) {
  const { nameSlug, maturityRating, release, description } = movie;
  return (
    <div
      className={
        isMinThree
          ? styles.modalMovieCard
          : styles.modalMovieCard + " " + styles.modalMovieCard_maxWidth
      }
    >
      <img
        className={styles.modalMovieCard__image}
        src={`/movies/${nameSlug}/${nameSlug}-mini.jpg`}
      />
      <div className={styles.modalMovieCard__cardBody}>
        <div className={styles.modalMovieCard__cardBody__infoAndAdd}>
          <div className={styles.modalMovieCard__cardBody__infoAndAdd__info}>
            <p
              className={
                styles.modalMovieCard__cardBody__infoAndAdd__info__maturityRating
              }
            >
              {maturityRating}+
            </p>
            <p
              className={
                styles.modalMovieCard__cardBody__infoAndAdd__info__release
              }
            >
              {release}
            </p>
          </div>
          <button className={styles.modalMovieCard__cardBody__infoAndAdd__add}>
            +
          </button>
        </div>
        <p className={styles.modalMovieCard__cardBody__description}>
          {description}
        </p>
      </div>
    </div>
  );
}
