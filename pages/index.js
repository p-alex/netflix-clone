import { useContext, useEffect } from "react";
import ProjectContext from "../context/Project-context";
import NavBar from "../components/NavBar/NavBar";
import MobileNavBar from "../components/MobileNavBar/MobileNavBar";
import Banner from "../components/Banner/Banner";
import FullscreenLoader from "../components/FullscreenLoader/FullscreenLoader";
import MovieSlider from "../components/MovieSlider/MovieSlider";
import Modal from "../components/Modal/Modal";

import pageWrapperStyles from "../styles/PageWrapperStyles.module.css";
export default function Home() {
  const context = useContext(ProjectContext);
  const { selectedMovie, allMovies, isLoading, handleGetAllMovies } = context;
  const { movieList } = context.userData;
  useEffect(() => {
    if (allMovies.length === 0) handleGetAllMovies();
  }, []);
  const filterAllMovies = () => {
    if (allMovies.length && movieList) {
      const theArray = [];
      movieList.map((movieId) => {
        allMovies.map((movie) => {
          if (movie._id === movieId) {
            theArray.push(movie);
          }
        });
      });
      return theArray;
    }
  };
  return (
    <div style={{ overflowX: "hidden" }}>
      <div className={selectedMovie.name && pageWrapperStyles.disableScroll}>
        {isLoading && <FullscreenLoader />}
        {selectedMovie?.name ? <Modal movie={selectedMovie} /> : null}
        <NavBar />
        <MobileNavBar />
        {allMovies.length !== 0 && (
          <>
            <Banner movies={allMovies} />
            <MovieSlider
              movies={filterAllMovies()}
              sliderId={"1"}
              sliderTitle={"My List"}
              hasMovies={movieList?.length}
            />
            <MovieSlider
              movies={allMovies.filter((movie) =>
                movie.genres.includes("Action & Adventure")
              )}
              sliderId={"2"}
              sliderTitle={"Action & Adventure"}
              hasMovies={allMovies?.length}
            />
            <MovieSlider
              movies={allMovies.filter((movie) =>
                movie.genres.includes("Dramas")
              )}
              sliderId={"3"}
              sliderTitle={"Dramas"}
              hasMovies={allMovies?.length}
            />
            <MovieSlider
              movies={allMovies
                .filter((movie) => movie.genres.includes("Sci-Fi Movies"))
                .reverse()}
              sliderId={"4"}
              sliderTitle={"Sci-Fi"}
              hasMovies={allMovies?.length}
            />
            <MovieSlider
              movies={allMovies.filter((movie) =>
                movie.genres.includes("Children & Family Movies")
              )}
              sliderId={"5"}
              sliderTitle={"Children & Family"}
              hasMovies={allMovies?.length}
            />
            <MovieSlider
              movies={allMovies.filter((movie) =>
                movie.thisMovieIs.includes("Romantic")
              )}
              sliderId={"6"}
              sliderTitle={"Romantic"}
              hasMovies={allMovies?.length}
            />
            <MovieSlider
              movies={allMovies.filter((movie) =>
                movie.genres.includes("Horror")
              )}
              sliderId={"7"}
              sliderTitle={"Horror"}
              hasMovies={allMovies?.length}
            />
            <MovieSlider
              movies={allMovies.filter((movie) =>
                movie.genres.includes("Anime")
              )}
              sliderId={"8"}
              sliderTitle={"Anime"}
              hasMovies={allMovies?.length}
            />
          </>
        )}
      </div>
    </div>
  );
}
