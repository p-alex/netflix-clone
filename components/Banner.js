import { useState, useEffect, useContext } from "react";
import ProjectContext from "../context/Project-context";
import styles from "../styles/Banner.module.css";
import Image from "next/image";
export default function Banner({ movies }) {
  const context = useContext(ProjectContext);
  const { handleSelectMovie } = context;
  const [movie, setMovie] = useState({});
  useEffect(() => {
    setMovie(movies[Math.floor(Math.random() * movies.length)]);
  }, []);
  const { nameSlug, description, thisMovieIs } = movie;

  return (
    <>
      {nameSlug !== undefined && (
        <header
          className={styles.banner}
          style={{
            backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.35), transparent),
        url(/movies/${nameSlug}/${nameSlug}-banner.jpg)`,
          }}
        >
          <div className={styles.banner__content}>
            <div className={styles.banner__content__logo}>
              <Image
                src={`/movies/${nameSlug}/${nameSlug}-logo.png`}
                alt=""
                width="625"
                height="250"
              />
            </div>
            <div className={styles.banner__content__movie_type}>
              {thisMovieIs.map((item) => {
                return <p key={`banner-${item}`}>{item}</p>;
              })}
            </div>
            <p className={styles.banner__content__description}>{description}</p>
            <div className={styles.banner__content__btn_container}>
              <button
                className={
                  styles.banner__content__btn_container__btn +
                  " " +
                  styles.banner__content__btn_container__play
                }
              >
                <i className="fas fa-play"></i>
                <span>Play</span>
              </button>
              <button
                className={
                  styles.banner__content__btn_container__btn +
                  " " +
                  styles.banner__content__btn_container__more_info
                }
                onClick={() => handleSelectMovie(movie)}
              >
                <i className="fas fa-info-circle"></i>
                <span>More Info</span>
              </button>
            </div>
          </div>
        </header>
      )}
    </>
  );
}
