import React from "react";
import { styled } from "styled-components";

/**************** STYLES ******************/

const Styles = styled.section``;

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
