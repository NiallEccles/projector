class Player {
    src: string;
    selector: string;
    constructor(src, selector) {
        this.src = src;
        this.selector = selector;
        
        const projectorRoot = document.querySelector(selector);
        if(projectorRoot){
            const projectorSrc = src;
            const projector = `
                <video>
                    <source type="video/mp4" src="${projectorSrc}">
                </video>
            `;
            projectorRoot.innerHTML = projector;
        }
        else{
            console.error(`${selector} not found.`);
        }
    }
    debug(){
        console.log(this.src, this.selector)
    }
}

var myPlayer = new Player('https://cdn.jsdelivr.net/npm/big-buck-bunny-1080p@0.0.6/video.mp4', '.player');