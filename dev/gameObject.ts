class GameObject {

    protected width = window.innerWidth/25
    protected height = this.width/2
    protected x = Math.random() * (window.innerWidth - this.width)
    protected y = Math.random() * (window.innerHeight - this.height)
    protected hspeed = 0
    protected vspeed = 0

    

    constructor() {

    }

}