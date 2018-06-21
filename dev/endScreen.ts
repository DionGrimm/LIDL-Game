class EndScreen {

    private master: Master
    private ready:boolean = false
    private winner:number

    constructor(master:Master, winner:number) {
        this.master = master
        this.winner = winner
        if (winner == 1) {
            this.master.score1++
        } else if (winner == 2) {
            this.master.score2++
        }
        window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyPress(e))
    }

    update() {
        this.master.ctx.fillStyle = "black"
        this.master.ctx.font = "64px VT323"
        this.master.ctx.textAlign="center"
        this.master.ctx.fillText("monkaS", this.master.canvas.width/2, 100)
        this.master.ctx.font = "32px VT323"
        this.master.ctx.fillText("PRESS ENTER TO START", this.master.canvas.width/2, this.master.canvas.height/2)
        this.master.ctx.fillText("PLAYER " + this.winner + " WON THIS ROUND", this.master.canvas.width/2, this.master.canvas.height/2-100)

        if (this.ready) this.master.startGame()
    }

    public onKeyPress(e:KeyboardEvent) {
        if (e.keyCode == 13) {
            this.ready = true
        }
    }
}