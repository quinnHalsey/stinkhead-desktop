import React from "react";
import CreateGame from "./components/CreateGame";
import { Routes, Route } from "react-router-dom";
import Game from "./components/Game/Game";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<CreateGame />} />
        <Route path="/:roomId" element={<Game />} />
        {/* <Route path="/signup" element= {<SignUp />} /> */}
      </Routes>
    </div>
  );
};

export default App;
