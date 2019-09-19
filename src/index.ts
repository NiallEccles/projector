const $ = document;
class Player {
    src: string;
    selector: HTMLElement; 
    done: boolean = false;
    player: YT.Player;
    constructor(src, selector) {
        this.src = src;
        this.selector = selector;
    }
    public initYTPlayer(){
        this.createScript();
    }
    public start(){
        this.player =  new YT.Player('player', {
            height: '900',
            width: '1600',
            videoId: this.src,
            events: {
                'onReady': this.onPlayerReady
            }
        });
    }
    public onPlayerReady(event){
        event.target.playVideo();
    }
    public stopVideo(){
        this.player.stopVideo();
    }
    public createScript(){
        //create the script tag
        var tag = document.createElement('script');
        //set the src and append it
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag =  document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
}

var myPlayer = new Player('ETXQUkp-VOg', 'player');

myPlayer.initYTPlayer();
setTimeout(()=>{
    myPlayer.start();
},2000);