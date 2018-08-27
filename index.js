class Ship {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.font = 230;
        this.back = 250;
        this.left = 240;
        this.center = 250;
        this.right = 260;
        this.draw(0, 0);
    }

    draw(deltaX, deltaY) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.beginPath();
        this.ctx.strokeStyle = '#49b04f';
        this.ctx.fillStyle = '#d2ecd2';
        this.ctx.lineWidth = 5;
        this.ctx.moveTo(this.center + deltaX, this.front + deltaY);
        this.ctx.lineTo(this.left + deltaX, this.back + deltaY);
        this.ctx.lineTo(this.right + deltaX, this.back + deltaY);
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.fill();
    }
}

let keys = [];
let deltaX = 0;
let deltaY = 0;

const DIRECTIONS = Object.freeze({
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
});

const handleKeyDown = function(ship, ctx, canvas) {
    return function(e) {
        keys[e.keyCode] = true;

        if (keys[DIRECTIONS.LEFT]) {deltaX -= 5; }
        if (keys[DIRECTIONS.UP]) {deltaY -= 5; }
        if (keys[DIRECTIONS.RIGHT]) {deltaX += 5; }
        if (keys[DIRECTIONS.DOWN]) {deltaY += 5; }

        e.preventDefault();

        ship.draw(deltaX, deltaY);
    };
};

const handleKeyUp = function(e) {
    keys[e.keyCode] = false;
}

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.canvas.height = 500;
        this.canvas.width = 500;
        this.ship = new Ship(this.ctx, this.canvas);
    }

    start() {
        addEventListener("keydown", handleKeyDown(this.ship, this.ctx, this.canvas), false);
        addEventListener("keyup", handleKeyUp, false);

        this.ship.draw(0, 0);
    }
}

let canvas = document.getElementById('screen');
let game = new Game(canvas);

game.start();