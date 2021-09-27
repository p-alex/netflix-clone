import { useState, useEffect } from "react";
import ModalMovieCard from "../../components/ModalMovieCard/ModalMovieCard";
import styles from "./MoreLikeThisSection.module.css";
export default function MoreLikeThisSection({ movies }) {
  const [isMaxThree, setIsMaxThree] = useState(false);
  useEffect(() => {
    if (movies.length >= 3) {
      setIsMaxThree(true);
    } else {
      setIsMaxThree(false);
    }
  }, []);
  return (
    <section className={styles.moreLikeThis}>
      <h2 className={styles.moreLikeThis__sectionName}>More like this</h2>

      <div
        className={
          isMaxThree
            ? styles.moreLikeThis__movieContainer
            : styles.moreLikeThis__movieContainer + " " + styles.maxThree
        }
      >
        {movies.map((movie) => {
          return (
            <ModalMovieCard
              key={`${movie.nameSlug}-modal-movie-card`}
              movie={movie}
              isMaxThree={isMaxThree}
            />
          );
        })}
      </div>
    </section>
  );
}
