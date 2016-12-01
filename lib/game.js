import Board from './board.js';
import Piece from './piece.js';

class Game {
  constructor() {
    this.pieceNum = 4; // 4 = easy, 5 = medium, 6 = hard
    this.pieceSets = this.generateRandomPieces();
    this.board = undefined;
    this.dice = undefined;
  }

  generateRandomPieces() {
    // returns 6 sets of piece arrays
    let res = [];
    for (let i=0; i<6; i++) {
      let set = new Set();
      for (let j=0; j<this.pieceNum; j++) {
        set.add(new Piece());
      }
      res.push(set);
    }
    return res;
  }

  rollDice() {
    this.dice = Math.floor(Math.random() * 6);
    this.board = new Board(this.pieceSets[this.dice]);
  }

  play() {
    this.rollDice();
    window.board = this.board;
  }
}

export default Game;
