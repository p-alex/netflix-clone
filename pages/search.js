import { useState, useEffect, useContext } from "react";
import Layout from "../layout/layout";
import ProjectContext from "../context/Project-context";
import MoviesContainer from "../components/MoviesContainer/MoviesContainer";
import Head from "next/head";
export default function search() {
  const context = useContext(ProjectContext);
  const { searchQuery, allMovies } = context;
  const [filteredMovies, setFilteredMovies] = useState([]);
  useEffect(() => {
    setFilteredMovies(
      allMovies.filter((movie) =>
        movie.name
          .replace("-", "")
          .toLowerCase()
          .includes(searchQuery?.toLowerCase())
      )
    );
  }, [allMovies, searchQuery]);
  return (
    <Layout>
      <Head>
        <title>Netflix Clone | Search</title>
      </Head>
      <MoviesContainer
        movies={searchQuery ? filteredMovies : []}
        title={`Results for '${searchQuery}'`}
      />
    </Layout>
  );
}
