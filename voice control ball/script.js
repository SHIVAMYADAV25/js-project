window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if(!window.SpeechRecognition){
    alert("bhai tera broswer support nhi karta hai vioce feature ko")
}else{
    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.continuous = true;

    let content = "";
    const startBtn = document.getElementById("start")

    recognition.addEventListener("result" , (e) =>{
        console.log(e.results)
        let transcript = Array.from(e.results)
                            .map( result => result[0])
                            .map(result => result.transcript)
                            .join("")
                            .toLowerCase()

        let newText = transcript.replace(content, "");

        if (newText.includes("create")) createBox() ; 
        if (newText.includes("background")) CSSstyle(newText);
        if (newText.includes("margin")) GiveMargine(newText);
        if (newText.includes("padding")) GivePadding(newText);
        if (newText.includes("with")) GiveWidth(newText);
        if (newText.includes("connect")) console.log("connect");
        content = transcript;
        
    })

    recognition.addEventListener("end" ,() =>{
        recognition.start();
    })

    startBtn.addEventListener("click", () =>{
        recognition.start();
        startBtn.textContent = "Listening..... "
    })
}

let canvas = document.getElementById("canvas")


function createBox(){
    let div = document.createElement("div");
    canvas.appendChild(div)
    div.className = "Box";
}



function CSSstyle(newtext) {
    console.log("Heard command:", newtext);

    // Support both color and colour
    let text = "";
    if (newtext.includes("give background color")){
        text = newtext.split("give background color")[1];
    } else if (newtext.includes("give background colour")){
        text = newtext.split("give background colour")[1];
    }else if(newtext.includes("background colour")){
        text = newtext.split("background colour")[1];
    }

    if (!text){
        console.warn("No valid color phrase detected");
        return;
    }

    text = text.trim();
    console.log("Extracted value:", text);

    let value = normalizeColorValue(text);
    console.log("Normalized color value:", value);

    let divs = document.getElementsByClassName("Box");
    if (divs.length > 0){
        let div = divs[divs.length - 1];
        div.style.backgroundColor = value;
        console.log("Applied color:", value);
    } else {
        console.warn("No box found to apply color.");
    }
}



function normalizeColorValue(value = "") {
    if (!value) return "";

    // Convert "hash one one one" → "#111"
    value = value.replace(/hash/gi, "#");
    value = value.replace(/has/gi, "#");
    value = value.replace(/number/gi, "#");

    // Remove spaces like "# 1 1 1" → "#111"
    value = value.replace(/\s+/g, "");

    // Convert spoken numbers to digits
    const map = {
        one: "1", two: "2",to : "2" , three: "3", four: "4", five: "5",
        six: "6", seven: "7", eight: "8", nine: "9", zero: "0"
    };
    for (const [word, digit] of Object.entries(map)) {
        const regex = new RegExp("\\b" + word + "\\b", "gi");
        value = value.replace(regex, digit);
    }

    return value;
}


function GiveWidth(voicetext){
    let value = voicetext.split("with")[1];
    let div1 = document.querySelector(".Box")
    div1.style.width = value + "px"
    // console.log(value.trim());
}


function GiveMargine(voicetext){
    let value = voicetext.split("margin")[1];
    // console.log(value)
    let div1 = document.querySelector(".Box")
    div1.style.margin = value + "px"
    // console.log(value.trim());
}

function GivePadding(voicetext){
    let value = voicetext.split("padding")[1];
    // console.log(value)
    let div1 = document.querySelector(".Box")
    div1.style.padding = value + "px"
    // console.log(value.trim());
}

