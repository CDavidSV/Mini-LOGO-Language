// Dom Variables
const clear = document.querySelector('.clear');
const codeInput = document.querySelector('.code-input');
const run = document.querySelector('.run-btn');
const error = document.querySelector('.error-msg');

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
}

// Events
clear.addEventListener('click', clearEditor);
run.addEventListener('click', runInterpreter);
codeInput.addEventListener('keyup', (e) => {
    switch (e.keyCode) {
        case 13:
            e.preventDefault();
            run.click();
            break;
        case 38:
            console.log(1);
            break;
        case 40:
            console.log(2);
            break;
    }
});

// Functions
function clearEditor() {
    codeInput.value = '';
    codeInput.focus();
}

function tryCommand(event) {
    codeInput.value = commands[event.target.closest('.command').id];
}

function runInterpreter() {
    if (codeInput.value.length < 1) {
        error.innerHTML = 'Error: No se ha ingresado ningún comando';
        return;
    }

    error.innerHTML = '';
    const interpreter = new Interpreter();
    const interpreterObj = interpreter.parseString(codeInput.value);

    if (interpreterObj.result.status === 'Error') {
        error.innerHTML = `${interpreterObj.result.status}: ${interpreterObj.result.desc}`;
    } else {
        robot.setInstrunctions(interpreterObj.commands);
        clearEditor();
    }
}