import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { rtDatabase } from "../utils/firebase";
import { ref, onValue, update, set } from "firebase/database";

import { updateGame, endGame } from "../../redux/game";
import { updateUser, removeUser } from "../../redux/user";

import Players from "./Players";
import Canvas from "./Canvas";

//TODO: security measures so unauthorized players can't join a random room with a URL
//Requires refactoring User logic to sustain even if browser accidentally refreshes, so they can revisit url or rejoin game room?

const Game = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const game = useSelector((state) => state.game);

  const setUserRole = async (role) => {
    console.log("set user role called");
    await update(ref(rtDatabase), { [`/users/${user.id}/role`]: role });
    const newUserRole = { role };
    dispatch(updateUser(newUserRole));
  };

  useEffect(() => {
    if (game.players.host.id === user.id && user.role === undefined) {
      setUserRole("host");
    } else if (game.players.player2.id === user.id && user.role === undefined) {
      setUserRole("player2");
    }
  }, []);

  const gameId = useLocation().pathname.slice(6);
  const gameRef = ref(rtDatabase, `games/${gameId}`);
  const userRef = ref(rtDatabase, `users/${user.id}`);

  //   const leaveGameDisp = async () => {
  //     if (user.role === "host") {
  //       await set(ref(rtDatabase, `games/${gameId}`), null);
  //     }
  //     await set(ref(rtDatabase, `/users/${user.id}`), {});
  //     dispatch(removeUser());
  //     // await set(ref(rtDatabase, `/users/${user.id}/role`), null); // TODO: remove user role when game ends if sustaining user info
  //     dispatch(endGame());
  //   };

  //   const startGame = async () => {
  //     console.log("starting game");
  //     await set(ref(rtDatabase, `games/${gameId}/turn`), "host");
  //     await set(ref(rtDatabase, `games/${gameId}/status`), "playing");
  //   };

  if (!game.id) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      {user.role === "host" && (
        <>
          {/* <button type="button" onClick={() => leaveGameDisp()}>
            End Session
          </button> */}
          {/* <button type="button" onClick={() => startGame()}>
            Start Game
          </button> */}
        </>
      )}
      You are drawing in room:{" "}
      <span>
        <strong>{gameId}</strong>
      </span>
      .
      <div id="players-container">
        <Players gameRef={gameRef} user={user} gameId={gameId} />
      </div>
      <Canvas gameId={gameId} />
    </div>
  );
};

export default Game;
