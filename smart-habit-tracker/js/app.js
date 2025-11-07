// This will store all habits
import {saveHabits , getHabits ,getTodayDate} from "./db.js";
// let habits = getHabits();
let habits = checkStreakOnLoad();
renderHabit(habits);
attachRowEvents();


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

                    if(status === "pending"){
                        if(habit.lastDoneDate !== todayDate){
                            habit.streak += 1;
                            habit.lastDoneDate = todayDate;
                            // console.log(habit.lastDoneDate);
                            
                        }
                        habit.status = "Done";
                    }else if(status === "done" && habit.lastDoneDate === todayDate){
                        habit.streak = Math.max(0,habit.streak-1);
                        habit.lastDoneDate = null;
                        habit.status = "Pending";
                    }else{
                        console.log(habit.lastDoneDate === todayDate)
                    }
                    saveHabits(allHabits);
                    renderHabit(allHabits);
                    attachRowEvents()
                }
            )
    }
})
}

function checkStreakOnLoad(){
    let allHabits = getHabits();
    console.log(allHabits)
    const today = getTodayDate();

    allHabits.forEach(habit =>{
        if(!habit.lastDoneDate) return;

        const last = new Date(habit.lastDoneDate);
        const now = new Date(today);

        const diffDay = Math.floor((now-last)/(1000*60*60*24))

        if(diffDay === 0){
            return // done today
        }else if(diffDay === 1){
            // missed yesterday
            habit.streak = 0;
            habit.missedDays = (habit.missedDays || 0) + 1 ;
            habit.status = "Pending";
        }else if(diffDay > 1){
            // missed multiple days
            habit.missedDays = (habit.missedDays || 0) + (diffDay - 1);
            habit.streak = 0;
            habit.status = "Missed"
        }
    })

    saveHabits(allHabits);
    return allHabits;
}