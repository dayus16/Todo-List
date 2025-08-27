import { useState, useEffect } from "react";

export default function Todo() {
  const [input, setInput] = useState({ name: "", done: false });
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    const savedTodos = localStorage.getItem("myTodoList");
    if (savedTodos) {
      setTodo(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("myTodoList", JSON.stringify(todo));
  }, [todo]);

  const completedTodo = todo.filter((input) => input.done).length;
  const totalTodo = todo.length;
  const sortTodo = todo.slice().sort((a, b) => +a.done - +b.done);

  const handleBtn = (e) => {
    e.preventDefault();
    if (!input.name.trim()) {
      alert("⚠ You must write something!");
      return;
    }
    setTodo([...todo, input]);
    setInput({ name: "", done: false });
  };

  const handleDelete = (itemDelete) => {
    setTodo(todo.filter((item) => item !== itemDelete));
  };

  const handleClick = (name) => {
    setTodo(
      todo.map((input) =>
        input.name === name ? { ...input, done: !input.done } : input
      )
    );
  };

  return (
    <div>
      <div className="lg:flex justify-center items-center bg-blue-950 h-20">
        <h1 className="text-4xl font-bold text-white">Todo List</h1>
      </div>
      <div>
        <form
          onSubmit={handleBtn}
          className="flex items-center w-2xl m-auto mt-10 px-4 gap-2"
        >
          <input
            className="md:w-full py-2 px-4 border border-solid border-blue-200 outline-none rounded"
            onChange={(e) => setInput({ name: e.target.value, done: false })}
            type="text"
            placeholder="Add your task"
            value={input.name}
          />
          <button className="bg-blue-950 text-white py-2 px-6 rounded cursor-pointer text-lg">
            Add
          </button>
        </form>

        <div className="m-auto lg:w-[700px] sm:w-full p-4 text-lg mt-10 space-y-4">
          {sortTodo.map((item) => (
            <h3
              className="flex justify-between items-center bg-white py-4 px-4 shadow-lg mb-2 rounded"
              key={item.name}
            >
              <span
                onClick={() => handleClick(item.name)}
                className={`cursor-pointer ${
                  item.done ? "line-through text-gray-500" : ""
                }`}
              >
                {item.name}
              </span>

              <button
                onClick={() => handleDelete(item)}
                className="bg-blue-950 py-2.5 px-5 rounded text-white cursor-pointer"
              >
                X
              </button>
            </h3>
          ))}
        </div>
      </div>
      <div className="lg:flex lg:justify-center lg:items-center gap-20 bg-blue-950 text-white py-5 text-2xl mt-10 text-center flex-col sm:flex-row">
        <h1>Completed Task: {completedTodo}</h1>
        <h1>Total Task: {totalTodo}</h1>
      </div>
    </div>
  );
}
