import React from "react";
import { Provider } from "react-redux";
import { styled } from "styled-components";
import store from "./store";
import Header from "./components/Header";
import CreateTodo from "./components/CreateTodo";
import Todos from "./components/Todos";
import { AppProvider } from "./context.jsx";

const Main = styled.main`
  padding: 2rem;
  position: relative;
  bottom: 8rem;
`;

function App() {
  return (
    <>
      <Provider store={store}>
        <AppProvider>
          <Header />
          <Main>
            <CreateTodo />
            <Todos />
          </Main>
        </AppProvider>
      </Provider>
    </>
  );
}

export default App;
