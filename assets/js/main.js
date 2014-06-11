'use strict'

$('#welcome-modal').modal({
   show: true,
   backdrop: 'static',
   keyboard: false
})

$('#form-name').on('input',function(e){
  if($(this).val().length > 0){
    $('#btn-login').removeAttr('disabled');
  } else {
    $('#btn-login').attr('disabled', 'disabled');
  }
});
 
$('#btn-login').click(function(event) {
  var user =  {
    name: $('#form-name').val(), 
    color: $('#from-color-pick').val(),
    id: sessionid
  }
  socket.emit('newUser', user)
  $('#welcome-modal').modal('hide')
  addRow(user)
  event.preventDefault();
});

var addRow = function(user){
  $('table#users > tbody')
    .append('<tr id="'+user.id+'"><td>'+ user.name+'</td><td>'+user.color+'</td></tr>');
}

var removeRow = function(id) {
  $('#' + id).remove();
}

