const Game = require('./game.js');

class GameState {
  constructor(io, socket, roomId) {
    this.io = io;
    this.roomId = roomId;
    this.sockets = new Map();
    this.players = {
      1: null,
      2: null
    };
    this.playersReady = new Map();
    this.game = null;
    this.isPlaying = false;
    this.addSocket(socket);
  }

  addSocket(socket) {
    if (this.sockets.size < 2 && !this.isPlaying) {
      this.sockets[socket.id] = socket;
      socket.join(this.roomId);
      // do something here
      return true;
    }
  }
}

module.exports = GameState;
