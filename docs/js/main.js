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
var GameObject = (function () {
    function GameObject(game) {
        this.width = window.innerWidth / 25;
        this.height = this.width;
        this.x = Math.random() * (window.innerWidth - this.width - 30);
        this.y = Math.random() * (window.innerHeight - this.height - 30);
        this.hspeed = 0;
        this.vspeed = 0;
        this.game = game;
    }
    GameObject.prototype.update = function () {
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    GameObject.prototype.hCollision = function () {
        if (this.x + this.hspeed < 0 || this.x + this.hspeed > this.game.canvas.width - this.width) {
            return true;
        }
        else {
            return false;
        }
    };
    GameObject.prototype.vCollision = function () {
        if (this.y + this.vspeed < 0 || this.y + this.vspeed > this.game.canvas.height - this.height) {
            return true;
        }
        else {
            return false;
        }
    };
    return GameObject;
}());
var Fish = (function (_super) {
    __extends(Fish, _super);
    function Fish(game) {
        var _this = _super.call(this, game) || this;
        _this.moving = false;
        _this.hspeed = 10;
        return _this;
    }
    Fish.prototype.update = function () {
        if (this.hCollision()) {
            this.hspeed = 0;
        }
        if (this.vCollision()) {
            this.vspeed = 0;
        }
        this.move();
        this.game.ctx.fillStyle = "blue";
        _super.prototype.update.call(this);
    };
    Fish.prototype.move = function () {
    };
    return Fish;
}(GameObject));
var Game = (function () {
    function Game() {
        var _this = this;
        this.canvas = document.getElementById('cnvs');
        this.ctx = this.canvas.getContext("2d");
        this.fish = [];
        this.update = function () {
            _this.ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
            _this.player1.update();
            _this.player2.update();
            for (var i in _this.fish) {
                _this.fish[i].update();
            }
            requestAnimationFrame(_this.update);
        };
        this.canvas.width = window.innerWidth - 30;
        this.canvas.height = window.innerHeight - 30;
        this.player1 = new player(this, 87, 83, 65, 68);
        this.player2 = new player(this, 38, 40, 37, 39);
        for (var i = 0; i < 5 + Math.floor(Math.random() * 10); i++) {
            this.fish.push(new Fish(this));
        }
        requestAnimationFrame(this.update);
    }
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var player = (function (_super) {
    __extends(player, _super);
    function player(game, up, down, left, right) {
        var _this = _super.call(this, game) || this;
        _this.up = 0;
        _this.down = 0;
        _this.left = 0;
        _this.right = 0;
        _this.maxSpeed = 5;
        _this.keyUp = up;
        _this.keyDown = down;
        _this.keyLeft = left;
        _this.keyRight = right;
        window.addEventListener("keydown", function (e) { return _this.onKeyPress(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyRelease(e); });
        return _this;
    }
    player.prototype.update = function () {
        var x_input = this.right - this.left;
        var y_input = this.down - this.up;
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
        if (_super.prototype.hCollision.call(this)) {
            this.hspeed = 0;
        }
        if (this.vCollision()) {
            this.vspeed = 0;
        }
        this.x += this.hspeed;
        this.y += this.vspeed;
        this.game.ctx.fillStyle = "blue";
        _super.prototype.update.call(this);
    };
    player.prototype.onKeyPress = function (e) {
        if (e.keyCode == this.keyUp)
            this.up = 1;
        if (e.keyCode == this.keyDown)
            this.down = 1;
        if (e.keyCode == this.keyLeft)
            this.left = 1;
        if (e.keyCode == this.keyRight)
            this.right = 1;
    };
    player.prototype.onKeyRelease = function (e) {
        if (e.keyCode == this.keyUp)
            this.up = 0;
        if (e.keyCode == this.keyDown)
            this.down = 0;
        if (e.keyCode == this.keyLeft)
            this.left = 0;
        if (e.keyCode == this.keyRight)
            this.right = 0;
    };
    return player;
}(GameObject));
//# sourceMappingURL=main.js.map