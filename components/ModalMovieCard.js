import { useContext } from "react";
import ProjectContext from "../context/Project-context";
import styles from "../styles/ModalMovieCard.module.css";
export default function ModalMovieCard({ movie, isMinThree }) {
  const context = useContext(ProjectContext);
  const { handleAddMovieToList, movieList } = context;
  const { nameSlug, maturityRating, release, description, _id, duration } =
    movie;
  return (
    <div
      className={
        isMinThree
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
          {movieList.includes(_id) ? (
            <button
              className={
                styles.modalMovieCard__cardBody__infoAndAdd__add +
                " " +
                styles.movieIsAdded
              }
              onClick={() => handleAddMovieToList(_id, false)}
            >
              <i class="fas fa-check"></i>
            </button>
          ) : (
            <button
              className={styles.modalMovieCard__cardBody__infoAndAdd__add}
              onClick={() => handleAddMovieToList(_id, true)}
            >
              <i class="fas fa-plus"></i>
            </button>
          )}
        </div>
        <p className={styles.modalMovieCard__cardBody__description}>
          {description}
        </p>
      </div>
    </div>
  );
}
