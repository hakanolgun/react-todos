import "./App.css";
import { useState, useEffect, useCallback } from "react";

function App() {
  const [todoList, setTodoList] = useState([
    { name: "Learn Javascript", isCompleted: false, edit: false },
    { name: "Learn React", isCompleted: false, edit: false },
  ]);
  const [inputvalue, setInputValue] = useState("");
  const tick = document.getElementsByClassName("toggle");
  const liler = document.getElementsByClassName("myli");
  const filterbtns = document.getElementsByClassName("filterbtn");
  const [editvalue, seteditvalue] = useState("");

  const handleActive = (item) => {
    setTodoList(
      todoList.map((newitem) =>
        newitem === item
          ? { ...newitem, isCompleted: !newitem.isCompleted }
          : newitem
      )
    );
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setTodoList([
      ...todoList,
      {
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
    const hepsiCompletedMi = todoList.every((item) => item.isCompleted);
    const hepsiFalseMu = todoList.every((item) => !item.isCompleted);

    if (hepsiCompletedMi) {
      setTodoList(
        todoList.map((item) =>
          item
            ? { ...item, isCompleted: false }
            : { ...item, isCompleted: true }
        )
      );
      for (let i = 0; i < tick.length; i++) {
        tick[i].checked = false;
      }
    } else if (hepsiFalseMu) {
      setTodoList(
        todoList.map((item) =>
          item
            ? { ...item, isCompleted: true }
            : { ...item, isCompleted: false }
        )
      );
      for (let i = 0; i < tick.length; i++) {
        tick[i].checked = true;
      }
    } else {
      setTodoList(
        todoList.map((item) =>
          item
            ? { ...item, isCompleted: true }
            : { ...item, isCompleted: false }
        )
      );
      for (let i = 0; i < tick.length; i++) {
        if (tick[i].checked === false) {
          tick[i].checked = true;
        }
      }
    }
  };

  const handleFilterAll = (e) => {
    //tıklanan butona css veriyorum, seçili olan görülsün diye
    for (let z = 0; z < filterbtns.length; z++) {
      filterbtns[z].classList.remove("selected");
    }
    e.target.classList.add("selected");

    //class'ı gizli olan tüm li elementlerini tekrar görünür yapıyorum
    for (let i = 0; i < liler.length; i++) {
      liler[i].classList.remove("hidden");
    }
  };
  const handleFilterActive = (e) => {
    for (let z = 0; z < filterbtns.length; z++) {
      filterbtns[z].classList.remove("selected");
    }
    e.target.classList.add("selected");

    //completed olan lileri gizliyorum, diğerlerini görünür yapıyorum
    for (let i = 0; i < liler.length; i++) {
      if (liler[i].classList.contains("completed")) {
        liler[i].classList.add("hidden");
      } else {
        liler[i].classList.remove("hidden");
      }
    }
  };
  const handleFilterCompleted = (e) => {
    for (let z = 0; z < filterbtns.length; z++) {
      filterbtns[z].classList.remove("selected");
    }
    e.target.classList.add("selected");

    //completed olan lileri görünür yapıp, diğerlerini gizliyorum
    for (let i = 0; i < liler.length; i++) {
      if (!liler[i].classList.contains("completed")) {
        liler[i].classList.add("hidden");
      } else {
        liler[i].classList.remove("hidden");
      }
    }
  };

  const handleClearCompleted = () => {
    setTodoList(todoList.filter((item) => !item.isCompleted));
  };

  const showEditInput = (e, item) => {
    e.target.nextElementSibling.nextElementSibling.classList.remove(
      "passiveinput"
    );
    e.target.nextElementSibling.nextElementSibling.classList.add("activeinput");
  };

  useEffect(() => {
    filterbtns[0].click();
  }, [filterbtns]);

  // const editEnter = useCallback((e, item) => {
  //   if (e.keyCode === 13) {
  //     item.name = editvalue;
  //   }
  // }, []);

  const editEnter = (e, item) => {
    if (e.keyCode === 13) {
      console.log("enterlandi");
      item.name = editvalue;
      seteditvalue("");
      e.target.classList.remove("activeinput");
      e.target.classList.add("passiveinput");
    }
  };

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
          />
          <form onSubmit={handleSubmit}>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              value={inputvalue}
              autofocus
              onChange={(e) => handleInputChange(e)}
            />
          </form>
        </header>

        <section className="main">
          <ul className="todo-list">
            {todoList.map((item, key) => (
              <li
                className={item.isCompleted ? "completed myli" : "myli"}
                key={key}
              >
                <div className="view">
                  <input
                    className="toggle"
                    type="checkbox"
                    onClick={() => handleActive(item)}
                  />
                  <label onClick={(e) => showEditInput(e, item)}>
                    {item.name}
                  </label>
                  <button
                    className="destroy"
                    onClick={() => deleteItem(item)}
                  ></button>
                  <input
                    className="passiveinput"
                    type="text"
                    placeholder="Edit todo..."
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
              onClick={(e) => handleFilterAll(e)}
              className="filterbtn allbtn"
            >
              All
            </button>

            <button
              onClick={(e) => handleFilterActive(e)}
              className="filterbtn"
            >
              Active
            </button>

            <button
              onClick={(e) => handleFilterCompleted(e)}
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
