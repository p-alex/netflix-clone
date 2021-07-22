import { useContext, useState, useEffect } from "react";
import ProjectContext from "../context/Project-context";
import SiteWrapper from "../components/SiteWrapper";
import NavBar from "../components/NavBar";
import Banner from "../components/Banner";
import FullscreenLoader from "../components/FullscreenLoader";
export default function Home({ username, profileImg }) {
  const context = useContext(ProjectContext);
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
    await setMovies(moviesJSON.movies);
    setTimeout(() => {
      setIsLoading(false);
    }, 400);

    console.log(movies);
  }, []);
  return (
    <>
      {!isLoading ? (
        <>
          <NavBar username={username} profileImg={profileImg} />
          {movies.length !== 0 && (
            <>
              <Banner movies={movies} />
            </>
          )}
        </>
      ) : (
        <FullscreenLoader />
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  let url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://netflix-clone-inky-five.vercel.app";
  const token = await context.req.cookies.token;
  if (token) {
    const result = await fetch(`${url}/api/verify-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const resultJSON = await result.json();
    if (resultJSON.message !== "Authorized") {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
        props: {},
      };
    }
    return {
      props: {
        username: resultJSON.username,
        profileImg: resultJSON.profileImg,
      },
    };
  } else {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
      props: {},
    };
  }
}
