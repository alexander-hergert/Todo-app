import React from "react";
import { styled } from "styled-components";
import { useDispatch } from "react-redux";
import { clearTodos } from "../slices/todosSlice";

/**************** STYLES ******************/

const Styles = styled.section`
  div {
    display: flex;
    background-color: white;
    justify-content: center;
    margin-bottom: 1rem;
  }
`;

/**************** COMPONENT ******************/

const FiltersMobile = () => {
  const dispatch = useDispatch();

  //store change
  const handleClearCompleted = () => {
    dispatch(clearTodos());
  };

  //not store change
  const handleFilterAll = () => {};

  const handleFilterActive = () => {};

  const handleFilterCompleted = () => {};

  return (
    <Styles>
      <div>
        <p>items left</p>
        <p onClick={handleClearCompleted}>Clear Completed</p>
      </div>
      <div>
        <p onClick={handleFilterAll}>All</p>
        <p onClick={handleFilterActive}>Active</p>
        <p onClick={handleFilterCompleted}>Completed</p>
      </div>
    </Styles>
  );
};

export default FiltersMobile;
