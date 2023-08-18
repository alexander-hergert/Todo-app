import React from "react";
import { styled } from "styled-components";
import { useDispatch } from "react-redux";
import { checkTodo, removeTodo } from "../slices/todosSlice";


/**************** STYLES ******************/

const Styles = styled.article`
  transition: all 1s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border-bottom: 1px solid hsl(236, 33%, 92%);
  padding: 0 1rem;
  div {
    display: flex;
    align-items: center;
  }

  input[type="checkbox"] {
    appearance: none;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    border: 1px solid hsl(236, 33%, 92%);
    margin-right: 1rem;
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
  const dispatch = useDispatch();
 

  const handleCheck = () => {
    dispatch(checkTodo(id));
  };

  const handleDelete = () => {
    dispatch(removeTodo(id));
  };


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
