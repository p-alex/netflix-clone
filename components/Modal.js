import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import ProjectContext from "../context/Project-context";
import styles from "../styles/Modal.module.css";
import MoreLikeThisSection from "../containers/MoreLikeThisSection";
import Button from "./Button";
export default function Modal({ movie }) {
  const router = useRouter();
  const [moreLikeThisArray, setMoreLikeThisArray] = useState([]);
  const {
    name,
    nameSlug,
    description,
    genres,
    writer,
    cast,
    thisMovieIs,
    duration,
    release,
    maturityRating,
    directors,
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
                  </div>
                </div>
              </div>

              {/*------------------ MODAL INFO ------------------*/}
              <div className={styles.modal__info}>
                <div className={styles.modal__info__container}>
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
                          <a key={`modal-cast-${actor}`} href="#">
                            {actor},
                          </a>
                        );
                      }
                      return;
                    })}
                    <a href="#">more...</a>
                  </p>
                  <p className={styles.modal__info__container__genres}>
                    Genres:
                    {genres.map((genre) => (
                      <a key={`modal-genre-${genre}`} href="#">
                        {genre},
                      </a>
                    ))}
                  </p>
                  <p className={styles.modal__info__container__thisMovieIs}>
                    This movie is:
                    {thisMovieIs.map((item) => (
                      <a key={`modal-thisMovieIs-${item}`} href="#">
                        {item},
                      </a>
                    ))}
                  </p>
                </div>
              </div>

              {/*------------------ MORE LIKE THIS ------------------*/}
              {moreLikeThisArray.length !== 0 && (
                <MoreLikeThisSection movies={moreLikeThisArray} />
              )}

              {/*------------------ MODAL ABOUT ------------------*/}
              <div className={styles.modal__about}>
                <h2 className={styles.modal__about__movieName}>About {name}</h2>
                <p className={styles.modal__about__director}>
                  Director:
                  {directors.map((director) => (
                    <a key={`modal-about-director-${director}`} href="#">
                      {director},
                    </a>
                  ))}
                </p>
                <p className={styles.modal__about__cast}>
                  Cast:
                  {cast.map((actor) => (
                    <a key={`modal-about-cast-${actor}`} href="#">
                      {actor},
                    </a>
                  ))}
                </p>
                <p className={styles.modal__about__writer}>
                  Writer:
                  {writer.map((author) => (
                    <a key={`modal-about-writer-${author}`} href="#">
                      {author},
                    </a>
                  ))}
                </p>
                <p className={styles.modal__about__genres}>
                  Genres:
                  {genres.map((genre) => (
                    <a key={`modal-about-genres-${genre}`} href="#">
                      {genre},
                    </a>
                  ))}
                </p>

                <p className={styles.modal__about__thisMovieIs}>
                  This movie is:
                  {thisMovieIs.map((item) => (
                    <a key={`modal-about-thisMovieIs-${item}`} href="#">
                      {item},
                    </a>
                  ))}
                </p>
                <p className={styles.modal__about__maturityRating}>
                  Maturity Rating: {maturityRating}+ Recommended for ages{" "}
                  {maturityRating} and up
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
