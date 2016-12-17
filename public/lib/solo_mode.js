import Game from './game.js';
import Timer from './timer.js';
import { setLevelHandler, disableInteraction,
         placePieceOnBoard } from './utils.js';

class SoloMode {
  constructor(options) {
    this.mode = 'solo';
    this.options = options;
    this.game = new Game(options.boardNode, options.pieces);
    this.enableUI();
  }

  enableUI() {
    let levels = this.options.levels;
    levels.classList.remove('hidden');
    this.timer = new Timer(this.options.timer, disableInteraction);
    Array.from(levels.children).forEach((li, idx) => {
      setLevelHandler(this.game, this.timer, li, idx);
    });
  }

  mainBtnHandler() {
    if (this.game.isPlaying) {
      this.options.main.innerText = 'Play';
      this.game.clearBoard();
      this.timer.stop();
      disableInteraction(this.game);
    } else {
      this.options.timer.classList.remove("hidden");
      this.options.levels.classList.add("hidden");
      this.timer.start(this.game);
      this.game.play();
    }
  }

  movePiece(action) {
    if (this.game.pickedPiece) {
      this.game.movePickedPiece(action);
    }
  }

  winHandler() {
    this.timer.stop();
  }

  dropHandler(bCell, placeSound, wonSound) {
    let game = this.game;
    let pCell = game.pickedCell;
    if (pCell) {
      let pieceNode = pCell.parentNode.parentNode;
      let pieceObject = game.pieceMap.get(pieceNode);
      placePieceOnBoard(pieceNode, pCell, this.options.boardNode, bCell, game.board, pieceObject, this);
    }
  }
}

export default SoloMode;
