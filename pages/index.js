import { useEffect, useContext } from "react";
import ProjectContext from "../context/Project-context";
import NavBar from "../components/NavBar";
import Banner from "../components/Banner";
import FullscreenLoader from "../components/FullscreenLoader";
import MovieSlider from "../components/MovieSlider";
import Modal from "../components/Modal";
import pageWrapperStyles from "../styles/PageWrapperStyles.module.css";
export default function Home({ username, profileImg }) {
  const context = useContext(ProjectContext);
  const { selectedMovie, allMovies, isLoading, handleGetAllMovies } = context;

  useEffect(() => {
    if (allMovies.length === 0) {
      handleGetAllMovies();
    }
  }, []);

  return (
    <div className={selectedMovie.name && pageWrapperStyles.disableScroll}>
      {isLoading && <FullscreenLoader />}
      {selectedMovie?.name ? <Modal movie={selectedMovie} /> : null}
      <NavBar username={username} profileImg={profileImg} />
      {allMovies.length !== 0 && (
        <>
          <Banner movies={allMovies} />
          <MovieSlider
            movies={allMovies}
            sliderId={"1"}
            sliderTitle={"Popular"}
          />
          <MovieSlider
            movies={allMovies}
            sliderId={"2"}
            sliderTitle={"Action & Adventure"}
          />
          <MovieSlider
            movies={allMovies}
            sliderId={"3"}
            sliderTitle={"Movies Based on Books"}
          />
        </>
      )}
    </div>
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
