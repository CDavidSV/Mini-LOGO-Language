// Dom Variables
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const canvasContainer = document.querySelector('.draw-area');

// Variables
const interval = 1000 / 60;
let then = Date.now();
let now;
let delta;
const mainCanvasColor = '#0F0F0F';
const penColors = ["red", "blue", "green", "yellow", "orange", "purple", "black", "white", "gray", "brown", "pink", "turquoise", "lavender", "teal", "maroon", "navy", "olive", "coral", "beige", "gold"];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle = mainCanvasColor;

// Events
window.addEventListener('resize', resizeCanvas);

class Robot {
    constructor() {

    }

    update() {

    }

    move(direction) {

    }

    rotate(angle) {

    }

    pickupPen() {

    }

    dropPen(){

    }
    
    changeColor(color) {

    }

    center() {

    }
}

// Functions

// Clears the canvas.
function clearScreen() {
    context.globalCompositeOperation = 'source-over';
    context.fillStyle = mainCanvasColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.globalCompositeOperation = "lighter";
}

// Main animate function.
function animate() {
    // Update the rockets position over time.
    requestAnimationFrame(animate);

    now = Date.now();
    delta = now - then
    if (!(delta > interval)) return;
}

// Resizes the canvas when user resizes their browser window.
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

animate();