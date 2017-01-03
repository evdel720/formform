import Game from './game.js';
import { placePieceOnBoard } from './utils.js';
/* global socket */

class MultiMode {
  constructor(options) {
    this.mode = 'multi';
    this.options = options;
    this.ready = false;
    this.game = undefined;
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
      this.lostHandler();
    });
  }

  setUpOpponentBoard() {
    socket.on("sendBoardData", data => {
      this.opponentBoard = data;
      // update board!
    });
  }

  initialUI() {
    this.options.main.innerText = 'Ready';
    this.options.roomSet.classList.remove('hidden');
    this.options.opponent.classList.add('hidden');
    this.options.rotate.classList.add('hidden');
    this.options.flip.classList.add('hidden');
    this.options.main.disabled = true;
    this.opponentBoard = undefined;
  }

  setUpNewGame() {
    socket.on("newGame", (data) => {
      this.options.main.classList.remove('ready');
      this.options.main.innerText = 'Quit';
      this.options.rotate.classList.remove("hidden");
      this.options.flip.classList.remove("hidden");
      this.game = new Game(this.options.boardNode, this.options.pieces, data, this);
      this.game.play();
    });
  }

  setUpDisconnect() {
    socket.on("opponentDisconnected", () => {
      window.alert("Your opponent is disconnected.");
      this.initialUI();
      this.mainBtnHandler();
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
    if (this.ready) {
      socket.emit('cancelReady');
      this.options.main.classList.remove("ready");
    } else {
      socket.emit('ready');
      this.options.main.classList.add("ready");
    }
    this.ready = !this.ready;
  }

  boardChangeHandler() {
    socket.emit('boardChanged', this.game.board.board);
  }

  lostHandler() {
    socket.on('lost', () => {
      console.log('lost');
      this.options.lostSound.play();
    });
  }

  wonHandler() {
    // emit winning
    // disable interaction for both of winning, losing
    console.log('won');
    socket.emit('won');
  }
}

export default MultiMode;
