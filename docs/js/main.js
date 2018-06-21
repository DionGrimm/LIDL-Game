"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Biem = (function () {
    function Biem(game, x, y) {
        this.width = 104;
        this.height = 104;
        this.sprite = document.getElementById('biem');
        this.sound = document.getElementById('biemSnd');
        this.game = game;
        this.x = x;
        this.y = y;
        this.sound.play();
        for (var i in this.game.pepe) {
            if (this.explode(this.game.pepe[i])) {
                this.game.pepe.splice(parseInt(i), 1);
            }
        }
        if (this.explode(this.game.player1)) {
            this.game.master.endGame(2);
        }
        if (this.explode(this.game.player2)) {
            this.game.master.endGame(1);
        }
    }
    Biem.prototype.update = function () {
        this.game.master.ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    };
    Biem.prototype.explode = function (object) {
        if (object.x > this.x - object.width && object.x < this.x + this.width && object.y > this.y - object.height && object.y < this.y + this.height) {
            return true;
        }
        else {
            return false;
        }
    };
    return Biem;
}());
var EndScreen = (function () {
    function EndScreen(master, winner) {
        var _this = this;
        this.ready = false;
        this.master = master;
        this.winner = winner;
        if (winner == 1) {
            this.master.score1++;
        }
        else if (winner == 2) {
            this.master.score2++;
        }
        window.addEventListener("keydown", function (e) { return _this.onKeyPress(e); });
    }
    EndScreen.prototype.update = function () {
        this.master.ctx.fillStyle = "black";
        this.master.ctx.font = "64px VT323";
        this.master.ctx.textAlign = "center";
        this.master.ctx.fillText("monkaS", this.master.canvas.width / 2, 100);
        this.master.ctx.font = "32px VT323";
        this.master.ctx.fillText("PRESS ENTER TO START", this.master.canvas.width / 2, this.master.canvas.height / 2);
        this.master.ctx.fillText("PLAYER " + this.winner + " WON THIS ROUND", this.master.canvas.width / 2, this.master.canvas.height / 2 - 100);
        if (this.ready)
            this.master.startGame();
    };
    EndScreen.prototype.onKeyPress = function (e) {
        if (e.keyCode == 13) {
            this.ready = true;
        }
    };
    return EndScreen;
}());
var Game = (function () {
    function Game(master) {
        var _this = this;
        this.pepe = [];
        this.biem = [];
        this.biemCD = 100;
        this.music = document.getElementById('music');
        this.update = function () {
            for (var i in _this.biem) {
                _this.biem[i].update();
            }
            _this.player1.update();
            _this.player2.update();
            for (var i in _this.pepe) {
                _this.pepe[i].update();
            }
            if (_this.biemCD > 0) {
                _this.biemCD--;
            }
        };
        this.master = master;
        this.music.play();
        this.player1 = new Player(this, 1, 87, 83, 65, 68, 32);
        this.player2 = new Player(this, 2, 38, 40, 37, 39, 16);
        for (var i = 0; i < 5 + Math.floor(Math.random() * 10); i++) {
            this.pepe.push(new Pepe(this));
        }
        window.addEventListener("keydown", function (e) { return _this.onKeyPress(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyRelease(e); });
        requestAnimationFrame(this.update);
    }
    Game.prototype.onKeyPress = function (e) {
        this.player1.keyPress(e);
        this.player2.keyPress(e);
        if (e.keyCode == 66 && this.biemCD == 0) {
            this.biemCD = 180;
            var i = Math.floor(Math.random() * this.pepe.length);
            this.biem.push(new Biem(this, this.pepe[i].x, this.pepe[i].y));
            this.pepe.splice(i, 1);
        }
    };
    Game.prototype.onKeyRelease = function (e) {
        this.player1.keyRelease(e);
        this.player2.keyRelease(e);
    };
    return Game;
}());
var GameObject = (function () {
    function GameObject(game) {
        this.width = 38;
        this.height = 32;
        this.hspeed = 0;
        this.vspeed = 0;
        this.maxSpeed = 3;
        this.sprite = document.getElementById('pepe');
        this.spriteRight = document.getElementById('pepe');
        this.spriteLeft = document.getElementById('pepeLeft');
        this.spriteAttackRight = document.getElementById('pepeAttack');
        this.spriteAttackLeft = document.getElementById('pepeAttackLeft');
        this.game = game;
        this.x = Math.random() * (this.game.master.canvas.width - this.width);
        this.y = Math.random() * (this.game.master.canvas.height - this.height);
    }
    GameObject.prototype.update = function () {
        this.game.master.ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    };
    GameObject.prototype.hCollision = function () {
        if (this.x + this.hspeed <= 0 || this.x + this.hspeed >= this.game.master.canvas.width - this.width + 19) {
            return true;
        }
        else {
            return false;
        }
    };
    GameObject.prototype.vCollision = function () {
        if (this.y + this.vspeed <= 0 || this.y + this.vspeed >= this.game.master.canvas.height - this.height) {
            return true;
        }
        else {
            return false;
        }
    };
    GameObject.prototype.boxCollision = function (object) {
        if (object.x > this.x + this.hspeed - object.width && object.x < this.x + this.hspeed + this.width && object.y > this.y + this.vspeed - object.height && object.y < this.y + this.vspeed + this.height) {
            return true;
        }
        else {
            return false;
        }
    };
    return GameObject;
}());
var Master = (function () {
    function Master() {
        var _this = this;
        this.canvas = document.getElementById('cnvs');
        this.ctx = this.canvas.getContext("2d");
        this.score1 = 0;
        this.score2 = 0;
        this.update = function () {
            _this.ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
            _this.ctx.fillStyle = "#fff59d";
            _this.ctx.fillRect(0, 0, _this.canvas.width, _this.canvas.height);
            _this.ctx.fillStyle = "black";
            _this.ctx.font = "32px VT323";
            _this.ctx.textAlign = "center";
            _this.ctx.fillText(_this.score1 + " vs " + _this.score2, _this.canvas.width / 2, 180);
            _this.currentscreen.update();
            requestAnimationFrame(_this.update);
        };
        this.canvas.width = 720;
        this.canvas.height = 720;
        this.currentscreen = new StartScreen(this);
        this.update();
    }
    Master.prototype.startGame = function () {
        this.currentscreen = new Game(this);
    };
    Master.prototype.endGame = function (winner) {
        this.currentscreen = new EndScreen(this, winner);
    };
    return Master;
}());
window.addEventListener("load", function () { return new Master(); });
var Pepe = (function (_super) {
    __extends(Pepe, _super);
    function Pepe(game) {
        var _this = _super.call(this, game) || this;
        _this.moving = false;
        _this.movingLength = Math.random() * 150 + 50;
        _this.currentMovingCD = Math.random() * 150 + 50;
        _this.x_input = 0;
        _this.y_input = 0;
        _this.hspeed = 0;
        _this.vspeed = 0;
        return _this;
    }
    Pepe.prototype.update = function () {
        if (this.currentMovingCD > 0) {
            this.currentMovingCD--;
        }
        if (this.currentMovingCD < 1 && !this.moving) {
            this.moving = true;
            this.move();
            this.movingLength = Math.random() * 150 + 50;
        }
        if (this.moving) {
            this.movingLength--;
        }
        if (this.movingLength < 1 && this.moving) {
            this.moving = false;
            this.hspeed = 0;
            this.vspeed = 0;
            this.currentMovingCD = Math.random() * 150 + 50;
        }
        if (this.hCollision()) {
            this.hspeed = 0;
        }
        if (this.vCollision()) {
            this.vspeed = 0;
        }
        this.x += this.hspeed;
        this.y += this.vspeed;
        _super.prototype.update.call(this);
    };
    Pepe.prototype.move = function () {
        var diagonal;
        var chance = Math.random();
        if (chance < .33) {
            this.x_input = -1;
        }
        else if (chance < .66) {
            this.x_input = 0;
        }
        else {
            this.x_input = 1;
        }
        var chance2 = Math.random();
        if (chance2 < .33) {
            this.y_input = -1;
        }
        else if (chance2 < .66) {
            this.y_input = 0;
        }
        else {
            this.y_input = 1;
        }
        if (this.x_input != 0 && this.y_input != 0) {
            diagonal = true;
        }
        else {
            diagonal = false;
        }
        this.hspeed = this.x_input * this.maxSpeed;
        this.vspeed = this.y_input * this.maxSpeed;
        if (diagonal) {
            this.hspeed *= 0.851;
            this.vspeed *= 0.851;
        }
    };
    return Pepe;
}(GameObject));
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(game, name, up, down, left, right, attack) {
        var _this = _super.call(this, game) || this;
        _this.up = 0;
        _this.down = 0;
        _this.left = 0;
        _this.right = 0;
        _this.attackCD = 20;
        _this.currentAttackCD = 0;
        _this.canAttack = true;
        _this.attackSnd = document.getElementById('hit');
        _this.name = name;
        _this.keyUp = up;
        _this.keyDown = down;
        _this.keyLeft = left;
        _this.keyRight = right;
        _this.keyAttack = attack;
        return _this;
    }
    Player.prototype.update = function () {
        if (this.currentAttackCD > 0) {
            this.currentAttackCD--;
        }
        if (this.currentAttackCD < 1) {
            if (this.sprite == this.spriteAttackLeft) {
                this.sprite = this.spriteLeft;
            }
            else if (this.sprite == this.spriteAttackRight) {
                this.sprite = this.spriteRight;
            }
            this.canAttack = true;
        }
        var x_input = this.right - this.left;
        var y_input = this.down - this.up;
        if (x_input == -1) {
            this.sprite = this.spriteLeft;
        }
        else if (x_input == 1) {
            this.sprite = this.spriteRight;
        }
        var diagonal = false;
        if (x_input != 0 && y_input != 0) {
            diagonal = true;
        }
        else {
            diagonal = false;
        }
        this.hspeed = x_input * this.maxSpeed;
        this.vspeed = y_input * this.maxSpeed;
        if (diagonal) {
            this.hspeed *= 0.851;
            this.vspeed *= 0.851;
        }
        if (this.hCollision()) {
            this.hspeed = 0;
        }
        if (this.vCollision()) {
            this.vspeed = 0;
        }
        this.x += this.hspeed;
        this.y += this.vspeed;
        _super.prototype.update.call(this);
    };
    Player.prototype.keyPress = function (e) {
        if (e.keyCode == this.keyUp)
            this.up = 1;
        if (e.keyCode == this.keyDown)
            this.down = 1;
        if (e.keyCode == this.keyLeft)
            this.left = 1;
        if (e.keyCode == this.keyRight)
            this.right = 1;
        if (e.keyCode == this.keyAttack && this.canAttack)
            this.attack();
    };
    Player.prototype.keyRelease = function (e) {
        if (e.keyCode == this.keyUp)
            this.up = 0;
        if (e.keyCode == this.keyDown)
            this.down = 0;
        if (e.keyCode == this.keyLeft)
            this.left = 0;
        if (e.keyCode == this.keyRight)
            this.right = 0;
    };
    Player.prototype.attackCollision = function (object) {
        if (object.x > this.x + this.hspeed - object.width - 10 && object.x < this.x + this.hspeed + this.width + 10 && object.y > this.y + this.vspeed - object.height - 10 && object.y < this.y + this.vspeed + this.height + 10) {
            return true;
        }
        else {
            return false;
        }
    };
    Player.prototype.attack = function () {
        if (this.sprite == this.spriteLeft) {
            this.sprite = this.spriteAttackLeft;
        }
        else if (this.sprite == this.spriteRight) {
            this.sprite = this.spriteAttackRight;
        }
        this.currentAttackCD = this.attackCD;
        this.canAttack = false;
        this.attackSnd.play();
        for (var i = 0; i < this.game.pepe.length; i++) {
            if (this.attackCollision(this.game.pepe[i])) {
                this.game.pepe.splice(i, 1);
            }
        }
        if (this.name == 1) {
            if (this.attackCollision(this.game.player2)) {
                this.game.master.endGame(this.name);
            }
        }
        if (this.name == 2) {
            if (this.attackCollision(this.game.player1)) {
                this.game.master.endGame(this.name);
            }
        }
    };
    return Player;
}(GameObject));
var StartScreen = (function () {
    function StartScreen(master) {
        var _this = this;
        this.ready = false;
        this.master = master;
        window.addEventListener("keydown", function (e) { return _this.onKeyPress(e); });
    }
    StartScreen.prototype.update = function () {
        this.master.ctx.fillStyle = "black";
        this.master.ctx.font = "64px VT323";
        this.master.ctx.textAlign = "center";
        this.master.ctx.fillText("monkaS", this.master.canvas.width / 2, 100);
        this.master.ctx.font = "32px VT323";
        this.master.ctx.fillText("PRESS ENTER TO START", this.master.canvas.width / 2, this.master.canvas.height / 2);
        this.master.ctx.textAlign = "start";
        this.master.ctx.fillText("Player 1: wasd to walk, space to attack", 50, this.master.canvas.height - 200);
        this.master.ctx.fillText("Player 2: arrow keys to walk, shift to attack", 50, this.master.canvas.height - 150);
        this.master.ctx.fillText("DO NOT PRESS B", 50, this.master.canvas.height - 100);
        if (this.ready)
            this.master.startGame();
    };
    StartScreen.prototype.onKeyPress = function (e) {
        if (e.keyCode == 13) {
            this.ready = true;
        }
    };
    return StartScreen;
}());
//# sourceMappingURL=main.js.map