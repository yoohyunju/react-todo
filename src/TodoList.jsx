import { useState } from "react";
import "./App.css";

const ToDoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [editIdx, setEditIdx] = useState(null);
  const [editText, setEditText] = useState("");

  const addTodo = () => {
    setTodos([...todos, inputVal]);
    setInputVal("");
  };

  const startEditMode = (idx) => {
    setEditText(todos[idx]);
    setEditIdx(idx);
  };

  const editTodo = () => {
    const editedTodoList = todos.map((todo, idx) =>
      idx === editIdx ? editText : todo
    );

    setTodos(editedTodoList);
    setInputVal("");
    setEditIdx(null);
  };

  const deleteTodo = (idx) => {
    const newTodos = todos.filter((_, i) => i !== idx);
    setTodos(newTodos);
  };

  return (
    <div className="todo-list">
      <h1>ToDo List</h1>
      <div>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="할 일을 입력해 주세요."
        />
        <button onClick={addTodo}>추가</button>
      </div>
      <ul>
        {todos.map((todo, idx) => (
          <li key={idx}>
            {editIdx === idx ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={() => editTodo()}
              />
            ) : (
              <span>{todo}</span>
            )}
            <button onClick={() => startEditMode(idx)}>수정</button>
            <button onClick={() => deleteTodo(idx)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
