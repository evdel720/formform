import Game from './game.js';
import { placePieceOnBoard, getGridNode, disableInteraction } from './utils.js';
/* global socket */

class MultiMode {
  constructor(options) {
    this.mode = 'multi';
    this.options = options;
    this.ready = false;
    this.game = undefined;
    this.opponentBoardNode = getGridNode(options.opponent);
  }

  enableUI() {
    this.options.timer.classList.add('hidden');
    this.options.levels.classList.add('hidden');
    this.options.mode.innerText = "Solo";
    this.initialUI();
    this.setLink();
    socket.on("matchSuccess", () => {
      this.options.roomSet.classList.add('hidden');
      this.options.opponent.classList.remove('hidden');
      this.options.main.disabled = false;
      this.setUpDisconnect();
      this.setUpNewGame();
      this.setUpOpponentBoard();
      this.lostListener();
      this.wonListener();
    });
  }

  updateOpponentBoard(data) {
    for (let i=0; i<data.length; i++) {
      for (let j=0; j<data[0].length; j++) {
        let status;
        if (data[i][j] === 0) {
          status = '';
        } else if (data[i][j] === 1) {
          status = 'cell';
        } else {
          status = 'filled';
        }
        this.opponentBoardNode[i][j].setAttribute('class', status);
      }
    }
  }

  setUpOpponentBoard() {
    socket.on("sendBoardData", data => {
      this.updateOpponentBoard(data);
    });
  }

  initialUI() {
    this.options.main.innerText = 'Ready';
    this.options.roomSet.classList.remove('hidden');
    this.options.opponent.classList.add('hidden');
    this.options.rotate.classList.add('hidden');
    this.options.flip.classList.add('hidden');
    this.options.main.disabled = true;
  }

  setUpNewGame() {
    socket.on("newGame", (data) => {
      this.options.main.classList.remove('ready');
      this.options.main.innerText = 'Concede';
      this.options.rotate.classList.remove("hidden");
      this.options.flip.classList.remove("hidden");
      this.game = new Game(this.options.boardNode, this.options.pieces, data, this);
      this.game.play();
      this.updateOpponentBoard(this.game.board.board);
    });
  }

  clearOpponentBoard() {
    this.opponentBoardNode.forEach((row) => {
      row.forEach((cell) => {
        cell.removeAttribute('class');
      });
    });
  }

  setUpDisconnect() {
    socket.on("opponentDisconnected", () => {
      window.alert("Your opponent is disconnected.");
      this.initialUI();
      this.ready = false;      this.options.main.classList.remove("ready");
      this.clearOpponentBoard();
      if (this.game) {
        this.game.clearBoard();
        this.game = undefined;
      }
    });
  }

  setLink() {
    socket.on("setLink", (roomId) => {
      let link = window.location.origin + "?room_id=" + roomId;
      window.history.replaceState({}, '', link);
      this.options.roomLink.value = link;
    });
  }

  mainBtnHandler() {
    if (this.game && this.game.isPlaying) {
      this.scoreHelper(false);
      socket.emit('lost');
    } else {
      if (this.ready) {
        socket.emit('cancelReady');
        this.options.main.classList.remove("ready");
      } else {
        socket.emit('ready');
        this.options.main.classList.add("ready");
      }
      this.ready = !this.ready;
    }
  }

  boardChangeHandler() {
    socket.emit('boardChanged', this.game.board.board);
  }

  resetUIShow() {
  }

  scoreHelper(isWon) {
    this.ready = false;
    disableInteraction(this.game, isWon, this, 'Ready');
  }

  lostListener() {
    socket.on('lost', () => {
      this.scoreHelper(false);
    });
  }

  wonListener() {
    socket.on('won', () => {
      this.scoreHelper(true);
    });
  }

  wonHandler() {
    this.scoreHelper(true);
    socket.emit('won');
  }
}

export default MultiMode;
