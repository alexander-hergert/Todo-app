import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import Todo from "./Todo";
import { useSelector, useDispatch } from "react-redux";
import { getTodos, clearTodos } from "../slices/todosSlice";

/**************** STYLES ******************/

const Styles = styled.section``;

const Filters = styled.div`
  div {
    display: flex;
    background-color: white;
    justify-content: center;
    margin-bottom: 1rem;
  }
`;

/**************** COMPONENT ******************/

const Todos = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [filterTherm, setFilterTherm] = useState("ALL");
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [itemsLeft, setItemsLeft] = useState(0);

  //store change
  const handleClearCompleted = () => {
    dispatch(clearTodos());
  };

  //not store change
  const handleFilterAll = () => {
    setFilterTherm("ALL");
  };

  const handleFilterActive = () => {
    setFilterTherm("ACTIVE");
  };

  const handleFilterCompleted = () => {
    setFilterTherm("COMPLETED");
  };

  //Load localstorage
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos);
      dispatch(getTodos(parsedTodos));
    }
  }, []);

  //Filters logic
  useEffect(() => {
    if (filterTherm === "ALL") {
      const filteredTodos = todos.filter((todo) => todo);
      setFilteredTodos(filteredTodos);
    } else if (filterTherm === "ACTIVE") {
      const filteredTodos = todos.filter((todo) => todo.isCompleted === false);
      setFilteredTodos(filteredTodos);
    } else if (filterTherm === "COMPLETED") {
      const filteredTodos = todos.filter((todo) => todo.isCompleted === true);
      setFilteredTodos(filteredTodos);
    }
  }, [filterTherm, todos]);

  //Check Items Left
  useEffect(() => {
    let counter = 0;
    todos.forEach((todo) => {
      if (todo.isCompleted === false) {
        counter++;
      }
    });
    setItemsLeft(counter);
  }, [todos]);

  return (
    <Styles>
      {filteredTodos.map((todo) => (
        <Todo key={todo.id} {...todo} />
      ))}
      <Filters>
        <div>
          <p>{itemsLeft} items left</p>
          <p onClick={handleClearCompleted}>Clear Completed</p>
        </div>
        <div>
          <p onClick={handleFilterAll}>All</p>
          <p onClick={handleFilterActive}>Active</p>
          <p onClick={handleFilterCompleted}>Completed</p>
        </div>
      </Filters>
    </Styles>
  );
};

export default Todos;
