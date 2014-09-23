//App functionality
var app = (function() {
  var canvas = document.querySelector('#canvas'),
    video = document.querySelector('#video');
  var ctx = canvas.getContext('2d');
  var cw = canvas.width;
  var ch = canvas.height;
  var pixelCount = cw*ch;

  function takeImage() {
    ctx.drawImage(video, 0, 0, cw, ch);
    var pixels = ctx.getImageData(0, 0, cw, ch).data;
    return pixels;
  }
  function getDominantColor() {
    var colorThief = new ColorThief();
    var x = colorThief.getColor(canvas);
    console.log(x);
  }
  function dominantColor(pixels) {
      var pixelArray = [];
      for (var i = 0; i < pixelCount; i++) {  
          pixelArray.push( [pixels[i*4], pixels[i*4+1], pixels[i*4+2]]);
      }
      var cmap = MMCQ.quantize(pixelArray, 16);
      var newPalette = cmap.palette();

      var colorArray = {"r": newPalette[0][0], "g": newPalette[0][1], "b": newPalette[0][2]};
      return colorArray;
  }

  function handle(colors) {
    var bg = document.querySelector('body');
    bg.style.backgroundColor = 'rgb(' + colors.r + ',' + colors.g + ',' + colors.b + ')';
  };

  function paint() {
    var pixels = takeImage();
    var colors = dominantColor(pixels);
    handle(colors);
    window.requestAnimationFrame(paint);
  }
  function setCanvas() {
    var raf = window.requestAnimationFrame;
    raf(paint);
  }
  return {
    takeImage: takeImage,
    setCanvas: setCanvas
  };
})();

//Start video
(function(app) {
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

  var constraints = {audio: false, video: true};
  var video = document.querySelector("video");

  function successCallback(stream) {
    window.stream = stream; // stream available to console
    if (window.URL) {
      video.src = window.URL.createObjectURL(stream);
    } else {
      video.src = stream;
    }
    video.play();
    app.setCanvas();
  }

  function errorCallback(error){
    console.log("navigator.getUserMedia error: ", error);
  }

  navigator.getUserMedia(constraints, successCallback, errorCallback);

})(app);

