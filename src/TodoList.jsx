import { useState } from "react";
import "./App.css";

const ToDoList = () => {
  const [todos, setTodos] = useState(["방청소", "파스타 만들기", "음악 틀기"]);
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
    <div className="todo">
      <h1 className="todo__title">ToDo List</h1>
      <div className="todo__contents">
        <div className="todo__input-group">
          <input
            type="text"
            className="todo__input"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="할 일을 입력해 주세요."
          />
          <button className="todo__btn todo__btn--add" onClick={addTodo}>
            ➕
          </button>
        </div>
        <ul className="todo__list">
          {todos.map((todo, idx) => (
            <li key={idx} className="todo__item">
              {editIdx === idx ? (
                <input
                  type="text"
                  className="todo__input--edit"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onBlur={() => editTodo()}
                />
              ) : (
                <span className="todo__text">{todo}</span>
              )}

              <div className="todo__btn-group">
                <button
                  className="todo__btn todo__btn--edit"
                  onClick={() => startEditMode(idx)}
                >
                  ✏️
                </button>
                <button
                  className="todo__btn todo__btn--delete"
                  onClick={() => deleteTodo(idx)}
                >
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ToDoList;
