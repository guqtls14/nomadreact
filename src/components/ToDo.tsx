import React from "react";
import { useSetRecoilState } from "recoil";
import { IToDo } from "../atoms";
import { toDoState } from "../atoms";

[
  {
    text: "bvn",
    category: "TO_DO",
    id: 1664802034846,
  },
  {
    text: "fgh",
    category: "TO_DO",
    id: 1664802034452,
  },
  {
    text: "gfh",
    category: "TO_DO",
    id: 1664802034004,
  },
  {
    text: "bnmmbn",
    category: "TO_DO",
    id: 1664801988807,
  },
  {
    text: "hgj",
    category: "TO_DO",
    id: 1664801987409,
  },
];

const ToDo = ({ text, category, id }: IToDo) => {
  const setToDos = useSetRecoilState(toDoState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    // useSetRecoilState는 useState의 setter와유사, setToDos의 콜백함수는 useState의 value값처럼 전의 data전체를 불러옴

    // setToDos((oldToDos) => {
    //   console.log("old: ", oldToDos);
    //   const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
    //   const oldToDo = oldToDos[targetIndex];

    //   const newToDo = { text, id, category: name as any };
    //   return [
    //     ...oldToDos.slice(0, targetIndex),
    //     newToDo,
    //     ...oldToDos.slice(targetIndex + 1),
    //   ];
    // });

    setToDos((prevToDos) => {
      return prevToDos.map((toDo) =>
        toDo.id === id ? { ...toDo, category: name as any } : toDo
      );
    });
  };

  return (
    <li>
      {text}
      {category !== "DOING" && (
        <button name="DOING" onClick={onClick}>
          Done
        </button>
      )}
      {category !== "TO_DO" && (
        <button name="TO_DO" onClick={onClick}>
          TO_DO
        </button>
      )}
      {category !== "DONE" && (
        <button name="DONE" onClick={onClick}>
          DONE
        </button>
      )}
    </li>
  );
};

export default ToDo;
