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


const disableInteraction = (isWin) => {
  document.querySelectorAll('#board li.filled').forEach((cell) => {
    cell.style.cursor = "default";
    if (!isWin) {
      cell.style.backgroundColor = "#EEE";
    }
  });

  document.querySelectorAll('#pieces li').forEach((cell) => {
    if (!isWin) {
      cell.style.backgroundColor = "#EEE";
    }
  });

  document.querySelectorAll('#pieces > *').forEach((piece) => {
    piece.style.cursor = "default";
    piece.setAttribute('draggable', false);
  });
};

const dropHandler = (game, boardNode, levels, timer, e) => {
  let placeSound = document.getElementById('place-sound');
  e.preventDefault();
  if (e.target.parentNode.classList &&
    e.target.parentNode.classList.contains("dropzone") &&
      game && game.isPlaying && game.pickedCell) {
    let currentPieceNode = game.pickedCell.parentNode.parentNode;
    let currentPieceObject = game.pieceMap.get(currentPieceNode);
    let bLoc = findLoc(boardNode, e.target);
    let pLoc = findLoc(getGridNode(currentPieceNode), game.pickedCell);
    let topLeft = [bLoc[0] - pLoc[0], bLoc[1] - pLoc[1]];
    if (game.board.isValid(currentPieceObject, topLeft)) {
      game.board.placePiece(currentPieceNode, topLeft);
      placeSound.play();
      if (game.board.isWon()) {
        game.isPlaying = false;
        levels.style.display = "flex";
        disableInteraction(true);
        timer.stop();
      }
    }
  }
};

export { setLevelHandler, getGridNode, findLoc,
        disableInteraction, dropHandler };
