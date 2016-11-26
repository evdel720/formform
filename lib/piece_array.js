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

const pieces = [
  [[1, 1, 1], [0, 1, 0]],
  [[1, 1], [1, 1]],
  [[1, 1, 1]],
  [[1, 1]],
  [[1, 1, 1, 1]],
  [[1, 1], [1, 0]],
  [[1, 1, 1], [1, 1, 0]],
  [[1, 1, 1], [1, 0, 0]],
  [[1, 0, 0], [1, 1, 1], [0, 0, 1]],
  [[1, 1, 1, 1], [0, 1, 0, 0]],
  [[1, 1, 0], [0, 1, 1]],
  [[1, 1, 1, 1], [1, 0, 0, 0]]
];

export default pieces.map((p, idx) => {
  let piece = {};
  piece.default = [p];
  piece.flipped = [flip(p)];
  for (let i=0; i<3; i++) {
    piece.default.push(rotate(piece.default[i]));
    piece.flipped.push(rotate(piece.flipped[i]));
  }
  return piece;
});
