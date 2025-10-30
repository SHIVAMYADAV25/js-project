const arrayContainer = document.getElementById("array");
const nextStepBtn = document.getElementById("nextStep");
const resetBtn = document.getElementById("reset");
const explanationBox = document.getElementById("explanation");
const codeBox = document.getElementById("code-box");

const codeLines = [
"1. for i from 0 to n-1:",
"2. for j from 0 to n-i-1:",
"3. compare arr[j] and arr[j+1]",
"4. if arr[j] > arr[j+1]:",
"5. swap(arr[j], arr[j+1])",
];


let steps = [];
let stepIndex = 0;

function renderCode(line) {
codeBox.innerHTML = codeLines
    .map((text,i) => `<div class="${line === i+1 ? 'highlight-line' : ""}"> ${text} </div>`).join("")
}

function create_Array(){
    let arr = Array.from({length:8}, () => Math.floor(Math.random() * 50) + 5 );
    displayArray(arr)
    steps = [];
    stepIndex = 0;
    bblSort([...arr]);
    nextStepBtn.disabled = false;
    resetBtn.disabled = false;
    explanationBox.textContent = "Array generated. Click Next Step.";
    renderCode(null)
}


function bblSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < (arr.length - i - 1); j++) {
            steps.push({ type:"compare", i, j, array:[...arr], line:3 });
            if (arr[j] > arr[j + 1]) {
                steps.push({ type:"condition-true", i, j, array:[...arr], line:4 });

                steps.push({ type:"swap", i, j, array:[...arr], line:5 });
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
                steps.push({ type:"After-swap", i, j, array:[...arr], line:5 });

            }else{
                steps.push({ type:"condition-false", i, j, array:[...arr], line:4 });
            }
        }
    }
}


function displayArray(a, highlightA, highlightB, mode){
    arrayContainer.innerHTML = ""
    a.forEach((val,index) => {
        let div = document.createElement("div");
        div.className= "bar"
        div.style.height = val * 4 + "px"
        div.textContent = val
        if(index === highlightA || index === highlightB){
            div.classList.add(mode === "swap" ? "swap" : "compare")
        }
        arrayContainer.appendChild(div)
    });
}


function playstep(){
    // console.log("hello")
    if(stepIndex >= steps.length){
        explanationBox.textContent = "✅ Sorting Completed.";
        renderCode(null)
        return
    }

    const s = steps[stepIndex];
    // console.log(s)
    renderCode(s.line);

    if(s.type === "compare"){
        explanationBox.innerText = `comparing arr[${s.j}] = ${s.array[s.j]} and arr[${s.j+1}] = ${s.array[s.j+1]}`
        // console.log(s.array[s.j+1]);
        displayArray(s.array,s.j, s.j+1 , "compare")
    }else if(s.type === "swap"){
        explanationBox.innerText = `Swapping ${s.array[s.j]} and ${s.array[s.j+1]}`;
        displayArray(s.array,s.j,s.j+1,"swap")
    }else if(s.type === "After-swap"){
        explanationBox.innerText = `After Swap → ${s.array.join(', ')}`;
        displayArray(s.array);
    }else if(s.type === "condition-true"){
        explanationBox.innerText = "Condition TRUE → Swap will happen";
    }
    else if(s.type === "condition-false"){
        explanationBox.innerText = "Condition FALSE → No swap";
    }

    stepIndex++;
}


function reset(){
    arrayContainer.innerHTML = "";
    explanationBox.innerText = "Reset done";
    nextStepBtn.disabled = true;
    resetBtn.disabled = true;
    renderCode(null)
}

document.getElementById("generate").onclick = create_Array;
nextStepBtn.onclick = playstep;
resetBtn.onclick = reset;
