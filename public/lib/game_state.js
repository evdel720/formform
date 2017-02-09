const lengthOfColors = 11;
const lengthOfGamePieces = 8;
const amountOfPieces = 12;
const possibleIndexes = 8;

class GameState {
  constructor(io, socket, roomId, allRooms) {
    this.allRooms = allRooms;
    this.io = io;
    this.roomId = roomId;
    this.sockets = new Map();
    this.playersReady = new Map();
    this.game = null;
    this.addSocket(socket);
  }

  addSocket(socket) {
    this.sockets.set(socket.id, socket);
    socket.join(this.roomId);
    this.setUpDisconnect(socket);
    this.setUpReady(socket);
    this.setUpBoardChange(socket);
    this.setUpWin(socket);
    this.setUpLose(socket);
  }

  setUpLose(socket) {
    socket.on('lost', () => {
      this.playersReady = new Map();
      let opponent = this.opponents.get(socket.id);
      opponent.emit('won');
    });
  }

  setUpWin(socket) {
    socket.on('won', () => {
      this.playersReady = new Map();
      let opponent = this.opponents.get(socket.id);
      opponent.emit('lost');
    });
  }

  setUpBoardChange(socket) {
    socket.on("boardChanged", (data) => {
      let opponent = this.opponents.get(socket.id);
      opponent.emit("sendBoardData", data);
    });
  }

  disconnectAction(socket) {
    if (this.sockets.get(socket.id)) {
      this.opponents = undefined;
      socket.leave(this.roomId);
      this.playersReady = new Map();
      this.sockets.delete(socket.id);
      this.io.to(this.roomId).emit('opponentDisconnected');
    }
    if (this.sockets.size === 0) {
      this.allRooms.delete(this.roomId);
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

  buildOpponentMap() {
    this.opponents = new Map();
    let keys = Array.from(this.sockets.keys());
    this.opponents.set(keys[0], this.sockets.get(keys[1]));
    this.opponents.set(keys[1], this.sockets.get(keys[0]));
  }

  setUpReady(socket) {
    socket.on('ready', () => {
      this.playersReady.set(socket.id, true);
      if (this.playersReady.size === 2) {
        let gameData = this.buildNewGame();
        this.buildOpponentMap();
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
