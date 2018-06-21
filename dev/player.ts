/// <reference path="gameObject.ts"/>

class Player extends GameObject {

    private name:number

    private up:number = 0
    private down:number = 0
    private left:number = 0
    private right:number = 0

    private keyUp:number
    private keyDown:number
    private keyLeft:number
    private keyRight:number
    private keyAttack:number

    private attackCD:number = 20
    private currentAttackCD:number = 0
    private canAttack:boolean = true

    private attackSnd:HTMLAudioElement = <HTMLAudioElement>document.getElementById('hit')

    constructor(game:Game, name:number, up:number, down:number, left:number, right:number, attack:number) {
        super(game)
        this.name = name

        this.keyUp = up
        this.keyDown = down
        this.keyLeft = left
        this.keyRight = right
        this.keyAttack = attack
    }

    update():void {
        if (this.currentAttackCD > 0) {
            this.currentAttackCD--
        }

        if (this.currentAttackCD < 1) {
            if (this.sprite == this.spriteAttackLeft) {
                this.sprite = this.spriteLeft
            } else if (this.sprite == this.spriteAttackRight) {
                this.sprite = this.spriteRight
            }
            this.canAttack = true
        }

        let x_input:number = this.right - this.left
        let y_input:number = this.down - this.up

        if (x_input == -1) {
            this.sprite = this.spriteLeft
        } else if (x_input == 1) {
            this.sprite = this.spriteRight
        }

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

    public keyPress(e:KeyboardEvent) {
        if (e.keyCode == this.keyUp) this.up = 1
        if (e.keyCode == this.keyDown) this.down = 1
        if (e.keyCode == this.keyLeft) this.left = 1
        if (e.keyCode == this.keyRight) this.right = 1
        if (e.keyCode == this.keyAttack && this.canAttack) this.attack()
    }

    public keyRelease(e:KeyboardEvent) {
        if (e.keyCode == this.keyUp) this.up = 0
        if (e.keyCode == this.keyDown) this.down = 0
        if (e.keyCode == this.keyLeft) this.left = 0
        if (e.keyCode == this.keyRight) this.right = 0
    }

    public attackCollision(object:any) {
        if (object.x > this.x+this.hspeed-object.width-10 && object.x < this.x+this.hspeed+this.width+10 && object.y > this.y+this.vspeed-object.height-10 && object.y < this.y+this.vspeed+this.height+10) {
            return true;
        } else {
            return false;
        }
    }

    private attack() {
        if (this.sprite == this.spriteLeft) {
            this.sprite = this.spriteAttackLeft
        } else if (this.sprite == this.spriteRight) {
            this.sprite = this.spriteAttackRight
        }
        this.currentAttackCD = this.attackCD
        this.canAttack = false
        this.attackSnd.play()

        //let deletePepe = []
        for (let i=0; i<this.game.pepe.length; i++) {
            if (this.attackCollision(this.game.pepe[i])) {
                this.game.pepe.splice(i,1)
            }
        }
        /*
        deletePepe.reverse()
        for (let i=0; i<deletePepe.length; i++) {
            this.game.pepe.splice(i, 1)
        }*/

        if (this.name == 1) {
            if (this.attackCollision(this.game.player2)) {
                this.game.master.endGame(this.name)
            }
        }

        if (this.name == 2) {
            if (this.attackCollision(this.game.player1)) {
                this.game.master.endGame(this.name)
            }
        }
    }

}