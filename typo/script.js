const code = `// Lesson: Declaring Variables
              // Topic: const, let, var
              let chaiType = "Masala";
              const price = 20;
              var isHot = true;`;
        
const editor = document.getElementById("editor")
const chars = Array.from(code);  //array mai convert kardiya

chars.forEach((ch,idx) =>{
    const sp = document.createElement('span');
    sp.className = 'char';
    sp.dataset.index = idx;

    //console.log(sp) => <span class="char" data-index="154"></span>

    if(ch === '\n'){
        // only create span tag of new line and append br in editor
        const nl = document.createElement('span');
        nl.className = 'char newline-placeholder';
        nl.dataset.index = idx;
        nl.textContent = '\n';
        editor.appendChild(nl);
        editor.appendChild(document.createElement('br'))
        //console.log(nl) => <span class="char newlinel-placeholder" data-index="141"></span>

        //like new line deta hai so agar code mai thin line hai to do \n ka raha ga
    }else{
        sp.textContent = ch;
        editor.appendChild(sp);
    }
})

let index = 0;
const allspans = editor.querySelectorAll('.char') //includes newline-placeholder and single-char spans
//console.log(allspans) pura array laake deta hai span tag ka

function getSpanAt(i){
    return editor.querySelector(`.char[data-index = "${i}"]`)
}

//console.log(getSpanAt(3)) <span class="char" data-index="3">L</span>


function updateCurrentClass(){
    const prev = editor.querySelector(".char.current");
    //console.log("updatecurrentclass : ",prev); //<span class="char current" data-index="0">/</span>
    if (prev) prev.classList.remove('current');   // => current hata ta hai

    const cur = getSpanAt(index);
    if (cur){
        cur.classList.add('current');  // current dalta hai
        //console.log("updatecurrentclass : ",cur);
        cur.scrollIntoView({block : "nearest" , inline:"nearest"})
    }
}

const IGNORED_KEYS = new Set([
    'Shift' , 'Control' , 'Alt' , 'Meta' , 'CapsLock' , 'Tab',
    'ArrowLeft' , 'ArrowRight' , 'ArrowUp' , 'ArrowDown',
    'Home' , 'End' , 'PageUp' , 'Insert' , 'ContextMenu'
]);

//Set is used for faster lookup than arrays

editor.addEventListener('click' , () => editor.focus());
//So user can click anywhere in the editor and start typing.
// kahi bhi tap kar editor ke under vo typing start kardega


document.addEventListener('keydown' , (ev) =>{
    if(document.activeElement !== editor) return;

    if(IGNORED_KEYS.has(ev.key)){
        ev.preventDefault();
        return ;
    }

    //console.log("ev.key check: ",ev.key);
    
    if(ev.key === 'Backspace'){
        ev.preventDefault();
        if(index === 0) return ;
        index = Math.max(0,index-1);  // current wale ke picha chala jaata hai
        //console.log("index-backspace: ",index);
        const span = getSpanAt(index);
        if(!span) return ;
        span.classList.remove('correct' , 'wrong' , 'current');

        //Removes the previous letter’s color and resets it.
        //Moves cursor back visually.

        updateCurrentClass();
        return;
    }

    if (ev.key === 'Enter'){
        ev.preventDefault();
        processInputChar('\n'); //functioncall
        return
    }

    console.log(ev.key.length)

    if(ev.key.length === 1){
        ev.preventDefault();
        processInputChar(ev.key);
        return
    }
})

function processInputChar(inputChar){
    const expected = chars[index];  // compaire karne mai use hoga
    //console.log(expected);
    const span = getSpanAt(index);   //color dalne mai use hoga
    //console.log(span);
    if(!span) return;

    if(expected === '\n'){
        if(inputChar === '\n'){ //'\n'  === '\n'
            span.classList.add('correct')
        }else{
            span.classList.add('wrong');
        }
    }else{
        if(inputChar === expected){
            span.classList.add('correct')
        }else{
            span.classList.add('wrong')
        }
    }
    //console.log("processInputChar: ", chars.length - 1 , index + 1)
    index = Math.min(chars.length - 1 , index + 1);
    //console.log("processInputChar: ", index)
    let correct  = document.querySelectorAll('.correct');
    //console.log("correct : ", correct.length)
    let wrong = document.querySelectorAll('.wrong');
    //console.log("wrong : ", wrong.length)
    updateCurrentClass();
}

window.resetTyping = function() {
    index = 0;
    allspans.forEach(s => s.classList.remove('correct' , 'wrong' ,'current'));
    updateCurrentClass();
}
