// Dom Variables
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const canvasContainer = document.querySelector('.draw-area');

// Variables
const mainColor = '#0F0F0F';

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle = mainColor;

// Events
window.addEventListener('resize', resizeCanvas);

// Functions

// Resizes the canvas when user resizes their browser window.
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}