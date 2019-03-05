class Player {
    src: string;
    selector: string;
    projector: HTMLVideoElement;
    playButton: any;
    constructor(src, selector) {
        this.src = src;
        this.selector = selector;
        
        const projectorRoot = document.querySelector(selector);
        const projectorSrc = src;

        this.projector = document.createElement('video');
        this.projector.src = projectorSrc;
        // this.projector.setAttribute('controls', 'controls');

        this.playButton = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        // this.playButton.appendChild(document.createElementNS(this.playButton.namespaceURI,'polygon'));
        // this.playButton.setAttribute('points', '3 3 54.99 35 3 67 3 3');
        const playButtonPolygon = document.createElementNS(this.playButton.namespaceURI,'polygon')
        playButtonPolygon.setAttribute('points', '3 3 54.99 35 3 67 3 3');
        playButtonPolygon.setAttribute('style', 'fill:#fff;stroke:#fff200;stroke-linecap:round;stroke-linejoin:round;stroke-width:6px;');
        playButtonPolygon.addEventListener('click', () => {
            this.play();
        });
        this.playButton.appendChild(playButtonPolygon);


        

        projectorRoot.appendChild(this.projector);
        projectorRoot.appendChild(this.playButton);
        this.projector.width =  this.projector.parentElement.clientWidth;
    }
    debug(){
        console.log(this.src, this.selector, this.playButton)
    }
    play(){
        this.projector.play();
    }
    pause(){
        this.projector.pause();
    }
}

var myPlayer = new Player('https://cdn.jsdelivr.net/npm/big-buck-bunny-1080p@0.0.6/video.mp4', '.player');