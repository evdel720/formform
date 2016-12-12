import Game from './game.js';
import Timer from './timer.js';
import { setLevelHandler, getGridNode, findLoc,
  disableInteraction, dropHandler } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  let board = document.getElementById('board');
  let pieces = document.getElementById('pieces');
  let play = document.getElementById('play');
  let rotate = document.getElementById('rotate');
  let flip = document.getElementById('flip');
  let levels = document.getElementById('levels');
  let moveSound = document.getElementById('move-sound');
  let instruction = document.getElementById('instruction');
  let boardNode = getGridNode(board);

  let game = new Game(boardNode, pieces);
  let timer = new Timer(document.getElementById('timer'), disableInteraction);

  Array.from(levels.children).forEach((li, idx) => {
    setLevelHandler(game, timer, li, idx);
  });

  document.addEventListener('drop',
    (e) => dropHandler(game, boardNode, timer, e));

  play.addEventListener('click', () => {
    levels.classList.add("hidden");
    instruction.classList.add("hidden");
    rotate.classList.remove("hidden");
    flip.classList.remove("hidden");
    timer.start(game);
    game.play();
  });

  document.addEventListener('dragover', (e) => {
    e.preventDefault();
  }, false);

  [rotate, flip].forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (game && game.pickedPiece) {
        moveSound.play();
        game.movePickedPiece(btn.id);
      }
    });
  });
});
