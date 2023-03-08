// Dom Variables
const clear = document.querySelector('.clear');
const codeInput = document.querySelector('.code-input');

// Variables

// Events
clear.addEventListener('click', clearEditor);

// Functions

function clearEditor() {
    codeInput.value = '';
    codeInput.focus();
}