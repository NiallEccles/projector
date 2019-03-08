class Player {
    src: string;
    selector: string;
    projector: HTMLVideoElement;
    projectorWrapper: HTMLElement;
    playButton: any;
    pauseButton: any;
    isPlaying: boolean;
    projectorRoot: HTMLElement;
    playButtonPolygon: any;
    buttonStrokeColour: string;
    constructor(src, selector) {
        this.src = src;
        this.selector = selector;
        this.isPlaying = false;
        this.buttonStrokeColour = '#fff200';
        
        this.projectorRoot = document.querySelector(selector);

        this.projector = document.createElement('video');
        this.projector.src = this.src;

        this.projectorWrapper = document.createElement('div');
        this.projectorWrapper.classList.add('projector-wrapper');
        this.projectorWrapper.style.width = '100%';

        this.playButton = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.playButton.setAttribute('id', 'playButton');

        this.playButtonPolygon = document.createElementNS(this.playButton.namespaceURI,'polygon')
        this.playButtonPolygon.setAttribute('points', '3 3 54.99 35 3 67 3 3');
        this.playButtonPolygon.setAttribute('style', `fill:none;stroke:${this.buttonStrokeColour};stroke-linecap:round;stroke-linejoin:round;stroke-width:6px;`);

        this.playButton.appendChild(this.playButtonPolygon);

        this.projectorRoot.appendChild(this.projectorWrapper);
        this.projectorWrapper.appendChild(this.projector);
        this.projectorWrapper.appendChild(this.playButton);
        this.projector.style.width = '100%';

        this.playButton.addEventListener('click', () => {
            this.play();
            this.playButton.style.display = 'none';
        });

        this.projector.addEventListener('click', () => {
            if(this.isPlaying){
                this.pause();
                this.playButton.style.display = 'block';
            }
        });

        this.projector.addEventListener('dblclick', () => {
            this.projector.requestFullscreen();
        });
    }
    debug(){
        console.log(this.src, this.selector, this.playButton);
    }
    play(){
        this.projector.play();
        this.isPlaying = true;
    }
    pause(){
        this.projector.pause();
        this.isPlaying = false;
    }
}

var myPlayer = new Player('https://cdn.jsdelivr.net/npm/big-buck-bunny-1080p@0.0.6/video.mp4', '.player');