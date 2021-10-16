import { useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import styles from "./MovieSliderDesktop.module.css";

export default function MovieSliderDesktop({ movies, sliderId, sliderTitle }) {
  const [sliderState, setSliderState] = useState({
    cardWidth: 0,
    currentIndex: 0,
    howManyCardsVisible: 0,
    spaceBetweenCards: 5,
    maxMoveBy: 0,
    maxIndex: 0,
    move: 0,
    maximumAmountOfCards: 15,
    firstCardVisibleIndex: 0,
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
  }, [isIntersecting]);

  useEffect(() => {
    if (window.innerWidth < 1000) {
      setSliderState((prevState) => ({
        ...prevState,
        howManyCardsVisible: 3,
      }));
      return;
    }
    if (window.innerWidth < 1200) {
      setSliderState((prevState) => ({
        ...prevState,
        howManyCardsVisible: 4,
      }));
      return;
    }
    if (window.innerWidth < 1400) {
      setSliderState((prevState) => ({
        ...prevState,
        howManyCardsVisible: 5,
      }));
      return;
    }
    if (window.innerWidth > 1400) {
      setSliderState((prevState) => ({
        ...prevState,
        howManyCardsVisible: 6,
      }));
      return;
    }
  }, []);

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

    let firstCardVisibleIndex = currentIndex * howManyCardsVisible;

    setSliderState((prevState) => ({
      ...prevState,
      cardWidth,
      howManyCardsVisible,
      maxMoveBy,
      maxIndex,
      currentIndex,
      firstCardVisibleIndex,
      move,
    }));
  }

  useEffect(() => {
    document
      ?.getElementById(
        `firstCard${sliderState.firstCardVisibleIndex}VisibleFromSlider${sliderId}`
      )
      ?.focus();
  }, [sliderState.currentIndex]);

  const handleCheckIsTabindexActive = (currentId, maximumId) => {
    let { currentIndex, howManyCardsVisible, maximumAmountOfCards } =
      sliderState;
    if (maximumId > maximumAmountOfCards) maximumId = maximumAmountOfCards;
    let minId = currentIndex * howManyCardsVisible;
    let maxId = currentIndex * howManyCardsVisible + howManyCardsVisible;
    if (maxId > maximumId) {
      maxId = maximumId;
      minId = maxId - howManyCardsVisible;
    }
    if (currentId >= minId && currentId < maxId) {
      return "0";
    } else {
      return "-1";
    }
  };

  console.log("------------");
  console.log("how many cards visible: " + sliderState.howManyCardsVisible);
  console.log("current index: " + sliderState.currentIndex);
  console.log("max index: " + sliderState.maxIndex);
  console.log("max move by: " + sliderState.maxMoveBy);
  console.log("First card index = " + sliderState.firstCardVisibleIndex);
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
            aria-label={"See previous titles"}
          >
            <i className="fas fa-chevron-left"></i>
          </button>

          <div
            className={styles.slider__row}
            id={`movie_row${sliderId}`}
            style={{ transform: `translateX(-${sliderState.move}px)` }}
          >
            {isIntersecting
              ? movies.map((movie, id) => {
                  if (id < 15) {
                    return (
                      <MovieCard
                        key={`movie-card-${movie.name}-${sliderId}`}
                        movie={movie}
                        fromSliderWithId={sliderId}
                        isTabIndexActive={handleCheckIsTabindexActive(
                          id,
                          movies.length
                        )}
                        firstCardIndex={sliderState.firstCardVisibleIndex}
                        isFirstCard={sliderState.firstCardVisibleIndex === id}
                        cardId={id}
                        currentIndex={sliderState.currentIndex}
                      />
                    );
                  } else {
                    return;
                  }
                })
              : null}
          </div>
          <button
            className={styles.slider__ctrl + " " + styles.right__ctrl}
            id={`slider_ctrl_right${sliderId}`}
            onClick={() => moveSlider("right")}
            name={`slider_ctrl_right`}
            aria-label={"See more titles"}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      )}
    </>
  );
}
