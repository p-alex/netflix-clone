import { useContext, useEffect } from "react";
import ProjectContext from "../context/Project-context";
import NavBar from "../components/NavBar/NavBar";
import MobileNavBar from "../components/MobileNavBar/MobileNavBar";
import Banner from "../components/Banner/Banner";
import FullscreenLoader from "../components/FullscreenLoader/FullscreenLoader";
import MovieSlider from "../components/MovieSlider/MovieSlider";
import Modal from "../components/Modal/Modal";
import Head from "next/head";
export default function Home() {
  const context = useContext(ProjectContext);
  const { selectedMovie, allMovies, isLoading, handleGetAllMovies, userData } =
    context;

  useEffect(() => {
    if (allMovies.length === 0) handleGetAllMovies();
  }, []);

  return (
    <>
      <Head>
        <title>Netflix Clone made by Alex Daniel</title>
      </Head>
      <div style={{ overflowX: "hidden" }}>
        {isLoading && <FullscreenLoader />}
        {selectedMovie?.name ? <Modal movie={selectedMovie} /> : null}
        <NavBar />
        <MobileNavBar />
        {allMovies.length !== 0 && (
          <>
            <Banner movies={allMovies} />
            <MovieSlider
              movies={allMovies.filter((movie) =>
                movie.genres.includes("Action & Adventure")
              )}
              sliderId={"2"}
              sliderTitle={"Action & Adventure"}
            />
            <MovieSlider
              movies={allMovies.filter((movie) =>
                movie.genres.includes("Dramas")
              )}
              sliderId={"3"}
              sliderTitle={"Dramas"}
            />
            <MovieSlider
              movies={allMovies
                .filter((movie) => movie.genres.includes("Sci-Fi Movies"))
                .reverse()}
              sliderId={"4"}
              sliderTitle={"Sci-Fi"}
            />
            <MovieSlider
              movies={allMovies
                .filter((movie) => movie.genres.includes("Horror"))
                .reverse()}
              sliderId={"5"}
              sliderTitle={"Horror"}
            />
            <MovieSlider
              movies={allMovies
                .filter((movie) =>
                  movie.genres.includes("Children & Family Movies")
                )
                .reverse()}
              sliderId={"6"}
              sliderTitle={"Children & Family"}
            />
            <MovieSlider
              movies={allMovies
                .filter((movie) => movie.genres.includes("Anime"))
                .reverse()}
              sliderId={"7"}
              sliderTitle={"Anime"}
            />
          </>
        )}
      </div>
    </>
  );
}
