class Master {

    public canvas:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('cnvs')
    public ctx:CanvasRenderingContext2D = this.canvas.getContext("2d")!

    private currentscreen:any

    public score1:number = 0
    public score2:number = 0

    constructor() {
        this.canvas.width = 720
        this.canvas.height = 720

        

        this.currentscreen = new StartScreen(this)
        this.update()
    }

    update = ():void => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "#fff59d"
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.fillStyle = "black"
        this.ctx.font = "32px VT323"
        this.ctx.textAlign="center"
        this.ctx.fillText(this.score1 + " vs " + this.score2, this.canvas.width/2, 180)

        this.currentscreen.update()

        requestAnimationFrame(this.update)
    }
    
    public startGame():void {
        this.currentscreen = new Game(this)
    }

    public endGame(winner:number):void {
        this.currentscreen = new EndScreen(this, winner)
    }

}

window.addEventListener("load", () => new Master())