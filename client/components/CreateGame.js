import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { rtDatabase } from "./utils/firebase";
import { ref, set, get } from "firebase/database";
import { createUser } from "../redux/user";
import { createGame, setGame } from "../redux/game";
import { useDispatch, useSelector } from "react-redux";

const CreateGame = () => {
  const user = useSelector((state) => state.user);
  const game = useSelector((state) => state.game);
  const [joinGameId, setJoinGameId] = useState("");
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();

  const newUser = async () => {
    const id = nanoid();
    const newUserObj = { id, username };
    set(ref(rtDatabase, "users/" + id), newUserObj);
    dispatch(createUser(newUserObj));
  };

  const newGameData = () => {
    const gameId = nanoid().slice(16);
    const newGameObj = { id: gameId, players: { host: user, player2: null } };
    set(ref(rtDatabase, "games/" + gameId), newGameObj);
    dispatch(createGame(newGameObj));
  };

  const validateGameId = (gameId) => {
    get(ref(rtDatabase, `/games/${gameId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        const gameObj = snapshot.val();
        set(ref(rtDatabase, `/games/${gameId}/players/player2`), user);
        dispatch(
          setGame({
            ...gameObj,
            players: { ...gameObj.players, player2: user },
          })
        );
      } else {
        alert(`Game room with id: ${gameId} does not exist.`);
      }
    });
  };

  console.log("rendering create game with game data: ", game);

  return (
    <div id="create">
      {game.id && <Navigate to={`/game/${game.id}`} />}
      {user.id ? (
        <>
          <div>Welcome, {user.username}</div>
          Create a game!
          <button type="button" onClick={() => newGameData()}>
            Create!
          </button>
          <form
            onSubmit={(evt) => {
              evt.preventDefault();
              console.log("Join room with id: ", joinGameId);
              validateGameId(joinGameId);
            }}
          >
            <label htmlFor="room-id">Join room with a room ID:</label>
            <input
              name="room-id"
              type="text"
              value={joinGameId}
              onChange={(evt) => setJoinGameId(evt.target.value)}
            />
            <button type="submit">Join game</button>
          </form>
        </>
      ) : (
        <form
          onSubmit={(evt) => {
            evt.preventDefault();
            newUser();
          }}
        >
          <label htmlFor="username">Enter a username:</label>
          <input
            name="username"
            type="text"
            value={username}
            onChange={(evt) => setUsername(evt.target.value)}
          />
        </form>
      )}
    </div>
  );
};

export default CreateGame;
