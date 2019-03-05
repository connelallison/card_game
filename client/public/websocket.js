const host = window.location.hostname;

const socket = io.connect('http://' + host + ':4000');

// sendButton.addEventListener('click', function () {
//   socket.emit('websocketMessage', {
//     message: inputField.value
//   })
// });
//
// socket.on('websocketMessage', function (data) {
//   output.innerHTML += `<p>${data.message}</p>`;
// })
