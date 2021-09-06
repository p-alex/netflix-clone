import styles from "./MovieSliderMobile.module.css";
import { useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";

export default function MovieSliderMobile({
  movies,
  sliderId,
  sliderTitle,
  hasMovies,
}) {
  const [isMouseDown, setIsMouseDown] = useState(false);
  useEffect(() => {
    const rowContainer = document.querySelector(`#slider${sliderId}`);
    let isDown = false;
    let startX;
    let scrollLeft;

    rowContainer?.addEventListener("mousedown", (e) => {
      isDown = true;
      setTimeout(() => {
        setIsMouseDown(true);
      }, 150);
      startX = e.pageX - rowContainer.offsetLeft;
      scrollLeft = rowContainer.scrollLeft;
    });

    rowContainer?.addEventListener("mouseleave", () => {
      isDown = false;
      setTimeout(() => {
        setIsMouseDown(false);
      }, 150);
    });

    rowContainer?.addEventListener("mouseup", () => {
      isDown = false;
      setTimeout(() => {
        setIsMouseDown(false);
      }, 150);
    });

    rowContainer?.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      let x = e.pageX - rowContainer.offsetLeft;
      let walk = (x - startX) * 1.5;
      rowContainer.scrollLeft = scrollLeft - walk;
    });
  }, []);

  return (
    <>
      {hasMovies && (
        <div className={styles.slider_container}>
          <div className={styles.slider__title}>
            <h2>{sliderTitle}</h2>
          </div>

          <div className={styles.slider} id={`slider${sliderId}`}>
            <div className={styles.slider__row} id={`movie_row${sliderId}`}>
              {movies.map((movie) => {
                return (
                  <MovieCard
                    key={`movie-card-${movie.name}-${sliderId}`}
                    movie={movie}
                    fromSliderWithId={sliderId}
                    isMouseDown={isMouseDown}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
