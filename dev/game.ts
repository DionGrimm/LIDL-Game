class Game {

    public canvas:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('cnvs')
    public ctx:CanvasRenderingContext2D = this.canvas.getContext("2d")!
    public player1:player
    public player2:player
    public fish:Array<Fish> = [];

    constructor() {
        this.canvas.width = window.innerWidth-30
        this.canvas.height = window.innerHeight-30

        this.player1 = new player(this,87,83,65,68)
        this.player2 = new player(this,38,40,37,39)

        for (let i=0; i<5+Math.floor(Math.random()*10); i++) {
            this.fish.push(new Fish(this))
        }

        requestAnimationFrame(this.update)
    }

    update = ():void => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.player1.update()
        this.player2.update()
        for (const i in this.fish) {
            this.fish[i].update()
        }

        requestAnimationFrame(this.update)
    }
}

window.addEventListener("load", () => new Game())