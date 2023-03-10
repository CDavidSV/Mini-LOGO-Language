// Dom Variables
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const canvasContainer = document.querySelector('.draw-area');

// Variables
const mainCanvasColor = '#343541';

// Events
window.addEventListener('resize', resizeCanvas);

class Robot {
    width = 30;
    height = 30;
    penColors = {
        "rojo": "#FF0000",
        "azul": "#0000FF",
        "verde": "#00FF00",
        "amarillo": "#FFFF00",
        "naranja": "#FFA500",
        "morado": "#800080",
        "negro": "#000000",
        "blanco": "#FFFFFF",
        "gris": "#808080",
        "marrón": "#A52A2A",
        "rosa": "#FFC0CB",
        "turquesa": "#40E0D0",
        "lavanda": "#E6E6FA",
        "granate": "#800000",
        "oliva": "#808000",
        "coral": "#FF7F50",
        "beige": "#F5F5DC",
    };

    constructor() {
        this.prevPosX = canvas.width / 2;
        this.prevPosY = canvas.height / 2;
        this.posX = canvas.width / 2;
        this.posY = canvas.height / 2;
        this.angle = 90;
        this.penColor = "#FFFFFF";
        this.penUp = true;
        this.img = new Image();
        this.img.src = '../assets/icons/robot.png';
    }

    move(units) {
        const radians = this.angle * (Math.PI / 180);
        const newX = this.posX - units * Math.cos(radians); // Calculate new x position
        const newY = this.posY - units * Math.sin(radians); // Calculate new y position
        this.prevPosX = this.posX;
        this.prevPosY = this.posY;
        this.posX = newX;
        this.posY = newY;

        this.drawRobot();
        if (this.penUp) {
            this.drawLine();
        }
    }

    setAngle(angle) {
        const addedAngles = this.angle + angle
        const k = Math.floor((addedAngles) / 360);

        this.angle = addedAngles - (360 * k);
    }

    rotateRight(angle){
        this.setAngle(-angle);
    }

    rotateLeft(angle){
        this.setAngle(angle);
    }

    pickupPen() {
        this.penUp = true;
    }

    dropPen(){
        this.penUp = false;
    }
    
    changeColor(color) {
        if (!this.penColors.hasOwnProperty(color)) return;
        this.penColor = this.penColors[color];
    }

    center() {
        this.posX = (canvas.width / 2);
        this.posY = (canvas.height / 2);
    }

    drawRobot() {
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = mainCanvasColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = "lighter";
        ctx.drawImage(this.img, this.posX - (this.width / 2), this.posY - (this.height / 2), this.width, this.height);
    }

    drawLine() {
        ctx.strokeStyle = this.penColor;
        ctx.lineWidth = 2;
        ctx.moveTo(this.prevPosX, this.prevPosY);
        ctx.lineTo(this.posX, this.posY);
        ctx.stroke();
    }
}

// Functions

// Clears the canvas.
function clearScreen() {
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = mainCanvasColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "lighter";
}

// Resizes the canvas when user resizes their browser window.
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle = mainCanvasColor;
ctx.fillRect(0, 0, canvas.width, canvas.height);
const robot = new Robot();
robot.img.onload = () => {
    robot.drawRobot();
};