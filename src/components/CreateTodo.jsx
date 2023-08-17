import React, { useState } from "react";
import { styled } from "styled-components";
import { useDispatch } from "react-redux";
import { addTodo } from "../slices/todosSlice";
import { nanoid } from "nanoid";

/**************** STYLES ******************/

const Styles = styled.section`
  background-color: white;
  margin-bottom: 1rem;
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
        <img src="/images/icon-check.svg" alt="icon-check" />
        <input
          type="text"
          name="newTodo"
          id="newTodo"
          onChange={handleChange}
        />
      </form>
    </Styles>
  );
};

export default CreateTodo;
