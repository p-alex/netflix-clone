import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import ProjectContext from "../../context/Project-context";
import styles from "./Banner.module.css";
import Image from "next/image";
import Button from "../Button/Button";
export default function Banner({ movies }) {
  const context = useContext(ProjectContext);
  const router = useRouter();
  const { handleSelectMovie } = context;
  const [movie, setMovie] = useState({});
  useEffect(() => {
    setMovie(movies[Math.floor(Math.random() * movies.length)]);
  }, []);
  const { nameSlug, description, thisMovieIs, _id } = movie;

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
              <Button
                value="Play"
                type="play"
                func={() => router.push(`/movie/${movie._id}`)}
              />
              <Button
                value="More Info"
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
