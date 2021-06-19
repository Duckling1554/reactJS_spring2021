import { combineReducers } from "redux";
import { toDoListReducer } from "./toDoListReducer";
import { themeReducer } from "./themeReducer";

export const rootReducer = combineReducers({
  theme: themeReducer,
  toDoList: toDoListReducer,
});