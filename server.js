const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const crypto = require('crypto');
const GameState = require('./public/lib/game_state.js');

const allRooms = new Map();

app.use(express.static('public'));

io.on('connection', (socket) => {
  socket.on('newRoom', () => {
    let roomId = crypto.randomBytes(5).toString('hex');
    while (allRooms.get(roomId)) {
      roomId = crypto.randomBytes(5).toString('hex');
    }
    allRooms.set(roomId, new GameState(io, socket, roomId));
    socket.emit('joinRoom', roomId);
  });

  socket.on('joinRoom', (roomId) => {
    let gameState = allRooms.get(roomId);
    if (gameState === undefined) {
      // failing with no room
    } else {
      let joinSuccess = gameState.addSocket(socket);
      if (!joinSuccess) {
        // failing with full room
      }
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
