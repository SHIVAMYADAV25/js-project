import {saveHabits , getHabits , getTodayDate} from "./db.js";
const doneEl = document.getElementById("doneToday"); 
const pendingEl = document.getElementById("pendingToday"); 
const missedEl = document.getElementById("missedToday"); 
const totalEl = document.getElementById("totalHabits"); 
const tbinsert = document.getElementById("tbinsert"); 

function getLast7Days(){
    const days = [];
    const today = new Date();

    for(let i = 0; i < 7;i++){
        const d = new Date();
        d.setDate(today.getDate() - i);
        days.push(d.toISOString().split("T")[0])
    }

    return days
}


function getSnapShotForDate(date,habits){
    const done = [];
    const missed = [];

    habits.forEach(habit => {
        const start = new Date(habit.start);
        const target = new Date(date);

        if(target < start) return

        if(habit.lastDoneDate === date){
            done.push(habit.name);
        }else if(target < new Date(getTodayDate())){
            missed.push(habit.name)
        }
    });

    return {done , missed}
}

function renderTimeline(){
    const habits = getHabits();
    const dates = getLast7Days();
    const container = document.getElementById("timelineContainer");
    
    container.innerHTML = "";

    dates.forEach((date) => {
        const {done , missed} = getSnapShotForDate(date,habits);

        const div = document.createElement("div");

        div.classList.add("timeline-day");

        div.innerHTML = `
        <h3> ${date} </h3>
        <div class="timeline-entry">
            <span class="done">✔ Completed:</span>  ${done.length ? done.join(", "):"-"}
        </div>
        <div class="timeline-entry">
            <span class="missed">❌ missed:</span>  ${missed.length ? missed.join(", "):"-"}
        </div>
        `;

        container.appendChild(div)
    })
}

document.addEventListener("DOMContentLoaded",() => {
    listTable();
    dashboardRender();
    renderTimeline();
})


function dashboardRender(){
  let allHabits = getHabits();

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
}


function listTable(){
    let allHabits = getHabits();

    tbinsert.innerHTML = "";

    allHabits.forEach((e)=>{
        tbinsert.innerHTML += `
            <tr>
                <td>${e.name}</td>
                <td>${e.streak}</td>
                <td>22</td>
                <td>${e.missedDays}</td>
                <td>${e.start}</td>
                <td>${e.end}</td>
            </tr>
        `
    })
}