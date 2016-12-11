const setLevelHandler = (game, li, idx) => {
  li.addEventListener('click', () => {
    if (!game.isPlaying) {
      document.getElementsByClassName('selected-level')[0].classList.remove('selected-level');
      li.classList.add('selected-level');
      game.pieceNum = idx + 4;
    }
  });
};

const getGridNode = (gridNode) => {
  return Array.from(gridNode.children).map((row) => Array.from(row.children));
};


const findLoc = (boardNode, cell) => {
  for (let i=0; i<boardNode.length; i++) {
    for (let j=0; j<boardNode[0].length; j++) {
      if (boardNode[i][j] === cell) {
        return [i, j];
      }
    }
  }
};

export { setLevelHandler, getGridNode, findLoc };
