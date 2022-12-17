import InputTodo from "./components/InputTodo.jsx";
import ListTodos from "./components/ListTodos.jsx";
import "./App.css";

function App() {
  return (
    <>
      <div className="container">
        <InputTodo />
        <ListTodos />
      </div>
    </>
  );
}

export default App;
