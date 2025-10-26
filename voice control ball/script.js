window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!window.SpeechRecognition) {
    alert("Your browser does not support voice features 😔");
} else {
    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = true;

    const startBtn = document.getElementById("start");
    const canvas = document.getElementById("canvas");

    let content = "";
    let elementCount = 0;
    let selectedElement = canvas;

    recognition.addEventListener("result", (e) => {
        let transcript = Array.from(e.results)
            .map(result => result[0].transcript)
            .join("")
            .toLowerCase();

        let newText = transcript.replace(content, "");
        console.log("Heard:", newText);

        handleVoiceCommand(newText.trim());
        content = transcript;
    });

    recognition.addEventListener("end", () => recognition.start());

    startBtn.addEventListener("click", () => {
        recognition.start();
        startBtn.textContent = "🎤 Listening...";
    });

    // ========== 🧩 MAIN VOICE HANDLER ==========
    function handleVoiceCommand(text) {
        text = fixSpeechNumbers(text.toLowerCase());
        if (text.includes("create")) createElementFromVoice(text);
        else if (text.includes("select")) selectByVoice(text);
        else if (text.includes("background")) applyStyle("backgroundColor", text);
        else if (text.includes("display")) applyStyle("display", text);
        else if (text.includes("height") || text.includes("fight"))applyStyle("height", text, "px");
        else if (text.includes("width") || text.includes("with")) applyStyle("width", text, "px");
        else if (text.includes("margin")) applyStyle("margin", text, "px");
        else if (text.includes("padding")) applyStyle("padding", text, "px");
    }


function fixSpeechNumbers(text) {
    return text
        .replace(/\bto\b/g, "two")
        .replace(/\btoo\b/g, "two")
        .replace(/\btu\b/g, "two")
        .replace(/\bfor\b/g, "four")
        .replace(/\bfree\b/g, "three")  // sometimes “three” sounds like “free”
        .replace(/\bwon\b/g, "one")
        .replace(/\bselected\b/g, "select")
}


    function createElementFromVoice(text) {
    // Remove filler words
    text = text.replace(/\b(create|creative)\b/g, "div")
    text = text.replace(/\b(a|the|to|and|from|of|inside|in)\b/g, "").trim();

    const match = text.match(/create\s+(\w+)/);
    if (!match) return;

    let tag = fixVoiceErrors(match[1]);
    if (!tag) return;

    elementCount++;
    const el = document.createElement(tag === "box" ? "div" : tag);
    el.dataset.voiceid = `${tag} ${elementCount}`;
    el.textContent = `${tag} ${elementCount}`;
    el.className = "voice-element";
    selectedElement.appendChild(el);

    selectedElement = el;
    highlightSelection(el);

    console.log("✅ Created:", el.dataset.voiceid);
}


    function fixVoiceErrors(word) {
    word = word.trim().toLowerCase();

    // Common misheard replacements
    const corrections = {
        dev: "div",
        day: "div",
        dey: "div",
        deev: "div",
        deep: "div",
        boxx: "box",
        back: "box",
        span: "span",
        buton: "button",
        baton: "button",
        navs: "nav",
        nab: "nav",
        header: "header",
        foot: "footer",
        parra: "p",
        paragraph: "p",
        secton: "section",
        siction: "section",
        image: "img",
        pic: "img",
        picture: "img"
    };

    for (const [wrong, right] of Object.entries(corrections)) {
        if (word.includes(wrong)) return right;
    }

    // fallback
    return word;
}

    // ========== 🎯 SELECT ELEMENT ==========
    function selectByVoice(text) {
        text = text.replace(/\b(due|give|team|day|tube)\b/g, "div");
        const match = text.match(/select\s+(\w+)\s+(\w+)/);

        if (!match) return;

        const tag = match[1];
        const numberWord = match[2];
        const num = convertNumberWord(numberWord);
        const id = `${tag} ${num}`;

        const el = document.querySelector(`[data-voiceid="${id}"]`);
        if (el) {
            selectedElement = el;
            highlightSelection(el);
            console.log("🎯 Selected:", id);
        } else {
            console.log("⚠️ Element not found:", id);
        }
    }

    // ========== 🎨 APPLY STYLES ==========
    function applyStyle(styleProp, text, unit = "") {
        // console.log(" inside :" , styleProp, text, unit)
        if (!selectedElement) {
            console.log("⚠️ No element selected!");
            return;
        }

        // console.log(selectedElement)

        let value = extractValueAfterKeyword(text, styleProp);
        // console.log(value);
        
        // console.log(isNaN(value))
        if (!value) return;

        // console.log(isNaN(value))

        if (isNaN(value)) {
            selectedElement.style[styleProp] = value.trim();
        } else {
            selectedElement.style[styleProp] = value + unit;
        }

        console.log(`🎨 ${styleProp}: ${value}${unit}`);
    }


function fixVoiceErrorsInStyle(word) {
    word = word.trim().toLowerCase();

    // Common misheard replacements
    const corrections = {
        with: "width",
        "background colour":"backgroundColor",
        lock : "block"
    };

    for (const [wrong, right] of Object.entries(corrections)) {
        word = word.replace(wrong,right)
    }

    // fallback
    return word;
}


    // ========== 🔎 HELPERS ==========
    function highlightSelection(el) {
        document.querySelectorAll("[data-voiceid]").forEach(e => e.style.outline = "");
        el.style.outline = "3px solid #00ff7f";
    }

    function extractValueAfterKeyword(text, keyword) {
        text = fixVoiceErrorsInStyle(text);
        // console.log(text);
        let value = text.split(keyword)[1];
        // console.log(value)
        if (!value) return "";
        value = value.trim();
        value = normalizeColorValue(value);
        console.log(value)
        return value;
    }

    function normalizeColorValue(value = "") {

        if (!value) return "";

        value = value.toLowerCase();

    // Replace spoken “hash / has / number” → #
        value = value.replace(/\b(hash|has|number|pound|sharp)\b/g, "#");

    // Replace spaces → nothing (“# 1 1 1” → “#111”)
        value = value.replace(/\s+/g, "");

        const map = {
            one: "1", two: "2", three: "3", four: "4", five: "5",
            six: "6", seven: "7", eight: "8", nine: "9", zero: "0"
        };
        for (const [word, digit] of Object.entries(map)) {
            const regex = new RegExp("\\b" + word + "\\b", "gi");
            // console.log(regex)
            value = value.replace(regex, digit);
            // console.log(value)
        }
        // console.log(value.replace(/\s+/g, ""))
        return value.replace(/\s+/g, "");
    }

    function convertNumberWord(word) {
        const numberMap = {
            one: 1, two: 2, three: 3, four: 4, five: 5,
            six: 6, seven: 7, eight: 8, nine: 9, ten: 10
        };
        return numberMap[word] || parseInt(word);
    }
}
