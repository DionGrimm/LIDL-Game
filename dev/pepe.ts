/// <reference path="gameObject.ts"/>

class Pepe extends GameObject {
    
    private moving:boolean = false
    private movingLength:number = Math.random()*150+50
    private currentMovingCD:number = Math.random()*150+50
    private x_input:number = 0
    private y_input:number = 0

    constructor(game:Game) {
        super(game)
        this.hspeed = 0
        this.vspeed = 0
    }

    update():void {
        if (this.currentMovingCD > 0) {
            this.currentMovingCD--
        }
        if (this.currentMovingCD < 1 && !this.moving) {
            this.moving = true
            this.move()
            
            this.movingLength = Math.random()*150+50
        }
        if (this.moving) {
            this.movingLength--
        }
        if (this.movingLength < 1 && this.moving) {
            this.moving = false
            this.hspeed = 0
            this.vspeed = 0
            this.currentMovingCD = Math.random()*150+50
        }

        if (this.hCollision()) {
            this.hspeed = 0
        }
        if (this.vCollision()) {
            this.vspeed = 0
        }

        this.x += this.hspeed
        this.y += this.vspeed

        super.update()
    
    }

    // Random movement function
    move():void {
        let diagonal
        let chance = Math.random()
        if (chance < .33) {
            this.x_input = -1
        } else if (chance <.66) {
            this.x_input = 0
        } else {
            this.x_input = 1
        }

        let chance2 = Math.random()
        if (chance2 < .33) {
            this.y_input = -1
        } else if (chance2 <.66) {
            this.y_input = 0
        } else {
            this.y_input = 1
        }

        if (this.x_input == -1) {
            this.sprite = this.spriteLeft
        } else if (this.x_input == 1) {
            this.sprite = this.spriteRight
        }

        if (this.x_input != 0 && this.y_input != 0) {
            diagonal = true
        } else {
            diagonal = false
        }

        this.hspeed = this.x_input*this.maxSpeed
        
        this.vspeed = this.y_input*this.maxSpeed

        if (diagonal) {
            this.hspeed *= 0.851 // sin(45)
            this.vspeed *= 0.851 // sin(45)
        }
        
    }
}