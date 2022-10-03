import { useRecoilState, useRecoilValue } from "recoil";

import CreateToDo from "./CreateToDo";

import { toDoSelector, toDoState, categoryState } from "../atoms";

import ToDo from "./ToDo";
import React from "react";
const TodoList = () => {
  // const toDos = useRecoilValue(toDoState);
  const [toDo, doing, done] = useRecoilValue(toDoSelector);
  // 현재의value,수정하는함수
  const [category, setCategory] = useRecoilState(categoryState);
  // select value감지
  const onInput = (e: React.FormEvent<HTMLSelectElement>) => {
    setCategory(e.currentTarget.value);
  };
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value="TO_DO">To Do</option>
        <option value="DOING">Doing</option>
        <option value="DONE">Done</option>
      </select>
      <CreateToDo />
      {category === "TO_DO" &&
        toDo.map((aToDo) => <ToDo key={aToDo.id} {...aToDo} />)}
      {category === "DOING" &&
        doing.map((aToDo) => <ToDo key={aToDo.id} {...aToDo} />)}
      {category === "DONE" &&
        done.map((aToDo) => <ToDo key={aToDo.id} {...aToDo} />)}
    </div>
  );
};

export default TodoList;
