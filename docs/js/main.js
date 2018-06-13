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
        this.height = this.width / 2;
        this.x = Math.random() * (window.innerWidth - this.width);
        this.y = Math.random() * (window.innerHeight - this.height);
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
        if (this.x < 0 || this.x > this.game.canvas.width - this.width) {
            return true;
        }
        else {
            return false;
        }
    };
    Fish.prototype.vCollision = function () {
        if (this.y < 0 || this.y > this.game.canvas.height - this.height) {
            return true;
        }
        else {
            return false;
        }
    };
    Fish.prototype.move = function () {
        this.x += this.hspeed;
        this.y += this.vspeed;
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
            for (var i in _this.fish) {
                _this.fish[i].update();
            }
            requestAnimationFrame(_this.update);
        };
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        for (var i = 0; i < 5 + Math.floor(Math.random() * 10); i++) {
            this.fish.push(new Fish(this));
        }
        requestAnimationFrame(this.update);
    }
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
//# sourceMappingURL=main.js.map