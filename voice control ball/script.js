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
        let transcript = Array.from(e.results)
                            .map( result => result[0])
                            .map(result => result.transcript)
                            .join("")
                            .toLowerCase()

        let newText = transcript.replace(content, "");

        if (newText.includes("create")) createBox(newText) ; 
        if (newText.includes("give")) CSSstyle(newText);
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


function createBox(newtext){
    boxName = newtext.replace("create box" , "").trim()
    let div = document.createElement("div");
    div.textContent = boxName;
    canvas.appendChild(div)

    div.className = "Box";
}

function CSSstyle(newtext){
    newtext = newtext.split(" ")
    let dec = newtext[1];
    let value = newtext[3];

    let div = document.querySelector(".Box");
    div.style.backgroundColor = value

    console.log(value);
    console.log(typeof(value));
    
    
}