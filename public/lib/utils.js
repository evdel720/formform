


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

const disableInteraction = (game, isWin, gameMode, mainText) => {
  if (!isWin) {
    gameMode.options.lostSound.play();
  }
  gameMode.options.main.innerText = mainText;
  game.isPlaying = false;
  if (game.pickedPiece) {
    game.pickedPiece.classList.remove('picked');
  }

  changeToGray('#board li.filled', isWin);
  changeToGray('#pieces li.filled');
  gameMode.options.rotate.classList.add('hidden');
  gameMode.options.flip.classList.add('hidden');
  gameMode.options.mode.classList.remove('hidden');

  document.querySelectorAll('#pieces > *').forEach((piece) => {
    piece.style.cursor = "default";
    piece.setAttribute('draggable', false);
  });
  gameMode.disableUI();
};

const changeToGray = (query, isWin) => {
  document.querySelectorAll(query).forEach((cell) => {
      if (!isWin) {
        cell.style.backgroundColor = "#AAA";
      }
      cell.style.cursor = "default";
  });
};

const placePieceOnBoard = (pieceNode, pCell, boardNode, bCell, board, pieceObject, gameMode) => {
  let bLoc = findLoc(boardNode, bCell);
  let pLoc = findLoc(getGridNode(pieceNode), pCell);
  let topLeft = [bLoc[0] - pLoc[0], bLoc[1] - pLoc[1]];
  if (board.isValid(pieceObject, topLeft)) {
    board.placePiece(pieceNode, topLeft);
    if (board.isWon()) {
      return true;
    } else {
      gameMode.options.placeSound.play();
    }
  }
};

const dropHandler = (gameMode, e) => {
  e.preventDefault();
  let game = gameMode.game;
  if (e.target.parentNode.classList &&
      e.target.parentNode.classList.contains("dropzone") &&
      game && game.isPlaying) {
        gameMode.dropHandler(e.target);
      }
};

export { setLevelHandler, getGridNode, findLoc,
        disableInteraction, dropHandler,
        placePieceOnBoard };
