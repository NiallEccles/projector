class Player {
    src: string;
    selector: string;
    projector: HTMLVideoElement;
    constructor(src, selector) {
        this.src = src;
        this.selector = selector;
        
        const projectorRoot = document.querySelector(selector);
        const projectorSrc = src;

        this.projector = document.createElement('video');
        this.projector.src = projectorSrc

        projectorRoot.appendChild(this.projector);
        this.projector.width =  this.projector.parentElement.clientWidth;
    }
    debug(){
        console.log(this.src, this.selector)
    }
    play(){
        this.projector.play();
    }
    pause(){
        this.projector.pause();
    }
}

var myPlayer = new Player('https://cdn.jsdelivr.net/npm/big-buck-bunny-1080p@0.0.6/video.mp4', '.player');