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
    const result = await fetch(`${url}/api/user-data`);
    const resultJSON = await result.json();
    if (!resultJSON.ok) {
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
    console.log(resultJSON.message);
  };

  const handleGetAllMovies = async () => {
    setIsLoading(true);

    const movieList = await fetch(`${url}/api/movies`);
    const moviesJSON = await movieList.json();
    if (!moviesJSON.ok) {
      setIsLoading(false);
      router.push("/login");
    } else {
      setAllMovies(moviesJSON.movies.reverse());
      setIsLoading(false);
    }
    console.log(moviesJSON.message);
  };

  const handleAddMovieToList = async (movieId, isAdding) => {
    console.time(isAdding ? "Added movie to list" : "Removed movie from list");
    const result = await fetch(`${url}/api/add-movie-to-list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ movieId }),
    });
    const resultJSON = await result.json();
    console.log(resultJSON.message);
    if (resultJSON.ok) {
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
    console.log(resultJSON.message);
    if (resultJSON.ok) {
      const updatedMoviesArray = allMovies.map((movie) => {
        if (movie._id === comment.movieId) {
          const oldCommentsArray = movie.comments;
          const updatedCommentsArray = [comment, ...oldCommentsArray];
          movie.comments = updatedCommentsArray;
        }
        return movie;
      });
      setAllMovies(updatedMoviesArray);
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
    console.log(resultJSON.message);
    if (resultJSON.ok) {
      const updatedMoviesArray = allMovies.map((movie) => {
        if (movie._id === movieId) {
          movie.comments = movie.comments.filter(
            (co) => co.commentId !== commentId
          );
        }
        return movie;
      });
      setAllMovies(updatedMoviesArray);
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
    console.log(resultJSON.message);
    if (resultJSON.ok) {
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
      setUserData((prevState) => ({
        ...prevState,
        profileImg: image,
      }));
    }
    console.log(resultJSON.message);
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
