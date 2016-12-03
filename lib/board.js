
const neighbors = [[-1, 0], [1, 0], [0, -1], [0, 1]];

class Board {
  constructor(pieceMap) {
    this.piecesArr = Array.from(pieceMap.values());
    this.leftPieces = new Set(pieceMap.values());
    this.board = this.generateBoard();
    this.placedPieces = new Set();
  }

  isOver() {
    return this.leftPieces.size === 0;
  }

  generateBoard() {
    // returns the most dense board possible
    let shuffledPieces = this.shuffledPieces();
    let board = undefined;
    // make the board as normal 2D array
    shuffledPieces.forEach((p) => {
      let ob = this.piecesArr[p.piece];
      let currentPiece = ob.piece[p.flipped ? "flipped" : "default"][p.idx];
      if (board === undefined) {
        board = currentPiece;
      } else {
        board = this.combineTwo(board, currentPiece);
      }
    });
    return board;
  }

  isValid(pieceArr, loc) {
    // The location has been changed
    // It won't be the top left
    // It will be wherever the user starts/end dragging
    // Seems like we can use BFS
    // returns true if the piece can be placed on the location
    for (let i=0; i<pieceArr.length; i++) {
      for (let j=0; j<pieceArr[0].length; j++) {
        if (pieceArr[i][j] === 1 && this.board[i+loc[0]][j+loc[1]] === 0) {
          return false;
        }
      }
    }
    return true;
  }

  placePiece(piece, loc) {
    if (this.isValid(piece.currentPiece(), loc)) {
      // place piece
      let pieceArr = piece.currentPiece();
      for (let i=0; i<pieceArr.length; i++) {
        for (let j=0; j<pieceArr[0].length; j++) {
          if (pieceArr[i][j] === 1) {
            this.board[i+loc[0]][j+loc[1]] = 0;
          }
        }
      }
      piece.pos = loc;
      this.leftPieces.delete(piece);
      this.placedPieces.add(piece);
    }
  }

  removePiece(piece, loc) {
    // remove the piece from the board
    if (piece.pos[0] !== loc[0] || piece.pos[1] !== loc[1]) {
      return false;
    }
    let pieceArr = piece.currentPiece();
    for (let i=0; i<pieceArr.length; i++) {
      for (let j=0; j<pieceArr[0].length; j++) {
        if (pieceArr[i][j] === 1) {
          this.board[i+loc[0]][j+loc[1]] = 1;
        }
      }
    }
    piece.pos = [-1, -1];
    this.leftPieces.add(piece);
    this.placedPieces.delete(piece);
  }

  shuffledPieces() {
    // shuffles the pieces
    let result = this.piecesArr.map((p, i) => {
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
    let res = this.makeEmptyGridWith(a, b);
    // move the b block around and save that position if
    // it makes shorter border length
    let bestPos = this.getBestPosition(res, a, b);
    // put b block in the best position
    for (let i=0; i<b.length; i++) {
      for (let j=0; j<b[0].length; j++) {
        res[bestPos[0]+i][bestPos[1]+j] += b[i][j];
      }
    }
    return this.trimZero(res);
  }

  makeEmptyGridWith(a, b) {
    let res = [];
    // make new empty grid
    for (let i=0; i<a.length + b.length; i++) {
      let temp = [];
      for (let j=0; j<a[0].length + b[0].length; j++) {
        if (i < a.length && j < a[0].length) {
          temp[j] = a[i][j];
        } else {
          temp[j] = 0;
        }
      }
      res.push(temp);
    }
    return res;
  }

  trimZero(grid) {
    // return the zero trimmed grid
    // trim zeroes
    let row = false, col = false;
    while (!row || !col) {
      row = grid[grid.length-1].some((el) => el !== 0);
      if (!row) { grid.pop(); }
      col = grid.map((c) => c[c.length-1]).some((el) => el !== 0);
      if (!col) { grid.forEach((r) => r.pop()); }
    }
    return grid;
  }

  processPositionAt(res, b, i, j) {
    // returns the new borderLen / false
    let newBorder = true;
    // put b piece on the board
    for (let x=0; x<b.length; x++) {
      for (let y=0; y<b[0].length; y++) {
        res[i + x][j + y] += b[x][y];
        if (res[i + x][j + y] > 1) { newBorder = false; }
      }
    }
    if (newBorder) { newBorder = Board.getBorderLength(res); }
    // change that back to just have a piece
    for (let x=0; x<b.length; x++) {
      for (let y=0; y<b[0].length; y++) {
        res[i + x][j + y] -= b[x][y];
      }
    }
    return newBorder;
  }

  getBestPosition(res, a, b) {
    let bestPos, borderLen;
    for (let i=0; i<=res.length - b.length; i++) {
      for (let j=0; j<=res[0].length - b[0].length; j++) {
        let newBorder = this.processPositionAt(res, b, i, j);
        if (!newBorder) { continue; }
        if (!borderLen || newBorder < borderLen) {
          borderLen = newBorder;
          bestPos = [i, j];
        }
      }
    }
    return bestPos;
  }

  static getBorderLength(arr) {
    // returns the piece's length of border
    let len = 0;
    for (let i=0; i<arr.length; i++) {
      for (let j=0; j<arr[0].length; j++) {
        if (arr[i][j] === 1) {
          for (let n=0; n<4; n++) {
            let [x, y] = neighbors[n];
            if (arr[x+i] && arr[x+i][y+j] === 1) { continue; }
            len++;
          }
        }
      }
    }
    return len;
  }
}

export default Board;
