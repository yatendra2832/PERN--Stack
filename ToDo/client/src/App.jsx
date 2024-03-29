import React from "react";
import "./App.css";
import ListTodo from "./components/ListTodo";
import EditTodo from "./components/EditTodo";
import InputTodo from "./components/InputTodo";
function App() {
  return (
    <>
      <InputTodo />
      <EditTodo />
      <ListTodo />
    </>
  );
}

export default App;
