import styles from "./MovieSliderMobile.module.css";
import { useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";

export default function MovieSliderMobile({ movies, sliderId, sliderTitle }) {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  // Lazy loading the slider
  useEffect(() => {
    const slider = document.querySelector(`#mobileSlider${sliderId}`);
    const options = {
      rootMargin: "0px",
    };
    const observer = new IntersectionObserver(function (entries, observer) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        setIsIntersecting(entry.isIntersecting);
        observer.unobserve(entry.target);
      });
    }, options);
    if (slider) observer.observe(slider);
  }, []);
  useEffect(() => {
    const rowContainer = document.querySelector(`#slider${sliderId}`);
    let isDown = false;
    let startX;
    let scrollLeft;
    function handleMouseDown(e) {
      isDown = true;
      setTimeout(() => {
        setIsMouseDown(true);
      }, 150);
      startX = e.pageX - rowContainer.offsetLeft;
      scrollLeft = rowContainer.scrollLeft;
    }
    function handleMouseLeave() {
      isDown = false;
      setTimeout(() => {
        setIsMouseDown(false);
      }, 150);
    }
    function handleMouseUp() {
      isDown = false;
      setTimeout(() => {
        setIsMouseDown(false);
      }, 150);
    }
    function handleMouseMove(e) {
      if (!isDown) return;
      e.preventDefault();
      let x = e.pageX - rowContainer.offsetLeft;
      let walk = (x - startX) * 1.5;
      rowContainer.scrollLeft = scrollLeft - walk;
    }
    rowContainer?.addEventListener("mousedown", (e) => handleMouseDown(e));
    rowContainer?.addEventListener("mouseleave", handleMouseLeave);
    rowContainer?.addEventListener("mouseup", handleMouseUp);
    rowContainer?.addEventListener("mousemove", (e) => handleMouseMove(e));
    return () => {
      rowContainer?.removeEventListener("mousedown", (e) => handleMouseDown(e));
      rowContainer?.removeEventListener("mouseleave", handleMouseLeave);
      rowContainer?.removeEventListener("mouseup", handleMouseUp);
      rowContainer?.removeEventListener("mousemove", (e) => handleMouseMove(e));
    };
  }, [isIntersecting]);
  return (
    <>
      {movies?.length && (
        <div className={styles.slider_container} id={`mobileSlider${sliderId}`}>
          <div className={styles.slider__title}>
            <h2>{sliderTitle}</h2>
          </div>
          {isIntersecting && (
            <div className={styles.slider} id={`slider${sliderId}`}>
              <div className={styles.slider__row} id={`movie_row${sliderId}`}>
                {movies.map((movie) => (
                  <MovieCard
                    key={`movie-card-${movie.name}-${sliderId}`}
                    movie={movie}
                    fromSliderWithId={sliderId}
                    isMouseDown={isMouseDown}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
