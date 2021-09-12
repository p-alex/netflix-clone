import MovieSliderMobile from "../MovieSliderMobile/MovieSliderMobile";
import MovieSliderDesktop from "../MovieSliderDesktop/MovieSliderDesktop";
export default function MovieSlider({
  movies,
  sliderId,
  sliderTitle,
  hasMovies,
}) {
  return (
    <>
      <MovieSliderDesktop
        movies={movies}
        sliderId={sliderId}
        sliderTitle={sliderTitle}
        hasMovies={hasMovies}
      />
      <MovieSliderMobile
        movies={movies}
        sliderId={sliderId + 1}
        sliderTitle={sliderTitle}
        hasMovies={hasMovies}
      />
    </>
  );
}
