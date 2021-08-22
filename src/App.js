import "./App.css";
import { useState, useEffect, useMemo } from "react";

function App() {
  const [todoList, setTodoList] = useState([
    {
      id: 1,
      name: "Learn Javascript",
      isCompleted: false,
      edit: false,
    },
    { id: 2, name: "Learn React", isCompleted: false, edit: false },
  ]);
  const [inputvalue, setInputValue] = useState("");
  const filterbtns = document.getElementsByClassName("filterbtn");
  const [editvalue, seteditvalue] = useState("");

  const [filter, setFilter] = useState(null);
  const [checkAll, setCheckAll] = useState(false);

  const handleActive = (id) => {
    setTodoList(
      todoList.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodoList([
      ...todoList,
      {
        id: Date.now(),
        isCompleted: false,
        name: inputvalue,
        edit: false,
      },
    ]);

    setInputValue("");
  };

  const deleteItem = (item) => {
    setTodoList(todoList.filter((items) => items !== item));
  };

  const handleAllActive = () => {
    const yeniListe = [...todoList];
    yeniListe.forEach((item) => {
      item.isCompleted = !checkAll;
    });
    setTodoList(yeniListe);
    setCheckAll(!checkAll);
  };

  const filteredData = useMemo(() => {
    switch (filter) {
      case "active":
        return todoList.filter((item) => !item.isCompleted);
      case "completed":
        return todoList.filter((item) => item.isCompleted);
      default:
        return todoList;
    }
  }, [todoList, filter]);

  const handleClearCompleted = () => {
    setTodoList(todoList.filter((item) => !item.isCompleted));
  };

  const showEditInput = (item) => {
    item.edit ? (item.edit = false) : (item.edit = true);
    setTodoList(todoList.filter((item) => item));
  };
  const editEnter = (e, item) => {
    if (e.keyCode === 13) {
      item.name = editvalue;
      seteditvalue("");
      item.edit = false;
    }
  };
  useEffect(() => {
    filterbtns[0].click();
  }, [filterbtns]);

  return (
    <div className="App">
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            className="toggle-all"
            title="Mark all as completed"
            type="checkbox"
            onClick={handleAllActive}
            checked={checkAll}
          />
          <form onSubmit={handleSubmit}>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              value={inputvalue}
              autofocus
              onChange={(e) => setInputValue(e.target.value)}
            />
          </form>
        </header>

        <section className="main">
          <ul className="todo-list">
            {filteredData.map((item, key) => (
              <li
                className={item.isCompleted ? "completed myli" : "myli"}
                key={key}
              >
                <div className="view">
                  <input
                    id={item.id}
                    className="toggle"
                    type="checkbox"
                    onClick={() => handleActive(item.id)}
                    checked={item.isCompleted}
                  />
                  <label onClick={() => showEditInput(item)}>{item.name}</label>
                  <button
                    className="destroy"
                    onClick={() => deleteItem(item)}
                  ></button>
                  <input
                    className={
                      item.edit === false ? "passiveinput" : "activeinput"
                    }
                    type="text"
                    onChange={(e) => seteditvalue(e.target.value)}
                    onKeyDown={(e) => editEnter(e, item)}
                    autoFocus
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <footer className="footer">
          <span className="todo-count">
            <strong>{todoList.length}</strong>
            &#x200B; items left
          </span>

          <div className="filters">
            <button
              onClick={() => setFilter(null)}
              className="filterbtn allbtn"
            >
              All
            </button>

            <button onClick={() => setFilter("active")} className="filterbtn">
              Active
            </button>

            <button
              onClick={() => setFilter("completed")}
              className="filterbtn"
            >
              Completed
            </button>
          </div>

          <button className="clear-completed" onClick={handleClearCompleted}>
            Clear completed
          </button>
        </footer>
      </section>
    </div>
  );
}

export default App;
