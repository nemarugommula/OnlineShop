import { useEffect, createContext } from "react";

const OnlineStore = createContext();

export default OnlineStore;


const initialState = {
  categories: [],
  products: [],
  campaigns: [],
  user: {},
};

const actions = {
  ADD_TODO_ITEM: "ADD_TODO_ITEM",
  REMOVE_TODO_ITEM: "REMOVE_TODO_ITEM",
  TOGGLE_COMPLETED: "TOGGLE_COMPLETED",
};