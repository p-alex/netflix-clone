import { useEffect } from "react";
import MovieCard from "./MovieCard";
import styles from "../styles/MovieSlider.module.css";

export default function MovieSlider({ movies, sliderId, sliderTitle }) {
  let currentIndex = 0;
  let howManyVisible = 0;
  let spaceBetweenCards = 5;
  let maxMoveBy = 0;
  let maxIndex = 0;

  useEffect(() => {
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
  }, []);

  function moveSlider(direction) {
    const card = document.querySelector(`#card${sliderId}`);
    const cards = document.querySelectorAll(`#card${sliderId}`);
    const row = document.querySelector(`#movie_row${sliderId}`);

    howManyVisible = Math.round(row.offsetWidth / card.offsetWidth);

    maxMoveBy =
      card.offsetWidth * cards.length -
      howManyVisible * card.offsetWidth +
      spaceBetweenCards * (cards.length - howManyVisible);

    maxIndex = /[0-9].[5-9]/.test(maxMoveBy / row.offsetWidth)
      ? Math.round(maxMoveBy / row.offsetWidth + 0.4)
      : Math.round(maxMoveBy / row.offsetWidth);

    if (direction === "left") {
      currentIndex--;
    } else currentIndex++;

    if (direction === "left") {
      if (currentIndex < 0) {
        currentIndex = maxIndex;
      }
    }
    if (currentIndex > maxIndex) {
      currentIndex = 0;
    }

    let move =
      eval(row.offsetWidth * currentIndex + spaceBetweenCards * currentIndex) >=
      maxMoveBy
        ? maxMoveBy
        : eval(
            row.offsetWidth * currentIndex + spaceBetweenCards * currentIndex
          );

    row.style.transform = "translateX(-" + move + "px)";
  }

  return (
    <div className={styles.slider__container}>
      <div className={styles.slider__titleAndSliderIndex}>
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
        style={{ transform: `translateX(-${moveBy.toString()})` }}
      >
        {movies.map((movie) => {
          return (
            <MovieCard
              key={movie.name + sliderId}
              name={movie.name}
              nameSlug={movie.nameSlug}
              thisMovieIs={movie.thisMovieIs}
              maturityRating={movie.maturityRating}
              duration={movie.duration}
              fromSliderWithId={sliderId}
              released={movie.release}
            />
          );
        })}
      </div>
    </div>
  );
}
