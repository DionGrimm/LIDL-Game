class Game {

    public master:Master
    public player1:Player
    public player2:Player
    public pepe:Array<Pepe> = [];
    private biem:Array<Biem> = [];
    private biemCD:number = 100

    private music:HTMLAudioElement = <HTMLAudioElement>document.getElementById('music')

    constructor(master:Master) {
        this.master = master
        this.music.play()

        this.player1 = new Player(this,1,87,83,65,68,32)
        this.player2 = new Player(this,2,38,40,37,39,16)

        for (let i=0; i<5+Math.floor(Math.random()*10); i++) {
            this.pepe.push(new Pepe(this))
        }

        window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyPress(e))
        window.addEventListener("keyup", (e:KeyboardEvent) => this.onKeyRelease(e))

        requestAnimationFrame(this.update)
    }

    update = ():void => {
        for (const i in this.biem) {
            this.biem[i].update()
        }
        this.player1.update()
        this.player2.update()

        for (const i in this.pepe) {
            this.pepe[i].update()
        }

        if (this.biemCD > 0) {
            this.biemCD--
        }
    }

    public onKeyPress(e:KeyboardEvent) {
        this.player1.keyPress(e)
        this.player2.keyPress(e)
        if (e.keyCode == 66 && this.biemCD == 0) {
            // Biem
            this.biemCD = 180
            let i = Math.floor(Math.random()*this.pepe.length)
            this.biem.push(new Biem(this,this.pepe[i].x, this.pepe[i].y))
            this.pepe.splice(i,1)
        }
    }

    public onKeyRelease(e:KeyboardEvent) {
        this.player1.keyRelease(e)
        this.player2.keyRelease(e)
    }

}

