const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  socket.on('newRoom', (roomId) => {
    console.log(roomId);
    console.log('new room requested!');
  });

  // setUpNewRoom
  // setUpTwoPlayerGame

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
