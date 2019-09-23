const $ = document;
class Player {
    src: string;
    selector: HTMLElement;
    done: boolean = false;
    player: YT.Player;
    constructor(src) {
        this.src = src;
        this.createScript();
    }
    public start(){
        this.createOverlay();
    }
    public onPlayerReady(event){
        event.target.playVideo();
    }
    public stopVideo(){
        this.player.stopVideo();
    }
    public createOverlay(){
        const overlay = document.createElement('div');
        overlay.setAttribute('id', 'ytvideoembed');
        overlay.style.cssText = 'position:absolute;top:0;left:0;width:100vw;height:100vh;background:rgb(0, 0, 0, 0.6);';
        const container = document.createElement('div');
        container.setAttribute('id', 'player')
        container.style.cssText = 'position: absolute;left: 50%;top: 50%;transform: translate(-50%, -50%);';
        document.body.appendChild(overlay);
        overlay.appendChild(container);
        setTimeout(()=>{
            this.player =  new YT.Player('player', {
                videoId: this.src,
                events: {
                    'onReady': this.onPlayerReady
                }
            });
        });
    }
    public createScript(){
        if (!window['ytEmbedVideoScript']) {
            //create the script tag
            var tag = document.createElement('script');
            //set the src and append it
            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag =  document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            window['ytEmbedVideoScript'] = true;
        }
    }
}