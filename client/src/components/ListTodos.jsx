import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import EditTodo from "./EditTodo";

function ListTodos() {
  const [todos, setTodos] = useState([]);

  // delete to do func:
  const deleteTodo = async (id) => {
    try {
      await fetch(`/todos/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const getTodos = async () => {
    try {
      const response = await fetch("/todos");
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {todos.map((todo) => (
              <motion.tr
                key={todo.todo_id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.15 },
                }}
              >
                {/* <tr key={todo.todo_id}> */}
                <td>{todo.description}</td>
                <td>
                  <EditTodo todo={todo} />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTodo(todo.todo_id)}
                  >
                    Delete
                  </button>
                </td>
                {/* </tr> */}
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}
export default ListTodos;
