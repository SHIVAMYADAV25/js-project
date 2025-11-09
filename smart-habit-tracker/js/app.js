// This will store all habits
import {saveHabits , getHabits ,getTodayDate} from "./db.js";
// let habits = getHabits();
let habits = checkStreakOnLoad();
renderHabit(habits);
attachRowEvents();
initDailyResetEngine();


export function renderHabit(filter_habit){
    let list = document.getElementById("habit-list");
    
    list.innerHTML = `
            <div class="habit-header-row">
                <div>Habit</div>
                <div>Status</div>
                <div>Streak</div>
                <div>Frequency</div>
                <div>Start</div>
                <div>End</div>
            </div>
            <div class="line-title"></div>
    `

    filter_habit.forEach(habit => {
        list.innerHTML += `
            <div class="habit-row" data-name="${habit.name}">
                <span class="habit-name">${habit.name}</span>
                <span class="habit-status">${habit.status}</span>
                <span class="habit-streak">${habit.streak}</span>
                <span class="habit-streak">${habit.frequency}</span>
                <span class="habit-start">${habit.start}</span>
                <span class="habit-end">${habit.end}</span>
            </div>
        `
    })
}

// click on today's habit
// access row 
// today's date && status = pending

// document.getElementById("Todaydata").addEventListener("click" , (e) =>{
//     const habits = getHabits();
//     let todayDate = getTodayDate();

//     habits.forEach( habit => {
//         if(habit.)
//     });
// })

            

function attachRowEvents(){
    let rows = document.querySelectorAll(".habit-row");
    let todayDate = getTodayDate();
    let today = new Date(todayDate);
    let allHabits = getHabits();
    

rows.forEach(row => {
    let habitname = row.getAttribute("data-name");
    let habitIndex = allHabits.findIndex(h => h.name === habitname);
    if(habitIndex === -1) return

    const  habit  = allHabits[habitIndex];
    let startDate = new Date(habit.start);

    
    if(today < startDate){
        row.classList.add("notAccess");
        // habit.status = "Locked"
        row.title = `Starts on ${habit.start}`
        // console.log(habit.status)
        // saveHabits(allHabits);
        return
    }else{
        row.addEventListener('click' , function (){
                    // let index = hab.findIndex(h => h.name === habitname);
                    // if(index === -1) return;

                    // const habit = hab[index];
                    // console.log(habit)

                    const status = (habit.status || "").toLowerCase();
                    // console.log(status)
                    if(status === "done" && habit.lastDoneDate === todayDate){
                        return
                    }
                    if(status === "pending" || status === "Missed"){
                        if(habit.lastDoneDate !== todayDate){
                            habit.streak += 1;
                            habit.lastDoneDate = todayDate;
                            // console.log(habit.lastDoneDate);
                            
                        }
                        habit.status = "Done";
                    }


                    saveHabits(allHabits);
                    renderHabit(allHabits);
                    attachRowEvents()
                }
            )
    }
})
}

function checkStreakOnLoad() {
  let allHabits = getHabits();
  const today = getTodayDate();
  const now = new Date(today);

  // Clean corrupted data
  allHabits.forEach(h => {
    if (typeof h.missedDays !== "number" || h.missedDays < 0 || h.missedDays > 36500) {
      h.missedDays = 0;
    }
  });

  allHabits.forEach(habit => {
    const startDate = new Date(habit.start);

    // 🚫 If already done today — don't touch anything
    if (habit.lastDoneDate === today && habit.status === "Done") {
      return;
    }

    const diffStart = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));

    // 🔓 Starts today
    if (diffStart === 0) {
      habit.status = "Pending";
      habit.lastDoneDate = habit.lastDoneDate || null;
      habit.streak = habit.streak || 0;
      return;
    }

    // 🔓 Unlock if past start date
    if (habit.status === "Locked" && now >= startDate) {
      habit.status = "Pending";
    }

    // 🛑 Not started yet → skip
    if (now < startDate) return;

    // 🛑 No lastDoneDate → skip missed logic
    if (!habit.lastDoneDate || isNaN(new Date(habit.lastDoneDate))) return;

    const last = new Date(habit.lastDoneDate);
    const diffDay = Math.floor((now - last) / (1000 * 60 * 60 * 24));

    if (diffDay === 0) return; // done today ✅
    else if (diffDay === 1) {
    //   habit.streak = 0;
    //   habit.missedDays = (habit.missedDays || 0) + 1;
      habit.status = "Pending";
    } else if (diffDay > 1) {
      habit.missedDays = (habit.missedDays || 0) + (diffDay - 1);
      habit.streak = 0;
      habit.status = "Missed";
    }
  });

  saveHabits(allHabits);
  return allHabits;
}




function initDailyResetEngine(){
    const today = getTodayDate();
    let lastChecked = localStorage.getItem("lastCheckedDate");

    if(!lastChecked){
        localStorage.setItem("lastCheckedDate" , today);
        lastChecked = today;
    }

    function checkDailyReset(){
        const current = getTodayDate();
        // console.log(current)
        // console.log("last: ",lastChecked)
        if(current !== lastChecked){
            const updateHabits = checkStreakOnLoad();
            console.log(current)
        console.log("inside last: ",lastChecked)
            updateHabits.forEach(habit => {
                const startDate = new Date(habit.start);
                const now = new Date(current);

                console.log(habit.status)

                if(habit.status === "Locked" && now >= startDate){
                    habit.status = "Pending";
                }
            });

            console.log("helo",updateHabits)
            saveHabits(updateHabits);
            renderHabit(updateHabits);
            attachRowEvents();

            lastChecked = current
            localStorage.setItem("lastCheckedDate", current);
        }
    }

    checkDailyReset();
    setInterval(checkDailyReset, 60000);
}


// checkStreakOnLoad()
// Handles daily resets correctly
// Keeps streak continuity between consecutive days
// Resets only if you miss 2+ days.

// attachRowEvents()
// Prevents double-click increment
// Prevents toggling Done back to Pending in the same day
// Updates localStorage immediately after marking.

// initDailyResetEngine()
// Runs once per new calendar day
// Calls checkStreakOnLoad() only when day changes
// Keeps your data fresh without constant overwrites.