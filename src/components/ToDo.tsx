import { IToDo } from "../atoms";

const ToDo = ({ text }: IToDo) => {
  return (
    <li>
      {text}
      <button>Done</button>
      <button>To Do</button>
      <button>Doing</button>
    </li>
  );
};

export default ToDo;
