// idea: generate game with extra hard mode(8 pc)
// instanciate two players who has game object
// instanciate one game and copy the game to make the same one
// each player has game and board
// player class has the method to send signals to others

import Game from './game.js';
import crypto from 'crypto';
/* global io */
const socket = io();

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
    this.setUpNewRoom();
  }

  setUpNewRoom() {
    // this only happens when the user generate new room
    let roomId = crypto.randomBytes(5).toString('hex');
    window.history.replaceState({}, '', roomId);
    this.options.roomLink.value = window.location.href;
    socket.emit('newRoom', roomId);
  }

  resetUIShow() {

  }

  mainBtnHandler() {

  }

  movePiece(action) {

  }
}

export default MultiMode;
