import React from "react";
import { styled } from "styled-components";
/**************** STYLES ******************/

const Styles = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 25vh;
  width: 100%;
  background: url("/images/bg-mobile-light.jpg") center/cover no-repeat;
  padding: 2rem;
`;

/**************** COMPONENT ******************/

const Header = () => {
  return (
    <Styles>
      <h1>TODO</h1>
      <input type="image" src="images/icon-moon.svg" alt="icon-moon" />
    </Styles>
  );
};

export default Header;
