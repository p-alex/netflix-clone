import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import ProjectContext from "../../context/Project-context";
import styles from "./Modal.module.css";
import MoreLikeThisSection from "../../sections/MoreLikeThisSection/MoreLikeThisSection";
import AboutMovieSection from "../../sections/AboutMovieSection/AboutMovieSection";
import Button from "../Button/Button";
import AddToListBtn from "../AddToListBtn/AddToListBtn";
import Link from "next/link";
import BottomFade from "../BottomFade/BottomFade";
import CommentSection from "../../sections/CommentSection/CommentSection";
export default function Modal({ movie }) {
  const router = useRouter();
  const [moreLikeThisArray, setMoreLikeThisArray] = useState([]);
  const {
    name,
    nameSlug,
    description,
    genres,
    cast,
    thisMovieIs,
    duration,
    release,
    maturityRating,
  } = movie;
  const context = useContext(ProjectContext);
  const { handleResetSelectedMovie, allMovies } = context;
  useEffect(() => {
    setMoreLikeThisArray(
      allMovies.filter((mov) => {
        if (mov.name !== movie.name) {
          if (
            mov.genres.some((m) => movie.genres.includes(m)) &&
            mov.thisMovieIs.some((t) => movie.thisMovieIs.includes(t))
          ) {
            return mov;
          }
        }
      })
    );
    return () => {
      handleResetSelectedMovie();
      console.log("Modal unmounted");
    };
  }, []);
  return (
    <>
      {movie.name && (
        <>
          <div className={styles.modal__container}>
            <div
              className={styles.modal__backdrop}
              onClick={handleResetSelectedMovie}
            ></div>

            <div className={styles.modal}>
              <button
                className={styles.modal__closeBtn}
                onClick={handleResetSelectedMovie}
              >
                X
              </button>

              <div className={styles.modal__header}>
                <div className={styles.modal__header__video}>
                  <img
                    className={styles.modal__header__video__videoImage}
                    src={`/movies/${nameSlug}/${nameSlug}-video-cover.jpg`}
                    alt=""
                  />
                  <img
                    className={styles.modal__header__video__movieLogo}
                    src={`/movies/${nameSlug}/${nameSlug}-logo.png`}
                    alt=""
                  />
                  <div className={styles.modal__header__video__btnContainer}>
                    <Button
                      type="play"
                      value="Play"
                      func={() => router.push(`/movie/${movie._id}`)}
                    />
                    <AddToListBtn movie={movie} btnType="regular" />
                  </div>
                  <BottomFade />
                </div>
              </div>

              {/*------------------ MODAL INFO ------------------*/}
              <div className={styles.modal__info}>
                <div className={styles.modal__info__container}>
                  <h2 className={styles.modal__info__container__nameMobile}>
                    {name}
                  </h2>
                  <div
                    className={
                      styles.modal__info__container__mobileBtnContainer
                    }
                  >
                    <Button
                      type="play"
                      value=""
                      func={() => router.push(`/movie/${movie._id}`)}
                    />
                    <AddToListBtn movie={movie} btnType="regular" />
                  </div>

                  <div className={styles.modal__info__stats}>
                    <p className={styles.modal__info__stats__release}>
                      {release}
                    </p>
                    <p className={styles.modal__info__stats__maturityRating}>
                      {maturityRating}+
                    </p>
                    <p className={styles.modal__info__stats__duration}>
                      {duration}
                    </p>
                  </div>
                  <div className={styles.modal__info__description}>
                    <p className={styles.modal__info__description__description}>
                      {description}
                    </p>
                  </div>
                </div>
                <div className={styles.modal__info__container}>
                  <p className={styles.modal__info__container__cast}>
                    Cast:
                    {cast.map((actor, id) => {
                      if (id < 3) {
                        return (
                          <Link
                            key={`modal-cast-${actor}`}
                            href={`/actors/${actor}`}
                          >
                            {actor}
                          </Link>
                        );
                      }
                      return;
                    })}
                    {cast.length > 3 && <a href="#modalAbout">more...</a>}
                  </p>
                  <p className={styles.modal__info__container__genres}>
                    Genres:
                    {genres.map((genre, id) => {
                      if (id < 3) {
                        return (
                          <Link
                            key={`modal-genre-${genre}`}
                            href={`/genres/${genre}`}
                          >
                            {genre}
                          </Link>
                        );
                      }
                      return;
                    })}
                    {genres.length > 3 && <a href="#modalAbout">more...</a>}
                  </p>
                  <p className={styles.modal__info__container__thisMovieIs}>
                    This movie is:
                    {thisMovieIs.map((item, id) => {
                      if (id < 3) {
                        return (
                          <Link
                            key={`modal-thisMovieIs-${item}`}
                            href={`/this-movie-is/${item}`}
                          >
                            {item}
                          </Link>
                        );
                      }
                      return;
                    })}
                    {thisMovieIs.length > 3 && (
                      <a href="#modalAbout">more...</a>
                    )}
                  </p>
                </div>
              </div>

              {/*------------------ MORE LIKE THIS ------------------*/}
              {moreLikeThisArray.length !== 0 && (
                <MoreLikeThisSection movies={moreLikeThisArray} />
              )}

              {/*------------------ MODAL ABOUT ------------------*/}
              <AboutMovieSection movie={movie} />
              <CommentSection movie={movie} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
