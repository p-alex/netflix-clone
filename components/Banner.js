import { useState, useEffect } from "react";
import styles from "../styles/Banner.module.css";
export default function Banner({ movies }) {
  const [movie, setMovie] = useState({});
  useEffect(() => {
    setMovie(movies[Math.floor(Math.random() * movies.length)]);
  }, []);
  const { nameSlug, description } = movie;

  return (
    <>
      {nameSlug !== undefined && (
        <header
          className={styles.banner}
          style={{
            backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.5), transparent),
        url(/movies/${nameSlug}/${nameSlug}-banner.jpg)`,
          }}
        >
          <div className={styles.banner_content}>
            <img src={`/movies/${nameSlug}/${nameSlug}-logo.png`} alt="" />
            <p>{description}</p>
            <div className={styles.btn_container}>
              <button className={styles.btn + " " + styles.play}>
                <i className="fas fa-play"></i>
                <span>Play</span>
              </button>
              <button className={styles.btn + " " + styles.more_info}>
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
