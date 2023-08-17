import React from "react";
import { styled } from "styled-components";
import Todo from "./Todo";
import { useSelector, useDispatch } from "react-redux";

/**************** STYLES ******************/

const Styles = styled.section``;

/**************** COMPONENT ******************/

const Todos = () => {
  const todos = useSelector((state) => state.todos);

  return (
    <Styles>
      {todos.map((todo) => (
        <Todo key={todo.id} {...todo} />
      ))}
    </Styles>
  );
};

export default Todos;
