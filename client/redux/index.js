import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import userReducer from "./user";
import gameReducer from "./game";

//App Reducer
const reducer = combineReducers({
  user: userReducer,
  game: gameReducer,
});

//Middleware
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

// Store
const store = createStore(reducer, middleware);

export default store;
