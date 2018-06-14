class GameObject {

    protected width = window.innerWidth/25
    protected height = this.width
    protected x = Math.random() * (window.innerWidth - this.width-30)
    protected y = Math.random() * (window.innerHeight - this.height-30)
    protected hspeed = 0
    protected vspeed = 0
    protected game:Game

    constructor(game:Game) {
        this.game = game
    }

    update() {
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
}