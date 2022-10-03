import React from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";

import { toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

const CreateToDo = () => {
  const setToDos = useSetRecoilState(toDoState);

  const { register, handleSubmit, setValue } = useForm<IForm>();

  const onSubmit = ({ toDo }: IForm) => {
    setToDos((prev) => [
      { text: toDo, category: "TO_DO", id: Date.now() },
      ...prev,
    ]);
    setValue("toDo", "");
  };
  // handleSubmit은 form data를 받음(유효성에성공하면)
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("toDo", {
          required: "Please Write a To Do!",
        })}
        placeholder="Write a to do"
      />
      <button>Add</button>
    </form>
  );
};

export default CreateToDo;
