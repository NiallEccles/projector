class Player {
    ratio: string;
    selector: string;
    constructor(ratio, selector) {
        this.ratio = ratio;
        this.selector = selector;
    }
    debug(){
        console.log(this.ratio, this.selector)
    }
}

var myPlayer = new Player('16:9', 'player');
myPlayer.debug();