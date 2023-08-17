import { nanoid } from "nanoid";

export const initialState = [
  {
    id: nanoid(),
    content: "Complete online JavaScript course",
    isCompleted: true,
  },
  {
    id: nanoid(),
    content: "Jog around the park 3x",
    isCompleted: false,
  },
  {
    id: nanoid(),
    content: "10 minutes meditation",
    isCompleted: false,
  },
  {
    id: nanoid(),
    content: "Read for 1 hour",
    isCompleted: false,
  },
  {
    id: nanoid(),
    content: "Pick up groceries",
    isCompleted: false,
  },
  {
    id: nanoid(),
    content: "Complete Todo App on Frontend Mentor",
    isCompleted: false,
  },
];
