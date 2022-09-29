import React, { useState } from "react";

import { useForm } from "react-hook-form";

// const TodoList = () => {
//   const [toDo, setToDo] = useState();
//   const onChange = (e: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = e;
//     setToDo(value);
//   };

//   const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log(toDo);
//   };
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input onChange={onChange} value={toDo} placeholder="Write a to do" />
//         <button>Add</button>
//       </form>
//     </div>
//   );
// };

// react-hook-form
const TodoList = () => {
  // register사용함으로써 onChange,value,useState대체가능
  // watch는 form입력값의 변화를 관찰하게하는 함수
  const { register, watch, handleSubmit, formState } = useForm();
  const onValid = (data: any) => {
    console.log(data);
  };
  console.log(formState.errors);
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input {...register("Email", { required: true })} placeholder="Email" />
        <input
          {...register("Firstname", {
            required: true,
            minLength: {
              value: 5,
              message: "Your Firstname is to short",
            },
          })}
          placeholder="Firstname"
        />
        <input
          {...register("Lastname", { required: "Lastname is required!" })}
          placeholder="Lastname"
        />
        <button>Add</button>/{" "}
      </form>
    </div>
  );
};

export default TodoList;
