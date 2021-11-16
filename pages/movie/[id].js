import NavBar from "../../components/NavBar/NavBar";
import styles from "../../styles/PlayMovie.module.css";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import ProjectContext from "../../context/Project-context";
import FullscreenLoader from "../../components/FullscreenLoader/FullscreenLoader";
import MobileNavBar from "../../components/MobileNavBar/MobileNavBar";
import Head from "next/head";
import Layout from "../../layout/layout";
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
    <Layout>
      <Head>
        <title>Netflix Clone | {currentMovie.name}</title>
      </Head>
      {isLoading && <FullscreenLoader />}
      <NavBar />
      <MobileNavBar />
      {currentMovie.name ? (
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
            <iframe
              width="100%"
              height="100%"
              src={currentMovie.videoUrl + "?rel=0&autoplay=1"}
              title={currentMovie.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </section>
      ) : (
        <section className={styles.movieSection}>
          <button
            className={styles.movieSection__backBtn}
            onClick={() => router.back()}
          >
            {`<`} Go Back
          </button>
          <p style={{ color: "white" }}>This movie doesn't exist.</p>
        </section>
      )}
    </Layout>
  );
}
