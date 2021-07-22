import { useContext } from "react";
import ProjectContext from "../context/Project-context";
import SiteWrapper from "../components/SiteWrapper";
import NavBar from "../components/NavBar";
import Banner from "../components/Banner";
export default function Home({ username, profileImg, movies }) {
  const context = useContext(ProjectContext);
  return (
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
        method: "GET",
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
