const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const crypto = require('crypto');
const GameState = require('./public/lib/game_state.js');

app.use(express.static('public'));

const allRooms = new Map();

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('newRoom', () => {
    let roomId = crypto.randomBytes(5).toString('hex');
    while (allRooms.get(roomId)) {
      roomId = crypto.randomBytes(5).toString('hex');
    }
    let newGameState = new GameState(io, socket, roomId);
    allRooms.set(roomId, newGameState);
    socket.emit('setLink', roomId);
  });

  socket.on('joinRoom', (roomId) => {
    console.log(allRooms);
    let gameState = allRooms.get(roomId);
    if (gameState === undefined) {
      socket.emit('failure', "Can't find the room. Please check the room ID.");
    } else {
      let joinSuccess = gameState.addSocket(socket);
      console.log(joinSuccess);
      if (joinSuccess) {
        io.to(roomId).emit('matchSuccess');
      } else {
        socket.emit('failure', "The room is currently full.");
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
