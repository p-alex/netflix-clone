import { useRouter } from "next/router";
import styles from "./ModalMovieCard.module.css";
import AddToListBtn from "../AddToListBtn/AddToListBtn";
export default function ModalMovieCard({ movie, isMaxThree }) {
  const { nameSlug, maturityRating, release, description, duration, _id } =
    movie;
  const router = useRouter();
  return (
    <div
      className={
        isMaxThree
          ? styles.modalMovieCard
          : styles.modalMovieCard + " " + styles.modalMovieCard_maxWidth
      }
    >
      <div
        className={styles.modalMovieCard__cardHeader}
        onClick={() => router.push(`/movie/${_id}`)}
      >
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
          <AddToListBtn movieId={movie._id} btnType="rounded" />
        </div>
        <p className={styles.modalMovieCard__cardBody__description}>
          {description}
        </p>
      </div>
    </div>
  );
}
