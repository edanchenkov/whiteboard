'use strict'

var sessionid = null;

var socket = io.connect('http://localhost', {
  // 'sync disconnect on unload': true
})

socket.on('connect', function () {
  sessionid = socket.socket.sessionid;
});


socket.on('disconnect', function () {

});


socket.on('leaveUser', function(id){
  removeRow(id)
})

socket.on('addNewUser', function(user){
  addRow(user);
})

socket.on('whiteboard', function(data){
  draw(data.x, data.y, data.oldx, data.oldy, data.color);
})

socket.on('askForCanvas', function(id){
  console.dir('hello')
})


