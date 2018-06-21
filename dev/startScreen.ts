class StartScreen {

    private master: Master
    private ready:boolean = false

    constructor(master:Master) {
        this.master = master
        window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyPress(e))
    }

    update() {
        this.master.ctx.fillStyle = "black"
        this.master.ctx.font = "64px VT323"
        this.master.ctx.textAlign="center"
        this.master.ctx.fillText("monkaS", this.master.canvas.width/2, 100)
        this.master.ctx.font = "32px VT323"
        this.master.ctx.fillText("PRESS ENTER TO START", this.master.canvas.width/2, this.master.canvas.height/2)
        this.master.ctx.textAlign="start"
        this.master.ctx.fillText("Player 1: wasd to walk, space to attack", 50, this.master.canvas.height-200)
        this.master.ctx.fillText("Player 2: arrow keys to walk, shift to attack", 50, this.master.canvas.height-150)
        this.master.ctx.fillText("DO NOT PRESS B", 50, this.master.canvas.height-100)
        if (this.ready) this.master.startGame()
    }

    public onKeyPress(e:KeyboardEvent) {
        if (e.keyCode == 13) {
            this.ready = true
        }
    }
}