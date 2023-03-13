// Dom Variables
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const canvasContainer = document.querySelector('.draw-area');
const robotElement = document.querySelector('#robot');

// Variables
const mainCanvasColor = '#343541';

// Events
window.addEventListener('resize', resizeCanvas);

class Robot {
    width = 30;
    height = 30;
    paths = [];
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

    constructor(robotElement) {
        this.prevPosX = canvasContainer.offsetWidth / 2;
        this.prevPosY = canvasContainer.offsetHeight / 2;
        this.posX = canvasContainer.offsetWidth / 2;
        this.posY = canvasContainer.offsetHeight / 2;
        this.angle = 90;
        this.penColor = "#FFFFFF";
        this.penUp = true;
        this.robot = robotElement;
    }

    moveTo(units, storePath = true) {
        const radians = this.angle * (Math.PI / 180);
        const newX = this.posX - units * Math.cos(radians); // Calculate new x position
        const newY = this.posY - units * Math.sin(radians); // Calculate new y position

        this.prevPosX = this.posX;
        this.prevPosY = this.posY;
        this.posX = newX;
        this.posY = newY;

        // Save the path into paths array.
        if (storePath) {
            this.paths.push({length: units, angle: this.angle, currentColor: this.penColor, penUp: this.penUp});
        }

        this.robot.style.left =`${this.posX}px`;
        this.robot.style.top =`${this.posY}px`;

        if (this.penUp) {
            this.drawLine();
        }
    }

    addAngle(angle) {
        const addedAngles = this.angle + angle
        const k = Math.floor((addedAngles) / 360);

        this.angle = addedAngles - (360 * k);
        this.robot.style.transform = `translate(-50%, -50%) rotate(${this.angle - 90}deg)`;
    }

    pickupPen() {
        this.penUp = true;
    }

    dropPen() {
        this.penUp = false;
    }
    
    changeColor(color) {
        if (!this.penColors.hasOwnProperty(color)) return;
        this.penColor = this.penColors[color];
    }

    center() {
        this.posX = (canvasContainer.offsetWidth / 2);
        this.posY = (canvasContainer.offsetHeight / 2);
        this.robot.style.left =`${this.posX}px`;
        this.robot.style.top =`${this.posY}px`;
    }

    drawLine() {
        ctx.strokeStyle = this.penColor;
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.moveTo(this.prevPosX, this.prevPosY);
        ctx.lineTo(this.posX, this.posY);
        ctx.stroke();
    }

    // This function will be called when the screen is resized
    reconstructPath() {
        if (this.paths.length < 1) return;

        // Clear canvas
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = mainCanvasColor;
        ctx.fillRect(0, 0, canvasContainer.offsetWidth, canvasContainer.offsetHeight);
        ctx.globalCompositeOperation = "lighter";

        // Reset robot's position and angle
        this.prevPosX = canvasContainer.offsetWidth / 2;
        this.prevPosY = canvasContainer.offsetHeight / 2;
        this.posX = canvasContainer.offsetWidth / 2;
        this.posY = canvasContainer.offsetHeight / 2;
        this.angle = 90;

        // Redraw all paths
        for(let path of this.paths) {
            this.penColor = path.currentColor;
            this.angle = path.angle;
            this.penUp = path.penUp;

            this.moveTo(path.length, false);
        }
    }
}

// Functions

// Clears the canvas.
function clearScreen() {
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = mainCanvasColor;
    ctx.fillRect(0, 0, canvasContainer.offsetWidth, canvasContainer.offsetHeight);
    ctx.globalCompositeOperation = "lighter";
    robot.paths = [];
}

// Resizes the canvas when user resizes their browser window.
function resizeCanvas() {
    canvas.width = canvasContainer.offsetWidth;
    canvas.height = canvasContainer.offsetHeight;
    robot.reconstructPath();

    if (robot.paths.length < 1) {
        robot.center();
    }
}

// Debounce the resize event
function debouncedResize() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(resizeCanvas, 500);
}

canvas.width = canvasContainer.offsetWidth;
canvas.height = canvasContainer.offsetHeight;
ctx.fillStyle = mainCanvasColor;
ctx.fillRect(0, 0, canvasContainer.offsetWidth, canvasContainer.offsetHeight);
const robot = new Robot(robotElement);