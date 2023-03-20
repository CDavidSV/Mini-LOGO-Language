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
    instructions = [];
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
        "marron": "#A52A2A",
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

        // Commands to be called for the robot to perform actions.
        this.commands = {
            "adelante": (distancia) => this.moveTo(distancia),
            "ade": (distancia) => this.moveTo(distancia),
            "atras": (distancia) => this.moveTo(-distancia),
            "atr": (distancia) => this.moveTo(-distancia),
            "derecha": (angle) => this.addAngle(angle),
            "der": (angle) => this.addAngle(angle),
            "izquierda": (angle) => this.addAngle(-angle),
            "izq": (angle) => this.addAngle(-angle),
            "levantar_pluma": () => this.pickupPen(),
            "lp": () => this.pickupPen(),
            "bajar_pluma": () => this.dropPen(),
            "bp": () => this.dropPen(),
            "centrar": () => this.center(),
            "ctr": () => this.center(),
            "limpiar": () => clearScreen(),
            "color": (color) => this.changeColor(color) ,
        };
    }

    moveTo(units) {
        const radians = this.angle * (Math.PI / 180);
        const newX = this.posX - units * Math.cos(radians); // Calculate new x position.
        const newY = this.posY - units * Math.sin(radians); // Calculate new y position.

        this.prevPosX = this.posX;
        this.prevPosY = this.posY;
        this.posX = newX;
        this.posY = newY;

        this.robot.style.left =`${this.posX}px`;
        this.robot.style.top =`${this.posY}px`;

        if (this.penUp) { // Check if the pen is held to draw.
            this.drawLine(); // Draw the line.
        }
    }

    // Adds the angle to the current angle the robot is facing.
    addAngle(angle) {
        const addedAngles = this.angle + parseInt(angle);
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

    // Centers the robot and resets the angle.
    center() {
        this.posX = (canvasContainer.offsetWidth / 2);
        this.posY = (canvasContainer.offsetHeight / 2);
        this.robot.style.left =`${this.posX}px`;
        this.robot.style.top =`${this.posY}px`;
        this.angle = 90;
        this.addAngle(0);
    }

    drawLine() {
        ctx.strokeStyle = this.penColor;
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.moveTo(this.prevPosX, this.prevPosY);
        ctx.lineTo(this.posX, this.posY);
        ctx.stroke();
    }

    // Sets new instuctions given by a Paser.
    setInstrunctions(newInstructions) {
        newInstructions.forEach(i => this.instructions.push(i));
        this.executeCommands(newInstructions);
    }

    // Recursively call all functions based on the instructions given by the Parser.
    executeCommands(instructions=this.instructions) {
        for (let instruction of instructions) {
            if (instruction.type === "command") {
                this.commands[instruction.body](instruction.value);
            } else if (instruction.type === "loop") {
                for (let i = 0; i < instruction.value; i++) {
                    this.executeCommands(instruction.body);
                }
            }
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

    // We clear the canvas and redraw the paths so that they always appear centered.
    robot.changeColor('blanco');
    clearScreen();
    robot.center();
    robot.executeCommands();

    if (robot.instructions.length < 1) {
        robot.center();
    }
}

canvas.width = canvasContainer.offsetWidth;
canvas.height = canvasContainer.offsetHeight;
ctx.fillStyle = mainCanvasColor;
ctx.fillRect(0, 0, canvasContainer.offsetWidth, canvasContainer.offsetHeight);
const robot = new Robot(robotElement);