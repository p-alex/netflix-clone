import { useState, useEffect } from "react";
import ModalMovieCard from "../components/ModalMovieCard";
import styles from "../styles/MoreLikeThisSection.module.css";
export default function MoreLikeThisSection({ movies }) {
  const [isMinThree, setIsMinThree] = useState(false);
  useEffect(() => {
    if (movies.length >= 3) {
      setIsMinThree(true);
    } else {
      setIsMinThree(false);
    }
  }, []);
  return (
    <section
      className={
        isMinThree
          ? styles.moreLikeThis
          : styles.moreLikeThis + " " + styles.minThree
      }
    >
      {movies.map((movie) => {
        return <ModalMovieCard movie={movie} isMinThree={isMinThree} />;
      })}
    </section>
  );
}
