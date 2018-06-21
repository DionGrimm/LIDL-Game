class Biem {

    private game:Game
    private x:number
    private y:number
    private width:number = 104
    private height:number = 104

    private sprite:HTMLImageElement = <HTMLImageElement>document.getElementById('biem')
    private sound:HTMLAudioElement = <HTMLAudioElement>document.getElementById('biemSnd')

    constructor(game:Game,x:number, y:number) {
        this.game = game
        this.x = x
        this.y = y
        this.sound.play()
        for (const i in this.game.pepe) {
            if (this.explode(this.game.pepe[i])) {
                this.game.pepe.splice(parseInt(i), 1)
            }
        }
        if (this.explode(this.game.player1)) {
            this.game.master.endGame(2)
        }
        if (this.explode(this.game.player2)) {
            this.game.master.endGame(1)
        }
    }

    update() {
        this.game.master.ctx.drawImage(this.sprite,this.x, this.y, this.width, this.height)
    }

    public explode(object:any) {
        if (object.x > this.x-object.width && object.x < this.x+this.width && object.y > this.y-object.height && object.y < this.y+this.height) {
            return true;
        } else {
            return false;
        }
    }
}