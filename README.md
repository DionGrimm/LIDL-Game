# monkaS the Game
Game for programming course #4 https://diongrimm.github.io/LIDL-Game/

De game is bedoeld voor 2 spelers en maakt volledig gebruik van HTML Canvas.

Klassendiagram: https://i.nuuls.com/wNA0w.png

# Classes
De game maakt alle objecten aan in de Game class. Alle objecten hebben hun eigen classes met hun eigen constructor en update functie. Als er in de game op B wordt gedrukt dan sterft er een npc en wordt er een "biem" object aangemaakt. Ik had er ook voor kunnen kiezen om de npc een state te geven waardoor die de logica van het "biem" object krijgt maar het is dus veel handiger om hier een nieuwe class voor te maken.

# Encapsulation
Een hoop properties moeten op public staan in mijn code omdat objecten in de game elkaar moeten controlleren op collision en hierdoor elkaars positie en afmetingen moeten weten. Mijn aanpak was om de properties meestal op private te zetten totdat ik ze in een andere class moest aanroepen. In mijn parent object voor de player en npc's staan properties die vast staan op protected zodat ze deze kunnen doorgeven aan children objects maar verder onzichtbaar zijn.

# Composition
Mijn master object die bepaald of de game bezig is of het start/end-screen zichtbaar is geeft zichzelf mee aan de game zodat als er iemand heeft gewonnen de game tegen de master kan zeggen om te switchen naar het endscreen. De game geeft zichzelf mee aan alle objecten die het aanmaakt. Dit is nodig omdat ik dan in de class van het object kan aageven om zichzelf in de canvas te tekenen. De canvas staat in de master class.

De game maakt in de constructor 2 players aan die hij andere input keys meegeeft. Zo hoeft er maar 1 player class te zijn terwijl er 2 players in de game zijn met andere properties.

# Inheritance
Er is een parent object voor de player class en de npc (pepe) class. In dit parent object worden de gezamelijke properties aangemaakt zoals de sprite references. De contructor van de parent geeft het object ook een random positie. Dit is erg  belangrijk omdat de player zich uiteindelijk moet gedragen alsof hij een npc is. In de parent staat ook dat het object zichzelf moet tekenen in de canvas en de collision functies sla ik hier op. De collision zelf laat ik ieder child object wel apart doen omdat de player en npc's andere movement logica hebben en ik dit nog niet geoptimalizeerd hebt.

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
