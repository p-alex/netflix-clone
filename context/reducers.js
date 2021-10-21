// ---------------------------------------- USER ----------------------------------------
export const userReducer = (user = {}, action) => {
  switch (action.type) {
    case "GET_USER":
      return action.payload;
    case "ADD_MOVIE_TO_LIST":
      return {
        ...user,
        movieList: [action.payload.movieId, ...user.movieList],
      };
    case "REMOVE_MOVIE_FROM_LIST":
      return {
        ...user,
        movieList: user.movieList.filter(
          (item) => item !== action.payload.movieId
        ),
      };
    case "CHANGE_PROFILE_IMAGE":
      return {
        ...user,
        profileImg: action.payload.image,
      };
    case "CLEAR_USER":
      return {};
    default:
      return user;
  }
};
// ---------------------------------------- MOVIES ----------------------------------------
export const moviesReducer = (
  state = { movies: [], isLoading: false },
  action
) => {
  switch (action.type) {
    case "GET_MOVIES":
      return { ...state, movies: [...action.payload], isLoading: false };
    case "LOADING":
      return { ...state, isLoading: true };
    case "STOP_LOADING":
      return { ...state, isLoading: false };
    case "ADD_COMMENT":
      let updatedMoviesArrayAdd = state.movies.map((movie) => {
        if (movie._id === action.payload.comment.movieId) {
          const oldCommentsArray = movie.comments;
          const updatedCommentsArray = [
            action.payload.comment,
            ...oldCommentsArray,
          ];
          movie.comments = updatedCommentsArray;
        }
        return movie;
      });
      return { ...state, movies: updatedMoviesArrayAdd };
    case "EDIT_COMMENT":
      let updatedMoviesArrayEdit = state.movies.map((movie) => {
        if (movie._id === action.payload.editedComment.movieId) {
          movie.comments = movie.comments.map((comment) => {
            if (comment.commentId === action.payload.editedComment.commentId)
              return action.payload.editedComment;
            return comment;
          });
        }
        return { ...state, movies: updatedMoviesArrayEdit };
      });
    case "DELETE_COMMENT":
      let updatedMoviesArrayDelete = state.movies.map((movie) => {
        if (movie._id === action.payload.movieId) {
          movie.comments = movie.comments.filter(
            (co) => co.commentId !== action.payload.commentId
          );
        }
        return movie;
      });
      return { ...state, movies: updatedMoviesArrayDelete };
    default:
      return state;
  }
};
// ---------------------------------------- SELECTED MOVIE ----------------------------------------
export const selectedMovieReducer = (selectedMovie, action) => {
  switch (action.type) {
    case "SELECT_MOVIE":
      return action.payload;
    case "RESET":
      return {};
    default:
      return selectedMovie;
  }
};
