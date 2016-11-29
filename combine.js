
const neighbors = [[-1, 0], [1, 0], [0, -1], [0, 1]];


const getBorderLength = (pieceArr) => {
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

const combineTwo = (a, b) => {
  let res = [];
  // make new empty grid
  for (let i=0; i<a.length + b.length * 2; i++) {
    let temp = [];
    for (let j=0; j<a[0].length + b[0].length * 2; j++) {
      temp.push(0);
    }
    res.push(temp);
  }
  // put a block at the middle
  for (let i=0; i<a.length; i++) {
    for (let j=0; j<a[0].length; j++) {
      res[b.length + i][b[0].length + j] = a[i][j];
    }
  }
  // move the b block around and save that position if
  // it makes shorter border length
  let bestPos, borderLen;
  for (let i=0; i<res.length - b.length; i++) {
    for (let j=0; j<res[0].length - b[0].length; j++) {
      // put b piece on the board
      let flag = false;
      for (let x=0; x<b.length; x++) {
        for (let y=0; y<b[0].length; y++) {
          res[i + x][j + y] += b[x][y];
          if (res[i + x][j + y] > 1) {
            flag = true;
          }
        }
      }
      if (!flag) {
        let newBorder = getBorderLength(res);

        if (!bestPos) {
          bestPos = [i, j];
          borderLen = newBorder;
        } else if (borderLen > newBorder) {
          bestPos = [i, j];
          borderLen = newBorder;
        }
      }
      // change that back to just have a piece
      for (let x=0; x<b.length; x++) {
        for (let y=0; y<b[0].length; y++) {
          res[i + x][j + y] -= b[x][y];
        }
      }
    }
  }

  for (let i=0; i<b.length; i++) {
    for (let j=0; j<b[0].length; j++) {
      res[bestPos[0]+i][bestPos[1]+j] = b[i][j];
    }
  }

  // trim zeroes
  console.log(res);
};

combineTwo([[1, 1, 1], [0, 1, 0]], [[1, 1], [1, 1]]);
