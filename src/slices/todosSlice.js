import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../data.js";

const todosSlice = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    checkTodo: (state, action) => {
      const id = action.payload;
      state.forEach((todo) => {
        if (todo.id === id) {
          todo.isCompleted = !todo.isCompleted;
        }
      });
    },
    removeTodo: (state, action) => {
      const id = action.payload;
      return state.filter((todo) => id !== todo.id);
    },
    clearTodos: (state, action) => {
      return state.filter((todo) => todo.isCompleted !== true);
    },
    getTodos: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { addTodo, checkTodo, removeTodo, clearTodos, getTodos } =
  todosSlice.actions;

export default todosSlice;
