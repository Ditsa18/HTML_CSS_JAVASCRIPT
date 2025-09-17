const taskInput = document.getElementById("taskInput");
const taskDateTime = document.getElementById("taskDateTime");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterBtns = document.querySelectorAll(".filter-btn");
const themeToggle = document.getElementById("themeToggle");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks(filter = "all") {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    if (filter === "pending" && task.completed) return;
    if (filter === "completed" && !task.completed) return;

    const li = document.createElement("li");
    li.className = `task ${task.completed ? "completed" : ""}`;

    li.innerHTML = `
      <div class="task-info">
        <span>${task.text}</span>
        ${task.dateTime ? `<small><i class="fa-regular fa-clock"></i> ${task.dateTime}</small>` : ""}
      </div>
      <div class="task-actions">
        <button onclick="toggleComplete(${index})"><i class="fa-solid fa-check"></i></button>
        <button onclick="editTask(${index})"><i class="fa-solid fa-pen"></i></button>
        <button onclick="deleteTask(${index})"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;
    taskList.appendChild(li);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const text = taskInput.value.trim();
  const dateTime = taskDateTime.value;

  if (text === "") return;

  tasks.push({ text, dateTime, completed: false });
  taskInput.value = "";
  taskDateTime.value = "";
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks(document.querySelector(".filter-btn.active").dataset.filter);
}

function editTask(index) {
  const newTask = prompt("Edit task:", tasks[index].text);
  if (newTask !== null) {
    tasks[index].text = newTask.trim() || tasks[index].text;
    renderTasks(document.querySelector(".filter-btn.active").dataset.filter);
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks(document.querySelector(".filter-btn.active").dataset.filter);
}

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", e => {
  if (e.key === "Enter") addTask();
});

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter-btn.active").classList.remove("active");
    btn.classList.add("active");
    renderTasks(btn.dataset.filter);
  });
});

renderTasks();

/* ------------------- 🌙 THEME TOGGLE ------------------- */
function loadTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light");
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
  } else {
    document.body.classList.remove("light");
    themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  if (document.body.classList.contains("light")) {
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    localStorage.setItem("theme", "light");
  } else {
    themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    localStorage.setItem("theme", "dark");
  }
});

loadTheme();
