import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { onValue, ref, get, update } from "firebase/database";
import { rtDatabase } from "../utils/firebase";

import { updateGame } from "../../redux/game";

let updatesCalled = false;

const Players = ({ gameRef, user, gameId }) => {
  const dispatch = useDispatch();
  const game = useSelector((state) => state.game);
  const [loading, setLoading] = useState(true);
  const [updated, setUpdated] = useState(false);
  const [players, setPlayers] = useState({});

  const prevPlayersRef = useRef(players);

  const playersRef = ref(rtDatabase, `games/${gameId}/players`);

  useEffect(() => {
    onValue(playersRef, (snapshot) => {
      const players = snapshot.val();
      if (!prevPlayersRef.current.player2 && players.player2) {
        setPlayers(players);
      }
    });
  }, []);

  //   if (!updatesCalled) {
  //     console.log("inside if statement updates Called");
  //     onValue(playersRef, (snapshot) => {
  //       const players = snapshot.val();
  //       console.log(players, "players in playersRef on value");
  //       if (players.player2) {
  //         console.log("snapshot.player2");
  //         setUpdated(true);
  //         updatesCalled = true;
  //       }
  //     });
  //   }

  //   if (updated && updatesCalled === 1) {
  //     console.log("inside if updated and updates called at 1");
  //     setUpdated(false);
  //     get(ref(rtDatabase, `games/${gameId}/players/player2`)).then((snapshot) => {
  //       if (snapshot.exists()) {
  //         dispatch(updateGame(snapshot));
  //       }
  //     });
  //     // setUpdated(false);
  //   }

  return (
    <>
      <div>
        <strong>Host: </strong>
        {game.players.host.username}
      </div>
      {players.player2 && (
        <div>
          <strong>Doodler 2: </strong>
          {players.player2.username}
        </div>
      )}
    </>
  );
};

export default Players;
