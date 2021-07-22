import { useContext, useState, useEffect } from "react";
import ProjectContext from "../context/Project-context";
import SiteWrapper from "../components/SiteWrapper";
import NavBar from "../components/NavBar";
import Banner from "../components/Banner";
import { compareSync } from "bcryptjs";
export default function Home({ username, profileImg }) {
  const context = useContext(ProjectContext);
  const [movies, setMovies] = useState([]);
  useEffect(async () => {
    let url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://netflix-clone-inky-five.vercel.app";
    const movieList = await fetch(`${url}/api/movies`);
    const moviesJSON = await movieList.json();
    console.log(moviesJSON);
    await setMovies(moviesJSON.movies);
    console.log(movies);
  }, []);
  return (
    <>
      {movies.length !== 0 ? (
        <SiteWrapper>
          <NavBar username={username} profileImg={profileImg} />
          <Banner movies={movies} />
          {movies.map((movie) => {
            return (
              <div key={movie._id}>
                <img
                  src={`/movies/${movie.nameSlug}/${movie.nameSlug}-mini.jpg`}
                  alt=""
                />
              </div>
            );
          })}
        </SiteWrapper>
      ) : null}
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
    } else {
      return {
        props: {
          username: resultJSON.username,
          profileImg: resultJSON.profileImg,
        },
      };
    }
  }
}
