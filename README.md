# projector

A simple overlay for playing YouTube videos.

## Setup
`npm install`

`npm run dev`


## Usage
```javascript
  var myPlayer = new Projector('<YouTubeVideoId>');
  document.getElementById('<yourElementId>').addEventListener('click', ()=>{
      myPlayer.start();
  });
```
