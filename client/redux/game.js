const CREATE_GAME = "CREATE_GAME";
const SET_GAME = "SET_GAME";
const UPDATE_GAME = "UPDATE_GAME";
const END_GAME = "END_GAME";

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

export const updateGame = (game) => {
  return {
    type: UPDATE_GAME,
    game,
  };
};

export const endGame = () => {
  return {
    type: END_GAME,
    game: {},
  };
};

export default function gameReducer(game = {}, action) {
  console.log("inside game reducer");
  switch (action.type) {
    case UPDATE_GAME:
      return { ...game, ...action.game };
    case CREATE_GAME:
      return action.game;
    case SET_GAME:
      return action.game;
    case END_GAME:
      return action.game;
    default:
      return game;
  }
}
