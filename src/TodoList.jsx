import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: uuidv4(), text: "방청소", isChecked: false },
    { id: uuidv4(), text: "파스타 만들기", isChecked: false },
    { id: uuidv4(), text: "음악 틀기", isChecked: false },
  ]);
  const [todoText, setTodoText] = useState("");
  const [editTodoIdx, setEditTodoIdx] = useState(null);
  const [editTodoText, setEditTodoText] = useState("");

  const addTodo = () => {
    if (todoText === "") {
      alert("할 일을 입력해 주세요.");
      return;
    }
    const newTodo = { id: uuidv4(), text: todoText, isChecked: false };
    setTodos([...todos, newTodo]);
    setTodoText("");
  };

  const startEditMode = (idx) => {
    setEditTodoText(todos[idx]?.text);
    setEditTodoIdx(idx);
  };

  const editTodo = () => {
    const editedTodoList = todos.map((todo, idx) =>
      idx === editTodoIdx ? { ...todo, text: editTodoText } : todo
    );

    setTodos(editedTodoList);
    setTodoText("");
    setEditTodoIdx(null);
  };

  const deleteTodo = (idx) => {
    const updatedTodos = todos.filter((_, i) => i !== idx);
    setTodos(updatedTodos);
  };

  const toggleTodoChecked = (idx) => {
    const updatedTodos = todos.map((todo, i) =>
      i === idx ? { ...todo, isChecked: !todo.isChecked } : todo
    );

    // TODO: 추후 정렬 로직 변경
    const sortedTodos = [
      ...updatedTodos.filter((todo) => !todo.isChecked),
      ...updatedTodos.filter((todo) => todo.isChecked),
    ];

    setTodos(sortedTodos);
  };

  return (
    <div className="todo">
      <h1 className="todo__title">ToDo List</h1>
      <div className="todo__contents">
        <div className="todo__input-group">
          <input
            type="text"
            className="todo__input"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            placeholder="할 일을 입력해 주세요."
          />
          <button className="todo__btn todo__btn--add" onClick={addTodo}>
            ➕
          </button>
        </div>

        <ul className="todo__list">
          {todos.map((todo, idx) => (
            <li key={todo.id} className="todo__item">
              <input
                type="checkbox"
                checked={todo.isChecked}
                onChange={() => toggleTodoChecked(idx)}
              />

              {editTodoIdx === idx ? (
                <input
                  type="text"
                  className="todo__input--edit"
                  value={editTodoText}
                  onChange={(e) => setEditTodoText(e.target.value)}
                  // TODO: onBlur될 때 수정 버튼 disabled 풀리는 현상 추후 수정
                  onBlur={() => editTodo()}
                  onKeyDown={(e) => e.key === "Enter" && editTodo()}
                />
              ) : (
                <span className="todo__text">{todo.text}</span>
              )}

              <div className="todo__btn-group">
                <button
                  className="todo__btn todo__btn--edit"
                  onClick={() => startEditMode(idx)}
                  disabled={editTodoIdx === idx}
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

export default TodoList;
