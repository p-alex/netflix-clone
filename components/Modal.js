import { useContext } from "react";
import ProjectContext from "../context/Project-context";
import styles from "../styles/Modal.module.css";
export default function Modal({ movie }) {
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
  const { handleResetSelectedMovie } = context;
  return (
    <>
      {movie.name && (
        <>
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
              <div className={styles.modal__video}>
                <img
                  className={styles.modal__videoImage}
                  src={`/movies/${nameSlug}/${nameSlug}-video-cover.jpg`}
                  alt=""
                />
                <img
                  className={styles.modal__movieLogo}
                  src={`/movies/${nameSlug}/${nameSlug}-logo.png`}
                  alt=""
                />
              </div>
            </div>
            <div className={styles.modal__info}>
              <div className={styles.info__container}>
                <div className={styles.info__stats}>
                  <p>{release}</p>
                  <p>{maturityRating}+</p>
                  <p>{duration}</p>
                </div>
                <div className={styles.info__description}>
                  <p>{description}</p>
                </div>
              </div>
              <div className={styles.info__container}>
                <p>
                  Cast:
                  {cast.map((actor, id) => {
                    if (id < 3) {
                      return <a href="#">{actor},</a>;
                    }
                    return;
                  })}
                  <a href="#">more...</a>
                </p>

                <p>
                  Genres:
                  {genres.map((genre) => (
                    <a href="#">{genre},</a>
                  ))}
                </p>

                <p>
                  This movie is:
                  {thisMovieIs.map((item) => (
                    <a href="#">{item},</a>
                  ))}
                </p>
              </div>
            </div>

            <div className={styles.modal__about}>
              <h2>About {name}</h2>
              <p>
                Cast:
                {directors.map((director) => (
                  <a href="#">{director},</a>
                ))}
              </p>
              <p>
                Cast:
                {cast.map((actor) => (
                  <a href="#">{actor},</a>
                ))}
              </p>
              <p>
                Writer:
                {writer.map((author) => (
                  <a href="#">{author},</a>
                ))}
              </p>
              <p>
                Genres:
                {genres.map((genre) => (
                  <a href="#">{genre},</a>
                ))}
              </p>

              <p>
                This movie is:
                {thisMovieIs.map((item) => (
                  <a href="#">{item},</a>
                ))}
              </p>
              <p>
                Maturity Rating: {maturityRating}+ Recommended for ages{" "}
                {maturityRating} and up
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
