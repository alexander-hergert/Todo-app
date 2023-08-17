import React from "react";
import { styled } from "styled-components";

/**************** STYLES ******************/

const Styles = styled.section`
  background-color: white;
  margin-bottom: 1rem;
`;

/**************** COMPONENT ******************/

const CreateTodo = () => {
  return (
    <Styles>
      <form action="">
        <img src="/images/icon-check.svg" alt="icon-check" />
        <input type="text" name="newTodo" id="newTodo" />
      </form>
    </Styles>
  );
};

export default CreateTodo;
