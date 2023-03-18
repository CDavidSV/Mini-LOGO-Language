// Dom Variables
const clear = document.querySelector('.clear');
const codeInput = document.querySelector('.code-input');
const run = document.querySelector('.run-btn');
const error = document.querySelector('.error-msg');
const menuBtn = document.querySelectorAll('#menu-btn');
const menu = document.querySelector('.menu');

// Variables
const commands = {
    1: 'adelante 50',
    2: 'atras 50',
    3: 'derecha 45',
    4: 'izquierda 45',
    5: 'color azul',
    6: 'levantar_pluma',
    7: 'bajar_pluma',
    8: 'centrar',
    9: 'limpiar',
    10: 'repetir 100 [adelante 200 derecha 89]'
}
const enteredCommands = [];
let commandIndex = 0;
let menuOpen = false;

// Events
clear.addEventListener('click', clearEditor);
run.addEventListener('click', runParser);
menuBtn.forEach(btn => btn.addEventListener('click', handleMenu));
codeInput.addEventListener('keyup', (e) => {
    handleyKeyInputs(e);
});

// Functions

function handleyKeyInputs(e) {
    e.preventDefault();
    switch (e.keyCode) {
        case 13:
            run.click();
            break;
        case 38:
            if (enteredCommands.length < 1) return;                
            if (commandIndex !== 0) commandIndex--;
            codeInput.value = enteredCommands[commandIndex];
            break;
        case 40:
            if (enteredCommands.length < 1) return;        
            if (commandIndex < enteredCommands.length - 1) commandIndex++;
            codeInput.value = enteredCommands[commandIndex];
            break;
    }
}

function handleMenu() {
    if (!menuOpen) {
        menu.classList.add('active');
        menuOpen = true;
        return;
    }
    menu.classList.remove('active');
    menuOpen = false;
}

function clearEditor() {
    codeInput.value = '';
    codeInput.focus();
}

function tryCommand(event) {
    codeInput.value = commands[event.target.closest('.command').id];
  
    handleMenu();
}

function runParser() {
    commandIndex = enteredCommands.length;
    if (codeInput.value.length < 1) {
        error.innerHTML = 'Error: No se ha ingresado ningún comando';
        return;
    }

    error.innerHTML = '';
    const parser = new Parser();
    const parserObj = parser.parseString(codeInput.value);

    if (parserObj.result.status === 'Error') {
        error.innerHTML = `${parserObj.result.status}: ${parserObj.result.desc}`;
    } else {
        robot.setInstrunctions(parserObj.commands);
        enteredCommands.push(codeInput.value);
        commandIndex++;
        codeInput.value = '';
    }
}