let form = document.getElementById("form");

form.addEventListener("submit" , function(e) {
    e.preventDefault();
    let habitName = document.getElementById("habitName").value;
    let habitStart = document.getElementById("habitStart").value;
    let habitTarget = document.getElementById("habitTarget").value;
    let frequency = document.getElementById("HabitFrequency").value;
    const newHabit = {
        name : habitName,
        status : "pending",
        streak : 0,
        start: habitStart,
        end:"Never",
        Target : habitTarget,
        frequency:frequency
    }

    let habits = getHabits();
    habits.push(newHabit);
    saveHabits(habits);

    window.location.href = "../index.html"
})
