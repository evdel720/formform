import pieces from './piece_array.js';
// prepopulate all the pieces in piece_array.js


class Piece {
  constructor(i) {
    let randomPiece = pieces[Math.floor(Math.random() * pieces.length)];
    this.piecesArr = randomPiece.piecesArr;
    this.possibleIndexes = randomPiece.possibleIndexes;
    this.idx = 0;
    this.placed = false;
    this.sound = document.getElementById('move-sound');
  }

  currentPiece() {
    return this.piecesArr[this.idx];
  }

  rotate() {
    this.sound.play();
    if (this.idx < 4) {
      this.idx = (this.idx + 1) % 4;
    } else {
      this.idx = (this.idx + 1) % 8 || 4;
    }
  }

  flip() {
    this.sound.play();
    this.idx = (this.idx + 4) % 8;
  }
}

export default Piece;
