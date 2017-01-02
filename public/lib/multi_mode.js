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
    // this.game = new Game(options.boardNode, options.pieces);
    // this.game.pieceNum = 8;
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
      console.log('match succeeded');
    });
  }

  setUpDisconnect() {
    socket.on("opponentDisconnected", () => {
      window.alert("Your opponent is disconnected.");
      this.options.roomSet.classList.remove('hidden');
      this.options.opponent.classList.add('hidden');
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

  setUpNewRoom() {
    // this only happens when the user generate new room
    this.setLink();
  }

  resetUIShow() {

  }

  mainBtnHandler() {

  }

  movePiece(action) {

  }
}

export default MultiMode;
