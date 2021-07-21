import { useContext } from "react";
import ProjectContext from "../context/Project-context";
import NavBar from "../components/NavBar";
export default function Home({ username, profileImg, movies }) {
  const context = useContext(ProjectContext);
  return (
    <>
      <NavBar username={username} profileImg={profileImg} />
      {movies.map((movie) => {
        return (
          <div key={movie._id}>
            {" "}
            <img
              src={`/movies/${movie.nameSlug}/${movie.nameSlug}-logo.png`}
              alt=""
            />
            <img
              src={`/movies/${movie.nameSlug}/${movie.nameSlug}-mini.jpg`}
              alt=""
            />
            <img
              src={`/movies/${movie.nameSlug}/${movie.nameSlug}-video-cover.jpg`}
              alt={movie.name}
            />
            <p>{movie.release}</p>
            <p>{movie.description}</p>
            {movie.genres.map((genre) => {
              return <p key={genre}>{genre}</p>;
            })}
            {movie.cast.map((cast) => {
              return <p key={cast}>{cast}</p>;
            })}
          </div>
        );
      })}
    </>
  );
}

export const getServerSideProps = async (context) => {
  try {
    let url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://netflix-clone-inky-five.vercel.app";

    let token = context.req.cookies.token;
    if (token) {
      let result = await fetch(`${url}/api/movies`, {
        mode: "same-origin",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let resultJSON = await result.json();
      let user = await fetch(`${url}/api/user-data`, {
        mode: "same-origin",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let userJSON = await user.json();
      if (resultJSON.message === "Not Allowed") {
        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      }
      return {
        props: {
          username: userJSON.username,
          profileImg: userJSON.profileImg,
          movies: resultJSON.movies,
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
  } catch {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
      props: {},
    };
  }
};
