class Parser {
    constructor() {
        this.inputString = "";
        this.tokens = [];
        this.token = "";
        this.previousTokenIndex = -1;
        this.tokenIndex = 0;
        this.result = {status: 'Waiting', desc: 'Waiting for Input string'};
        this.loops = 0;
    }

    // Recursively check all tokens for syntax or lexic errors.
    command() {
        if (this.result.status === 'Error') return;

        if (this.token && this.token.match(/^(adelante|ade|atras|atr|derecha|der|izquierda|izq)$/)) {
            this.token = this.nextToken();
            this.number();
            this.generateCommand('command', this.tokens[this.previousTokenIndex], this.token);
            this.token = this.nextToken();
            this.command();
        } else if (this.token && this.token.match(/^(levantar_pluma|lp|bajar_pluma|bp|centrar|ctr|limpiar)$/)){
            this.generateCommand('command', this.token, null);
            this.token = this.nextToken();
            this.command();
        } else if (this.token && this.token.match(/^(color)$/)) {
            this.token = this.nextToken();
            this.color();
            this.generateCommand('command', this.tokens[this.previousTokenIndex], this.token);
            this.token = this.nextToken();
            this.command();
        } else if (this.token && this.token.match(/^(repetir)$/)) {
            this.token = this.nextToken();
            this.loop();
            this.token = this.nextToken();
            this.command();
        } else if (this.loops >= 1 && (this.token === '[' || this.token === ']')) { // In case we are inside a loop "[" & "]" are valid for delimitting commands used inside a loop.
            this.result = {status: "Success", desc: "Todos los comandos se han analizado con éxito"}; 
        } else if (this.token) {
            this.result = {status: "Error", desc: `Comando no reconocido (${this.token})`};
            return;
        } else {
            this.result = {status: "Success", desc: "Todos los comandos se han analizado con éxito"};
        }
    }

    // Verify colors.
    color() {
        if (this.token && !this.token.match(/^(rojo|azul|verde|amarillo|naranja|morado|negro|blanco|gris|marron|rosa|turquesa|lavanda|granate|oliva|coral|beige)$/)) {
            this.result = {status: "Error", desc: `"${this.token}" no es un color valido`}; 
            return;
        }
        if (!this.token) {
            this.result = {status: "Error", desc: `Este comando requiere un valor (${this.tokens[this.previousTokenIndex]})`};
            return;
        }
    }

    // Verify Numbers.
    number() {
        if (this.token && !this.token.match(/^\d+$/)) {
            this.result = {status: "Error", desc: `"${this.token}" no es un valor valido para este comando (${this.tokens[this.previousTokenIndex]})`};
            return;
        }
        if (!this.token) {
            this.result = {status: "Error", desc: `Este comando requiere un valor (${this.tokens[this.previousTokenIndex]})`};
            return;
        }
    }

    // Handles loops
    loop() {
        this.number();
        if (this.result.status === 'Error') return;
        
        this.generateCommand('loop', [], this.token);
        this.token = this.nextToken();
        if (this.token && !this.token.match(/^\[$/)) {
            this.result = {status: "Error", desc: `Se esperaba el corchete para el comando "repetir"`};
            return;
        }
        
        const startIndex = this.commands.length;
        this.loops++;
        this.token = this.nextToken();
        
        this.command();
        if (this.result.status === 'Error') return;

        this.loops--;
        const endIndex = this.commands.length;

        const slicedCommands = this.commands.slice(startIndex, endIndex); // Verify where inside the commands array it will go. In case it is neested loop.
        this.commands[startIndex - 1].body = slicedCommands;
        this.commands.splice(startIndex, endIndex);

        if (!this.token || !this.token.match(/^\]$/)) {
            this.result = {status: "Error", desc: `Se esperaba el cierre de corchete para el comando "repetir"`};
            return;
        }
    }
    
    // Get next token.
    nextToken() {
        this.previousTokenIndex++;
        return this.tokens[++this.tokenIndex];
    }

    // Add the commands to the commands array.
    generateCommand(type, body, value) {
        this.commands.push({type, body, value});
    }

    parseString(inputString) {
        this.inputString = "";
        this.commands = [];
        this.tokens = [];
        this.token = "";
        this.tokenIndex = 0;

        this.inputString = inputString;
        
        // Each "[" & "]" count as separate tokens.
        this.inputString = this.inputString.replace(/\[/g, ' [ ');
        this.inputString = this.inputString.replace(/\]/g, ' ] ');
        this.tokens = this.inputString.toLowerCase().split(/\s+/); // Separate the commands by spaces.
        
        this.token = this.tokens[this.tokenIndex];
        this.command(); // Call main function with first token.

        if (this.result.status === 'Error') this.commands = [];
        return {result: this.result, commands: this.commands};
    }
}