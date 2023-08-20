import React, { useState } from "react";
import { styled } from "styled-components";
import { useDispatch } from "react-redux";
import { addTodo } from "../slices/todosSlice";
import { nanoid } from "nanoid";
import { useGlobalContext } from "../context";

/**************** STYLES ******************/

const Styles = styled.section`
  --background: ${(props) => props.colors.background};
  --border: ${(props) => props.colors.border};
  transition: all 1s;
  background-color: var(--background);
  padding: 0 1rem;
  border-radius: 5px;
  max-width: 40rem;
  margin: auto;
  margin-bottom: 1rem;

  form {
    display: flex;
    align-items: center;
    justify-content: space-between;

    div {
      border-radius: 50%;
      width: 1.5rem;
      height: 1.5rem;
      border: 1px solid var(--border);
    }

    input {
      transition: background-color 1s;
      background-color: var(--background);
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

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleCreateTodo = (e) => {
    e.preventDefault();
    const payload = { id: nanoid(), content: text, isCompleted: false };
    dispatch(addTodo(payload));
  };

  return (
    <Styles
      colors={
        isDarkMode
          ? { background: "hsl(237, 14%, 26%)", border: "hsl(235, 19%, 35%)" }
          : { background: "hsl(0deg 0% 100%)", border: "hsl(241, 7%, 89%)" }
      }
    >
      <form action="" onSubmit={handleCreateTodo}>
        <div></div>
        <input
          type="text"
          name="newTodo"
          id="newTodo"
          placeholder="Create a new todo..."
          onChange={handleChange}
        />
      </form>
    </Styles>
  );
};

export default CreateTodo;
