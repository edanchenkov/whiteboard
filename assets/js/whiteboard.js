'use strict'

var whiteboard = $('#whiteboard')[0];
var colorPick = $('#from-color-pick');

// Coordinates
var x = 0
var y = 0
var oldx = 0
var oldy = 0

var isDrawable = false;

if(whiteboard && whiteboard.getContext) {

  var context = whiteboard.getContext('2d');

  whiteboard.addEventListener('mousemove', function (e) {

    oldx = x
    oldy = y
    x = e.clientX - whiteboard.offsetLeft;
    y = e.clientY - whiteboard.offsetTop;
    
    if(isDrawable) {
      draw(x,y,oldx,oldy,colorPick.val());
      socket.emit('draw', {x:x,y:y,oldx:oldx,oldy:oldy,color:colorPick.val()})
      socket.emit('save', {canvas:whiteboard.toDataURL()})
    }


  }, false);

  whiteboard.addEventListener('mousedown', function (e) {
      isDrawable = true;
  }, false);
  whiteboard.addEventListener('mouseup', function (e) {
      isDrawable = false;
  }, false);
  whiteboard.addEventListener('mouseout', function (e) {
      isDrawable = false;
  }, false);

}

var draw = function (x,y,oldx,oldy,color) {
  context.beginPath();
  context.moveTo(oldx, oldy);
  context.lineTo(x,y);
  context.strokeStyle = color;
  context.lineWidth = 2;
  context.stroke();
  context.closePath();
}

function loadCanvas(canvas) {
  if(canvas){
    var m = canvas;
    var img = new Image;
    img.src = m;
    img.onload = function () {
        context.drawImage(img, 0, 0);
    };
  }
}
