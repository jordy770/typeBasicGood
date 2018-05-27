class Platform{

    private div: HTMLElement
    private x: number = 800
    private y: number = 800

    constructor(){
        this.div = document.createElement("platform")
        let foreground = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this.div)

    }

    public update(): void{
        this.div.style.transform = `translate(${this.x}px, ${this.y}px)`
    }

    public getRectangle(){
        return this.div.getBoundingClientRect()
    }

}