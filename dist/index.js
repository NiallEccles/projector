var $ = document;
var Projector = /** @class */ (function () {
    function Projector(src) {
        this._width = 16;
        this._height = 9;
        this.src = src;
        //check if there already is a YT embed script
        if (!window["ytEmbedVideoScript"]) {
            //create the script tag
            var tag = $.createElement("script");
            //set the src and append it
            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = $.getElementsByTagName("script")[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            window["ytEmbedVideoScript"] = true;
        }
    }
    Projector.prototype.start = function () {
        var _this = this;
        //create the overlay
        var overlay = $.createElement("div");
        //stop scrolling
        $.body.style.cssText = "overflow:hidden";
        overlay.addEventListener("touchmove", function (e) {
            e.preventDefault();
        });
        //set attributes and styles
        overlay.setAttribute("id", "ytvideoembed");
        overlay.style.cssText =
            "position:absolute;top:0;left:0;width:100vw;height:100vh;background:rgb(0, 0, 0, 0.9);";
        overlay.addEventListener("click", function () {
            _this.stopVideo();
        });
        //append overlay to body
        $.body.appendChild(overlay);
        //set the inner of overlay - includes a container, YT player and button
        overlay.innerHTML = "<div class=\"projector-container\" id=\"projector-container\" style=\"position:absolute;left:50%;top:50%;transform:translate(-50%, -50%);background:rgb(0, 0, 0, 0);\">\n                <div id=\"projector\"></div>\n                <button class=\"projector-button\" id=\"projector-button\" style=\"position: relative;z-index:11;left: 50%;transform: translateX(-50%);\">Close</button>\n            </div>";
        $.getElementById('projector-button').addEventListener("click", function () {
            _this.stopVideo();
        });
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
        window.addEventListener("resize", function () {
            _this.resize();
        });
    };
    Projector.prototype.onPlayerReady = function (event) {
        event.target.playVideo();
    };
    Projector.prototype.stopVideo = function () {
        this.player.stopVideo();
        this.removeOverlay();
    };
    Projector.prototype.resize = function () {
        var el = $.getElementById("projector-container");
        var windowRatio = window.innerWidth / window.innerHeight;
        var margin = 60;
        var actualWidth = window.innerWidth - margin * 2;
        var actualHeight = window.innerHeight - margin * 6;
        actualWidth = actualWidth > 1600 ? 1600 : actualWidth;
        actualHeight = actualHeight > 900 ? 900 : actualHeight;
        var baseWidth = (actualWidth / window.innerWidth) * 100;
        var baseHeight = (actualHeight / window.innerHeight) * 100;
        var width;
        var height;
        if (this._aspectRatio < windowRatio) {
            this._height = baseHeight;
            height = this._height + "vh";
            this._width = baseHeight * this._aspectRatio;
            width = this._width + "vh";
        }
        else {
            this._width = baseWidth;
            width = this._width + "vw";
            this._height = baseWidth / this._aspectRatio;
            height = this._height + "vw";
        }
        el.style.cssText = "position:absolute;left:50%;top:50%;transform:translate(-50%, -50%);background:rgb(0, 0, 0, 0);margin:auto;width:" + width + ";height:" + height;
    };
    Projector.prototype.updateAspectRatio = function () {
        this._aspectRatio =
            !!this._width && !!this._height
                ? this._width / this._height
                : this._width / this._height;
    };
    Projector.prototype.removeOverlay = function () {
        $.body.style.cssText = "";
        var player = $.getElementById("projector");
        player ? player.parentNode.removeChild(player) : '';
        var element = $.getElementById("ytvideoembed");
        element ? element.parentNode.removeChild(element) : '';
    };
    return Projector;
}());
//# sourceMappingURL=index.js.map