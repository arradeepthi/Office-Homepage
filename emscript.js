let time = document.getElementById("time");
displayTime = () => {
  let now = new Date();
  let h = now.getHours().toString().padStart(2, "0");
  let m = now.getMinutes().toString().padStart(2, "0");
  let s = now.getSeconds().toString().padStart(2, "0");
  time.innerHTML = `${h} : ${m} : ${s}`;
};
displayTime();

let scrollBox = document.querySelector(".scroll-content");
let scrollContainer = document.getElementById("scrollBar");
scrollContainer.addEventListener("mouseover", function () {
  scrollBox.style.animationPlayState = "paused";
});
scrollContainer.addEventListener("mouseout", function () {
  scrollBox.style.animationPlayState = "running";
});

function saveNote() {
  const input = document.getElementById("notesInput");
  const text = input.value.trim();
  if (text === "") return;

  let notes = JSON.parse(localStorage.getItem("miratosNotes")) || [];
  notes.push(text);
  localStorage.setItem("miratosNotes", JSON.stringify(notes));
  input.value = "";
  displayNotes();
}

function displayNotes() {
  const saved = document.getElementById("savedNotes");
  let notes = JSON.parse(localStorage.getItem("miratosNotes")) || [];
  saved.innerHTML = "";
  notes.forEach((note, i) => {
    saved.innerHTML += `
            <div class="saved-note">
                <span>${note}</span>
                <button onclick="deleteNote(${i})">X</button>
            </div>`;
  });
}

function deleteNote(index) {
  let notes = JSON.parse(localStorage.getItem("miratosNotes")) || [];
  notes.splice(index, 1);
  localStorage.setItem("miratosNotes", JSON.stringify(notes));
  displayNotes();
}

window.addEventListener("load", displayNotes);

const calendarGrid = document.getElementById("calendarGrid");
const monthYear = document.getElementById("monthYear");
const taskList = document.getElementById("taskList");
const selectedDate = document.getElementById("selectedDate");
const newTaskInput = document.getElementById("newTask");
const addTaskBtn = document.getElementById("addTaskBtn");

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let activeDate = null;

const tasks = {
  "2025-07-24": ["Deploy intranet updates", "Check feedback"],
  "2025-07-25": ["Team meeting at 11AM"],
  "2025-07-29": ["Submit frontend challenge"],
};

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function loadCalendar(month, year) {
  calendarGrid.innerHTML = "";
  monthYear.innerText = `${new Date(year, month).toLocaleString("default", {
    month: "long",
  })} ${year}`;

  weekdays.forEach((day) => {
    const cell = document.createElement("div");
    cell.classList.add("weekday");
    cell.innerText = day;
    calendarGrid.appendChild(cell);
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement("div");
    calendarGrid.appendChild(emptyCell);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${(month + 1).toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
    const cell = document.createElement("div");
    cell.classList.add("day");
    cell.innerText = day;

    if (tasks[dateStr]) {
      cell.classList.add("task-day");
    }

    const today = new Date();
    if (
      year === today.getFullYear() &&
      month === today.getMonth() &&
      day === today.getDate()
    ) {
      cell.classList.add("today");
    }

    cell.addEventListener("click", () => {
      activeDate = dateStr;
      showTasks(dateStr);
    });

    calendarGrid.appendChild(cell);
  }
}

function showTasks(dateStr) {
  selectedDate.innerText = ` ${dateStr}`;
  const dayTasks = tasks[dateStr] || [];
  taskList.innerHTML = "";

  dayTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task;

    const delBtn = document.createElement("button");
    delBtn.textContent = "x";
    delBtn.addEventListener("click", () => {
      tasks[dateStr].splice(index, 1);
      if (tasks[dateStr].length === 0) delete tasks[dateStr];
      loadCalendar(currentMonth, currentYear);
      showTasks(dateStr);
    });

    li.appendChild(delBtn);
    taskList.appendChild(li);
  });

  if (dayTasks.length === 0) {
    taskList.innerHTML = "<li>No tasks for this day</li>";
  }
}

addTaskBtn.addEventListener("click", () => {
  const task = newTaskInput.value.trim();
  if (!task || !activeDate) return;

  if (!tasks[activeDate]) tasks[activeDate] = [];
  tasks[activeDate].push(task);
  newTaskInput.value = "";

  loadCalendar(currentMonth, currentYear);
  showTasks(activeDate);
});

document.getElementById("prevMonth").addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  loadCalendar(currentMonth, currentYear);
});

document.getElementById("nextMonth").addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  loadCalendar(currentMonth, currentYear);
});

loadCalendar(currentMonth, currentYear);

document
  .getElementById("feedbackForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    document.getElementById("feedbackMessage").textContent =
      "Thanks for your feedback!";
    this.reset();
  });
