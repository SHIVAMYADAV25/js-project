import {saveHabits , getHabits ,getTodayDate} from "./db.js";

const doneEl = document.getElementById("doneToday"); 
const pendingEl = document.getElementById("pendingToday"); 
const missedEl = document.getElementById("missedToday"); 
const totalEl = document.getElementById("totalHabits"); 
const progressList = document.getElementById("habitProgressList"); 
const heatmapGrid = document.getElementById("heatmapGrid");

function dashboardRender(){
  let allHabits = getHabits();
  let todayDate = getTodayDate();

  let missed = 0 , pending = 0 , done = 0 ;

  allHabits.forEach(e => {
    switch(e.status){
      case "Done" : done++; break;
      case "Pending" : pending++; break;
      case "Missed" : missed++; break;
    }
  });

  totalEl.textContent = allHabits.length;
  doneEl.textContent = done;
  missedEl.textContent = missed;
  pendingEl.textContent = pending;

  renderProgressBars(allHabits);
  renderHeatmap(allHabits);

}

function renderProgressBars(habits){
  progressList.innerHTML = "";

  habits.forEach(habit => {
    const startDate = new Date(habit.start);
    const endDate = habit.end && habit.end !== "Never" ? new Date(habit.end) : null
    const today = new Date(getTodayDate());

    let progress = 0 ;

    if(endDate){
      const TotalDuration = (endDate - startDate) / (1000 * 60 * 60 * 24);
      const elapsed = (today -  start) / (1000*60*60*24);
      progress = Math.min((elapsed / TotalDuration) * 100,100);
    }
    else{
      progress = habit.streak * 10;
    }

    const div = document.createElement("div");
    div.classList.add("progress-item");

    div.innerHTML = `
     <h3> ${habit.name} <span style="font-size:0.8rem ; color:#7a7a7a ">(${habit.status})</span></div>
    <div class="progress-bar">
      <div class="progress-fill" style="width:${progress}%;"></div>
    </div>
    `;
    
    progressList.appendChild(div);
  })
}


function renderHeatmap(habits){
  heatmapGrid.innerHTML = "";

  const dateCount = {};

  habits.forEach(habit =>{
    if(habit.lastDoneDate){
      const date = habit.lastDoneDate;
      dateCount[date] = (dateCount[date] || 0) + 1;
    }
  })

  console.log(dateCount)
  // o/p: {2025-11-10: 2, 2025-11-11: 3}

  const today = new Date();
  const startDate = new Date(); // ak saal pahale ka valye (ak din pahale ka)
  // like aaj 24 of 2025 to isma 23 raha ga 2024 ka  
  // console.log(startDate.getDate(startDate.setDate(today.getDate()-364)));
  startDate.setDate(today.getDate() - 364);

  startDate.setDate(startDate.getDate() - startDate.getDay());

  console.log(today , startDate)
  // o/p:
  // Tue Nov 11 2025 09:49:50 GMT+0530 (India Standard Time) 
  // Tue Nov 12 2024 09:49:50 GMT+0530 (India Standard Time)

  const days = [];
  // days mai ak saal ka pura value raha ga

  // console.log(new Date(startDate).toISOString().split("T")[0])

  for(let d = new Date(startDate);d <= today ; d.setDate(d.getDate() + 1)){
    const dateStr = d.toISOString().split("T")[0];
    // console.log(dateStr)
    const value = dateCount[dateStr] || 0 ;

  let level = 0;
  if (value >= 1 && value < 2) level = 1;
  else if (value >= 2 && value < 3) level = 2;
  else if (value >= 3 && value < 4) level = 3;
  else if (value >= 4) level = 4;
  
    days.push({date : dateStr,value,level})
  }

  // console.log(days)

  const totalWeek = Math.ceil(days.length / 7);

  // console.log(totalWeek)
  // 53 column hai toh grid mai 53 column repeat hoga

  heatmapGrid.style.display = "grid";
  heatmapGrid.style.gridTemplateColumns = `repeat(${totalWeek} , 1fr)`;
  heatmapGrid.style.gridTemplateRows = `repeat(7,1fr)`;
  heatmapGrid.style.gap = "4px";

  days.forEach((day , index) =>{
    const div = document.createElement("div");
    div.classList.add("day");
    div.dataset.level = day.level;
    div.title = `${day.value} habit is done on ${day.date}`;
    heatmapGrid.appendChild(div);
  })
}

dashboardRender();