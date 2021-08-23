import NavBar from "../../components/NavBar";
import ReactPlayer from "react-player/youtube";
import styles from "../../styles/PlayMovie.module.css";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import ProjectContext from "../../context/Project-context";
import FullscreenLoader from "../../components/FullscreenLoader";
export default function PlayMovie() {
  const router = useRouter();
  const context = useContext(ProjectContext);
  const { allMovies, handleGetAllMovies, isLoading } = context;
  const [currentMovie, setCurrentMovie] = useState({});

  useEffect(() => {
    if (allMovies.length === 0) handleGetAllMovies();
  }, []);

  useEffect(() => {
    if (allMovies) {
      allMovies.map((movie) => {
        if (movie._id === router.query.id) {
          return setCurrentMovie(movie);
        }
      });
    }
  }, [allMovies]);
  return (
    <>
      {isLoading && <FullscreenLoader />}
      <NavBar />
      <section className={styles.movieSection}>
        <button
          className={styles.movieSection__backBtn}
          onClick={() => router.back()}
        >
          {`<`} Go Back
        </button>
        <div className={styles.movieSection__info}>
          <h1>{currentMovie.name}</h1>
          <h2>{currentMovie.maturityRating}+</h2>
        </div>

        <div className={styles.movieSection__movie}>
          <ReactPlayer
            url={currentMovie.videoUrl + "?rel=0"}
            playing
            controls
            width={"100%"}
            height={"100%"}
          />
        </div>
      </section>
    </>
  );
}
