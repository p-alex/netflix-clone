import { useContext } from "react";
import ProjectContext from "../context/Project-context";
import MoviesContainer from "../components/MoviesContainer/MoviesContainer";
import Head from "next/head";
import Layout from "../layout/layout";
export default function MyList() {
  const context = useContext(ProjectContext);
  const { allMovies } = context;
  const { movieList } = context.userData;
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
    <Layout>
      <Head>
        <title>Netflix Clone | My List</title>
      </Head>
      <MoviesContainer movies={filterAllMovies()} title={"My List"} />
    </Layout>
  );
}
