const addChildren = (parent, children) => {
  children.forEach((child) => {
    parent.appendChild(child);
  });
};

const createElementWith = (tag, id, text, classList = []) => {
  let el = document.createElement(tag);
  if (id) { el.id = id; }
  if (text) { el.innerText = text; }
  classList.forEach((c) => {
    el.classList.add(c);
  });
  return el;
};

const generateBoardDiv = (ins) => {
  let board = createElementWith('div', 'board');
  let boardNode = [];
  for (let i=0; i<8; i++) {
    let ul = createElementWith('ul', null, null, ['dropzone']);
    let temp = [];
    for (let j=0; j<8; j++) {
      let li = document.createElement('li');
      ul.appendChild(li);
      temp.push(li);
    }
    boardNode.push(temp);
    board.appendChild(ul);
  }
  ins.boardNode = boardNode;
  return board;
};

const generateRightDiv = (ins) => {
  let right = createElementWith('div', null, null, ['right']);
  let btns = createElementWith('div', null, null, ['btns']);
  ins.rotate = createElementWith('button', 'rotate', "Rotate", ['hidden']);
  ins.flip = createElementWith('button', 'flip', "Flip", ['hidden']);
  addChildren(btns, [ins.rotate, ins.flip]);
  ins.pieces = createElementWith('div', 'pieces');
  addChildren(right, [btns, ins.pieces]);
  return right;
};

export { addChildren, createElementWith,
  generateBoardDiv, generateRightDiv };
