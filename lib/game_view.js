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

const disableInteraction = (game, pieces, levels) => {
  game.board.boardNode.forEach((row) => {
    row.forEach((cell) => {
      cell.style.cursor = "default";
      // if (cell.classList.has("filled"))
      // cell.style.backgroundColor = "#CCC";
    });
  });
  pieces.childNodes.forEach((piece) => {
    piece.childNodes.forEach((row) => {
      row.childNodes.forEach((cell) => {
        // cell.style.backgroundColor = "#CCC";
      });
    });
    piece.style.cursor = "default";
    piece.setAttribute('draggable', false);
  });
  game.isPlaying = false;
  levels.style.display = "flex";
};

document.addEventListener('DOMContentLoaded', () => {
  let board = document.getElementById('board');
  let pieces = document.getElementById('pieces');
  let play = document.getElementById('play');
  let rotate = document.getElementById('rotate');
  let flip = document.getElementById('flip');
  let levels = document.getElementById('levels');
  let level = 4;
  let seconds = 2;
  let game = new Game(board, pieces, level);
  let timer = new Timer(document.getElementById('timer'), seconds);

  Array.from(levels.children).forEach((li, idx) => {
    li.addEventListener('click', () => {
      if (!game.isPlaying) {
        document.getElementsByClassName('selected-level')[0].classList.remove('selected-level');
        li.classList.add('selected-level');
        level = idx + 4;
        seconds = (idx + 1) * 60;
        timer.reset(seconds);
      }
    });
  });

  document.addEventListener('drop', (e) => {
    e.preventDefault();
    if (e.target.parentNode.classList &&
      e.target.parentNode.classList.contains("dropzone") &&
        game && game.board && game.pickedCell) {
      let currentPieceNode = game.pickedCell.parentNode.parentNode;
      let currentPieceObject = game.pieceMap.get(currentPieceNode);
      let bLoc = findLoc(board, e.target);
      let pLoc = findLoc(currentPieceNode, game.pickedCell);
      let topLeft = [bLoc[0] - pLoc[0], bLoc[1] - pLoc[1]];
      if (game.board.isValid(currentPieceObject, topLeft)) {
        currentPieceNode.classList.add("placed-piece");
        game.board.placePiece(currentPieceNode, currentPieceObject, topLeft);
        if (game.board.isWon()) {
          // change pieces to non-draggable
          disableInteraction(game, pieces, levels);
          // ask play again
        }
      }
    }
  });

  document.addEventListener('dragover', (e) => {
    e.preventDefault();
  }, false);

  play.addEventListener('click', () => {
    board.innerHTML = "";
    pieces.innerHTML = "";
    game = new Game(board, pieces, level);
    levels.style.display = "none";
    timer.reset(seconds);
    timer.start();
    window.setTimeout(() => disableInteraction(game, pieces, levels), seconds * 1000);
    game.play();
  });

  rotate.addEventListener('click', (e) => {
    e.preventDefault();
    if (game && game.pickedPiece) {
      game.rotatePickedPiece();
    }
  });

  flip.addEventListener('click', (e) => {
    e.preventDefault();
    if (game && game.pickedPiece) {
      game.flipPickedPiece();
    }
  });
});
