import pieces from './piece_array.js';
// prepopulate all the pieces in piece_array.js


class Piece {
  constructor() {
    this.piece = pieces[Math.floor(Math.random() * pieces.length)];
    this.idx = 0;
    this.placed = false;
  }

  currentPiece() {
    return this.piece.piecesArr[this.idx];
  }

  rotate() {
    this.idx = (this.idx + 1) % 4;
  }

  flip() {
    this.idx = (this.idx + 4) % 4;
  }
}

export default Piece;
