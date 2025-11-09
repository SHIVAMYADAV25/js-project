import {saveHabits , getHabits , getTodayDate} from "./db.js";
let form = document.getElementById("form");

form.addEventListener("submit" , function(e) {
    e.preventDefault();
    let habitName = document.getElementById("habitName").value;
    let habitStart = document.getElementById("habitStart").value;
    let habitTarget = document.getElementById("habitTarget").value;
    let frequency = document.getElementById("HabitFrequency").value;

    let today = new Date(getTodayDate());
    console.log(today)
    let startDate = new Date(habitStart);
    console.log(startDate)
    let initialStatus = "Pending"; // default

    if(startDate > today){
        initialStatus = "Locked"
    }

    const newHabit = {
        name : habitName,
        status : initialStatus,
        streak : 0,
        start: habitStart,
        end:"Never",
        Target : habitTarget,
        frequency:frequency,
        lastDoneDate:null,
        missedDays : 0,
    }

    let habits = getHabits();
    habits.push(newHabit);
    saveHabits(habits);

    window.location.href = "../index.html"
})
