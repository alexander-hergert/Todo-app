import React, { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { useGlobalContext } from "../context";
/**************** STYLES ******************/

const Styles = styled.header`
  display: flex;
  align-items: start;
  justify-content: space-between;
  height: 25vh;
  width: 100%;
  background: url("/images/bg-mobile-light.jpg") center/cover no-repeat;
  padding: 2rem;
  transition: all 1s;

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
  const mobileWidth = 800;
  const { isDarkMode, setIsDarkMode } = useGlobalContext();
  const backRef = useRef();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  console.log(windowWidth);
  const handleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  //DarkMode switch
  useEffect(() => {
    if (isDarkMode) {
      document.body.style.backgroundColor = "hsl(235, 21%, 11%)";
      //document.body.style.color = "white";
      //Depending on screenwidth
      if (windowWidth < mobileWidth) {
        backRef.current.style.background =
          'url("/images/bg-mobile-dark.jpg") center/cover no-repeat';
      } else {
        backRef.current.style.background =
          'url("/images/bg-desktop-dark.jpg") center/cover no-repeat';
      }
    } else {
      document.body.style.backgroundColor = "hsl(233, 11%, 84%)";
      //Depending on screenwidth
      if (windowWidth < mobileWidth) {
        backRef.current.style.background =
          'url("/images/bg-mobile-light.jpg") center/cover no-repeat';
      } else {
        backRef.current.style.background = backRef.current.style.background =
          'url("/images/bg-desktop-light.jpg") center/cover no-repeat';
      }
    }
  }, [isDarkMode, windowWidth]);

  //Handle the background on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Styles ref={backRef}>
      <h1>TODO</h1>
      {!isDarkMode ? (
        <input
          type="image"
          src="images/icon-moon.svg"
          alt="icon-moon"
          onClick={handleDarkMode}
        />
      ) : (
        <input
          type="image"
          src="images/icon-sun.svg"
          alt="icon-sun"
          onClick={handleDarkMode}
        />
      )}
    </Styles>
  );
};

export default Header;
