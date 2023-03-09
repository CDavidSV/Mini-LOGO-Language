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
    constructor(canvas, x= 0, y=0,direction) {
        this.canvas =canvas;
        this.ctx = canvas.getContext("2d")
        this.x = x
        this.y = y
        this.PenDown = true
        this.direction = direction
        this.angle = 0
    }

    update() {

    }

    move(units) {
        const angle = (this.direction * Math.PI) / 180; // Convertir el ángulo a radianes
        const newX = this.x + units * Math.cos(angle); // Calcular la nueva posición x
        const newY = this.y + units * Math.sin(angle); // Calcular la nueva posición y
    
        // Verificar que la nueva posición esté dentro del área de dibujo
        if (newX >= 0 && newX <= this.canvas.width && newY >= 0 && newY <= this.canvas.height) {
          if (this.penDown) {
            // Dibujar la línea
            this.ctx.beginPath();
            this.ctx.moveTo(this.x, this.y);
            this.ctx.lineTo(newX, newY);
            this.ctx.stroke();
          }
    
          // Actualizar la posición del robot
          this.x = newX;
          this.y = newY;
        }
      }
    move_forward(units){
        move(units)
    }
    move_backwards(units){
        move(-units)
    }

    rotate(angle) {
        const radianes = angle * (Math.PI/180)
        ctx.translate(this.x,this.y)
        ctx.rotate(radianes)
        ctx.translate(-this.x, -this.y)
        this.angle +=angle

    }
    rotate_right(angle){
        this.rotate(angle)
    }

    rotate_left(angle){
        this.rotate(-angle)
    }


    pickupPen() {
        this.PenDown = false
    }

    dropPen(){
        this.PenDown = true
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