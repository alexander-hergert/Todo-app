import React, { useState } from "react";
import { styled } from "styled-components";
import { useDispatch } from "react-redux";
import { addTodo } from "../slices/todosSlice";
import { nanoid } from "nanoid";

/**************** STYLES ******************/

const Styles = styled.section`
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

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleCreateTodo = (e) => {
    e.preventDefault();
    const payload = { id: nanoid(), content: text, isCompleted: false };
    dispatch(addTodo(payload));
  };

  return (
    <Styles>
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
