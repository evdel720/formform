import pieces from './piece_array.js';
// prepopulate all the pieces in piece_array.js

class Piece {
  constructor() {
    this.piece = pieces[Math.floor(Math.random() * pieces.length)];
    this.idx = 0;
    this.flipped = false;
  }

  rotate() {
    this.idx = (this.idx + 1) % 4;
  }

  flip() {
    // flip the piece
    this.flipped = !this.flipped;
  }

  static getBorderLength(piece) {
    // returns the piece's length of border
  }
}

export default Piece;
