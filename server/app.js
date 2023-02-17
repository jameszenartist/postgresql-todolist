const path = require("path");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const cors = require("cors");
const pool = require("./db.js");
// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config();
// }
const port = process.env.PORT || 3000;
process.env.NODE_ENV = port == 3000 ? "development" : "production";
console.log(`the port is: ${process.env.PORT}`);
console.log(`the environment is: ${process.env.NODE_ENV}`);

const ReactPath = path.join(__dirname, "../client/build");
// middleware
app.use(express.static(ReactPath));
app.use(cors());
app.use(express.json()); // req.body()
// ROUTES

//create a todo
app.post("/todos", async (req, res) => {
  try {
    // description coming from client side:
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query(`SELECT * FROM todo`);
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    // shows id:
    // console.log(req.params);
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

// delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json("Todo was deleted!");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
