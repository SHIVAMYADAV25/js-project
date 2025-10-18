/* snippets */
import { SNIPPETS } from "./data.js"

console.log(SNIPPETS);


let state ={
    lang:"js",
    currentSnippet : null,
    idx:0,
    correctChar:0,
    totalTyped: 0,
    started: false,
    startTime: null,
    elapsed: 0,
    timeInterval: null,
    doneCount:0,
    errors:0,
};

const practiceListE1 = document.getElementById('practiceList');
const codeDisplay = document.getElementById('codeDisplay');
const timerPill = document.getElementById('timerPill');
const timerE1 = document.getElementById('timer');
const popupMask = document.getElementById('popupMask');
const resWpm = document.getElementById('resWpm');
const resAcc = document.getElementById('resAcc');
const resErr = document.getElementById('resErr');
const resTime = document.getElementById('resTime');
const doneCountE1 = document.getElementById('doneCount');
const totalCountE1 = document.getElementById('totalCount');
const resetBtn = document.getElementById('resetBtn');
const nextBtnTop = document.getElementById('nextBtn');


/* Language */
const langButton = document.querySelectorAll('.lang-btn');


function formatTime(s){
    const mm = String(Math.floor(s/60)).padStart(2,"0");
    const ss = String(s%60).padStart(2,"0");
    return `${mm}:${ss}`;
}


function updateSidebarCount(){
    const total = SNIPPETS.filter(x=> x.lang === state.lang).length;
    totalCountE1.textContent = total;
    doneCountE1.textContent = state.doneCount 
}


function populatePracticeList(){
    practiceListE1.innerHTML = '';
    const item = SNIPPETS.filter(s => s.lang === state.lang);
    item.forEach(s=>{
        const el = document.createElement('div');
        el.className = 'practice-item'
        el.tabIndex = 0;
        el.dataset.id = s.id;
        el.innerHTML = `
                        <div style="flex:1">
                        <div style="font-weight:700 ; color:var(--green-soft)"> ${s.topic}</div>
                        <div style=" font-size:12px; color:var(--muted); margin-top:6px"> ${(s.text.split('\n')[1] || "").slice(0,60)}... </div> 
                        </div>  
                        <div class="dot"></div>
                        `
        el.addEventListener("click",()=>selectSnippet(s.id));
        practiceListE1.appendChild(el);
    })
    updateSidebarCount();
}


langButton.forEach(btn =>{
    btn.addEventListener("click", ()=>{
        langButton.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.lang=btn.dataset.lang;
        populatePracticeList();
        clearBoardaIntro();
    })
})

let caretE1 = null;

function selectSnippet(id){
    const sn = SNIPPETS.find(x => x.id == id);
    if (!sn) return;

    state.currentSnippet = sn;
    renderSnippet(sn.text);
    document.querySelectorAll(".practice-item").forEach(it => {
        it.classList.toggle('active' , it.dataset.id === id );
    });
    resetStateForSnippet();
}

function renderSnippet(text){
    text = text.replace(/\r\n/g,"\n");
    codeDisplay.innerHTML= '';
    const frag = document.createDocumentFragment();
    for(let i = 0 ; i < text.length ; i++){
        const ch = text[i];
        const span = document.createElement('span');
        span.className = 'char';
        span.dataset.index = i;

        //keep whitespace but invsble

        if(ch === ' ') span.textContent = ' ';
        else if(ch === '\n') span.textContent= "\n";
        else span.textContent=ch;
        frag.appendChild(span);
    }

    codeDisplay.append(frag);

    if(!caretE1){
        caretE1 = document.createElement('div');
        caretE1.className = 'caret';
        document.querySelector('.code-card').appendChild(caretE1);
    }

    positionCaretAt(0);
    setTimeout(()=>codeDisplay.focus(),80);
}


//reset

function resetStateForSnippet(){
    state.idx = 0;
    state.correctChar = 0;
    state.totalTyped = 0;
    state.errors = 0 ;
    state.started = false;
    state.startTime = null
    state.elapsed = 0;
    if(state.timeInterval){
        clearInterval(state.timeInterval);
        state.timeInterval = null;
    }
    hideTimer();
    document.querySelectorAll('#codeDisplay .char').forEach(s => {
        s.classList.remove('correct', 'wrong');
        s.style.opacity = 0.5
    });
    positionCaretAt(0);
}

// position caret

function positionCaretAt(index){
    const target = document.querySelector(`#codeDisplay .char[data-index="${index}"]`)
    if(!caretE1) return
    if (!target){
        caretE1.style.display = 'none'; 
        return;
    }

    caretE1.style.display = 'block';
    const cardRect = document.querySelector(".code-card").getBoundingClientRect();
    const tRect = target.getBoundingClientRect();
    const left = tRect.left - cardRect.left;
    const top = tRect.top - cardRect.top;

    caretE1.style.left = `${Math.max(6,left)}px`;
    caretE1.style.top = `${Math.max(18,top)}px`;
}


