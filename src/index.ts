const $ = document;
class Player {
    src: string;
    selector: HTMLElement;
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
    public onStateChange(event){
        console.log(event);
        
        // event.target.width = $
    }
    public stopVideo(){
        this.player.stopVideo();
        $.body.style.cssText = '';
        const element = $.getElementById('ytvideoembed');
        return element.parentNode.removeChild(element);
    }
    public createOverlay(){
        //stop scrolling
        $.body.style.cssText = 'overflow:hidden';
        //create the overlay
        const overlay = $.createElement('div');
        overlay.setAttribute('id', 'ytvideoembed');
        overlay.style.cssText = 'position:absolute;top:0;left:0;width:100vw;height:100vh;background:rgb(0, 0, 0, 0.9);';
        overlay.addEventListener('click', ()=>{
            this.stopVideo();
        });
        //create the container, inner and button
        //container
        const container = $.createElement('div');
        container.classList.add('yt-container');
        container.style.cssText = 'position: absolute;left: 50%;top: 50%;transform: translate(-50%, -50%); text-align:center;';
        //button
        const button = $.createElement('button');
        button.classList.add('yt-button');
        button.innerHTML = 'Close';
        button.addEventListener('click',()=>{
            this.stopVideo();
        });
        //inner
        const inner = $.createElement('div');
        inner.setAttribute('id', 'player')
        inner.style.cssText = 'margin-bottom:1em';
        //append items
        $.body.appendChild(overlay);
        overlay.appendChild(container);
        container.appendChild(inner);
        container.appendChild(button);
        //start the YT video
        setTimeout(()=>{
            this.player =  new YT.Player('player', {
                videoId: this.src,
                events: {
                    'onReady': this.onPlayerReady,
                    'onStateChange': this.onStateChange
                }
            });
        });
    }
    public removeOverlay(){
        const element = $.getElementById('player');
        element.parentNode.removeChild(element);
    }
    public createScript(){
        //check if there already is a YT embed script
        if (!window['ytEmbedVideoScript']) {
            //create the script tag
            var tag = $.createElement('script');
            //set the src and append it
            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag =  $.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            window['ytEmbedVideoScript'] = true;
        }
    }
}