import React from "react";
import { styled } from "styled-components";

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
  return (
    <Styles>
      <div>
        <p>items left</p>
        <p>Clear Completed</p>
      </div>
      <div>
        <p>All</p>
        <p>Active</p>
        <p>Completed</p>
      </div>
    </Styles>
  );
};

export default FiltersMobile;
