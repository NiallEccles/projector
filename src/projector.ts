export class Projector {
    public src: string;
    public selector: HTMLElement;
    public player: YT.Player;
    private _width: number = 16;
    private _height: number = 9;
    private _aspectRatio: number;
    constructor(src) {
      this.src = src;
      //check if there already is a YT embed script
      if (!window["ytEmbedVideoScript"]) {
        //create the script tag
        var tag = document.createElement("script");
        //set the src and append it
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        window["ytEmbedVideoScript"] = true;
      }
    }
    public start(): void {
      //create the overlay
      const overlay = document.createElement("div");
      //stop scrolling
      document.body.style.cssText = "overflow:hidden";
      overlay.addEventListener("touchmove", e => {
        e.preventDefault();
      });
      //set attributes and styles
      overlay.setAttribute("id", "ytvideoembed");
      overlay.style.cssText =
        "position:absolute;top:0;left:0;width:100vw;height:100vh;background:rgb(0, 0, 0, 0.9);";
      overlay.addEventListener("click", () => {
        this.stopVideo();
      });
      //append overlay to body
      document.body.appendChild(overlay);
      //set the inner of overlay - includes a container, YT player and button
      overlay.innerHTML = `<div class="projector-container" id="projector-container" style="position:absolute;left:50%;top:50%;transform:translate(-50%, -50%);background:rgb(0, 0, 0, 0);">
                  <div id="projector"></div>
                  <button class="projector-button" id="projector-button" style="position: relative;z-index:11;left: 50%;transform: translateX(-50%);">Close</button>
              </div>`;
      document.getElementById('projector-button').addEventListener("click",()=>{
          this.stopVideo();
      })
      //create the YT player
      this.player = new YT.Player("projector", {
        videoId: this.src,
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 1,
          rel: 0
        },
        events: {
          onReady: this.onPlayerReady
        }
      });
      //update aspect ratio and resize asap
      this.updateAspectRatio();
      this.resize();
      window.addEventListener("resize", () => {
        this.resize();
      });
    }
    public onPlayerReady(event): void {
      event.target.playVideo();
    }
    public stopVideo(): void {
      this.player.stopVideo();
      this.removeOverlay();
    }
    public resize(): void {
      const el = document.getElementById("projector-container");
      const windowRatio = window.innerWidth / window.innerHeight;
  
      const margin = 60;
      let actualWidth = window.innerWidth - margin * 2;
      let actualHeight = window.innerHeight - margin * 6;
  
      actualWidth = actualWidth > 1600 ? 1600 : actualWidth;
      actualHeight = actualHeight > 900 ? 900 : actualHeight;
  
      const baseWidth = (actualWidth / window.innerWidth) * 100;
      const baseHeight = (actualHeight / window.innerHeight) * 100;
  
      let width: string;
      let height: string;
  
      if (this._aspectRatio < windowRatio) {
        this._height = baseHeight;
        height = this._height + "vh";
        this._width = baseHeight * this._aspectRatio;
        width = this._width + "vh";
      } else {
        this._width = baseWidth;
        width = this._width + "vw";
        this._height = baseWidth / this._aspectRatio;
        height = this._height + "vw";
      }
  
      el.style.cssText = `position:absolute;left:50%;top:50%;transform:translate(-50%, -50%);background:rgb(0, 0, 0, 0);margin:auto;width:${width};height:${height}`;
    }
    private updateAspectRatio(): void {
      this._aspectRatio =
        !!this._width && !!this._height
          ? this._width / this._height
          : this._width / this._height;
    }
    public removeOverlay(): void {
      document.body.style.cssText = "";
      const player = document.getElementById("projector");
      player ? player.parentNode.removeChild(player) : '';
      const element = document.getElementById("ytvideoembed");
      element ? element.parentNode.removeChild(element) : '';
    }
  }
  