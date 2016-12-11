const rotate = (arr) => {
  let res = [];
  for (let j=0; j<arr[0].length; j++) {
    let temp = [];
    for (let i=arr.length - 1; i>=0; i--) {
      temp.push(arr[i][j]);
    }
    res.push(temp);
  }
  return res;
};

const flip = (arr) => {
  let res = [];
  arr.forEach((row) => {
    let temp = [];
    for (let i=row.length - 1; i>=0; i--) {
      temp.push(row[i]);
    }
    res.push(temp);
  });
  return res;
};
// in 12 pieces, 5 pieces shares same shape in rotation
// 1 piece has same for all
// [...[piece arr], [indexs of things that doesn't change]]
// in 0 to 7 indexs
const pieces = [
  [[1, 1, 1], [0, 1, 0], -1],
  [[1, 1], [1, 1], [0]],
  [[1, 1, 1], [0, 1]],
  [[1, 1], [0, 1]],
  [[1, 1, 1, 1], [0, 1]],
  [[1, 1], [1, 0], -1],
  [[1, 1, 1], [1, 1, 0], -1],
  [[1, 1, 1], [1, 0, 0], -1],
  [[1, 0, 0], [1, 1, 1], [0, 0, 1], [0, 1, 4, 5]],
  [[1, 1, 1, 1], [0, 1, 0, 0], -1],
  [[1, 1, 0], [0, 1, 1], [0, 1, 4, 5]],
  [[1, 1, 1, 1], [1, 0, 0, 0], -1]
];

export default pieces.map((p, idx) => {
  const piece = {};
  const last = p.pop();
  piece.possibleIndexes = last === -1 ? [0, 1, 2, 3, 4, 5, 6, 7] : last;
  piece.piecesArr = [p];
  for (let i=0; i<3; i++) {
    piece.piecesArr.push(rotate(piece.piecesArr[i]));
  }
  for (let i=0; i<4; i++) {
    piece.piecesArr.push(flip(piece.piecesArr[i]));
  }
  return piece;
});
