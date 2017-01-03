const lengthOfColors = 11;
const lengthOfGamePieces = 2;
const amountOfPieces = 12;
const possibleIndexes = 8;

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
      this.setUpBoardChange(socket);
      return true;
    }
  }

  setUpBoardChange(socket) {
    socket.on("boardChanged", (data) => {
      console.log(data);
    });
  }

  disconnectAction(socket) {
    if (this.sockets.get(socket.id)) {
      socket.leave(this.roomId);
      this.playersReady.delete(socket.id);
      this.sockets.delete(socket.id);
      this.io.to(this.roomId).emit('opponentDisconnected');
      if (this.isPlaying) {
        this.isPlaying = false;
        // stop the game
        // get rid of the player
      }
    }
  }

  buildNewGame() {
    const gameData = {
      pieces: [],
      shuffledOrder: []
    };
    gameData.pieceNum = lengthOfGamePieces;
    gameData.color = Math.floor(Math.random() * lengthOfColors);
    for (let i=0; i<lengthOfGamePieces; i++) {
      gameData.pieces.push(Math.floor(Math.random() * amountOfPieces));
      gameData.shuffledOrder.push(Math.floor(Math.random() * lengthOfGamePieces));
    }
    gameData.firstP = Math.floor(Math.random() * possibleIndexes);
    return gameData;
  }

  setUpReady(socket) {
    socket.on('ready', () => {
      this.playersReady.set(socket.id, true);
      if (this.playersReady.size === 2) {
        let gameData = this.buildNewGame();
        this.io.to(this.roomId).emit("newGame", gameData);
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
