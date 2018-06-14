/// <reference path="gameObject.ts"/>

class player extends GameObject {


    private up:number = 0
    private down:number = 0
    private left:number = 0
    private right:number = 0

    private keyUp:number
    private keyDown:number
    private keyLeft:number
    private keyRight:number

    private maxSpeed:number = 5

    constructor(game:Game, up:number, down:number, left:number, right:number) {
        super(game)
        
        this.keyUp = up
        this.keyDown = down
        this.keyLeft = left
        this.keyRight = right

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
        
 
        this.hspeed = x_input*this.maxSpeed
        
        this.vspeed = y_input*this.maxSpeed
        
        if (diagonal) {
            this.hspeed *= 0.851 // sin(45)
            this.vspeed *= 0.851 // sin(45)
        }
        
        if (super.hCollision()) {
            this.hspeed = 0
        }
        if (this.vCollision()) {
            this.vspeed = 0
        }

        this.x += this.hspeed
        this.y += this.vspeed

        this.game.ctx.fillStyle = "blue"
        super.update()
    }

    onKeyPress(e:KeyboardEvent) {
        if (e.keyCode == this.keyUp) this.up = 1
        if (e.keyCode == this.keyDown) this.down = 1
        if (e.keyCode == this.keyLeft) this.left = 1
        if (e.keyCode == this.keyRight) this.right = 1
    }

    onKeyRelease(e:KeyboardEvent) {
        if (e.keyCode == this.keyUp) this.up = 0
        if (e.keyCode == this.keyDown) this.down = 0
        if (e.keyCode == this.keyLeft) this.left = 0
        if (e.keyCode == this.keyRight) this.right = 0
    }
}