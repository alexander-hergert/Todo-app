import React, { useEffect, useRef } from "react";
import { styled } from "styled-components";
import { useDispatch } from "react-redux";
import { checkTodo, removeTodo } from "../slices/todosSlice";
import { useGlobalContext } from "../context";
import { useDrag, useDrop } from "react-dnd";

/**************** STYLES ******************/

const Styles = styled.article`
  transition: background-color 1s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border-bottom: 1px solid hsl(236, 9%, 61%);
  padding: 0 1rem;

  div {
    display: flex;
    align-items: center;
  }

  input[type="checkbox"]:checked + p {
    color: hsl(234, 11%, 52%);
    text-decoration: line-through;
  }

  input[type="checkbox"] {
    transition: all 1s;
    appearance: none;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    border: 1px solid hsl(236, 9%, 61%);
    margin-right: 1rem;
    position: relative;

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
`;

/**************** COMPONENT ******************/

const Todo = ({ id, content, isCompleted, index, moveListItem }) => {
  const dispatch = useDispatch();
  const { isDarkMode } = useGlobalContext();
  const sectionRef = useRef();
  const inputRef = useRef();

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

  //DarkMode switch
  useEffect(() => {
    if (isDarkMode) {
      dragDropRef.current.style.backgroundColor = "hsl(237, 14%, 26%)";
      dragDropRef.current.style.borderColor = "hsl(235, 19%, 35%)";
      inputRef.current.style.borderColor = "hsl(235, 19%, 35%)";
    } else {
      dragDropRef.current.style.backgroundColor = "white";
      dragDropRef.current.style.borderColor = "hsl(241, 7%, 89%)";
      inputRef.current.style.borderColor = "hsl(241, 7%, 89%)";
    }
  }, [isDarkMode]);

  return (
    <Styles ref={dragDropRef}>
      <div>
        <input
          type="checkbox"
          name={id}
          id={id}
          defaultChecked={isCompleted}
          onChange={handleCheck}
          ref={inputRef}
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
