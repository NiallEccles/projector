const $ = document;
class Player {
    public src: string;
    public selector: HTMLElement;
    public player: YT.Player;
    private _width: number = 16;
    private _height: number = 9;
    private _aspectRatio: number;
    constructor(src) {
        this.src = src;
        this.createScript();
    }
    public start(): void{
        //create the overlay
        const overlay = $.createElement('div');
        //stop scrolling
        $.body.style.cssText = 'overflow:hidden';
        overlay.addEventListener('touchmove',(e)=>{
            e.preventDefault();
        })
        //set attributes and styles
        overlay.setAttribute('id', 'ytvideoembed');
        overlay.style.cssText = 'position:absolute;top:0;left:0;width:100vw;height:100vh;background:rgb(0, 0, 0, 0.9);';
        overlay.addEventListener('click', ()=>{
            this.stopVideo();
        });
        //append to body
        $.body.appendChild(overlay);
        //set the inner of overlay
        overlay.innerHTML = 
            `<div class="yt-container" id="yt-container" style="position:absolute;left:50%;top:50%;transform:translate(-50%, -50%);background:rgb(0, 0, 0, 0);">
                <div id="player"></div>
                <button class="yt-button" style="position: relative;left: 50%;transform: translateX(-50%);">Close</button>
            </div>`;
        //create the YT player
        this.player =  new YT.Player('player', {
            videoId: this.src,
            width: '100%',
            height: '100%',
            playerVars:{
                'autoplay': 1,
                'color': 'white',
                'rel': 0,
                'showinfo': 0,
            },
            events: {
                'onReady': this.onPlayerReady
            }
        });
        this.updateAspectRatio();
        this.resize();
        //adjust container on window resize
        window.addEventListener('resize',()=>{
            this.resize();
        })
    }
    public onPlayerReady(event): void{
        event.target.playVideo();
        event.target.mute();
    }
    public stopVideo(): HTMLElement{
        this.player.stopVideo();
        $.body.style.cssText = '';
        const element = $.getElementById('ytvideoembed');
        return element.parentNode.removeChild(element);
    }
    public resize(): void{
        const el = $.getElementById('yt-container');
        const windowRatio = window.innerWidth / window.innerHeight;
        
        const margin = 60;
        let actualWidth = (window.innerWidth - (margin*2));
        let actualHeight = (window.innerHeight - (margin*6));

        actualWidth = actualWidth > 1600 ? 1600 : actualWidth;
        actualHeight = actualHeight > 900 ? 900 : actualHeight;

        const baseWidth = (actualWidth/window.innerWidth) * 100;
        const baseHeight = (actualHeight/window.innerHeight) * 100;

        let width: string;
        let height: string;

        if(this._aspectRatio < windowRatio){
            this._height = baseHeight;
            height = this._height + 'vh';
            this._width = (baseHeight * this._aspectRatio);
            width = this._width + 'vh';
        } else {
            this._width = baseWidth;
            width = this._width + 'vw';
            this._height = (baseWidth / this._aspectRatio);
            height = this._height + 'vw';
        }

        el.style.cssText = `position:absolute;left:50%;top:50%;transform:translate(-50%, -50%);background:rgb(0, 0, 0, 0);margin:auto;width:${width};height:${height}`;
    }
    private updateAspectRatio(): void{
        this._aspectRatio = (!!this._width && !!this._height)
                                    ? this._width / this._height
                                    : this._width / this._height;
    }
    public removeOverlay(){
        const element = $.getElementById('player');
        element.parentNode.removeChild(element);
    }
    public createScript(): void{
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