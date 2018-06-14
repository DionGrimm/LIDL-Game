/// <reference path="gameObject.ts"/>

class Fish extends GameObject {
    
    public game:Game
    public moving:boolean = false

    constructor(game:Game) {
        super()
        this.game = game
        this.hspeed = 10
    }

    update():void {

        if (this.hCollision()) {
            this.hspeed = 0
        }
        if (this.vCollision()) {
            this.vspeed = 0
        }

        this.move()

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

    // Random movement function
    move():void {

    }
}