import { useState, useReducer } from "react";
import { useRouter } from "next/router";
import ProjectContext from "./Project-context";
import { userReducer, moviesReducer, selectedMovieReducer } from "./reducers";
import { filtersList } from "../filtersList/filtersList";
import handleFetch from "../utils/handleFetch";
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
      : "https://netplix-inky-five.vercel.app/";

  const [selectedMovie, dispatchSelectedMovie] = useReducer(
    selectedMovieReducer,
    {}
  );

  const handleGetUserData = async () => {
    console.time("Getting user");
    const result = await handleFetch(`${url}/api/user-data`, "GET");
    if (result.ok) {
      dispatchUser({ type: "GET_USER", payload: result });
    } else {
      router.push("/login");
    }
    console.timeEnd("Getting user");
  };

  const handleGetAllMovies = async () => {
    console.time("Getting movies");
    dispatchMovies({ type: "LOADING" });
    const moviesList = await handleFetch(`${url}/api/movies`, "GET");
    if (moviesList.ok) {
      dispatchMovies({
        type: "GET_MOVIES",
        payload: moviesList.movies.reverse(),
      });
    } else {
      dispatchMovies({ type: "STOP_LOADING" });
      router.push("/login");
    }
    console.timeEnd("Getting movies");
  };

  const handleAddMovieToList = async (movieId, isAdding) => {
    console.time(isAdding ? "Added movie to list" : "Removed movie from list");
    setIsAddToListLoading(true);
    const result = await handleFetch(`${url}/api/add-movie-to-list`, "POST", {
      movieId,
      currentUserMovieList: user.movieList,
    });
    if (result.ok) {
      if (isAdding) {
        dispatchUser({ type: "ADD_MOVIE_TO_LIST", payload: { movieId } });
      } else {
        dispatchUser({ type: "REMOVE_MOVIE_FROM_LIST", payload: { movieId } });
      }
      setIsAddToListLoading(false);
      console.timeEnd(
        isAdding ? "Added movie to list" : "Removed movie from list"
      );
    } else {
      setIsAddToListLoading(false);
      console.log("Something went wrong");
    }
  };

  const handleAddNewComment = async (comment, currentMovieCommentsList) => {
    console.time("Add new comment");
    const result = await handleFetch(`${url}/api/comments`, "POST", {
      comment,
      currentMovieCommentsList,
    });
    if (result.ok)
      dispatchMovies({ type: "ADD_COMMENT", payload: { comment } });

    console.timeEnd("Add new comment");
  };

  const handleDeleteComment = async (commentId, movieId) => {
    console.time("Delete comment");
    const result = await handleFetch(`${url}/api/comments`, "DELETE", {
      commentId,
      movieId,
    });
    if (result.ok)
      dispatchMovies({
        type: "DELETE_COMMENT",
        payload: { commentId, movieId },
      });
    console.timeEnd("Delete comment");
  };

  const handleEditComment = async (editedComment) => {
    console.time("Edit comment");
    const result = await handleFetch(
      `${url}/api/comments`,
      "PUT",
      editedComment
    );
    if (result.ok) {
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
    const result = await handleFetch(
      `${url}/api/change-profile-image`,
      "POST",
      image
    );
    if (result.ok) {
      dispatchUser({ type: "CHANGE_PROFILE_IMAGE", payload: { image } });
    }
    console.timeEnd("Change profile picture time");
  };

  const handleLogout = async () => {
    const result = await handleFetch(`${url}/api/auth`, "POST", {
      authType: "logout",
    });
    if (result.ok) {
      router.push("/login");
      dispatchUser({ type: "CLEAR_USER" });
    }
  };

  const handleLoginAsGuest = async () => {
    const result = await handleFetch(`${url}/api/auth`, "POST", {
      authType: "guestLogin",
    });
    if (result.ok) {
      router.push("/browse");
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        handleLogout,
        handleLoginAsGuest,
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
