import React, { useState, useEffect, useCallback } from "react";
import { styled } from "styled-components";
import Todo from "./Todo";
import { useSelector, useDispatch } from "react-redux";
import { getTodos, clearTodos, updateTodos } from "../slices/todosSlice";
import { useGlobalContext } from "../context";

/**************** STYLES ******************/

const Styles = styled.section`
  --background: ${(props) => props.colors.background};
  --color: ${(props) => props.colors.color};
  border-radius: 10px;
  max-width: 40rem;
  margin: auto;
  box-shadow: 0 5px 25px hsl(234, 11%, 52%);

  article:first-of-type {
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  }

  article:last-of-type {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    padding: 0 1.5rem;

    p:last-of-type {
      cursor: pointer;
    }

    p:last-of-type:hover {
      color: var(--color);
    }
  }

  article {
    transition: background-color 1s;
    background-color: var(--background);
    display: flex;
    justify-content: space-between;
  }

  .items-left-clear {
    padding: 0 1rem;
    color: hsl(236, 9%, 61%);
  }
`;

const Filters = styled.div`
  --background: ${(props) => props.colors.background};
  --color: ${(props) => props.colors.color};
  z-index: 1;
  max-width: 40rem;
  margin: auto;
  transition: background-color 1s;
  display: flex;
  background-color: var(--background);
  justify-content: center;
  border-radius: 5px;
  gap: 1.5rem;
  color: hsl(236, 9%, 61%);
  margin-top: 1.5rem;
  box-shadow: 0 5px 25px hsl(234, 11%, 52%);

  p {
    cursor: pointer;
  }

  p:hover {
    color: var(--color);
  }

  @media screen and (min-width: 800px) {
    margin-top: 0;
    background-color: transparent;
    position: relative;
    width: 15rem;
    bottom: 3.5rem;
    box-shadow: none;
    p {
      z-index: 10;
    }
  }
`;

const Filter = styled.p`
  --font: ${(props) => props.colors.font};
  color: var(--font);
`;

/**************** COMPONENT ******************/

const Todos = () => {
  const { isDarkMode } = useGlobalContext();
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [filterTherm, setFilterTherm] = useState("ALL");
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [itemsLeft, setItemsLeft] = useState(0);

  //Drag and Drop
  const moveFilteredTodosItem = useCallback(
    (dragIndex, hoverIndex) => {
      const dragItem = filteredTodos[dragIndex];
      const hoverItem = filteredTodos[hoverIndex];
      // Swap places of dragItem and hoverItem in the filtered array
      const updatedTodos = [...filteredTodos];
      updatedTodos[dragIndex] = hoverItem;
      updatedTodos[hoverIndex] = dragItem;
      //sending whole array to update
      dispatch(updateTodos(updatedTodos));
    },
    [filteredTodos]
  );

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
    <>
      <Styles
        colors={
          isDarkMode
            ? { background: "hsl(237, 14%, 26%)", color: "hsl(0deg 0% 100%)" }
            : { background: "hsl(0deg 0% 100%)", color: "hsl(237, 14%, 26%)" }
        }
      >
        {filteredTodos.map((todo, index) => (
          <Todo
            key={todo.id}
            {...todo}
            index={index}
            moveListItem={moveFilteredTodosItem}
          />
        ))}
        <article className="items-left-clear">
          <p>{itemsLeft} items left</p>
          <p onClick={handleClearCompleted} role="button">
            Clear Completed
          </p>
        </article>
      </Styles>
      <Filters
        colors={
          isDarkMode
            ? { background: "hsl(237, 14%, 26%)", color: "hsl(0deg 0% 100%)" }
            : { background: "hsl(0deg 0% 100%)", color: "hsl(237, 14%, 26%)" }
        }
      >
        <Filter
          onClick={handleFilterAll}
          colors={
            filterTherm === "ALL"
              ? { font: "hsl(220, 98%, 61%)" }
              : { font: "hsl(236, 9%, 61%)" }
          }
          role="button"
        >
          All
        </Filter>
        <Filter
          colors={
            filterTherm === "ACTIVE"
              ? { font: "hsl(220, 98%, 61%)" }
              : { font: "hsl(236, 9%, 61%)" }
          }
          onClick={handleFilterActive}
          role="button"
        >
          Active
        </Filter>
        <Filter
          colors={
            filterTherm === "COMPLETED"
              ? { font: "hsl(220, 98%, 61%)" }
              : { font: "hsl(236, 9%, 61%)" }
          }
          onClick={handleFilterCompleted}
          role="button"
        >
          Completed
        </Filter>
      </Filters>
    </>
  );
};

export default Todos;
