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
      this.sockets.set(socket.id, socket);
      socket.join(this.roomId);
      this.setUpDisconnect(socket);
      return true;
    }
  }

  disconnectAction(socket) {
    if (this.sockets.get(socket)) {
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
