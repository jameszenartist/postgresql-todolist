import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import InputTodo from "./components/InputTodo.jsx";
import ListTodos from "./components/ListTodos.jsx";
import "./App.css";

function App() {
  const [mousePos, setMousePos] = useState({
    x: null,
    y: null,
  });

  useEffect(() => {
    console.log(`useEffect called`);
    const handleMouseMove = (event) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* <div>
        The mouse is at position{" "}
        <b>
          ({mousePos.x}, {mousePos.y})
        </b>
      </div> */}
      <div className="container">
        <motion.div
          className="cursor"
          animate={{
            x: mousePos.x - 80,
            y: mousePos.y - 80,
          }}
        >
          <div className="inner-circle"></div>
        </motion.div>

        <InputTodo />
        <ListTodos />
      </div>
    </>
  );
}

export default App;
