import pieces from './piece_array.js';
// prepopulate all the pieces in piece_array.js

class Piece {
  constructor() {
    this.piece = pieces[Math.floor(Math.random() * pieces.length)];
    this.idx = 0;
    this.flipped = false;
    this.placed = false;
    this.pos = [-1, -1];
  }

  currentPiece() {
    let pieceArr = this.flipped ? this.piece.flipped : this.piece.default;
    return pieceArr[this.idx];
  }

  rotate() {
    this.idx = (this.idx + 1) % 4;
  }

  flip() {
    // flip the piece
    this.flipped = !this.flipped;
  }
}

export default Piece;
