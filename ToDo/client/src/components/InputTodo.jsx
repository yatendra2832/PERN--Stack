import React, { useState } from "react";

const InputTodo = () => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch("http://localhost:3000/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      console.log(response);
      if (response.ok) {
        setDescription("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1 className="text-center text-primary ">PERN ToDo - App</h1>
      <form className="d-flex mt-5 container" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control "
          placeholder="Write your task here ..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-info">Add</button>
      </form>
    </>
  );
};

export default InputTodo;