//timer

function showTimer(){
    timerPill.classList.add('show');
}

function hideTimer(){
    timerPill.classList.remove('show')
    timerE1.textContent = '00:00';
}

function startTimer(){
    state.startTime = Date.now();
    state.timeInterval = setInterval(()=>{
        state.elapsed = Math.floor((Date.now() - state.startTime)/1000);
        timerE1.innerText = formatTime(state.elapsed)
        },250);
}

function stopTimer(){
    if(state.timeInterval) clearInterval(state.timeInterval);
    state.timeInterval = null;
}

// typing handler

function handleKey(e){
    if(!state.currentSnippet) return;

    const ignore = ['Shift' , 'Control' , 'Alt' , 'Meta' , 'CapsLock' , 'ContextMenu'];

    if(ignore.includes(e.key)) return ;

    if (e.type === "paste"){
        e.preventDefault();
        return
    }

    if(e.key === "Backspace"){
        if(state.idx > 0){
            state.idx--;
            const span = document.querySelector(`#codeDisplay .char[data-index="${state.idx}"]`)
            if(span){
                if(span.classList.contains('correct'))  state.correctChar = Math.max(0,state.correctChar - 1);

                if(span.classList.contains('correct')) state.errors = Math.max(0,state.errors - 1)

                span.classList.remove('correct' , 'wrong');
                span.style.opacity = 0.5;
            }

            state.totalTyped = Math.max(0,state.totalTyped - 1);
            positionCaretAt(state.idx);
        }
        e.preventDefault();
        return
    }

    if(!state.started){
        state.started = true;
        showTimer();
        startTimer();
    }

    let ch = e.key === "Enter" ? '\n' : e.key;

    if(ch.length !== 1) return;

    const expected = state.currentSnippet.text[state.idx];

    const span = document.querySelector(`#codeDisplay .char[data-index="${state.idx}"]`);
    state.totalTyped++;

    if(expected === ch){
        if(span) {
            span.classList.add('correct');
            span.style.opacity = 1;
            state.correctChar++;
        } 
    }else{
        if(span){
            span.classList.add('wrong');
            span.style.opacity = 1;
            }
        state.errors++;
    }

    state.idx++;
    positionCaretAt(state.idx);

    if(state.idx >= state.currentSnippet.text.length){
        finishSession();
    }

    console.log(state)

    e.preventDefault();
}

function finishSession(){
    stopTimer();

    const elapsed = Math.max(1,state.elapsed);
    const wpm = Math.floor((state.correctChar / 5) / (elapsed / 60));
    const accuracy = state.totalTyped > 0 ? Math.floor((state.correctChar / state.totalTyped) * 100) : 100;


    //set popup values
    resWpm.textContent = wpm;
    resAcc.textContent = `${accuracy}%`;
    resErr.textContent = state.errors;
    resTime.textContent = formatTime(elapsed);

    //show popup

    popupMask.style.display = "flex";

    //increment done counter
    state.doneCount++;
    updateSidebarCount();
}

// popup action

document.getElementById('popupRestart').addEventListener('click',() =>{
    popupMask.style.display = 'none';
    resetStateForSnippet();

    //re-render (keep same snippet)
    renderSnippet(state.currentSnippet.text);
})

document.getElementById('popupNext').addEventListener('click' , ()=>{
    popupMask.style.display = 'none';
    pickNextSnippet();
})

// top button

resetBtn.addEventListener('click' , () =>{
    if(!state.currentSnippet) return;
    resetStateForSnippet();
    renderSnippet(state.currentSnippet.text);
})

nextBtnTop.addEventListener('click' ,()=> pickNextSnippet());


//pick next snippet (same language)

function pickNextSnippet(){
    const poo = SNIPPETS.filter(s => s.lang === state.lang)
    if(poo.length === 0 ) return 
    
    //find index of current
    let idx = poo.findIndex(s => s.id === (state.currentSnippet && state.currentSnippet.id));
    idx = (idx+1) % poo.length;
    const next = poo[idx];
    selectSnippet(next.id);
}


//helper clear intro

function clearBoardaIntro(){
    if(!state.currentSnippet){
        codeDisplay.innerHTML = `<div style="opcaity:0.5; color:var(--muted)">choose a practice topic to begin typing ... </div>`;
    }
}


document.addEventListener('keydown' , handleKey);

codeDisplay.addEventListener('paste' , (e) => e.preventDefault());

populatePracticeList();
updateSidebarCount()

//click a practice item if singke snippet onlye (optional)
// you can programmatically select first item if you want 

if(document.querySelector('.practice-item')){
    //do nothing let user pic the practice 
}


