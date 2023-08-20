import React from "react";
import { Provider } from "react-redux";
import { styled } from "styled-components";
import store from "./store";
import Header from "./components/Header";
import CreateTodo from "./components/CreateTodo";
import Todos from "./components/Todos";
import { AppProvider } from "./context.jsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

/***************** STYLES **********************/

const Main = styled.main`
  padding: 2rem;
  position: relative;
  bottom: 9rem;
`;

/***************** COMPONENTS **********************/

function App() {
  return (
    <>
      <Provider store={store}>
        <AppProvider>
          <DndProvider backend={HTML5Backend}>
            <Header />
            <Main>
              <CreateTodo />
              <Todos />
            </Main>
          </DndProvider>
        </AppProvider>
      </Provider>
    </>
  );
}

export default App;
