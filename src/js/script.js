// Dom Variables
const clear = document.querySelector('.clear');
const codeInput = document.querySelector('.code-input');
const run = document.querySelector('.run-btn');
const error = document.querySelector('.error-msg');

// Variables

// Events
clear.addEventListener('click', clearEditor);
run.addEventListener('click', runInterpreter);
codeInput.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        run.click();
    }
});

// Functions

function clearEditor() {
    codeInput.value = '';
    codeInput.focus();
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
        console.log(interpreterObj.commands)
        robot.executeCommands(interpreterObj.commands);
        clearEditor();
    }
}