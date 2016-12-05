import Game from './game.js';
import Timer from './timer.js';

document.addEventListener('DOMContentLoaded', () => {
  let board = document.getElementById('board');
  let pieces = document.getElementById('pieces');
  let game = new Game(board, pieces);
  let timer = new Timer(document.getElementById('timer'));
  let play = document.getElementById('play');
  let rotate = document.getElementById('rotate');
  let flip = document.getElementById('flip');


  document.addEventListener('drop', (e) => {
    e.preventDefault();
    if (e.target.parentNode.classList.contains("dropzone")) {
      
      console.log(e);
      console.log('Dropped!');
    }
  });

  document.addEventListener('dragover', (e) => {
    e.preventDefault();
  }, false);

  play.addEventListener('click', () => {
    board.innerHTML = "";
    pieces.innerHTML = "";
    // timer.reset();
    // timer.start();
    game.play();

  });

  rotate.addEventListener('click', () => {
    if (game && game.pickedPiece) {
      game.rotatePickedPiece();
    }
  });

  flip.addEventListener('click', () => {
    if (game && game.pickedPiece) {
      game.flipPickedPiece();
    }
  });

});
