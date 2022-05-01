import React, { useState } from "react";
import { rtDatabase } from "./utils/firebase";
import { ref, set, get, child, push, update } from "firebase/database";

const host = { id: "3" };

const CreateGame = () => {
  const [joinGameId, setJoinGameId] = useState("");
  const newGameData = (gameId, host) => {
    set(ref(rtDatabase, "games/" + gameId), {
      players: { host, player2: null },
    });
  };
  const validateGameId = (gameId) => {
    get(ref(rtDatabase, `/games/${gameId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        set(ref(rtDatabase, `/games/${gameId}/players/player2`), {
          id: "32",
        });
      } else {
        console.log("no game room exists");
      }
    });
  };
  return (
    <div id="create">
      Create a game!{" "}
      <button type="button" onClick={() => newGameData("3", host)}>
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
    </div>
  );
};

export default CreateGame;
