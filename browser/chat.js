document.addEventListener('DOMContentLoaded', function() {
    const socket = io();

    const messagesList = document.getElementById('messagesList');
    const messageInput = document.getElementById('messageInput');
    const sendButton   = document.getElementById('sendButton');

    sendButton.addEventListener('click', function(){
        socket.emit('chat message', messageInput.value);
        messageInput.value = '';
    });

    socket.on('chat message', function(msg){
        messagesList.innerHTML += `<li>${msg}</li>`;
        window.scrollTo(0, document.body.scrollHeight);
    });
}, false);