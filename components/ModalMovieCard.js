import styles from "../styles/ModalMovieCard.module.css";
import AddToListBtn from "./AddToListBtn";
export default function ModalMovieCard({ movie, isMaxThree }) {
  const { nameSlug, maturityRating, release, description, _id, duration } =
    movie;
  return (
    <div
      className={
        isMaxThree
          ? styles.modalMovieCard
          : styles.modalMovieCard + " " + styles.modalMovieCard_maxWidth
      }
    >
      <div className={styles.modalMovieCard__cardHeader}>
        <p className={styles.modalMovieCard__cardHeader__duration}>
          {duration}
        </p>
        <div className={styles.modalMovieCard__cardHeader__playBtn}>
          <i className="fas fa-play"></i>
        </div>
        <img
          className={styles.modalMovieCard__cardHeader__image}
          src={`/movies/${nameSlug}/${nameSlug}-mini.jpg`}
        />
      </div>

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
          <AddToListBtn id={_id} />
        </div>
        <p className={styles.modalMovieCard__cardBody__description}>
          {description}
        </p>
      </div>
    </div>
  );
}
