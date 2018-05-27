class Car  {
    
    private element:HTMLElement
    private levelposition:number = 0
    private y:number = window.innerHeight - 150
    private speedLeft: number = 0
    private speedRight: number = 0
    private speedUp: number = 0
    private game:Game

    public gravity: number
         
    constructor(g:Game) {
        this.game = g
        this.element = document.createElement("car")
        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.element)

        this.gravity = 10

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
    }

    onKeyDown(event: KeyboardEvent): void {
        switch (event.key) {
            case "ArrowLeft":
                this.speedLeft = 10
                break
            case "ArrowRight":
                this.speedRight = 10
                break
            case "ArrowUp":
                this.speedUp = 50
                break
        }
    }

    onKeyUp(event: KeyboardEvent): void {
        switch (event.key) {
            case "ArrowLeft":
                this.speedLeft = 0
                break
            case "ArrowRight":
                this.speedRight = 0
                break
            case "ArrowUp":
                this.speedUp = 0
                break
        }
    }

    public hitPlat(){
        // this.downSpeed = 0
        // this.speedUp = 0
         this.gravity = 0
     }

    public update():void 
    {
        // keyboard input verandert alleen de positie van het level
        this.levelposition = this.levelposition + this.speedLeft - this.speedRight
        this.game.scrollLevel(this.levelposition)

        let newY = this.y - this.speedUp + this.gravity
        if (newY > 0 && newY + 150 < window.innerHeight) this.y = newY
        
        // positie van auto kan je veranderen met x y
        this.element.style.transform = `translate(200px, ${this.y}px)`

        
    }  

    public getRectangle() {
        return this.element.getBoundingClientRect()
    }
}