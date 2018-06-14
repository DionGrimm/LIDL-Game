class GameObject {

    protected width = window.innerWidth/25
    protected height = this.width
    protected x = Math.random() * (window.innerWidth - this.width-30)
    protected y = Math.random() * (window.innerHeight - this.height-30)
    protected hspeed = 0
    protected vspeed = 0

    

    constructor() {

    }

}