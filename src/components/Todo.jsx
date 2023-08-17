import React from "react";
import { styled } from "styled-components";

/**************** STYLES ******************/

const Styles = styled.article`
  display: flex;
  align-items: center;
`;

/**************** COMPONENT ******************/

const Todo = ({ id, content, isCompleted }) => {
  return (
    <Styles>
      <input type="checkbox" name={id} id={id} defaultChecked={isCompleted} />
      <p>{content}</p>
      <input type="image" src="images/icon-cross.svg" alt="icon-delete" />
    </Styles>
  );
};

export default Todo;
