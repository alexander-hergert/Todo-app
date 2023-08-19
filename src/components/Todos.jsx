import React, { useState, useEffect, useRef, useCallback } from "react";
import { styled } from "styled-components";
import Todo from "./Todo";
import { useSelector, useDispatch } from "react-redux";
import { getTodos, clearTodos, updateTodos } from "../slices/todosSlice";
import { useGlobalContext } from "../context";

/**************** STYLES ******************/

const Styles = styled.section`
  transition: all 1s;
  margin-bottom: 1rem;
  border-radius: 10px;
  background-color: white;

  article:first-of-type {
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  }

  article:last-of-type {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  article {
    transition: background-color 1s;
    display: flex;
    background-color: white;
    justify-content: space-between;
  }

  .items-left-clear {
    padding: 0 1rem;
    color: hsl(236, 9%, 61%);
  }
`;

const Filters = styled.div`
  transition: all 1s;
  display: flex;
  background-color: white;
  justify-content: center;
  border-radius: 5px;
  gap: 1.5rem;
  color: hsl(236, 9%, 61%);
`;

/**************** COMPONENT ******************/

const Todos = () => {
  const { isDarkMode } = useGlobalContext();
  const sectionRef = useRef();
  const articleRef = useRef();
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

  //DarkMode switch
  useEffect(() => {
    if (isDarkMode) {
      sectionRef.current.style.backgroundColor = "hsl(237, 14%, 26%)";
      articleRef.current.style.backgroundColor = "hsl(237, 14%, 26%)";
    } else {
      sectionRef.current.style.backgroundColor = "white";
      articleRef.current.style.backgroundColor = "white";
    }
  }, [isDarkMode]);

  return (
    <>
      <Styles>
        {filteredTodos.map((todo, index) => (
          <Todo
            key={todo.id}
            {...todo}
            index={index}
            moveListItem={moveFilteredTodosItem}
          />
        ))}
        <article className="items-left-clear" ref={articleRef}>
          <p>{itemsLeft} items left</p>
          <p onClick={handleClearCompleted}>Clear Completed</p>
        </article>
      </Styles>
      <Filters ref={sectionRef}>
        <p onClick={handleFilterAll}>All</p>
        <p onClick={handleFilterActive}>Active</p>
        <p onClick={handleFilterCompleted}>Completed</p>
      </Filters>
    </>
  );
};

export default Todos;
