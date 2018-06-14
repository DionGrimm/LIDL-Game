/// <reference path="gameObject.ts"/>

class player2 extends GameObject {
    
    public game:Game

    private up:number = 0
    private down:number = 0
    private left:number = 0
    private right:number = 0

    private maxSpeed:number = 5

    constructor(game:Game) {
        super()
        this.game = game

        window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyPress(e))
        window.addEventListener("keyup", (e:KeyboardEvent) => this.onKeyRelease(e))
    }

    update():void {
        let x_input:number = this.right - this.left
        let y_input:number = this.down - this.up

        let diagonal:boolean = false

        if (x_input != 0 && y_input != 0) {
            diagonal = true
        } else {
            diagonal = false
        }
        
        if (x_input != 0) {
            this.hspeed = x_input*this.maxSpeed
        } else {
            this.hspeed = 0
        }
        
        if (y_input != 0) {
            this.vspeed = y_input*this.maxSpeed
        } else {
            this.vspeed = 0
        }
        
        if (diagonal) {
            this.hspeed *= Math.sin(45);
            this.vspeed *= Math.sin(45);
        }
        
        if (this.hCollision()) {
            this.hspeed = 0
        }
        if (this.vCollision()) {
            this.vspeed = 0
        }

        this.x += this.hspeed
        this.y += this.vspeed

        this.game.ctx.fillStyle = "blue"
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    hCollision():boolean {
        if (this.x+this.hspeed < 0 || this.x+this.hspeed > this.game.canvas.width-this.width) {
            return true
        } else {
            return false
        }
    }

    vCollision():boolean {
        if (this.y+this.vspeed < 0 || this.y+this.vspeed > this.game.canvas.height-this.height) {
            return true
        } else {
            return false
        }
    }

    onKeyPress(e:KeyboardEvent) {
        if (e.keyCode == 38) this.up = 1
        if (e.keyCode == 40) this.down = 1
        if (e.keyCode == 37) this.left = 1
        if (e.keyCode == 39) this.right = 1
    }

    onKeyRelease(e:KeyboardEvent) {
        if (e.keyCode == 38) this.up = 0
        if (e.keyCode == 40) this.down = 0
        if (e.keyCode == 37) this.left = 0
        if (e.keyCode == 39) this.right = 0
    }
}