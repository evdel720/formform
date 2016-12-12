const setLevelHandler = (game, timer, li, idx) => {
  li.addEventListener('click', () => {
    if (!game.isPlaying) {
      document.getElementsByClassName('selected-level')[0].classList.remove('selected-level');
      li.classList.add('selected-level');
      game.pieceNum = idx + 4;
      timer.reset((idx + 1) * 60);
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


const disableInteraction = (game, isWin) => {
  game.isPlaying = false;
  document.getElementById('rotate').classList.add('hidden');
  document.getElementById('flip').classList.add('hidden');
  document.getElementById('levels').classList.remove('hidden');
  document.querySelectorAll('#board li.filled').forEach((cell) => {
    cell.style.cursor = "default";
    if (!isWin) {
      cell.style.backgroundColor = "#AAA";
    }
  });

  document.querySelectorAll('#pieces li').forEach((cell) => {
    if (!isWin) {
      cell.style.backgroundColor = "#AAA";
    }
  });

  document.querySelectorAll('#pieces > *').forEach((piece) => {
    piece.style.cursor = "default";
    piece.setAttribute('draggable', false);
  });
};

const dropHandler = (game, boardNode, timer, e) => {
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
        disableInteraction(game, true);
        timer.stop();
      }
    }
  }
};


export { setLevelHandler, getGridNode, findLoc,
        disableInteraction, dropHandler };
