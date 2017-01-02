class GameState {
  constructor(io, socket, roomId) {
    this.io = io;
    this.roomId = roomId;
    this.sockets = new Map();
    this.playersReady = new Map();
    this.game = null;
    this.isPlaying = false;
    this.addSocket(socket);
  }

  addSocket(socket) {
    if (this.sockets.size < 2 && !this.isPlaying) {
      this.sockets.set(socket.id, socket);
      socket.join(this.roomId);
      this.setUpDisconnect(socket);
      this.setUpReady(socket);
      return true;
    }
  }

  disconnectAction(socket) {
    if (this.sockets.get(socket.id)) {
      socket.leave(this.roomId);
      this.sockets.delete(socket.id);
      this.io.to(this.roomId).emit('opponentDisconnected');
      if (this.isPlaying) {
        this.isPlaying = false;
        // stop the game
        // get rid of the player
      }
    }
  }

  setUpReady(socket) {
    socket.on('ready', () => {
      this.playersReady.set(socket.id, true);
      if (this.playersReady.size === 2) {
        this.io.to(this.roomId).emit("newGame", 'piecedata');
      }
    });
    socket.on('cancelReady', () => {
      this.playersReady.delete(socket.id);
    });
  }

  setUpDisconnect(socket) {
    socket.on('changeMode', () => {
      this.disconnectAction(socket);
    });
    socket.on('disconnect', () => {
      this.disconnectAction(socket);
    });
  }
}

module.exports = GameState;
