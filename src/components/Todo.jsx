import React, { useRef } from "react";
import { styled } from "styled-components";
import { useDispatch } from "react-redux";
import { checkTodo, removeTodo } from "../slices/todosSlice";
import { useGlobalContext } from "../context";
import { useDrag, useDrop } from "react-dnd";

/**************** STYLES ******************/

const Styles = styled.article`
  --background: ${(props) => props.colors.background};
  --border: ${(props) => props.colors.border};
  transition: background-color 1s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--background);
  border-bottom: 1px solid var(--border);
  padding: 0 1rem;
  cursor: pointer;

  div {
    display: flex;
    align-items: center;
  }

  p {
    cursor: pointer;
  }

  input[type="checkbox"]:checked + p {
    color: hsl(234, 11%, 52%);
    text-decoration: line-through;
  }

  input[type="checkbox"] {
    appearance: none;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    border: 1px solid var(--border);
    margin-right: 1rem;
    position: relative;
    cursor: pointer;
    background-origin: border-box;
    background-clip: content-box, border-box;

    &:hover {
      border: double 1px transparent;
      background-image: linear-gradient(var(--background), var(--background)),
        linear-gradient(130deg, hsl(192, 100%, 67%), hsl(280, 87%, 65%));
    }

    &:checked {
      background: linear-gradient(
        130deg,
        hsl(192, 100%, 67%),
        hsl(280, 87%, 65%)
      );
    }

    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 60%;
      height: 60%;
      background-image: url("/images/icon-check.svg");
      background-size: 100% 100%;
      display: none;
    }
  }

  input[type="checkbox"]:checked::before {
    display: block;
  }

  @media screen and (min-width: 800px) {
    input[type="image"] {
      display: none;
    }

    &:hover input[type="image"] {
      display: block;
    }
  }
`;

/**************** COMPONENT ******************/

const Todo = ({ id, content, isCompleted, index, moveListItem }) => {
  const dispatch = useDispatch();
  const { isDarkMode } = useGlobalContext();

  const handleCheck = () => {
    dispatch(checkTodo(id));
  };

  const handleDelete = () => {
    dispatch(removeTodo(id));
  };

  //Drag and Drop
  // useDrag - the list item is draggable
  const [{ isDragging }, dragRef] = useDrag({
    type: "item",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // useDrop - the list item is also a drop area
  const [spec, dropRef] = useDrop({
    accept: "item",
    hover: (item, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;
      // if dragging down, continue only when hover is smaller than middle Y
      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
      // if dragging up, continue only when hover is bigger than middle Y
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;
      moveListItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  // Join the 2 refs together into one (both draggable and can be dropped on)
  const ref = useRef(null);
  const dragDropRef = dragRef(dropRef(ref));

  return (
    <Styles
      ref={dragDropRef}
      colors={
        isDarkMode
          ? { background: "hsl(237, 14%, 26%)", border: "hsl(235, 19%, 35%)" }
          : { background: "hsl(0deg 0% 100%)", border: "hsl(241, 7%, 89%)" }
      }
    >
      <div>
        <input
          type="checkbox"
          name={id}
          id={id}
          defaultChecked={isCompleted}
          onChange={handleCheck}
        />
        <p>{content}</p>
      </div>
      <input
        type="image"
        src="images/icon-cross.svg"
        alt="icon-delete"
        onClick={handleDelete}
      />
    </Styles>
  );
};

export default Todo;
