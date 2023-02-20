import React from "react";
import { motion } from "framer-motion";
import InputTodo from "./components/InputTodo.jsx";
import ListTodos from "./components/ListTodos.jsx";
import "./App.css";

function App() {
  return (
    <>
      <motion.div className="container">
        <InputTodo />
        <ListTodos />
      </motion.div>
    </>
  );
}

export default App;
