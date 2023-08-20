import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function EditTodo({ todo }) {
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState(todo.description);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      await fetch(`/todos/${todo.todo_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <Button
        type="button"
        variant="primary btn btn-warning"
        onClick={handleShow}
      >
        Edit
      </Button>

      <Modal
        className="modal"
        id={`id${todo.todo_id}`}
        onClick={() => setDescription(todo.description)}
        show={show}
        onHide={handleClose}
      >
        <Modal.Header
          closeButton
          type="button"
          className="close"
          data-dismiss="modal"
          onClick={() => setDescription(todo.description)}
        >
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="button"
            variant="secondary btn btn-warning"
            onClick={(e) => {
              updateDescription(e);
              handleClose();
            }}
          >
            Edit
          </Button>

          <Button
            type="button"
            variant="primary btn btn-danger"
            onClick={() => {
              setDescription(todo.description);
              handleClose();
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditTodo;
