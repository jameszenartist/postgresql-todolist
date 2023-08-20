import { useState } from "react";

function InputTodo() {
  const [description, setDescription] = useState("");

  const updateText = (event) => {
    setDescription(event.target.value);
  };
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      await fetch("/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div>
      <h1 className="text-center mt-5">Stuff To Do: </h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={updateText}
        />
        <button className="btn btn-success">Add</button>
      </form>
    </div>
  );
}
export default InputTodo;
