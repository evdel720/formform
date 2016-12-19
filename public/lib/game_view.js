import { getGridNode, dropHandler, setLevelHandler } from './utils.js';

import SoloMode from './solo_mode.js';
import MultiMode from './multi_mode.js';
// check if the user is invited user (has the roomSet already)

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
    roomSet: document.getElementById('room-set')
  };

  options.boardNode = getGridNode(options.board);
  //
  // let pageURL = decodeURIComponent(window.location.search.substring(1));
  // let param = pageURL.split('=');
  // let roomId;
  // if (param[0] === 'room_id') {
  //   roomId = param[1];
  // }

  let multi = new MultiMode(options);
  let solo = new SoloMode(options);

  let gameMode = solo;
  gameMode.enableUI();
  options.mode.addEventListener('click', () => {
    gameMode = gameMode.mode !== 'solo' ? solo : multi;
    gameMode.enableUI();
  });

  options.main.addEventListener('click', () => {
    if (gameMode.game.isPlaying) {
      // common things for both
      // when user clicks main button to start new game
    } else {
      options.main.innerText = "Quit";
      options.instruction.classList.add("hidden");
      options.rotate.classList.remove("hidden");
      options.flip.classList.remove("hidden");
    }
    gameMode.mainBtnHandler();
  });

  Array.from(options.levels.children).forEach((li, idx) => {
    setLevelHandler(gameMode, li, idx);
  });

  document.addEventListener('drop', dropHandler.bind(null, gameMode));

  [options.rotate, options.flip].forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      gameMode.movePiece(btn.id);
    });
  });

  document.addEventListener('dragover', (e) => {
    e.preventDefault();
  }, false);
});
