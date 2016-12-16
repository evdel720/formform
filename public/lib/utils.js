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
  let lostSound = document.getElementById('lost-sound');
  if (!isWin) {
    lostSound.play();
  }
  game.isPlaying = false;
  if (game.pickedPiece) {
    game.pickedPiece.classList.remove('picked');
  }
  document.getElementById('play').innerText = "Play";
  document.getElementById('timer').classList.add('hidden');
  document.getElementById('rotate').classList.add('hidden');
  document.getElementById('flip').classList.add('hidden');
  document.getElementById('levels').classList.remove('hidden');
  document.querySelectorAll('#board li.filled').forEach((cell) => {
    cell.style.cursor = "default";
    if (!isWin) {
      cell.style.backgroundColor = "#AAA";
    }
  });

  document.querySelectorAll('#pieces li.filled').forEach((cell) => {
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
  let wonSound = document.getElementById('won-sound');
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
      if (game.board.isWon()) {
        wonSound.play();
        disableInteraction(game, true);
        timer.stop();
      } else {
        placeSound.play();
      }
    }
  }
};

const setUpMultiMode = () => {
  // hide timer, levels
  // change play button ready
  // put other board right bottom
  // put the room link as modal until someone comes in
};


export { setLevelHandler, getGridNode, findLoc,
        disableInteraction, dropHandler, setUpMultiMode };
