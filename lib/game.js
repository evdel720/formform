import Board from './board.js';

class Game {
  constructor() {
    this.board = new Board();
  }

  play() {
    this.board.setUpNewGame();
    if (this.board.isCompleted()) {
      console.log('end');
      return;
    }
  }
}
