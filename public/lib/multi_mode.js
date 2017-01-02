// idea: generate game with extra hard mode(8 pc)
// instantiate two players who has game object
// instantiate one game and copy the game to make the same one
// each player has game and board
// player class has the method to send signals to others

import Game from './game.js';
import Player from './player.js';
/* global socket */

class MultiMode {
  constructor(options) {
    this.mode = 'multi';
    this.options = options;
    this.ready = false;
    this.game = {};
    this.game.isPlaying = false;
  }

  enableUI() {
    this.options.timer.classList.add('hidden');
    this.options.levels.classList.add('hidden');
    this.options.roomSet.classList.remove('hidden');
    this.options.main.innerText = "Ready";
    this.options.mode.innerText = "Solo";
    this.options.main.disabled = true;
    this.setLink();
    socket.on("matchSuccess", () => {
      this.options.roomSet.classList.add('hidden');
      this.options.opponent.classList.remove('hidden');
      this.options.main.disabled = false;
      this.setUpDisconnect();
      this.setUpNewGame();
    });
  }

  setUpNewGame() {
    socket.on("newGame", (data) => {
      this.options.main.classList.remove('ready');
      this.options.main.innerText = 'Quit';
      this.options.rotate.classList.remove("hidden");
      this.options.flip.classList.remove("hidden");
      console.log(data);
      console.log('new game set!');
    });
  }

  setUpDisconnect() {
    socket.on("opponentDisconnected", () => {
      window.alert("Your opponent is disconnected.");
      this.options.roomSet.classList.remove('hidden');
      this.options.opponent.classList.add('hidden');
      this.options.rotate.classList.add('hidden');
      this.options.flip.classList.add('hidden');
      this.options.main.disabled = true;
    });
  }

  setLink() {
    socket.on("setLink", (roomId) => {
      let link = window.location.origin + "?room_id=" + roomId;
      window.history.replaceState({}, '', link);
      this.options.roomLink.value = link;
    });
  }

  resetUIShow() {

  }

  mainBtnHandler() {
    if (this.ready) {
      socket.emit('cancelReady');
    } else {
      socket.emit('ready');
    }
    this.ready = !this.ready;
    this.options.main.classList.toggle("ready");
  }

  movePiece(action) {

  }
}

export default MultiMode;
