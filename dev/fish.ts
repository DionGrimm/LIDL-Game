/// <reference path="gameObject.ts"/>

class Fish extends GameObject {
    
    public moving:boolean = false

    constructor(game:Game) {
        super(game)
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
        super.update()
    }

    // Random movement function
    move():void {

    }
}