import React, { useEffect, useRef } from "react";
import { styled } from "styled-components";
import { useDispatch } from "react-redux";
import { checkTodo, removeTodo } from "../slices/todosSlice";
import { useGlobalContext } from "../context";

/**************** STYLES ******************/

const Styles = styled.article`
  transition: all 1s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border-bottom: 1px solid hsl(236, 9%, 61%);
  padding: 0 1rem;

  div {
    display: flex;
    align-items: center;
  }

  input[type="checkbox"]:checked + p {
    color: hsl(234, 11%, 52%);
    text-decoration: line-through;
  }

  input[type="checkbox"] {
    appearance: none;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    border: 1px solid hsl(236, 9%, 61%);
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
  const { isDarkMode } = useGlobalContext();
  const sectionRef = useRef();

  const handleCheck = () => {
    dispatch(checkTodo(id));
  };

  const handleDelete = () => {
    dispatch(removeTodo(id));
  };

  //DarkMode switch
  useEffect(() => {
    if (isDarkMode) {
      sectionRef.current.style.backgroundColor = "hsl(237, 14%, 26%)";
    } else {
      sectionRef.current.style.backgroundColor = "white";
    }
  }, [isDarkMode]);

  return (
    <Styles ref={sectionRef}>
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
