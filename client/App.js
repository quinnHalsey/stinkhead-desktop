import React from "react";
import CreateGame from "./components/CreateGame";
import { Routes, Route } from "react-router-dom";
import { Redirect } from "react-router";
import Game from "./components/Game/Game";
import { useSelector } from "react-redux";

const App = () => {
  const game = useSelector((state) => state.game);
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<CreateGame />} />
        <Route path="/game/:roomId" element={<Game />} />
        {/* <Route path="/signup" element= {<SignUp />} /> */}
      </Routes>
    </div>
  );
};

export default App;
