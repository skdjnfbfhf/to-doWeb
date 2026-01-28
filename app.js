import { db } from "./firebase-config.js";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const calendarDays = document.getElementById("calendarDays");
const currentMonthText = document.getElementById("currentMonth");
const selectedDateText = document.getElementById("selectedDate");
const todoList = document.getElementById("todoList");

const todoForm = document.getElementById("todoForm");
const todoText = document.getElementById("todoText");
const todoPassword = document.getElementById("todoPassword");
const todoStatus = document.getElementById("todoStatus");
const todoShare = document.getElementById("todoShare");

let currentDate = new Date();
let selectedDate = null;
let todosByDate = {};

function renderCalendar() {
  calendarDays.innerHTML = "";
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  currentMonthText.textContent = `${year}년 ${month + 1}월`;

  const lastDay = new Date(year, month + 1, 0).getDate();

  for (let d = 1; d <= lastDay; d++) {
    const dateStr = `${year}-${month + 1}-${d}`;
    const div = document.createElement("div");
    div.textContent = d;
    div.className = "calendar-day";

    if (dateStr === selectedDate) div.classList.add("active");

    div.onclick = () => {
      selectedDate = dateStr;
      selectedDateText.textContent = dateStr;
      renderCalendar();
      renderTodos();
    };

    calendarDays.appendChild(div);
  }
}

function renderTodos() {
  todoList.innerHTML = "";
  if (!selectedDate || !todosByDate[selectedDate]) return;

  todosByDate[selectedDate].forEach(todo => {
    const li = document.createElement("li");
    li.className = todo.status === "done" ? "todo-done" : "todo-doing";
    li.textContent = todo.text;

    const btnBox = document.createElement("div");
    btnBox.className = "todo-buttons";

    const editBtn = document.createElement("button");
    editBtn.textContent = "수정";
    editBtn.onclick = async () => {
      const pw = prompt("비밀번호 입력");
      if (pw !== todo.password) return alert("비밀번호가 틀렸습니다");

      const newText = prompt("수정할 내용", todo.text);
      if (!newText) return;

      await updateDoc(doc(db, "todos", todo.id), { text: newText });
    };

    const delBtn = document.createElement("button");
    delBtn.textContent = "삭제";
    delBtn.onclick = async () => {
      const pw = prompt("비밀번호 입력");
      if (pw !== todo.password) return alert("비밀번호가 틀렸습니다");

      await deleteDoc(doc(db, "todos", todo.id));
    };

    btnBox.append(editBtn, delBtn);
    li.appendChild(btnBox);
    todoList.appendChild(li);
  });
}

todoForm.onsubmit = async (e) => {
  e.preventDefault();
  if (!selectedDate) return alert("날짜를 선택하세요");

  await addDoc(collection(db, "todos"), {
    text: todoText.value,
    date: selectedDate,
    status: todoStatus.value,
    share: todoShare.value,
    password: todoPassword.value
  });

  todoForm.reset();
};

document.getElementById("prevMonth").onclick = () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
};

document.getElementById("nextMonth").onclick = () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
};

onSnapshot(collection(db, "todos"), snapshot => {
  todosByDate = {};
  snapshot.forEach(d => {
    const data = { id: d.id, ...d.data() };
    if (!todosByDate[data.date]) todosByDate[data.date] = [];
    todosByDate[data.date].push(data);
  });
  renderTodos();
});

renderCalendar();
