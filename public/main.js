const port = 4444;
const socket = io.connect('http://localhost:' + port);


socket.on('userName', function(userName){
    console.log('Create new user - ' + userName);
    $('textarea').val($('textarea').val() + 'You\'r username => ' + userName + '\n');
});

socket.on('newUser', function(userName){
    console.log(userName + 'is join');
    $('textarea').val($('textarea').val() + userName + ' connected!\n');
});

$(document).on('click', 'button', function(){
    let message = $('input').val();
    socket.emit('message', message);
    $('input').val(null);
});

socket.on('messageToClients', function(msg, name){
    console.log(name + ' | => ' + msg);
    $('textarea').val($('textarea').val() + name + ' : '+ msg +'\n');
});