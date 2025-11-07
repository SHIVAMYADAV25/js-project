export function getHabits(){

    return JSON.parse(localStorage.getItem("habits")) || [];
}

export function saveHabits(habits){
    localStorage.setItem("habits" , JSON.stringify(habits));
}

export function getTodayDate(){
    const date = new Date();
    const year = date.getFullYear();
    const month =  String(date.getMonth()+1).padStart(2,"0");
    const day = String(date.getDate()).padStart(2,"0");
    return `${year}-${month}-${day}`
}

// console.log(getTodayDate())