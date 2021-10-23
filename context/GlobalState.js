import { useState, useReducer } from "react";
import { useRouter } from "next/router";
import ProjectContext from "./Project-context";
import { userReducer, moviesReducer, selectedMovieReducer } from "./reducers";
import { filtersList } from "../filtersList/filtersList";
export default function GlobalState({ children }) {
  const router = useRouter();

  const [allMovies, dispatchMovies] = useReducer(moviesReducer, {
    movies: [],
    isLoading: false,
  });

  const [user, dispatchUser] = useReducer(userReducer, {});

  const [isAddToListLoading, setIsAddToListLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchBarActive, setIsSearchBarActive] = useState(false);

  const handleChangeSearchQuery = (e) => setSearchQuery(e.target.value);
  const handleClearSearchQuery = () => setSearchQuery("");
  const handleToggleOffSearchBar = () => setIsSearchBarActive(false);

  const filters = filtersList;

  let url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://netflix-clone-inky-five.vercel.app";

  const [selectedMovie, dispatchSelectedMovie] = useReducer(
    selectedMovieReducer,
    {}
  );

  const handleGetUserData = async () => {
    const result = await fetch(`${url}/api/user-data`);
    const resultJSON = await result.json();
    if (resultJSON.ok) {
      dispatchUser({ type: "GET_USER", payload: resultJSON });
    } else {
      router.push("/login");
    }
  };

  const handleGetAllMovies = async () => {
    dispatchMovies({ type: "LOADING" });
    const movieList = await fetch(`${url}/api/movies`);
    const moviesJSON = await movieList.json();
    if (moviesJSON.ok) {
      dispatchMovies({
        type: "GET_MOVIES",
        payload: moviesJSON.movies.reverse(),
      });
    } else {
      dispatchMovies({ type: "STOP_LOADING" });
      router.push("/login");
    }
  };

  const handleAddMovieToList = async (movieId, isAdding) => {
    setIsAddToListLoading(true);
    console.time(isAdding ? "Added movie to list" : "Removed movie from list");
    const result = await fetch(`${url}/api/add-movie-to-list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ movieId }),
    });
    const resultJSON = await result.json();
    if (resultJSON.ok) {
      if (isAdding) {
        dispatchUser({ type: "ADD_MOVIE_TO_LIST", payload: { movieId } });
      } else {
        dispatchUser({ type: "REMOVE_MOVIE_FROM_LIST", payload: { movieId } });
      }
      setIsAddToListLoading(false);
    }

    console.timeEnd(
      isAdding ? "Added movie to list" : "Removed movie from list"
    );
  };

  const handleAddNewComment = async (comment) => {
    console.time("Add new comment");
    const result = await fetch(`${url}/api/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });
    const resultJSON = await result.json();
    if (resultJSON.ok) {
      dispatchMovies({ type: "ADD_COMMENT", payload: { comment } });
    }
    console.timeEnd("Add new comment");
  };

  const handleDeleteComment = async (commentId, movieId) => {
    console.time("Delete comment");
    const commentInfo = { commentId, movieId };
    const result = await fetch(`${url}/api/comments`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentInfo),
    });
    const resultJSON = await result.json();
    if (resultJSON.ok) {
      dispatchMovies({
        type: "DELETE_COMMENT",
        payload: { commentId, movieId },
      });
    }
    console.timeEnd("Delete comment");
  };

  const handleEditComment = async (editedComment) => {
    console.time("Edit comment");
    const result = await fetch(`${url}/api/comments`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedComment),
    });
    const resultJSON = await result.json();
    if (resultJSON.ok) {
      dispatchMovies({ type: "EDIT_COMMENT", payload: { editedComment } });
    }
    console.timeEnd("Edit comment");
  };

  const handleSelectMovie = (movie) =>
    dispatchSelectedMovie({ type: "SELECT_MOVIE", payload: movie });

  const handleResetSelectedMovie = () =>
    dispatchSelectedMovie({ type: "RESET" });

  const handleChangeProfileImage = async (image) => {
    console.time("Change profile picture time");
    const result = await fetch(`${url}/api/change-profile-image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(image),
    });
    const resultJSON = await result.json();
    console.timeEnd("Change profile picture time");
    if (resultJSON.ok) {
      dispatchUser({ type: "CHANGE_PROFILE_IMAGE", payload: { image } });
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
    if (resultJSON.ok) {
      router.push("/login");
      dispatchUser({ type: "CLEAR_USER" });
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        handleLogout,
        userData: user,
        selectedMovie,
        handleSelectMovie,
        handleResetSelectedMovie,
        allMovies: allMovies.movies,
        isLoading: allMovies.isLoading,
        handleGetAllMovies,
        handleGetUserData,
        handleAddMovieToList,
        userMovieList: user.movieList,
        filters,
        handleAddNewComment,
        handleEditComment,
        handleDeleteComment,
        handleChangeProfileImage,
        searchQuery,
        isSearchBarActive,
        setIsSearchBarActive,
        handleChangeSearchQuery,
        handleClearSearchQuery,
        handleToggleOffSearchBar,
        isAddToListLoading,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}
