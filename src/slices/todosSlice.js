import { createSlice } from "@reduxjs/toolkit";
import { fetchTodo } from "../thunks/todosThunk";
import { initialState } from "../data.js";

const todosSlice = createSlice({
  name: "todos",
  //initialState [data]
  initialState: initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    }, //should be fine
    checkTodo: (state, action) => {
      //find todo by id
      return state.todos.map((todo, index) => {
        if (todo.id === action.payload) {
          //change isCompleted into opposite
          todo.isCompleted = !todo.isCompleted;
        }
      });
    },
    clearTodos: (state, action) => {
      state.todos.forEach((todo, index) => {
        if (todo.id === action.payload) {
          state.todos.splice(index, 1);
        }
      }); //should be fine
    },
    getTodos: (state, action) => {
      state = action.payload;
      return state;
    },
    // updateTodo: (state, action) => {
    //   state.todos.forEach((todo) => {
    //     if (todo.id === action.payload.id) {
    //       todo.text = action.payload.text;
    //     }
    //   });
    //},

    //Async operations
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos.push(action.payload);
        console.log(action.payload);
      })
      .addCase(fetchTodo.rejected, (state) => {
        state.isLoading = false;
        throw new Error();
      });
  },
});

export const { addTodo, removeTodo, updateTodo, clearTodos, getTodos } =
  todosSlice.actions;

export default todosSlice;
