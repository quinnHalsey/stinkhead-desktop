import React, { useState } from "react";
import { rtDatabase } from "../utils/firebase";
import { ref, onValue, update, set } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { updateGame, endGame } from "../../redux/game";
import { Link, Navigate, useLocation } from "react-router-dom";

//TODO: security measures so unauthorized players can't join a random room with a URL
//Requires refactoring User logic to sustain even if browser accidentally refreshes, so they can revisit url or rejoin game room?

const Game = () => {
  console.log("rendering game");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const game = useSelector((state) => state.game);

  const gameId = useLocation().pathname.slice(6);
  const [leaveGame, setLeaveGame] = useState(false);
  const gameRef = ref(rtDatabase, `games/${gameId}`);

  onValue(gameRef, (snapshot) => {
    const gameData = snapshot.val();
    console.log(gameData, "game data", gameRef, "gameRef");
    dispatch(() => updateGame(gameData));
  });

  const leaveGameDisp = async () => {
    await set(ref(rtDatabase, `games/${gameId}`), null);
    dispatch(endGame());
    setLeaveGame(true);
  };

  const startGame = async () => {
    await set(ref(rtDatabase, `games/${gameId}/turn`), "host");
  };

  return (
    <div>
      {!game.id && <Navigate to="/" />}
      <button type="button" onClick={() => leaveGameDisp()}>
        End Game
      </button>
      <button type="button" onClick={() => startGame()}>
        Start Game
      </button>
      You are playing in game room {gameId}
    </div>
  );
};

export default Game;
