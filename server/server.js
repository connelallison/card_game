const express = require('express');
const socket = require('socket.io');
const path = require('path');
const EventEmitter = require("events");


const app = express();
app.use(express.static(path.join(__dirname, '../client/public')));

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/../client/public/index.html'));
});

const port = process.env.PORT || 4000;
const server = app.listen(port, function () {
  console.log('App is listening on port ' + port);
});

const io = socket(server);

io.on('connection', function (socket) {
  console.log('made websocket connection: ', socket.id);
  socket.on("websocketMessage", function (data) {
    io.sockets.emit("websocketMessage", {
      message: `You said: ${data.message}`
    })
  })
  socket.on('disconnect', (socket) => {
    console.log('disconnected: ', socket.id);
  });
})
