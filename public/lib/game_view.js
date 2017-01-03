import { getGridNode, dropHandler, setLevelHandler } from './utils.js';

import SoloMode from './solo_mode.js';
import MultiMode from './multi_mode.js';
/* global socket */

document.addEventListener('DOMContentLoaded', () => {
  let options = {
    board: document.getElementById('board'),
    pieces: document.getElementById('pieces'),
    rotate: document.getElementById('rotate'),
    flip: document.getElementById('flip'),
    instruction: document.getElementById('instruction'),
    timer: document.getElementById('timer'),
    levels: document.getElementById('levels'),
    main: document.getElementById('main'),
    mode: document.getElementById('mode'),
    wonSound: document.getElementById('won-sound'),
    lostSound: document.getElementById('lost-sound'),
    placeSound: document.getElementById('place-sound'),
    roomSet: document.getElementById('room-set'),
    roomLink: document.getElementById('room-link'),
    opponent: document.getElementById('opponent-board')
  };

  options.boardNode = getGridNode(options.board);

  let pageURL = decodeURIComponent(window.location.search.substring(1));
  let param = pageURL.split('=');
  let roomId;
  if (param[0] === 'room_id') {
    roomId = param[1];
    socket.emit('joinRoom', roomId);
    socket.on('failure', (message) => {
      window.alert(message);
      window.history.replaceState({}, '', window.location.origin);
      gameMode = solo;
      gameMode.enableUI();
    });
  }

  let multi = new MultiMode(options);
  let solo = new SoloMode(options);

  let gameMode = roomId ? multi : solo;
  gameMode.enableUI();
  options.mode.addEventListener('click', () => {
    if (gameMode.game) { gameMode.game.clearBoard(); }
    if (gameMode.mode === 'solo') {
      gameMode = multi;
      socket.emit('newRoom');
    } else {
      socket.emit('changeMode');
      gameMode = solo;
    }
    gameMode.enableUI();
  });

  options.main.addEventListener('click', () => {
    options.instruction.classList.add("hidden");
    gameMode.mainBtnHandler();
  });

  document.addEventListener('drop', (e) => {
    dropHandler(gameMode, e);
  });

  [options.rotate, options.flip].forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (gameMode.game && gameMode.game.pickedPiece) {
        gameMode.game.movePickedPiece(btn.id);
      }
    });
  });

  document.getElementById('copy').addEventListener('click', (e) => {
    let copyTarget = e.target.dataset.copytarget;
    copyTarget = document.querySelector(copyTarget);
    copyTarget.select();
    document.execCommand('copy');
  });

  document.addEventListener('dragover', (e) => {
    e.preventDefault();
  }, false);
});
