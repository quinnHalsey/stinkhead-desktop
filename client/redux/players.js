const SET_PLAYERS = "SET_PLAYERS";

export const setPlayers = (players) => {
  return {
    type: SET_PLAYERS,
    players,
  };
};

export default function (players = {}, action) {
  switch (action.type) {
    case SET_PLAYERS:
      return action.players;
    default:
      return players;
  }
}
