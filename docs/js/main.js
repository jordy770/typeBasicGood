"use strict";
var Bomb = (function () {
    function Bomb() {
        this.element = document.createElement("bomb");
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.element);
        this.x = window.innerWidth - this.getRectangle().width;
        this.y = window.innerHeight - this.getRectangle().height;
    }
    Bomb.prototype.update = function () {
        this.element.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    Bomb.prototype.getRectangle = function () {
        return this.element.getBoundingClientRect();
    };
    return Bomb;
}());
var Car = (function () {
    function Car(g) {
        var _this = this;
        this.levelposition = 0;
        this.y = window.innerHeight - 150;
        this.speedLeft = 0;
        this.speedRight = 0;
        this.speedUp = 0;
        this.game = g;
        this.element = document.createElement("car");
        var game = document.getElementsByTagName("game")[0];
        game.appendChild(this.element);
        this.gravity = 10;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
    }
    Car.prototype.onKeyDown = function (event) {
        switch (event.key) {
            case "ArrowLeft":
                this.speedLeft = 10;
                break;
            case "ArrowRight":
                this.speedRight = 10;
                break;
            case "ArrowUp":
                this.speedUp = 50;
                break;
        }
    };
    Car.prototype.onKeyUp = function (event) {
        switch (event.key) {
            case "ArrowLeft":
                this.speedLeft = 0;
                break;
            case "ArrowRight":
                this.speedRight = 0;
                break;
            case "ArrowUp":
                this.speedUp = 0;
                break;
        }
    };
    Car.prototype.hitPlat = function () {
        this.gravity = 0;
    };
    Car.prototype.update = function () {
        this.levelposition = this.levelposition + this.speedLeft - this.speedRight;
        this.game.scrollLevel(this.levelposition);
        var newY = this.y - this.speedUp + this.gravity;
        if (newY > 0 && newY + 150 < window.innerHeight)
            this.y = newY;
        this.element.style.transform = "translate(200px, " + this.y + "px)";
    };
    Car.prototype.getRectangle = function () {
        return this.element.getBoundingClientRect();
    };
    return Car;
}());
var Game = (function () {
    function Game() {
        this.bomb = new Bomb();
        this.platform = new Platform();
        this.car = new Car(this);
        this.foreground = document.getElementsByTagName("foreground")[0];
        this.gameLoop();
    }
    Game.prototype.scrollLevel = function (pos) {
        this.foreground.style.transform = "translateX(" + pos + "px)";
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.car.update();
        this.bomb.update();
        this.platform.update();
        if (this.checkCollision(this.car.getRectangle(), this.platform.getRectangle())) {
            this.car.hitPlat();
        }
        else {
            this.car.gravity = 10;
        }
        if (this.checkCollision(this.car.getRectangle(), this.bomb.getRectangle())) {
            console.log("car hits the bomb");
        }
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var Platform = (function () {
    function Platform() {
        this.x = 800;
        this.y = 800;
        this.div = document.createElement("platform");
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.div);
    }
    Platform.prototype.update = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    Platform.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    return Platform;
}());
//# sourceMappingURL=main.js.map