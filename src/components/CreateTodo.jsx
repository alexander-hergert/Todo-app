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
  --color: ${(props) => props.colors.color};
  transition: background-color 1s;
  background-color: var(--background);
  padding: 0 1.5rem;
  border-radius: 5px;
  max-width: 40rem;
  margin: auto;
  margin-bottom: 1.5rem;

  .validation-error::placeholder {
    color: hsl(3, 88%, 63%);
  }

  form {
    display: flex;
    align-items: center;

    div {
      border-radius: 50%;
      width: 1.5rem;
      height: 1.5rem;
      border: 1px solid var(--border);
      margin-right: 1rem;
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
      color: var(--color);
    }

    input:autofill {
      box-shadow: 0 0 0px 1000px var(--background) inset;
    }

    input::placeholder {
      color: hsl(236, 9%, 61%);
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
    if (e.target[0].value === "") {
      e.target[0].placeholder = "Enter a todo first...";
      e.target[0].classList.add("validation-error");
      return;
    }
    const payload = { id: nanoid(), content: text, isCompleted: false };
    dispatch(addTodo(payload));
    e.target[0].value = "";
    setText("");
    e.target[0].placeholder = "Create a new todo...";
    e.target[0].classList.remove("validation-error");
  };

  return (
    <Styles
      colors={
        isDarkMode
          ? {
              background: "hsl(237, 14%, 26%)",
              border: "hsl(235, 19%, 35%)",
              color: "hsl(0deg 0% 100%)",
            }
          : {
              background: "hsl(0 0% 100%)",
              border: "hsl(241, 7%, 89%)",
              color: "hsl(237, 14%, 26%)",
            }
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
          aria-label="create a new todo"
        />
      </form>
    </Styles>
  );
};

export default CreateTodo;
