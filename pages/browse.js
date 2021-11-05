import { useContext } from "react";
import Layout from "../layout/layout";
import ProjectContext from "../context/Project-context";
import Banner from "../components/Banner/Banner";
import MovieSlider from "../components/MovieSlider/MovieSlider";
import Head from "next/head";
export default function Browse() {
  const context = useContext(ProjectContext);
  const { allMovies } = context;
  const sliders = ["Action & Adventure", "Sci-Fi Movies", "Horror", "Dramas"];
  return (
    <Layout>
      <Head>
        <title>Netflix Clone made by Alex Daniel</title>
      </Head>
      <div style={{ overflowX: "hidden" }}>
        {allMovies.length !== 0 && (
          <>
            <Banner movies={allMovies} />
            {sliders.map((slider, id) => {
              return (
                <MovieSlider
                  key={`Index Page Movie Slider ${id}`}
                  movies={allMovies.filter((movie) =>
                    movie.genres.includes(slider)
                  )}
                  sliderId={id.toString()}
                  sliderTitle={slider}
                />
              );
            })}
          </>
        )}
      </div>
    </Layout>
  );
}
