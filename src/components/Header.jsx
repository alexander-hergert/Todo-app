import React from "react";
import { styled } from "styled-components";
/**************** STYLES ******************/

const Styles = styled.header`
  display: flex;
  align-items: start;
  justify-content: space-between;
  height: 25vh;
  width: 100%;
  background: url("/images/bg-mobile-light.jpg") center/cover no-repeat;
  padding: 2rem;

  h1 {
    color: white;
    letter-spacing: 1rem;
    margin: 0;
  }

  @media screen and (min-width: 800px) {
    background: url("/images/bg-desktop-light.jpg") center/cover no-repeat;
  }
`;

/**************** COMPONENT ******************/

const Header = () => {
  const handleDarkMode = () => {};

  return (
    <Styles>
      <h1>TODO</h1>
      <input
        type="image"
        src="images/icon-moon.svg"
        alt="icon-moon"
        onClick={handleDarkMode}
      />
    </Styles>
  );
};

export default Header;
