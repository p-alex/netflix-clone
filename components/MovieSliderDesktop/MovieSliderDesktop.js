import { useState, useEffect, useContext } from "react";
import ProjectContext from "../../context/Project-context";
import MovieCard from "../MovieCard/MovieCard";
import styles from "./MovieSliderDesktop.module.css";

export default function MovieSliderDesktop({ movies, sliderId, sliderTitle }) {
  const context = useContext(ProjectContext);
  const { movieList } = context.userData;

  const [sliderState, setSliderState] = useState({
    cardWidth: 0,
    currentIndex: 0,
    howManyCardsVisible: 0,
    spaceBetweenCards: 5,
    maxMoveBy: 0,
    maxIndex: 0,
    move: 0,
  });
  const [isIntersecting, setIsIntersecting] = useState(false);
  useEffect(() => {
    const slider = document.querySelector(`#slider${sliderId}`);
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
  }, [movieList, isIntersecting]);

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
      {movies?.length && (
        <div className={styles.slider} id={`slider` + sliderId}>
          <div className={styles.slider__title}>
            <h2>{sliderTitle}</h2>
          </div>

          <button
            className={styles.slider__ctrl + " " + styles.left__ctrl}
            id={`slider_ctrl_left${sliderId}`}
            onClick={() => moveSlider("left")}
            name={`slider_ctrl_left`}
          >
            <i className="fas fa-chevron-left"></i>
          </button>

          <button
            className={styles.slider__ctrl + " " + styles.right__ctrl}
            id={`slider_ctrl_right${sliderId}`}
            onClick={() => moveSlider("right")}
            name={`slider_ctrl_right`}
          >
            <i className="fas fa-chevron-right"></i>
          </button>

          <div
            className={styles.slider__row}
            id={`movie_row${sliderId}`}
            style={{ transform: `translateX(-${sliderState.move}px)` }}
          >
            {sliderId === "my-list-slider" &&
              movies.map((movie, id) => {
                if (id < 15) {
                  return (
                    <MovieCard
                      key={`movie-card-${movie.name}-${sliderId}`}
                      movie={movie}
                      fromSliderWithId={sliderId}
                    />
                  );
                } else {
                  return;
                }
              })}
            {isIntersecting && sliderId !== "my-list-slider"
              ? movies.map((movie, id) => {
                  if (id < 15) {
                    return (
                      <MovieCard
                        key={`movie-card-${movie.name}-${sliderId}`}
                        movie={movie}
                        fromSliderWithId={sliderId}
                      />
                    );
                  } else {
                    return;
                  }
                })
              : null}
          </div>
        </div>
      )}
    </>
  );
}
