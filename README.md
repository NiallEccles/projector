# projector

A simple overlay for playing YouTube videos.

## Setup
`npm install @nialleccles/projector`


## Usage
```javascript
  const projector = require('@nialleccles/projector')

  var myPlayer = new projector.Projector('<YouTubeVideoId>');
  document.getElementById('<yourElementId>').addEventListener('click', ()=>{
      myPlayer.start();
  });
```

## Example
![example image of video overlay](https://github.com/NiallEccles/projector/blob/media/example.jpg)
