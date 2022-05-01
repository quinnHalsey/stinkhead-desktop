const CREATE_GAME = "CREATE_GAME";
const SET_GAME = "SET_GAME";

export const createGame = (game) => {
  return {
    type: CREATE_GAME,
    game,
  };
};

export const setGame = (game) => {
  return {
    type: SET_GAME,
    game,
  };
};

export default function gameReducer(game = {}, action) {
  switch (action.type) {
    case CREATE_GAME:
      return action.game;
    case SET_GAME:
      return action.game;
    default:
      return game;
  }
}
