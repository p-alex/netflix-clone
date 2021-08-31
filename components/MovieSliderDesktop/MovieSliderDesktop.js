import { useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import styles from "./MovieSliderDesktop.module.css";

export default function MovieSliderDesktop({
  movies,
  sliderId,
  sliderTitle,
  hasMovies,
}) {
  const [sliderState, setSliderState] = useState({
    cardWidth: 0,
    currentIndex: 0,
    howManyVisible: 0,
    spaceBetweenCards: 5,
    maxMoveBy: 0,
    maxIndex: 0,
    move: 0,
  });

  useEffect(() => {
    console.log("Movie Slider mounted");
    const sliderCtrlLeft = document.querySelector(
      `#slider_ctrl_left${sliderId}`
    );
    const sliderCtrlRight = document.querySelector(
      `#slider_ctrl_right${sliderId}`
    );

    const cards = document.querySelectorAll(`#card${sliderId}`);
    const cardBody = document.querySelectorAll(`#card_body${sliderId}`);

    cards.forEach((card) => {
      card.addEventListener("mouseover", () => {
        sliderCtrlLeft.style.opacity = "0";
        sliderCtrlRight.style.opacity = "0";
      });
      card.addEventListener("mouseout", () => {
        sliderCtrlLeft.style.opacity = "1";
        sliderCtrlRight.style.opacity = "1";
      });
    });

    cardBody.forEach((body) => {
      body.addEventListener("mouseover", () => {
        sliderCtrlLeft.style.opacity = "0";
        sliderCtrlRight.style.opacity = "0";
      });
      body.addEventListener("mouseout", () => {
        sliderCtrlLeft.style.opacity = "1";
        sliderCtrlRight.style.opacity = "1";
      });
    });

    return () => {
      console.log("Movie Slider unmounted");
    };
  }, []);

  function moveSlider(direction) {
    const card = document.querySelector(`#card${sliderId}`);
    const cards = document.querySelectorAll(`#card${sliderId}`);
    const row = document.querySelector(`#movie_row${sliderId}`);

    let cardWidth = card.offsetWidth;

    let howManyVisible = Math.round(row.offsetWidth / card.offsetWidth);

    let maxMoveBy =
      card.offsetWidth * cards.length -
      howManyVisible * card.offsetWidth +
      sliderState.spaceBetweenCards * (cards.length - howManyVisible);

    let maxIndex = /[0-9].[5-9]/.test(maxMoveBy / row.offsetWidth)
      ? Math.round(maxMoveBy / row.offsetWidth + 0.4)
      : Math.round(maxMoveBy / row.offsetWidth);

    let currentIndex = sliderState.currentIndex;

    direction === "left" ? currentIndex-- : currentIndex++;

    if (direction === "left") {
      if (currentIndex < 0) currentIndex = maxIndex;
    }
    if (currentIndex > maxIndex) currentIndex = 0;

    let move =
      eval(
        row.offsetWidth * currentIndex +
          sliderState.spaceBetweenCards * currentIndex
      ) >= maxMoveBy
        ? maxMoveBy
        : eval(
            row.offsetWidth * currentIndex +
              sliderState.spaceBetweenCards * currentIndex
          );

    setSliderState((prevState) => ({
      ...prevState,
      cardWidth,
      howManyVisible,
      maxMoveBy,
      maxIndex,
      currentIndex,
      move,
    }));
  }

  return (
    <>
      {hasMovies && (
        <div className={styles.slider}>
          <div className={styles.slider__title}>
            <h2>{sliderTitle}</h2>
          </div>

          <button
            className={styles.slider__ctrl + " " + styles.left__ctrl}
            id={`slider_ctrl_left${sliderId}`}
            onClick={() => moveSlider("left")}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button
            className={styles.slider__ctrl + " " + styles.right__ctrl}
            id={`slider_ctrl_right${sliderId}`}
            onClick={() => moveSlider("right")}
          >
            <i className="fas fa-chevron-right"></i>
          </button>

          <div
            className={styles.slider__row}
            id={`movie_row${sliderId}`}
            style={{ transform: `translateX(-${sliderState.move}px)` }}
          >
            {movies.map((movie) => {
              return (
                <MovieCard
                  key={`movie-card-${movie.name}-${sliderId}`}
                  movie={movie}
                  fromSliderWithId={sliderId}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
