import pieces from './piece_array.js';
// prepopulate all the pieces in piece_array.js


class Piece {
  constructor(i) {
    let randomPiece = pieces[Math.floor(Math.random() * pieces.length)];
    this.piecesArr = randomPiece.piecesArr;
    this.possibleIndexes = randomPiece.possibleIndexes;
    this.idx = 0;
    this.placed = false;
  }

  currentPiece() {
    return this.piecesArr[this.idx];
  }

  rotate() {
    if (this.idx < 4) {
      this.idx = (this.idx + 1) % 4;
    } else {
      this.idx = (this.idx + 1) % 8 || 4;
    }
  }

  flip() {
    this.idx = (this.idx + 4) % 8;
  }
}

export default Piece;
