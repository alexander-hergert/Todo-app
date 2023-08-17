import React from "react";
import { styled } from "styled-components";

/**************** STYLES ******************/

const Styles = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border-bottom: 1px solid gray;
  div {
    display: flex;
    align-items: center;
  }

  input[type="checkbox"] {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid gray;
    margin-right: 10px;
    position: relative;

    &:checked {
      background: linear-gradient(
        130deg,
        hsl(192, 100%, 67%),
        hsl(280, 87%, 65%)
      );
    }

    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 60%;
      height: 60%;
      background-image: url("/images/icon-check.svg");
      background-size: 100% 100%;
      display: none;
    }
  }

  input[type="checkbox"]:checked::before {
    display: block;
  }
`;

/**************** COMPONENT ******************/

const Todo = ({ id, content, isCompleted }) => {
  const handleCheck = () => {};

  const handleDelete = () => {};

  return (
    <Styles>
      <div>
        <input
          type="checkbox"
          name={id}
          id={id}
          defaultChecked={isCompleted}
          onChange={handleCheck}
        />
        <p>{content}</p>
      </div>
      <input
        type="image"
        src="images/icon-cross.svg"
        alt="icon-delete"
        onClick={handleDelete}
      />
    </Styles>
  );
};

export default Todo;
