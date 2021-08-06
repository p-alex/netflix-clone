import { useState, useEffect, useContext } from "react";
import ProjectContext from "../context/Project-context";
import { useRouter } from "next/router";
import NavBar from "../components/NavBar";
import Banner from "../components/Banner";
import FullscreenLoader from "../components/FullscreenLoader";
import MovieSlider from "../components/MovieSlider";
import Modal from "../components/Modal";
export default function Home({ username, profileImg }) {
  const router = useRouter();
  const context = useContext(ProjectContext);
  const { selectedMovie } = context;
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    setIsLoading(true);
    let url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://netflix-clone-inky-five.vercel.app";
    const movieList = await fetch(`${url}/api/movies`);
    const moviesJSON = await movieList.json();
    if (moviesJSON.message !== "allowed") {
      router.push("/login");
    } else {
      await setMovies(moviesJSON.movies);
      setIsLoading(false);
    }
  }, []);
  return (
    <>
      {isLoading && <FullscreenLoader />}
      <NavBar username={username} profileImg={profileImg} />
      {movies.length !== 0 && (
        <>
          {selectedMovie && <Modal movie={selectedMovie} />}
          <Banner movies={movies} />
          <MovieSlider movies={movies} sliderId={"1"} sliderTitle={"Popular"} />
          <MovieSlider
            movies={movies}
            sliderId={"2"}
            sliderTitle={"Action & Adventure"}
          />
          <MovieSlider
            movies={movies}
            sliderId={"3"}
            sliderTitle={"Movies Based on Books"}
          />
        </>
      )}
    </>
  );
}

// export async function getServerSideProps(context) {
//   let url =
//     process.env.NODE_ENV === "development"
//       ? "http://localhost:3000"
//       : "https://netflix-clone-inky-five.vercel.app";
//   console.log(context);
//   const token = await context.req.cookies.token;
//   if (token) {
//     const result = await fetch(`${url}/api/verify-token`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const resultJSON = await result.json();
//     if (resultJSON.message !== "Authorized") {
//       return {
//         redirect: {
//           destination: "/login",
//           permanent: false,
//         },
//         props: {},
//       };
//     }
//     return {
//       props: {
//         username: resultJSON.username,
//         profileImg: resultJSON.profileImg,
//       },
//     };
//   } else {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//       props: {},
//     };
//   }
// }
