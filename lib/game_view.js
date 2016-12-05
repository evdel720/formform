import Game from './game.js';
import Timer from './timer.js';

const findLoc = (grid, cell) => {
  let children = grid.childNodes;
  for (let i=0; i<children.length; i++) {
    for (let j=0; j<children.item(0).childNodes.length; j++) {
      if (children.item(i).childNodes.item(j) === cell) {
        return [i, j];
      }
    }
  }
};

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
    if (e.target.parentNode.classList &&
      e.target.parentNode.classList.contains("dropzone") &&
        game && game.board && game.pickedCell) {
      let currentPieceNode = game.pickedCell.parentNode.parentNode;
      let currentPieceObject = game.pieceMap.get(currentPieceNode);
      let bLoc = findLoc(game.$board, e.target);
      let pLoc = findLoc(currentPieceNode, game.pickedCell);
      game.board.placePiece(currentPieceObject, bLoc, pLoc);
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
