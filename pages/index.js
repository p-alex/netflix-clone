import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import ProjectContext from "../context/Project-context";
import SiteWrapper from "../components/SiteWrapper";
import NavBar from "../components/NavBar";
import Banner from "../components/Banner";
import FullscreenLoader from "../components/FullscreenLoader";
export default function Home({ username, profileImg }) {
  const context = useContext(ProjectContext);
  const router = useRouter();
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
          <Banner movies={movies} />
          <div className={styles.movies_container}>
            <div className={styles.movie_row}>
              {movies.map((movie) => {
                return (
                  <div className={styles.movie}>
                    <img
                      src={`/movies/${movie.nameSlug}/${movie.nameSlug}-mini.jpg`}
                      alt={`${movie.name}`}
                    />
                    <div className={styles.movie_body}>
                      <div className={styles.controls}>
                        <button>
                          <i className="fas fa-play"></i>
                        </button>
                        <button>
                          <i className="fas fa-angle-down"></i>
                        </button>
                      </div>
                      <div className={styles.stats}>
                        <span>{movie.maturityRating}+</span>
                        <span>{movie.duration}</span>
                      </div>
                      <div className={styles.thisMovieIs}>
                        {movie.thisMovieIs.map((item, id) => {
                          return <p key={id}>{item}</p>;
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
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
