// This will store all habits
let habits = getHabits();


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
            <div class="habit-row">
                <div class="habit-name">${habit.name}</div>
                <div class="habit-status">${habit.status}</div>
                <div class="habit-streak">${habit.streak}</div>
                <div class="habit-streak">${habit.frequency}</div>
                <div class="habit-start">${habit.start}</div>
                <div class="habit-end">${habit.end}</div>
            </div>
        `
    })
}

renderHabit(habits);

document.getElementById("Todaydata").addEventListener("click" , (e) =>{
    // let today = new Date().toISOString().split("T")[0]
    let Todaydata = habits.filter((data)=> data.frequency.toLowerCase() === "daily")
    console.log(Todaydata)
    renderHabit(Todaydata);
})