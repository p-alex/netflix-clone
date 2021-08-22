import NavBar from "../../components/NavBar";
import ReactPlayer from "react-player/youtube";
import styles from "../../styles/PlayMovie.module.css";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import ProjectContext from "../../context/Project-context";
export default function PlayMovie() {
  const router = useRouter();
  const context = useContext(ProjectContext);
  const { allMovies } = context;
  const [currentMovie, setCurrentMovie] = useState("");
  useEffect(() => {
    if (allMovies) {
      allMovies.map((movie) => {
        if (movie._id === router.query.id) {
          console.log(movie);
          return setCurrentMovie(movie.videoUrl);
        }
      });
    }
  }, [allMovies]);
  console.log(currentMovie);
  return (
    <>
      <NavBar />
      <div className={styles.movie}>
        <ReactPlayer
          url={currentMovie + "?rel=0"}
          playing
          controls
          width={"100%"}
          height={"100%"}
        />
      </div>
    </>
  );
}
