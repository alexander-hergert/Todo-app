import { configureStore } from "@reduxjs/toolkit";
import todosSlice from "./slices/todosSlice";

const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("todos", JSON.stringify(state.todos));
});

export default store;
