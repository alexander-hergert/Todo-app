import React from "react";
import { styled } from "styled-components";
import { initialState } from "../data";
import Todo from "./Todo";

/**************** STYLES ******************/

const Styles = styled.section``;

/**************** COMPONENT ******************/

const Todos = () => {
  return (
    <Styles>
      {initialState.map((todo) => (
        <Todo key={todo.id} {...todo}/>
      ))}
    </Styles>
  );
};

export default Todos;
