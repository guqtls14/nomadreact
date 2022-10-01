import { useRecoilValue } from "recoil";

import CreateToDo from "./CreateToDo";

import { toDoState } from "../atoms";

import ToDo from "./ToDo";
const TodoList = () => {
  // 밑에 2개를 합친것
  const toDos = useRecoilValue(toDoState);

  return (
    <div>
      <h1>To Dos</h1>
      <hr />

      <CreateToDo />
      <ul>
        {toDos.map((d) => (
          <ToDo {...d} key={d.id} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
