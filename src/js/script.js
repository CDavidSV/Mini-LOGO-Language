// Dom Variables
const clear = document.querySelector('.clear');
const codeInput = document.querySelector('.code-input');
const run = document.querySelector('.run-btn');
const error = document.querySelector('.error-msg');

// Variables

// Events
clear.addEventListener('click', clearEditor);
run.addEventListener('click', runInterpreter);

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
}