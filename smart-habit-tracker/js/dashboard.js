import { getHabits, getTodayDate } from "./db.js";

// DOM Elements
const doneEl = document.getElementById("doneToday");
const pendingEl = document.getElementById("pendingToday");
const missedEl = document.getElementById("missedToday");
const totalEl = document.getElementById("totalHabits");
const progressList = document.getElementById("habitProgressList");
const heatmapGrid = document.getElementById("heatmapGrid");

// --------------------------------------
// STEP 1️⃣: LOAD AND CATEGORIZE HABITS
// --------------------------------------
function loadDashboardData() {
  const habits = getHabits() || [];
  const today = getTodayDate();

  let done = 0, pending = 0, missed = 0;

  habits.forEach(habit => {
    switch (habit.status) {
      case "Done": done++; break;
      case "Pending": pending++; break;
      case "Missed": missed++; break;
    }
  });

  totalEl.textContent = habits.length;
  doneEl.textContent = done;
  pendingEl.textContent = pending;
  missedEl.textContent = missed;

  renderProgressBars(habits);
  renderHeatmap(habits);
}

// --------------------------------------
// STEP 2️⃣: PROGRESS BAR PER HABIT
// --------------------------------------
function renderProgressBars(habits) {
  progressList.innerHTML = "";

  habits.forEach(habit => {
    const startDate = new Date(habit.start);
    const endDate = habit.end && habit.end !== "Never" ? new Date(habit.end) : null;
    const today = new Date(getTodayDate());

    let progress = 0;

    if (endDate) {
      const totalDuration = (endDate - startDate) / (1000 * 60 * 60 * 24);
      const elapsed = (today - startDate) / (1000 * 60 * 60 * 24);
      progress = Math.min((elapsed / totalDuration) * 100, 100);
    } else {
      progress = habit.streak * 10; // For ongoing habits (no end)
    }

    const div = document.createElement("div");
    div.classList.add("progress-item");

    div.innerHTML = `
      <h3>${habit.name} <span style="font-size: 0.8rem; color:#7a7a7a;">(${habit.status})</span></h3>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${progress}%;"></div>
      </div>
    `;

    progressList.appendChild(div);
  });
}

function renderHeatmap(habits) {
//   const heatmapGrid = document.getElementById("heatmapGrid");
  heatmapGrid.innerHTML = "";

  // Step 1: Count completed habits per date
  const dateCount = {};
  habits.forEach(habit => {
    if (habit.lastDoneDate) {
      const date = habit.lastDoneDate;
      dateCount[date] = (dateCount[date] || 0) + 1;
    }
  });

  // Step 2: Generate last 52 weeks (364 days)
  const today = new Date();
  const startDate = new Date();
  startDate.setDate(today.getDate() - 364);

  const days = [];
  for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split("T")[0];
    const value = dateCount[dateStr] || 0;

    // Determine contribution level (1-5)
    let level = 0;
    if (value === 1) level = 1;
    else if (value === 2) level = 2;
    else if (value === 3) level = 3;
    else if (value >= 4) level = 4;

    days.push({ date: dateStr, value, level });
  }

  // Step 3: Arrange as GitHub-style grid (weeks x days)
  const totalWeeks = Math.ceil(days.length / 7);

  heatmapGrid.style.display = "grid";
  heatmapGrid.style.gridTemplateColumns = `repeat(${totalWeeks}, 1fr)`;
  heatmapGrid.style.gridTemplateRows = "repeat(7, 1fr)";
  heatmapGrid.style.gap = "4px";

  days.forEach((day, index) => {
    const div = document.createElement("div");
    div.classList.add("day");
    div.dataset.level = day.level;
    div.title = `${day.value} habits done on ${day.date}`;
    heatmapGrid.appendChild(div);
  });
}


// --------------------------------------
// STEP 4️⃣: INIT DASHBOARD
// --------------------------------------
document.addEventListener("DOMContentLoaded", loadDashboardData);
