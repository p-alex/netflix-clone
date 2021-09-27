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
  const [isIntersecting, setIsIntersecting] = useState(false);
  useEffect(() => {
    const slider = document.querySelector(`#mobileSlider${sliderId}`);
    const options = {
      rootMargin: "0px",
    };
    const observer = new IntersectionObserver(function (entries, observer) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        console.log(entry.isIntersecting);
        setIsIntersecting(entry.isIntersecting);
        observer.unobserve(entry.target);
      });
    }, options);
    if (slider) {
      observer.observe(slider);
    }
  }, []);
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

    return () => {
      rowContainer?.removeEventListener("mousedown", (e) => {
        isDown = true;
        setTimeout(() => {
          setIsMouseDown(true);
        }, 150);
        startX = e.pageX - rowContainer.offsetLeft;
        scrollLeft = rowContainer.scrollLeft;
      });

      rowContainer?.removeEventListener("mouseleave", () => {
        isDown = false;
        setTimeout(() => {
          setIsMouseDown(false);
        }, 150);
      });

      rowContainer?.removeEventListener("mouseup", () => {
        isDown = false;
        setTimeout(() => {
          setIsMouseDown(false);
        }, 150);
      });

      rowContainer?.removeEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        let x = e.pageX - rowContainer.offsetLeft;
        let walk = (x - startX) * 1.5;
        rowContainer.scrollLeft = scrollLeft - walk;
      });
    };
  }, [isIntersecting]);

  return (
    <>
      {hasMovies && (
        <div className={styles.slider_container} id={`mobileSlider${sliderId}`}>
          <div className={styles.slider__title}>
            <h2>{sliderTitle}</h2>
          </div>
          {isIntersecting && (
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
          )}
        </div>
      )}
    </>
  );
}
