import { useState, useContext, useEffect, useRef } from "react";
import ProjectContext from "../../context/Project-context";
import styles from "./Modal.module.css";
import MoreLikeThisSection from "../../modalSections/MoreLikeThisSection/MoreLikeThisSection";
import AboutMovieSection from "../../modalSections/AboutMovieSection/AboutMovieSection";
import BottomFade from "../BottomFade/BottomFade";
import CommentSection from "../../modalSections/CommentSection/CommentSection";
import MovieInfoSection from "../../modalSections/MovieInfoSection/MovieInfoSection";
export default function Modal({ movie }) {
  const [moreLikeThisArray, setMoreLikeThisArray] = useState([]);
  const { nameSlug } = movie;
  const context = useContext(ProjectContext);
  const { handleResetSelectedMovie, allMovies } = context;

  const topTabTrap = useRef();
  const bottomTabTrap = useRef();

  const firstFocusableElement = useRef();
  const lastFocusableElement = useRef();

  useEffect(() => {
    document.addEventListener("focusin", trapFocus);

    return () => {
      document.removeEventListener("focusin", trapFocus);
    };
    function trapFocus(event) {
      if (event.target === topTabTrap.current) {
        lastFocusableElement.current.focus();
      }

      if (event.target === bottomTabTrap.current) {
        firstFocusableElement.current.focus();
      }
    }
  }, [firstFocusableElement, lastFocusableElement]);

  const handleChangeFocus = (event) => {
    bottomTabTrap.current.focus();
  };

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

            <div className={styles.modal} aria-modal="true" role="dialog">
              <span ref={topTabTrap} tabIndex="0"></span>

              <div className={styles.modal__header} id={"modalHeader"}>
                <button
                  className={styles.modal__closeBtn}
                  onClick={handleResetSelectedMovie}
                  ref={firstFocusableElement}
                  id="modalCloseBtn"
                  autoFocus
                  aria-label="Close modal"
                >
                  X
                </button>
                <div className={styles.modal__header__video}>
                  <img
                    className={styles.modal__header__video__videoImage}
                    src={`/movies/${nameSlug}/${nameSlug}-video-cover.jpg`}
                    alt=""
                  />
                  <img
                    className={styles.modal__header__video__movieLogo}
                    src={`/movies/${nameSlug}/${nameSlug}-logo.png`}
                    alt={`the ${movie.name} logo`}
                  />

                  <BottomFade />
                </div>
              </div>

              <MovieInfoSection movie={movie} />

              {moreLikeThisArray.length !== 0 && (
                <MoreLikeThisSection movies={moreLikeThisArray} />
              )}

              <AboutMovieSection movie={movie} />

              <CommentSection movie={movie} />

              <div className={styles.modal__backToTop}>
                <a
                  href={"#modal"}
                  ref={lastFocusableElement}
                  onClick={handleChangeFocus}
                >
                  Back to top
                </a>
              </div>

              <span ref={bottomTabTrap} tabIndex="0"></span>
            </div>
          </div>
        </>
      )}
    </>
  );
}
