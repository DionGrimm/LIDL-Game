class GameObject {

    public width:number = 38
    public height:number = 32
    public x:number
    public y:number
    public hspeed:number = 0
    public vspeed:number = 0
    protected maxSpeed:number = 3
    protected game:Game
    protected sprite:HTMLImageElement = <HTMLImageElement>document.getElementById('pepe')
    protected spriteRight:HTMLImageElement = <HTMLImageElement>document.getElementById('pepe')
    protected spriteLeft:HTMLImageElement = <HTMLImageElement>document.getElementById('pepeLeft')
    protected spriteAttackRight:HTMLImageElement = <HTMLImageElement>document.getElementById('pepeAttack')
    protected spriteAttackLeft:HTMLImageElement = <HTMLImageElement>document.getElementById('pepeAttackLeft')

    constructor(game:Game) {
        this.game = game
        this.x = Math.random() * (this.game.master.canvas.width-this.width)
        this.y = Math.random() * (this.game.master.canvas.height-this.height)
    }

    protected update():void {
        this.game.master.ctx.drawImage(this.sprite,this.x, this.y, this.width, this.height)
    }

    protected hCollision():boolean {
        if (this.x+this.hspeed <= 0 || this.x+this.hspeed >= this.game.master.canvas.width-this.width+19) {
            return true
        } else {
            return false
        }
    }

    protected vCollision():boolean {
        if (this.y+this.vspeed <= 0 || this.y+this.vspeed >= this.game.master.canvas.height-this.height) {
            return true
        } else {
            return false
        }
    }

    public boxCollision(object:any) {
        if (object.x > this.x+this.hspeed-object.width && object.x < this.x+this.hspeed+this.width && object.y > this.y+this.vspeed-object.height && object.y < this.y+this.vspeed+this.height) {
            return true;
        } else {
            return false;
        }
    }
}