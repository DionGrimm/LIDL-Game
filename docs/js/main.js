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
    function GameObject() {
        this.width = window.innerWidth / 25;
        this.height = this.width;
        this.x = Math.random() * (window.innerWidth - this.width - 30);
        this.y = Math.random() * (window.innerHeight - this.height - 30);
        this.hspeed = 0;
        this.vspeed = 0;
    }
    return GameObject;
}());
var Fish = (function (_super) {
    __extends(Fish, _super);
    function Fish(game) {
        var _this = _super.call(this) || this;
        _this.moving = false;
        _this.game = game;
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
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    Fish.prototype.hCollision = function () {
        if (this.x + this.hspeed < 0 || this.x + this.hspeed > this.game.canvas.width - this.width) {
            return true;
        }
        else {
            return false;
        }
    };
    Fish.prototype.vCollision = function () {
        if (this.y + this.vspeed < 0 || this.y + this.vspeed > this.game.canvas.height - this.height) {
            return true;
        }
        else {
            return false;
        }
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
        this.player1 = new player1(this);
        this.player2 = new player2(this);
        for (var i = 0; i < 5 + Math.floor(Math.random() * 10); i++) {
            this.fish.push(new Fish(this));
        }
        requestAnimationFrame(this.update);
    }
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var player1 = (function (_super) {
    __extends(player1, _super);
    function player1(game) {
        var _this = _super.call(this) || this;
        _this.up = 0;
        _this.down = 0;
        _this.left = 0;
        _this.right = 0;
        _this.maxSpeed = 5;
        _this.game = game;
        window.addEventListener("keydown", function (e) { return _this.onKeyPress(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyRelease(e); });
        return _this;
    }
    player1.prototype.update = function () {
        var x_input = this.right - this.left;
        var y_input = this.down - this.up;
        var diagonal = false;
        if (x_input != 0 && y_input != 0) {
            diagonal = true;
        }
        else {
            diagonal = false;
        }
        if (x_input != 0) {
            this.hspeed = x_input * this.maxSpeed;
        }
        else {
            this.hspeed = 0;
        }
        if (y_input != 0) {
            this.vspeed = y_input * this.maxSpeed;
        }
        else {
            this.vspeed = 0;
        }
        if (diagonal) {
            this.hspeed *= Math.sin(45);
            this.vspeed *= Math.sin(45);
        }
        if (this.hCollision()) {
            this.hspeed = 0;
        }
        if (this.vCollision()) {
            this.vspeed = 0;
        }
        this.x += this.hspeed;
        this.y += this.vspeed;
        this.game.ctx.fillStyle = "blue";
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    player1.prototype.hCollision = function () {
        if (this.x + this.hspeed < 0 || this.x + this.hspeed > this.game.canvas.width - this.width) {
            return true;
        }
        else {
            return false;
        }
    };
    player1.prototype.vCollision = function () {
        if (this.y + this.vspeed < 0 || this.y + this.vspeed > this.game.canvas.height - this.height) {
            return true;
        }
        else {
            return false;
        }
    };
    player1.prototype.onKeyPress = function (e) {
        if (e.keyCode == 87)
            this.up = 1;
        if (e.keyCode == 83)
            this.down = 1;
        if (e.keyCode == 65)
            this.left = 1;
        if (e.keyCode == 68)
            this.right = 1;
    };
    player1.prototype.onKeyRelease = function (e) {
        if (e.keyCode == 87)
            this.up = 0;
        if (e.keyCode == 83)
            this.down = 0;
        if (e.keyCode == 65)
            this.left = 0;
        if (e.keyCode == 68)
            this.right = 0;
    };
    return player1;
}(GameObject));
var player2 = (function (_super) {
    __extends(player2, _super);
    function player2(game) {
        var _this = _super.call(this) || this;
        _this.up = 0;
        _this.down = 0;
        _this.left = 0;
        _this.right = 0;
        _this.maxSpeed = 5;
        _this.game = game;
        window.addEventListener("keydown", function (e) { return _this.onKeyPress(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyRelease(e); });
        return _this;
    }
    player2.prototype.update = function () {
        var x_input = this.right - this.left;
        var y_input = this.down - this.up;
        var diagonal = false;
        if (x_input != 0 && y_input != 0) {
            diagonal = true;
        }
        else {
            diagonal = false;
        }
        if (x_input != 0) {
            this.hspeed = x_input * this.maxSpeed;
        }
        else {
            this.hspeed = 0;
        }
        if (y_input != 0) {
            this.vspeed = y_input * this.maxSpeed;
        }
        else {
            this.vspeed = 0;
        }
        if (diagonal) {
            this.hspeed *= Math.sin(45);
            this.vspeed *= Math.sin(45);
        }
        if (this.hCollision()) {
            this.hspeed = 0;
        }
        if (this.vCollision()) {
            this.vspeed = 0;
        }
        this.x += this.hspeed;
        this.y += this.vspeed;
        this.game.ctx.fillStyle = "blue";
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    player2.prototype.hCollision = function () {
        if (this.x < 0 || this.x > this.game.canvas.width - this.width) {
            return true;
        }
        else {
            return false;
        }
    };
    player2.prototype.vCollision = function () {
        if (this.y < 0 || this.y > this.game.canvas.height - this.height) {
            return true;
        }
        else {
            return false;
        }
    };
    player2.prototype.onKeyPress = function (e) {
        if (e.keyCode == 38)
            this.up = 1;
        if (e.keyCode == 40)
            this.down = 1;
        if (e.keyCode == 37)
            this.left = 1;
        if (e.keyCode == 39)
            this.right = 1;
    };
    player2.prototype.onKeyRelease = function (e) {
        if (e.keyCode == 38)
            this.up = 0;
        if (e.keyCode == 40)
            this.down = 0;
        if (e.keyCode == 37)
            this.left = 0;
        if (e.keyCode == 39)
            this.right = 0;
    };
    return player2;
}(GameObject));
//# sourceMappingURL=main.js.map