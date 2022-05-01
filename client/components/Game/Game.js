import React from "react";
import { useLocation } from "react-router-dom";

const Game = () => {
  const location = useLocation();
  console.log(location);
  return <div>You are playing in game room</div>;
};

export default Game;
