import Game from './game.js';
import Timer from './timer.js';

document.addEventListener('DOMContentLoaded', () => {
  let board = document.getElementById('board');
  let pieces = document.getElementById('pieces');
  let game = new Game(board, pieces);
  let button = document.getElementById('play');
  let timer = new Timer(document.getElementById('timer'));

  button.addEventListener('click', () => {
    board.innerHTML = "";
    // timer.reset();
    // timer.start();
    game.play();

  });

});
