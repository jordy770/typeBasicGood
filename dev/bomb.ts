class Bomb {
    
    private element: HTMLElement
    private x:number
    private y:number
        
    constructor() {
        this.element = document.createElement("bomb")
        let foreground = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this.element)
        
        this.x = window.innerWidth - this.getRectangle().width
        this.y = window.innerHeight - this.getRectangle().height
    }

    public update():void {
        // als de bom zelf beweegt moet je dat hier updaten

        // tekenen
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`
    }

    public getRectangle() {
        return this.element.getBoundingClientRect()
    }

}