// ================= LOGIN =================
function login() {
  const user = document.getElementById("username").value;
  const pwd = document.getElementById("password").value;

  const correctUser = "johnwynneperez@gmail.com";
  const correctPass = "May@2006";

  if (user !== correctUser || pwd !== correctPass) {
    document.getElementById("errorMsg").textContent =
      "Invalid username or password.";
    return;
  }

  document.getElementById("loginPage").classList.add("hidden");
  document.getElementById("calculatorPage").classList.remove("hidden");
}

// ================= CALCULATOR =================
let display = document.getElementById("calcDisplay");
let lastExpression = "";

// append numbers/operators
function appendValue(val) {
  display.value += val;
}

// clear all
function clearDisplay() {
  display.value = "";
}

// delete last char
function backspace() {
  display.value = display.value.slice(0, -1);
}

// evaluate expression + auto save
function calculate() {
  try {
    lastExpression = display.value;
    const result = eval(display.value);
    display.value = result;
    if (lastExpression && result !== "") {
      addToHistory(`${lastExpression} = ${result}`);
    }
  } catch {
    display.value = "Error";
  }
}

// ================= HISTORY =================
let history = [];

function addToHistory(record) {
  history.unshift(record); // newest first
  renderHistory();
  saveHistory();
}

function renderHistory() {
  const list = document.getElementById("historyList");
  list.innerHTML = "";
  history.forEach(item => {
    const div = document.createElement("div");
    div.className = "history-item";
    div.textContent = item;
    list.appendChild(div);
  });
}

// toggle history show/hide
function toggleHistory() {
  const list = document.getElementById("historyList");
  list.classList.toggle("hidden");
}

// save history in localStorage
function saveHistory() {
  localStorage.setItem("calcHistory", JSON.stringify(history));
}

// load history from localStorage
function loadHistory() {
  const saved = localStorage.getItem("calcHistory");
  if (saved) {
    history = JSON.parse(saved);
    renderHistory();
  }
}
window.onload = loadHistory;

// ================= DARK / LIGHT MODE =================
function toggleMode() {
  const calc = document.querySelector(".calculator");
  calc.classList.toggle("dark");

  // change logo icon
  const logo = document.querySelector(".mode-toggle");
  logo.textContent = calc.classList.contains("dark") ? "☀️" : "🌙";
}
