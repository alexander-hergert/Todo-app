import React from "react";
import { Provider } from "react-redux";
import { styled } from "styled-components";
import store from "./store";
import Header from "./components/Header";
import CreateTodo from "./components/CreateTodo";
import Todos from "./components/Todos";
import FiltersMobile from "./components/FiltersMobile";

const Main = styled.main`
  padding: 2rem;
`;

function App() {
  return (
    <>
      <Provider store={store}>
        <Header />
        <Main>
          <CreateTodo />
          <Todos />
          <FiltersMobile />
        </Main>
      </Provider>
    </>
  );
}

export default App;
