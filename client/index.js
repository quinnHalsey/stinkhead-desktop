import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/index";
import App from "./App";
import { Routes, Route } from "react-router-dom";
import Game from "./components/Game/Game";
import CreateGame from "./components/CreateGame";

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<CreateGame />} />
        <Route exact path="/game/:gameId" element={<Game />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
