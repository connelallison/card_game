import PubSub from "./PubSub.js";
import io from "socket.io-client";

const host = window.location.hostname;
const socket = io.connect('http://' + host + ':4000');

socket.on('connection', (data) => {
  if (localStorage.getItem("displayName")) {
    socket.emit("updateDisplayName", {
      displayName: localStorage.getItem("displayName")
    });
  }
})
socket.on("displayNameAnnouncement", (data) => {
  console.log(data.message);
})

// sendButton.addEventListener('click', function () {
//   socket.emit('websocketMessage', {
//     message: inputField.value
//   })
// });
//
// socket.on('websocketMessage', function (data) {
//   output.innerHTML += `<p>${data.message}</p>`;
// })

export default socket;
