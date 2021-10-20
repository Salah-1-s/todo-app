let allTodos = {};
let clearedTodos = {};
let allTodosArray = [];
let completedTodos = [];
let remainigTodos = [];

const form = document.getElementById("form");
const todoDiv = document.getElementById("todos");
const completed = document.getElementById("completed");
const remaining = document.getElementById("remaining");
const allBtn = document.getElementById("allTodosBtn");
const completedBtn = document.getElementById("completedTodosBtn");
const remainigBtn = document.getElementById("remainingTodosBtn");
const clearBtn = document.getElementById("clear");
const warning = document.getElementById("warning");
const itemsLeftDiv = document.getElementById("items-left");
const toggleMode = document.getElementById("toggle-mode");
const buttons = document.querySelectorAll("button")

toggleMode.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
  toggleMode.setAttribute(
    "src",
    `${
      toggleMode.getAttribute("src") == "images/icon-sun.svg"
        ? "images/icon-moon.svg"
        : "images/icon-sun.svg"
    }`
  );
  let themedDivs = document.querySelectorAll(".main-div-dark, .main-div-light");
  for (const el of themedDivs) {
    el.classList.toggle("main-div-dark");
    el.classList.toggle("main-div-light");
  }
  for (const button of buttons) {
    button.classList.toggle("button-dark")
    button.classList.toggle("button-light")
  }
  itemsLeftDiv.classList.toggle("items-left-dark")
  itemsLeftDiv.classList.toggle("items-left-light")
});

allBtn.addEventListener("click", () => {
  todoDiv.classList.replace("hidden", "visible");
  completed.classList.replace("visible", "hidden");
  remaining.classList.replace("visible", "hidden");
  allBtn.classList.add("button-active");
  completedBtn.classList.remove("button-active");
  remainigBtn.classList.remove("button-active");
  formatTodosArray();
});

completedBtn.addEventListener("click", () => {
  todoDiv.classList.replace("visible", "hidden");
  completed.classList.replace("hidden", "visible");
  remaining.classList.replace("visible", "hidden");
  allBtn.classList.remove("button-active");
  completedBtn.classList.add("button-active");
  remainigBtn.classList.remove("button-active");
  formatTodosArray();
  renderCompletedTodos(completedTodos);
});

remainigBtn.addEventListener("click", () => {
  todoDiv.classList.replace("visible", "hidden");
  completed.classList.replace("visible", "hidden");
  remaining.classList.replace("hidden", "visible");
  allBtn.classList.remove("button-active");
  completedBtn.classList.remove("button-active");
  remainigBtn.classList.add("button-active");
  formatTodosArray();
  renderRemainingTodos(remainigTodos);
});

clearBtn.addEventListener("click", () => {
  clearCompleted();
  allBtn.click();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputValue = document.getElementById("addTodoInput").value;
  createNewDiv(inputValue);
  formatTodosArray();
  document.getElementById("addTodoInput").value = "";
  allBtn.click();
});

const createNewDiv = (inputValue) => {
  const div = document.createElement("div");
  div.classList.add(
    "todo-item",
    `${
      toggleMode.getAttribute("src") == "images/icon-sun.svg"
        ? "main-div-dark"
        : "main-div-light"
    }`
  );
  div.innerHTML = `<span class="inner-circle"><img id="check-tick" class="check" src="images/icon-check.svg" alt=""></span>${inputValue}<img id="delete-todo" src="images/icon-cross.svg" alt="Delete Todo" />`;
  if (
    allTodos[div.innerText] ||
    inputValue === "" ||
    !inputValue.replace(/\s/g, "").length
  ) {
    warning.classList.replace("hidden", "visible");
  } else {
    warning.classList.replace("visible", "hidden");
    allTodos[div.innerText] = div;
    const checkBox = div.firstElementChild;
    const checkTick = checkBox.firstElementChild;
    const deleteBtn = div.lastElementChild;
    div.addEventListener("click", () => {
      checkBox.classList.toggle("inner-circle-active");
      checkTick.classList.toggle("check-active");
      allTodos[div.innerText] && allTodos[div.innerText].classList.toggle("completed") ;
      formatTodosArray();
    });
    deleteBtn.addEventListener("click", () => {
      delete allTodos[div.innerText];
      resetUI();
      formatTodosArray();
    });
  }
};

const formatTodosArray = () => {
  let allTodosKeys = Object.keys(allTodos);
  allTodosArray = allTodosKeys.map((key) => allTodos[key]);
  completedTodos = allTodosArray.filter((todo) =>
    todo.classList.contains("completed")
  );
  remainigTodos = allTodosArray.filter(
    (todo) => !todo.classList.contains("completed")
  );
  renderAllTodos(allTodosArray);
  updateItemsRemaining();
};

const renderAllTodos = (allTodosArray) => {
  allTodosArray.map((todo) => todoDiv.appendChild(todo));
};

const renderCompletedTodos = (completedTodos) => {
  completedTodos.map((todo) => completed.appendChild(todo));
};

const renderRemainingTodos = (remainigTodos) => {
  remainigTodos.map((todo) => remaining.appendChild(todo));
};

const clearCompleted = () => {
  clearedTodos = {};
  for (let todo in allTodos) {
    if (!allTodos[todo].classList.contains("completed")) {
      clearedTodos[todo] = allTodos[todo];
    }
  }
  resetUI();
  allTodos = clearedTodos;
  formatTodosArray();
};

const updateItemsRemaining = () => {
  let itemsLeft = remainigTodos.length;
  itemsLeftDiv.innerText = `${itemsLeft} item(s) left`;
};

const resetUI = () => {
  todoDiv.innerHTML = `<div class="visible" id="todos"></div>`;
  completed.innerHTML = `<div class="hidden" id="completed"></div>`;
  remaining.innerHTML = `<div class="hidden" id="remaining"></div>`;
};
