import { IToDo } from "../atoms";

const ToDo = ({ text, category }: IToDo) => {
  const onClick = (newCategory: IToDo["category"]) => {
    console.log("i go m ", newCategory);
  };

  return (
    <li>
      {text}
      {category !== "DOING" && (
        <button onClick={() => onClick("DOING")}>Done</button>
      )}
      {category !== "TO_DO" && (
        <button onClick={() => onClick("TO_DO")}>TO_DO</button>
      )}
      {category !== "DONE" && (
        <button onClick={() => onClick("DONE")}>DONE</button>
      )}
    </li>
  );
};

export default ToDo;
