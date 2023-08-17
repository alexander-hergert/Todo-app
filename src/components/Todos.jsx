import React, { useEffect } from "react";
import { styled } from "styled-components";
import Todo from "./Todo";
import { useSelector, useDispatch } from "react-redux";
import { getTodos } from "../slices/todosSlice";

/**************** STYLES ******************/

const Styles = styled.section``;

/**************** COMPONENT ******************/

const Todos = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  //Load localstorage
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos);
      console.log(parsedTodos);
      dispatch(getTodos(parsedTodos));
    }
  }, []);

  return (
    <Styles>
      {todos.map((todo) => (
        <Todo key={todo.id} {...todo} />
      ))}
    </Styles>
  );
};

export default Todos;
