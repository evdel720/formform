import Game from './game.js';
import Timer from './timer.js';
import { setLevelHandler, disableInteraction,
         placePieceOnBoard } from './utils.js';

class SoloMode {
  constructor(options) {
    this.mode = 'solo';
    this.options = options;
    this.game = new Game(options.boardNode, options.pieces);
    this.timer = new Timer(this.options.timer, disableInteraction, this);
  }

  enableUI() {
    window.history.replaceState({}, '', window.location.origin);
    this.options.rotate.classList.add('hidden');
    this.options.flip.classList.add('hidden');
    this.options.main.classList.remove("ready");
    this.options.mode.innerText = "Battle";
    this.options.main.disabled = false;
    this.options.main.innerText = "Play";
    this.options.levels.classList.remove("hidden");
    this.options.roomSet.classList.add('hidden');
  }

  mainBtnHandler() {
    if (this.game.isPlaying) {
      this.game.clearBoard();
      this.timer.stop();
      disableInteraction(this.game, false, this, 'Play');
    } else {
      this.options.rotate.classList.remove("hidden");
      this.options.flip.classList.remove("hidden");
      this.options.main.innerText = 'Quit';
      this.options.timer.classList.remove("hidden");
      this.options.mode.classList.add("hidden");
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

  resetUIShow() {
    this.options.timer.classList.add('hidden');
    this.options.levels.classList.remove('hidden');
  }

  wonHandler() {
    this.options.wonSound.play();
    this.timer.stop();
    disableInteraction(this.game, true, this, 'Play');
  }

  dropHandler(bCell, placeSound, wonSound) {
    let game = this.game;
    let pCell = game.pickedCell;
    if (pCell) {
      let pieceNode = pCell.parentNode.parentNode;
      let pieceObject = game.pieceMap.get(pieceNode);
      let won = placePieceOnBoard(pieceNode, pCell,
        this.options.boardNode, bCell,
        game.board, pieceObject, this);
      if (won) { this.wonHandler(); }
    }
  }
}

export default SoloMode;
