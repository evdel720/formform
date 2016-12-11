import Game from './game.js';
import Timer from './timer.js';
import { setLevelHandler, getGridNode, findLoc } from './utils.js';


const disableInteraction = (game, pieces, levels, isWin) => {
  game.board.boardNode.forEach((row) => {
    row.forEach((cell) => {
      cell.style.cursor = "default";
      if (!isWin && cell.classList.contains("filled")) {
        cell.style.backgroundColor = "#CCC";
      }
    });
  });
  pieces.childNodes.forEach((piece) => {
    piece.childNodes.forEach((row) => {
      row.childNodes.forEach((cell) => {
        if (!isWin && cell.classList.contains("filled")) {
          cell.style.backgroundColor = "#CCC";
        }
      });
    });
    piece.style.cursor = "default";
    piece.setAttribute('draggable', false);
  });
  game.isPlaying = false;
  levels.style.display = "flex";
};
let seconds = 60;


document.addEventListener('DOMContentLoaded', () => {
  let board = document.getElementById('board');
  let pieces = document.getElementById('pieces');
  let play = document.getElementById('play');
  let rotate = document.getElementById('rotate');
  let flip = document.getElementById('flip');
  let levels = document.getElementById('levels');
  let placeSound = document.getElementById('place-sound');
  let moveSound = document.getElementById('move-sound');
  let instruction = document.getElementById('instruction');
  let boardNode = getGridNode(board);

  let game = new Game(boardNode, pieces);
  let timer = new Timer(document.getElementById('timer'), seconds);

  Array.from(levels.children).forEach((li, idx) => {
    setLevelHandler(game, li, idx);
  });

  document.addEventListener('drop', (e) => {
    e.preventDefault();
    if (e.target.parentNode.classList &&
      e.target.parentNode.classList.contains("dropzone") &&
        game && game.isPlaying && game.pickedCell) {
      let currentPieceNode = game.pickedCell.parentNode.parentNode;
      let currentPieceObject = game.pieceMap.get(currentPieceNode);
      let bLoc = findLoc(boardNode, e.target);
      let pLoc = findLoc(getGridNode(currentPieceNode), game.pickedCell);
      console.log(bLoc);
      console.log(pLoc);
      let topLeft = [bLoc[0] - pLoc[0], bLoc[1] - pLoc[1]];
      if (game.board.isValid(currentPieceObject, topLeft)) {
        currentPieceNode.classList.add("placed-piece");
        game.board.placePiece(currentPieceNode, currentPieceObject, topLeft);
        placeSound.play();
        if (game.board.isWon()) {
          // change pieces to non-draggable
          disableInteraction(game, pieces, levels, true);
          timer.stop();
          // ask play again
        }
      }
    }
  });

  play.addEventListener('click', () => {
    game.rollDice();
    // board.innerHTML = "";
    // pieces.innerHTML = "";
    // game = new Game(board, pieces, level);
    levels.style.display = "none";
    instruction.style.display = "none";
    // timer.stop();
    // timer.reset(seconds);
    // timer.start();
    // window.setTimeout(() => {
    //   // disable interaction if the game is still in playing when the timer goes off
    //   if (timer.seconds === 0) {
    //     disableInteraction(game, pieces, levels);
    //   }
    // }, seconds * 1000);
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
