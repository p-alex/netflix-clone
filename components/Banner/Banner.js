import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import ProjectContext from "../../context/Project-context";
import styles from "./Banner.module.css";
import Image from "next/image";
import Button from "../Button/Button";
import AddToListBtn from "../AddToListBtn/AddToListBtn";
import BottomFade from "../BottomFade/BottomFade";
export default function Banner({ movies }) {
  const context = useContext(ProjectContext);
  const router = useRouter();
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
        url(/movies/${nameSlug}/${nameSlug}-banner.webp)`,
          }}
        >
          <BottomFade />
          <div className={styles.banner__content}>
            <div className={styles.banner__content__logo}>
              {/* <p className={styles.banner__content__logo__paragraph}>
                {movie.name}
              </p> */}
              <Image
                src={`/movies/${nameSlug}/${nameSlug}-logo.png`}
                alt=""
                width="625"
                height="250"
              />
            </div>
            <div className={styles.banner__content__movie_type}>
              {thisMovieIs.map((item, id) => {
                if (id < 3) {
                  return (
                    <p
                      className={styles.banner__content__movie_type__type}
                      key={`banner-${item}`}
                    >
                      <span
                        className={
                          styles.banner__content__movie_type__type__dot
                        }
                      ></span>
                      {item}
                    </p>
                  );
                }
                return;
              })}
            </div>
            <p className={styles.banner__content__description}>{description}</p>
            <div className={styles.banner__content__btn_container}>
              <Button
                value="Play"
                type="play"
                func={() => router.push(`/movie/${movie._id}`)}
                size="responsive"
                ariaLabel={`Play ${movie.name}`}
              />
              <Button
                value="More Info"
                type="moreInfo"
                func={() => handleSelectMovie(movie)}
                size="responsive"
                ariaLabel={`Open modal for ${movie.name}`}
              />
            </div>
            <div className={styles.banner__content__btn_container__mobileBtns}>
              <AddToListBtn
                movieId={movie._id}
                btnType="regular"
                margin="0 0 0 0"
                movieName={movie.name}
              />
              <Button
                value=""
                type="play"
                func={() => router.push(`/movie/${movie._id}`)}
              />
              <Button
                value=""
                type="moreInfo"
                func={() => handleSelectMovie(movie)}
              />
            </div>
          </div>
        </header>
      )}
    </>
  );
}
