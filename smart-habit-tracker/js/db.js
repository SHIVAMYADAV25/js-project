function getHabits(){

    return JSON.parse(localStorage.getItem("habits")) || [];
}

function saveHabits(habits){
    localStorage.setItem("habits" , JSON.stringify(habits));
}