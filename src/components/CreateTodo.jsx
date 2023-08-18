import React, { useState, useEffect, useRef } from "react";
import { styled } from "styled-components";
import { useDispatch } from "react-redux";
import { addTodo } from "../slices/todosSlice";
import { nanoid } from "nanoid";
import { useGlobalContext } from "../context";

/**************** STYLES ******************/

const Styles = styled.section`
  transition: all 1s;
  background-color: white;
  margin-bottom: 1rem;
  padding: 0 1rem;
  border-radius: 5px;

  form {
    display: flex;
    align-items: center;
    justify-content: space-between;

    div {
      border-radius: 50%;
      width: 1.5rem;
      height: 1.5rem;
      border: 1px solid hsl(236, 33%, 92%);
    }

    input {
      transition: background-color 1s;
      margin: 0.25rem 0;
      height: 3rem;
      width: 90%;
      border: none;
      outline: none;
      font-size: 1rem;
    }
  }
`;

/**************** COMPONENT ******************/

const CreateTodo = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const { isDarkMode } = useGlobalContext();
  const inputRef = useRef();
  const sectionRef = useRef();

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleCreateTodo = (e) => {
    e.preventDefault();
    const payload = { id: nanoid(), content: text, isCompleted: false };
    dispatch(addTodo(payload));
  };

  //DarkMode switch
  useEffect(() => {
    if (isDarkMode) {
      sectionRef.current.style.backgroundColor = "hsl(237, 14%, 26%)";
      inputRef.current.style.backgroundColor = "hsl(237, 14%, 26%)";
      inputRef.current.style.color = "white";
    } else {
      sectionRef.current.style.backgroundColor = "white";
      inputRef.current.style.backgroundColor = "white";
      inputRef.current.style.color = "black";
    }
  }, [isDarkMode]);

  return (
    <Styles ref={sectionRef}>
      <form action="" onSubmit={handleCreateTodo}>
        <div></div>
        <input
          type="text"
          name="newTodo"
          id="newTodo"
          placeholder="Create a new todo..."
          onChange={handleChange}
          ref={inputRef}
        />
      </form>
    </Styles>
  );
};

export default CreateTodo;
