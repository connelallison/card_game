const express = require('express');
const socket = require('socket.io');
const path = require('path');
const EventEmitter = require("events");
const ServerPlayer = require("./ServerPlayer.js");


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

const connectedPlayers = [];

io.on('connection', function (socket) {
  console.log('made websocket connection: ', socket.id);
  const socketID = socket.id;
  const serverPlayer = new ServerPlayer(socketID);
  connectedPlayers.push(serverPlayer);
  console.log(connectedPlayers);
  socket.on("updateDisplayName", function (data) {
    console.log("updateDisplayName request received");
    const oldName = serverPlayer.displayName;
    serverPlayer.displayName = data.displayName;
    console.log(serverPlayer.displayName);
    io.emit("displayNameAnnouncement", {
      message: `${oldName} is now: ${serverPlayer.displayName}`
    })
  })
  socket.on('disconnect', (socket) => {
    connectedPlayers.splice(connectedPlayers.indexOf(serverPlayer), 1);
    console.log('disconnected: ', socketID);
  });
  socket.emit("gameStateUpdate", {
      gameState: {
        myTurn: true,
        my: {
          hero: {
            attack: 0,
            health: 30,
            mana: 3
          },
          board: [],
          hand: [],
          deck: 30
        },
        opponent: {
          hero: {
            attack: 0,
            health: 30,
            mana: 0
          },
          board: [],
          hand: 3,
          deck: 25
        }
      },
      legalMoves: {
        canAttackWith: {},
        canPlay: {}
      }
  })
})
