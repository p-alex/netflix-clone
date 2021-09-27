import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import ProjectContext from "../../context/Project-context";
import styles from "./Modal.module.css";
import MoreLikeThisSection from "../../modalSections/MoreLikeThisSection/MoreLikeThisSection";
import AboutMovieSection from "../../modalSections/AboutMovieSection/AboutMovieSection";
import Button from "../Button/Button";
import AddToListBtn from "../AddToListBtn/AddToListBtn";
import BottomFade from "../BottomFade/BottomFade";
import CommentSection from "../../modalSections/CommentSection/CommentSection";
import MovieInfoSection from "../../modalSections/MovieInfoSection/MovieInfoSection";
export default function Modal({ movie }) {
  const router = useRouter();
  const [moreLikeThisArray, setMoreLikeThisArray] = useState([]);
  const { nameSlug } = movie;
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
                    <AddToListBtn movieId={movie._id} btnType="rounded" />
                  </div>
                  <BottomFade />
                </div>
              </div>

              <MovieInfoSection movie={movie} />

              {moreLikeThisArray.length !== 0 && (
                <MoreLikeThisSection movies={moreLikeThisArray} />
              )}

              <AboutMovieSection movie={movie} />

              <CommentSection movie={movie} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
