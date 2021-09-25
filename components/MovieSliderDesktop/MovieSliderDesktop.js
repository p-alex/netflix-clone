import { useState, useEffect, useContext } from "react";
import ProjectContext from "../../context/Project-context";
import MovieCard from "../MovieCard/MovieCard";
import styles from "./MovieSliderDesktop.module.css";

export default function MovieSliderDesktop({
  movies,
  sliderId,
  sliderTitle,
  hasMovies,
}) {
  const context = useContext(ProjectContext);
  const { movieList } = context.userData;
  const [isCtrlBtnDisabled, setIsControlBtnDisabled] = useState(false);
  const [sliderState, setSliderState] = useState({
    cardWidth: 0,
    currentIndex: 0,
    howManyCardsVisible: 0,
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
      cards.forEach((card) => {
        card.removeEventListener("mouseover", () => {
          sliderCtrlLeft.style.opacity = "0";
          sliderCtrlRight.style.opacity = "0";
        });
        card.removeEventListener("mouseout", () => {
          sliderCtrlLeft.style.opacity = "1";
          sliderCtrlRight.style.opacity = "1";
        });
      });
      cardBody.forEach((body) => {
        body.removeEventListener("mouseover", () => {
          sliderCtrlLeft.style.opacity = "0";
          sliderCtrlRight.style.opacity = "0";
        });
        body.removeEventListener("mouseout", () => {
          sliderCtrlLeft.style.opacity = "1";
          sliderCtrlRight.style.opacity = "1";
        });
      });
    };
  }, [movieList]);

  function moveSlider(direction) {
    const card = document.querySelector(`#card${sliderId}`);
    const cards = document.querySelectorAll(`#card${sliderId}`);
    const row = document.querySelector(`#movie_row${sliderId}`);

    let spaceBetweenCards = sliderState.spaceBetweenCards;
    let cardWidth = card.offsetWidth;
    let totalNumberOfCards = cards.length;
    let rowWidth = row.offsetWidth;

    let howManyCardsVisible = Math.round(rowWidth / cardWidth);

    let maxMoveBy =
      cardWidth * totalNumberOfCards -
      howManyCardsVisible * cardWidth +
      spaceBetweenCards * (totalNumberOfCards - howManyCardsVisible);

    let maxIndex = /[0-9].[5-9]/.test(maxMoveBy / rowWidth)
      ? Math.round(maxMoveBy / rowWidth + 0.4)
      : Math.round(maxMoveBy / rowWidth);

    let currentIndex = sliderState.currentIndex;

    if (direction === "left") {
      currentIndex--;
    } else {
      currentIndex++;
    }

    if (currentIndex < 0) currentIndex = maxIndex;

    if (currentIndex > maxIndex) currentIndex = 0;

    let move =
      eval(rowWidth * currentIndex + spaceBetweenCards * currentIndex) >=
      maxMoveBy
        ? maxMoveBy
        : eval(rowWidth * currentIndex + spaceBetweenCards * currentIndex);

    setSliderState((prevState) => ({
      ...prevState,
      cardWidth,
      howManyCardsVisible,
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

          {!isCtrlBtnDisabled && (
            <button
              className={styles.slider__ctrl + " " + styles.left__ctrl}
              id={`slider_ctrl_left${sliderId}`}
              onClick={() => moveSlider("left")}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
          )}

          {!isCtrlBtnDisabled && (
            <button
              className={styles.slider__ctrl + " " + styles.right__ctrl}
              id={`slider_ctrl_right${sliderId}`}
              onClick={() => moveSlider("right")}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          )}

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
