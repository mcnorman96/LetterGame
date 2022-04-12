import { configureStore, combineReducers } from "@reduxjs/toolkit";
import gameReducer from "./GameStatus";

const rootReducer = combineReducers({ game: gameReducer });

export const store = configureStore({
  reducer: rootReducer,
});


