import { useState, useReducer, useEffect } from "react";
import { useRouter } from "next/router";
import ProjectContext from "./Project-context";
import { selectedMovieReducer } from "./reducers";
export default function GlobalState({ children }) {
  const router = useRouter();
  const [userData, setUserData] = useState({});
  const [allMovies, setAllMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedMovie, dispatchSelectedMovie] = useReducer(
    selectedMovieReducer,
    {}
  );

  const handleGetUserData = async () => {
    console.log("get user");
    let url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://netflix-clone-inky-five.vercel.app";
    const result = await fetch(`${url}/api/user-data`);
    const resultJSON = await result.json();
    if (resultJSON.message !== "Found") {
      router.push("/login");
    } else {
      setUserData({
        username: resultJSON.username,
        profileImg: resultJSON.profileImg,
        movieList: resultJSON.movieList,
      });
    }
  };

  const handleGetAllMovies = async () => {
    console.log("get movie");
    setIsLoading(true);
    let url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://netflix-clone-inky-five.vercel.app";
    const movieList = await fetch(`${url}/api/movies`);
    const moviesJSON = await movieList.json();
    if (moviesJSON.message !== "allowed") {
      setIsLoading(false);
      router.push("/login");
    } else {
      setAllMovies(moviesJSON.movies);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (allMovies.length === 0) {
      handleGetAllMovies();
    }
  }, []);

  useEffect(() => {
    if (!userData?.username) {
      handleGetUserData();
    }
  }, []);

  const handleAddMovieToList = async (movie, isAdding) => {
    let url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://netflix-clone-inky-five.vercel.app";
    const result = await fetch(`${url}/api/add-movie-to-list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ movie }),
    });
    const resultJSON = await result.json();
    if (resultJSON.message !== "Something went wrong") {
      if (isAdding) {
        setUserData((prevState) => ({
          ...prevState,
          movieList: [...prevState.movieList, movie],
        }));
      } else {
        setUserData((prevState) => ({
          ...prevState,
          movieList: prevState.movieList.filter(
            (item) => item._id !== movie._id
          ),
        }));
      }
    }
  };

  const handleSelectMovie = (movie) =>
    dispatchSelectedMovie({ type: "SELECT_MOVIE", payload: movie });

  const handleResetSelectedMovie = () =>
    dispatchSelectedMovie({ type: "RESET" });

  const handleLogout = async () => {
    let url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://netflix-clone-inky-five.vercel.app";
    const result = await fetch(`${url}/api/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ authType: "logout" }),
    });
    const resultJSON = await result.json();
    if (resultJSON.message === "Logged out") {
      router.push("/login");
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        handleLogout,
        userData,
        selectedMovie,
        handleSelectMovie,
        handleResetSelectedMovie,
        allMovies,
        isLoading,
        handleGetAllMovies,
        handleGetUserData,
        handleAddMovieToList,
        userMovieList: userData.movieList,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}
