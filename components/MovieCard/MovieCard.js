import { useContext } from "react";
import ProjectContext from "../../context/Project-context";
import styles from "./MovieCard.module.css";
import AddToListBtn from "../AddToListBtn/AddToListBtn";
import { useRouter } from "next/router";
import MoreInfoBtn from "../MoreInfoBtn/MoreInfoBtn";
import Image from "next/image";
export default function MovieCard({
  movie,
  fromSliderWithId,
  isMouseDown,
  isTabIndexActive,
  isFirstCard,
  cardId,
}) {
  const context = useContext(ProjectContext);
  const router = useRouter();
  const { handleSelectMovie, isAddToListLoading } = context;
  const { name, nameSlug, maturityRating, duration, thisMovieIs, _id } = movie;

  return (
    <div
      className={styles.card}
      id={fromSliderWithId ? `card${fromSliderWithId}` : `card${name}`}
      style={fromSliderWithId ? null : { width: "auto" }}
    >
      <div className={styles.card__image}>
        <span className={styles.card__image__fallback}>{name}</span>
        {/* //Open modal for mobile */}
        <button
          className={styles.card__image__openModalMobileBtn}
          onClick={!isMouseDown ? () => handleSelectMovie(movie) : null}
        >
          {name}
        </button>
        {/* //Open modal for desktop */}
        <button
          className={styles.card__image__openModalDesktopBtn}
          onClick={() => handleSelectMovie(movie)}
          name={name}
          aria-label={`${name} open modal`}
          tabIndex={isTabIndexActive}
          id={
            isFirstCard
              ? `firstCard${cardId}VisibleFromSlider${fromSliderWithId}`
              : null
          }
        >
          {name}
        </button>
        <Image
          className={styles.card__image__mini}
          src={`/movies/${nameSlug}/${nameSlug}-mini.jpg`}
          alt={name}
          width="341"
          height="192"
          layout="responsive"
        />
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
            <AddToListBtn
              movieId={movie._id}
              btnType="rounded"
              movieName={movie.name}
            />
          </div>
          <MoreInfoBtn movie={movie} />
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
              return (
                <p
                  key={`card-body-${item}`}
                  className={styles.card__body__thisMovieIs__type}
                >
                  {item}
                </p>
              );
            }
            return;
          })}
        </div>
      </div>
    </div>
  );
}
