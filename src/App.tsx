import { useEffect, useState } from "react";
import "./App.css";
import TodoService from "./api/todo-service/todo.service";
import { ITodoResult } from "./Types/Types";

function App() {
  const initialEditTodo = {
    completed: false,
    id: 0,
    title: "",
    userId: 0,
  };
  const todoService = new TodoService();
  const [todos, setTodos] = useState<Array<ITodoResult>>([]);
  const [editTodo, setEditTodo] = useState<ITodoResult>(initialEditTodo);
  const [isEdit, setIsEdit] = useState(false);

  async function getAllTodos() {
    const result = await todoService.todoGet();
    setTodos(result);
  }
  useEffect(() => {
    getAllTodos();
  }, []);

  const handleDelete = async (id: number) => {
    await todoService.todoDelete(id);
    getAllTodos();
    setIsEdit(false);
    setEditTodo(initialEditTodo);
  };

  const handleEdit = (id: number) => {
    setIsEdit(true);
    const data = todos.filter((todoId) => id === todoId.id);
    setEditTodo(data[0]);
  };
  const handleEditSubmit = async () => {
    if (isEdit) {
      if (editTodo.id !== 0) {
        await todoService.todoEdit(editTodo);
      }
      setIsEdit(false);
    } else {
      await todoService.todoAdd(editTodo);
    }
    getAllTodos();
    setEditTodo(initialEditTodo);
  };
  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        alignItems: "flex-start",
        padding: "10px",
      }}
    >
      {todos.map(({ completed, id, title, userId }) => (
        <div
          style={{
            backgroundColor: `${completed ? "lime" : "red"}`,
            padding: "4px",
            borderRadius: "5px",
          }}
          key={id}
        >
          {id}
          {"."} {title}
          <button onClick={() => handleEdit(id)}>EDIT</button>
          <button onClick={() => handleDelete(id)}>DELETE</button>
        </div>
      ))}

      <div>
        <input
          type="text"
          value={editTodo?.title}
          onChange={(e) =>
            isEdit
              ? setEditTodo((pre: ITodoResult) => ({
                  ...pre,
                  title: e.target.value,
                }))
              : setEditTodo({
                  completed: false,
                  id: todos[todos.length - 1].id + 1,
                  title: e.target.value,
                  userId: todos[todos.length - 1].userId + 1,
                })
          }
        />{" "}
        <button onClick={handleEditSubmit}>{isEdit ? "Edit" : "Add"}</button>
      </div>
    </div>
  );
}

export default App;
