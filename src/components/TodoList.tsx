import React, { useState } from "react";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { useForm } from "react-hook-form";

const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

interface IForm {
  toDo: string;
}

// toDos interface
interface IToDo {
  text: string;
  category: "TO_DO" | "DOING" | "DONE";
  id: number;
}

const TodoList = () => {
  // 밑에 2개를 합친것
  const [toDos, setToDos] = useRecoilState(toDoState);
  // recoil state접근
  // const value = useRecoilValue(toDoState);
  // // state 상태변화
  // const modFn = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onSubmit = ({ toDo }: IForm) => {
    // data.toDo
    console.log("add to do ", toDo);

    setToDos((prev) => [
      { text: toDo, category: "TO_DO", id: Date.now() },
      ...prev,
    ]);
    setValue("toDo", "");
  };
  console.log("toDos: ", toDos);
  return (
    <div>
      <h1>To DOs</h1>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("toDo", {
            required: "Please Write a To Do!",
          })}
          placeholder="Write a to do"
        />
        <button>Add</button>
      </form>
      <ul>
        {toDos.map((d) => (
          <li key={d.id}>{d.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
