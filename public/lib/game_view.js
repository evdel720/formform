import Game from './game.js';
import Timer from './timer.js';
import { setLevelHandler, getGridNode, findLoc,
  disableInteraction, dropHandler,
  setUpMultiMode } from './utils.js';

import SoloMode from './solo_mode.js';
// start with setting up solo mode
// if user clicks battle,
// set up multi mode
// switch back when user click solo

// solo: levels, game, timer,
// multi: don't know yet

document.addEventListener('DOMContentLoaded', () => {
  let options = {
    board: document.getElementById('board'),
    pieces: document.getElementById('pieces'),
    main: document.getElementById('main'),
    rotate: document.getElementById('rotate'),
    flip: document.getElementById('flip'),
    instruction: document.getElementById('instruction'),
    mode: document.getElementById('mode')
  };

  let gameMode = new SoloMode(options);
  // let levels = document.getElementById('levels');
  //
  // let game = new Game(boardNode, pieces);
  // let timer = new Timer(document.getElementById('timer'), disableInteraction);
  //
  // Array.from(levels.children).forEach((li, idx) => {
  //   setLevelHandler(game, timer, li, idx);
  // });
  //
  // multi.addEventListener('click', setUpMultiMode);
  //
  // document.addEventListener('drop',
  //   (e) => dropHandler(game, boardNode, timer, e));
  //
  // play.addEventListener('click', () => {
  //   if (game.isPlaying) {
  //     game.clearBoard();
  //     timer.stop();
  //     disableInteraction(game);
  //   } else {
  //     play.innerText = "Quit";
  //     levels.classList.add("hidden");
  //     instruction.classList.add("hidden");
  //     timer.$timer.classList.remove("hidden");
  //     rotate.classList.remove("hidden");
  //     flip.classList.remove("hidden");
  //     timer.start(game);
  //     game.play();
  //   }
  // });
  //
  // document.addEventListener('dragover', (e) => {
  //   e.preventDefault();
  // }, false);
  //
  // [rotate, flip].forEach((btn) => {
  //   btn.addEventListener('click', (e) => {
  //     e.preventDefault();
  //     if (game && game.pickedPiece) {
  //       moveSound.play();
  //       game.movePickedPiece(btn.id);
  //     }
  //   });
  // });
});
