import pieces from './piece_array.js';
// prepopulate all the pieces in piece_array.js

const neighbors = [[-1, 0], [1, 0], [0, -1], [0, 1]];

class Piece {
  constructor() {
    this.piece = pieces[Math.floor(Math.random() * pieces.length)];
    this.idx = 0;
    this.flipped = false;
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

  static getBorderLength(pieceArr) {
    // returns the piece's length of border
    let len = 0;
    for (let i=0; i<pieceArr.length; i++) {
      for (let j=0; j<pieceArr[0].length; j++) {
        if (pieceArr[i][j] === 1) {
          for (let n=0; n<4; n++) {
            let [x, y] = neighbors[n];
            if (pieceArr[x + i] && pieceArr[x + i][y + j] === 1) {
              continue;
            }
            len++;
          }
        }
      }
    }
    return len;
  }
}

export default Piece;
