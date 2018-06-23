# monkaS the Game
Game for programming course #4 https://diongrimm.github.io/LIDL-Game/

De game is bedoeld voor 2 spelers en maakt volledig gebruik van HTML Canvas.

Klassendiagram:
![alt text](https://i.nuuls.com/wNA0w.png)

# Classes
De game maakt alle objecten aan in de Game class. Alle objecten hebben hun eigen classes met hun eigen constructor en update functie. Als er in de game op B wordt gedrukt dan sterft er een npc en wordt er een "biem" object aangemaakt. Ik had er ook voor kunnen kiezen om de npc een state te geven waardoor die de logica van het "biem" object krijgt maar het is dus veel handiger om hier een nieuwe class voor te maken.
```
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

        for (let i=0; i<12+Math.floor(Math.random()*10); i++) {
            this.pepe.push(new Pepe(this))
        }

        window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyPress(e))
        window.addEventListener("keyup", (e:KeyboardEvent) => this.onKeyRelease(e))

        requestAnimationFrame(this.update)
    }
```

# Encapsulation
Een hoop properties moeten op public staan in mijn code omdat objecten in de game elkaar moeten controlleren op collision en hierdoor elkaars positie en afmetingen moeten weten. Mijn aanpak was om de properties meestal op private te zetten totdat ik ze in een andere class moest aanroepen. In mijn parent object voor de player en npc's staan properties die vast staan op protected zodat ze deze kunnen doorgeven aan children objects maar verder onzichtbaar zijn.
```
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
```

# Composition
Mijn master object die bepaald of de game bezig is of het start/end-screen zichtbaar is geeft zichzelf mee aan de game zodat als er iemand heeft gewonnen de game tegen de master kan zeggen om te switchen naar het endscreen. De game geeft zichzelf mee aan alle objecten die het aanmaakt. Dit is nodig omdat ik dan in de class van het object kan aageven om zichzelf in de canvas te tekenen. De canvas staat in de master class.

De game maakt in de constructor 2 players aan die hij andere input keys meegeeft. Zo hoeft er maar 1 player class te zijn terwijl er 2 players in de game zijn met andere properties.
```
class Master {

    public canvas:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('cnvs')
    public ctx:CanvasRenderingContext2D = this.canvas.getContext("2d")!

    private currentscreen:any
    ...
      public startGame():void {
      this.currentscreen = new Game(this)
    }

    public endGame(winner:number):void {
        this.currentscreen = new EndScreen(this, winner)
    }
```

# Inheritance
Er is een parent object voor de player class en de npc (pepe) class. In dit parent object worden de gezamelijke properties aangemaakt zoals de sprite references. De contructor van de parent geeft het object ook een random positie. Dit is erg  belangrijk omdat de player zich uiteindelijk moet gedragen alsof hij een npc is. In de parent staat ook dat het object zichzelf moet tekenen in de canvas en de collision functies sla ik hier op. De collision zelf laat ik ieder child object wel apart doen omdat de player en npc's andere movement logica hebben en ik dit nog niet geoptimalizeerd hebt.
```
class GameObject {
...
  constructor(game:Game) {
      this.game = game
      this.x = Math.random() * (this.game.master.canvas.width-this.width)
      this.y = Math.random() * (this.game.master.canvas.height-this.height)
  }
  

/// <reference path="gameObject.ts"/>

class Player extends GameObject {

```

# Feedback op Martijn
Pluspunten
- Mogelijkheid voor meerdere schermen die vanuit de game kunnen worden gecalled
- Zit al veel art in de game en je maakt goed gebruik van CSS hiervoor

Verbeteringen
- De meerdere schermen kun je nog inheritance geven
- Maak op ze minst 1 basis object bedoeld voor inheritance die waarden als de game, x, y, width, height aanmaakt

Ik zou voor jezelf uitschrijven welke (haalbare) onderdelen je in de game wilt hebben en dan goed na te denken over hoe je dat in de code gaat aanpakken. Check of of de console geen errors aangeeft, dit is nu wel het geval.

Ik zou de logica voor de player movement anders benaderen. Maak gebruik van een horizontale speed en verticale speed die wordt geupdate door player input, gravity en collisions. Aan het eind van de player update() kan je de x en y updaten met deze waarden.

Ik zou ook de update() functie laten loopen door de platforms en checken of er een collision is die dan ook returned welke kant van de platform de speler aanraakt. Dan kun je de speed variabelen hierop aanpassen.
