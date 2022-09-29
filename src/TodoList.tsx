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

// useForm interface
type IFormData = {
  errors: {
    email: {
      message: string;
    };
    firstName: {
      message: string;
    };
    lastName: {
      message: string;
    };
  };
  firstName: string;
  lastName: string;
  email: string;
  // password: string;
  // CheckingPassword: string;
};

// react-hook-form
const TodoList = () => {
  // register사용함으로써 onChange,value,useState대체가능
  // watch는 form입력값의 변화를 관찰하게하는 함수
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }, // useForm.formState.errors =const errors
  } = useForm<IFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "@naver.com",
      // password: '',
    },
  });
  const onValid = (data: any) => {
    console.log(data);
  };
  console.log("1", errors); //ex) email: {message:?,ref:input,type:'required'}
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("email", {
            required: "email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com emails allowed",
            },
          })}
          placeholder="email"
        />
        {/* email error */}
        <span>{errors?.email?.message}</span>
        <input
          {...register("firstName", {
            //!! 맨처음 아무것도없는상태로 입력하면 type이 required라서 메세지가 ~~is required이지만 form에입력하면 type이 minLength로바껴서 message도 your~~로 바뀜
            required: "firstName is required",
            minLength: {
              value: 5,
              message: "Your firstName is to short",
            },
          })}
          placeholder="firstName"
        />
        <span>{errors?.firstName?.message}</span>
        <input
          {...register("lastName", {
            required: "lastName is required!",
            minLength: {
              value: 8,
              message: "your lastName is to short",
            },
          })}
          placeholder="lastName"
        />
        <span>{errors?.lastName?.message}</span>
        <button>Add</button>/{" "}
      </form>
    </div>
  );
};

export default TodoList;
