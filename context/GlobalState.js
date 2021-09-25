import { useState, useReducer } from "react";
import { useRouter } from "next/router";
import ProjectContext from "./Project-context";
import { selectedMovieReducer } from "./reducers";
export default function GlobalState({ children }) {
  const router = useRouter();
  const [userData, setUserData] = useState({});
  const [allMovies, setAllMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchBarActive, setIsSearchBarActive] = useState(false);

  const handleChangeSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  // const handleToggleSearchBar = () =>
  //   setSearchBarState((prevState) => ({
  //     ...prevState,
  //     toggleSearchBar: !prevState.toggleSearchBar,
  //   }));

  const handleClearSearchQuery = () => setSearchQuery("");

  const handleToggleOffSearchBar = () => setIsSearchBarActive(false);

  const filters = [
    "Action & Adventure",
    "Anime",
    "Award-Winning",
    "Children & Family Movies",
    "Classic",
    "Comedies",
    "Crime Movies",
    "Documentaries",
    "Dramas",
    "Fantasy Movie",
    "Horror",
    "Independent",
    "Music & Musicals",
    "Romantic",
    "Sci-Fi Movies",
    "Sports",
    "Thriller",
  ];

  let url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://netflix-clone-inky-five.vercel.app";

  const [selectedMovie, dispatchSelectedMovie] = useReducer(
    selectedMovieReducer,
    {}
  );

  const handleGetUserData = async () => {
    console.log("get user");

    const result = await fetch(`${url}/api/user-data`);
    const resultJSON = await result.json();
    if (resultJSON.message !== "Found") {
      router.push("/login");
    } else {
      setUserData({
        username: resultJSON.username,
        profileImg: resultJSON.profileImg,
        isVerified: resultJSON.isVerified,
        movieList: resultJSON.movieList,
        date: resultJSON.date,
      });
    }
  };

  const handleGetAllMovies = async () => {
    console.log("get movie");
    setIsLoading(true);

    const movieList = await fetch(`${url}/api/movies`);
    const moviesJSON = await movieList.json();
    if (moviesJSON.message !== "allowed") {
      setIsLoading(false);
      router.push("/login");
    } else {
      setAllMovies(moviesJSON.movies.reverse());
      setIsLoading(false);
    }
  };

  const handleAddMovieToList = async (movieId, isAdding) => {
    if (isAdding) {
      setUserData((prevState) => ({
        ...prevState,
        movieList: [movieId, ...prevState.movieList],
      }));
    } else {
      setUserData((prevState) => ({
        ...prevState,
        movieList: prevState.movieList.filter((item) => item !== movieId),
      }));
    }
    const result = await fetch(`${url}/api/add-movie-to-list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ movieId }),
    });
    const resultJSON = await result.json();
  };

  const handleAddNewComment = async (comment) => {
    const updatedMoviesArray = allMovies.map((movie) => {
      if (movie._id === comment.movieId) {
        const oldCommentsArray = movie.comments;
        const updatedCommentsArray = [comment, ...oldCommentsArray];
        movie.comments = updatedCommentsArray;
      }
      return movie;
    });
    setAllMovies(updatedMoviesArray);
    const result = await fetch(`${url}/api/add-comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment }),
    });
    const resultJson = await result.json();
  };

  const handleDeleteComment = async (commentId, movieId) => {
    const commentInfo = { commentId, movieId };
    const updatedMoviesArray = allMovies.map((movie) => {
      if (movie._id === movieId) {
        movie.comments = movie.comments.filter(
          (co) => co.commentId !== commentId
        );
      }
      return movie;
    });
    setAllMovies(updatedMoviesArray);

    const result = await fetch(`${url}/api/delete-comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commentInfo }),
    });
    const resultJson = await result.json();
  };

  const handleEditComment = async (editedComment) => {
    const updatedMoviesArray = allMovies.map((movie) => {
      if (movie._id === editedComment.movieId) {
        movie.comments = movie.comments.map((co) => {
          if (co.commentId === editedComment.commentId) {
            return editedComment;
          }
          return co;
        });
      }
      return movie;
    });
    setAllMovies(updatedMoviesArray);
    const result = await fetch(`${url}/api/edit-comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ editedComment }),
    });
    const resultJson = await result.json();
  };

  const handleSelectMovie = (movie) =>
    dispatchSelectedMovie({ type: "SELECT_MOVIE", payload: movie });

  const handleResetSelectedMovie = () =>
    dispatchSelectedMovie({ type: "RESET" });

  const handleChangeProfileImage = async (image) => {
    const result = await fetch(`${url}/api/change-profile-image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image }),
    });
    const resultJson = await result.json();
    if (resultJson.ok) {
      setUserData((prevState) => ({
        ...prevState,
        profileImg: image,
      }));
    }
  };

  const handleLogout = async () => {
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
      setUserData({});
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
        filters,
        handleAddNewComment,
        handleEditComment,
        handleDeleteComment,
        handleChangeProfileImage,
        searchQuery,
        isSearchBarActive,
        setIsSearchBarActive,
        handleChangeSearchQuery,
        //handleToggleSearchBar,
        handleClearSearchQuery,
        handleToggleOffSearchBar,
        //setSearchBarState,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}
