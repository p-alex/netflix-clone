import { useState, useEffect, useContext } from "react";
import ProjectContext from "../context/Project-context";
import MovieFilter from "../components/MovieFilter/MovieFilter";
import MoviesContainer from "../components/MoviesContainer/MoviesContainer";
import Head from "next/head";
import Layout from "../layout/layout";
export default function Movies() {
  const context = useContext(ProjectContext);

  const { allMovies } = context;
  const [activeFilter, setActiveFilter] = useState("");
  const [filterdMovieArray, setFilteredMovieArray] = useState([]);

  const handleSetActiveFilter = (filter) => setActiveFilter(filter);

  const handleResetActiveFilter = () => setActiveFilter("");

  useEffect(() => {
    const filtered = allMovies.filter(
      (movie) =>
        movie.genres.includes(activeFilter) ||
        movie.thisMovieIs.includes(activeFilter)
    );
    setFilteredMovieArray(filtered);
  }, [activeFilter]);

  return (
    <Layout>
      <Head>
        <title>Netflix Clone | All movies</title>
      </Head>
      <MovieFilter
        handleSetActiveFilter={handleSetActiveFilter}
        activeFilter={activeFilter}
        handleResetActiveFilter={handleResetActiveFilter}
      />

      <MoviesContainer movies={activeFilter ? filterdMovieArray : allMovies} />
    </Layout>
  );
}
