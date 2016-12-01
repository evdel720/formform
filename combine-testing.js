// leave it for testing
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
};

const makeEmptyGridWith = (a, b) => {
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
};

const trimZero = (grid) => {
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
};

const processPositionAt = (res, b, i, j) => {
  // returns the new borderLen / false
  let newBorder = true;
  // put b piece on the board
  for (let x=0; x<b.length; x++) {
    for (let y=0; y<b[0].length; y++) {
      res[i + x][j + y] += b[x][y];
      if (res[i + x][j + y] > 1) { newBorder = false; }
    }
  }
  if (newBorder) { newBorder = getBorderLength(res); }
  // change that back to just have a piece
  for (let x=0; x<b.length; x++) {
    for (let y=0; y<b[0].length; y++) {
      res[i + x][j + y] -= b[x][y];
    }
  }
  return newBorder;
};

const getBestPosition = (res, a, b) => {
  let bestPos, borderLen;
  for (let i=0; i<=res.length - b.length; i++) {
    for (let j=0; j<=res[0].length - b[0].length; j++) {
      let newBorder = processPositionAt(res, b, i, j);
      if (!newBorder) { continue; }
      if (!borderLen || newBorder < borderLen) {
        borderLen = newBorder;
        bestPos = [i, j];
      }
    }
  }
  return bestPos;
};

const combineTwo = (a, b) => {
  let res = makeEmptyGridWith(a, b);
  // move the b block around and save that position if
  // it makes shorter border length
  let bestPos = getBestPosition(res, a, b);
  // put b block in the best position
  for (let i=0; i<b.length; i++) {
    for (let j=0; j<b[0].length; j++) {
      res[bestPos[0]+i][bestPos[1]+j] += b[i][j];
    }
  }
  return trimZero(res);
};

let arr = combineTwo([[0, 1, 0], [1, 1, 1]], [[1, 1], [1, 1], [0, 1]]);

let second = combineTwo(arr, [[1, 1, 1, 1]]);

let third = combineTwo(second, [[1], [1], [1]]);
third.forEach((l) => console.log(l));
