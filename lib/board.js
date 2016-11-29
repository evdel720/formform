class Board {
  constructor(pieceSet) {
    this.leftPieces = pieceSet;
    this.board = this.generateBoard();
    this.placedPieces = new Set();
  }

  display() {
    this.leftPieces.forEach((p) => {
      console.log('-----------------');
      let init = p.piece.default[0];
      init.forEach((i) => {
        console.log(i);
      });
    });
  }

  shuffledPieces() {
    // shuffles the pieces
    let result = this.leftPieces.map((p, i) => {
      let ob = {piece: i};
      ob.idx = Math.floor(Math.random() * 4);
      ob.flipped = Boolean(Math.round(Math.random()));
      return ob;
    });
    for (let i=0; i<result.length; i++) {
      let j = Math.floor(Math.random() * result.length);
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  combineTwo(a, b) {
    // combine two pieces for the best result
  }

  generateBoard() {
    // returns the most dense board possible
    let shuffledPieces = this.shuffledPieces();
    let board = undefined;
    // make the board as normal 2D array
    shuffledPieces.forEach((p) => {
      let ob = this.leftPieces[p.piece];
      let currentPiece = ob.piece[p.flipped ? "flipped" : "default"][p.idx];
      if (board === undefined) {
        board = currentPiece;
      } else {
        board = this.combineTwo(board, currentPiece);
      }
    });
    return board;
  }

  isValid(pieceArr, location) {
    // returns true if the piece can be placed on the location
  }

  placePiece(piece, location) {
    if (this.isValid(piece.currentPiece(), location)) {
      // place piece

    } else {
      // put the piece to the last position
    }
  }

  removePiece(piece) {
    // remove the piece from the board
  }
}

export default Board;
