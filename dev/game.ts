class Game {

    public canvas:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('cnvs')
    public ctx:CanvasRenderingContext2D = this.canvas.getContext("2d")!
    public fish:Array<Fish> = [];

    constructor() {
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight

        for (let i=0; i<5+Math.floor(Math.random()*10); i++) {
            this.fish.push(new Fish(this))
        }

        requestAnimationFrame(this.update)
    }

    update = ():void => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (const i in this.fish) {
            this.fish[i].update()
        }

        requestAnimationFrame(this.update)
    }
}

window.addEventListener("load", () => new Game())