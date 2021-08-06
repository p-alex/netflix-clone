export const selectedMovieReducer = (state, action) => {
  switch (action.type) {
    case "SELECT_MOVIE":
      return action.payload;
    case "RESET":
      return {};
    default:
      return state;
  }
};
