import Board from './board.js';
import Piece from './piece.js';

const colors = ['rgb(162, 72, 151)', 'rgb(238, 89, 139)', 'rgb(126, 205, 199)', 'rgb(34, 193, 228)', 'rgb(45, 49, 108)', 'rgb(246, 180, 205)', 'rgb(245, 143, 51)', 'rgb(226, 35, 63)', 'rgb(250, 235, 62)', 'rgb(189, 214, 93)', 'rgb(241, 122, 128)'];

class Game {
  constructor($board, $pieces, level) {
    this.$board = $board;
    this.$pieces = $pieces;
    this.pieceNum = level;
    this.pieceSets = this.generateRandomPieces();
    this.board = undefined;
    this.dice = undefined;
    this.pieceMap = undefined;
    this.pickedPiece = undefined;
    this.pickedCell = undefined;
    this.isPlaying = false;
  }

  rollDice() {
    this.dice = Math.floor(Math.random() * 6);
    this.generatePieceMap(this.pieceSets[this.dice]);
    this.board = new Board(this.pieceMap);
  }

  play() {
    this.isPlaying = true;
    this.rollDice();
    this.renderBoard();
    this.board.setBoardNode(this.$board);
  }

  renderBoard() {
    this.board.board.forEach((row) => {
      let line = document.createElement('ul');
      line.classList.add('row', 'dropzone');
      row.forEach((el) => {
        let item = document.createElement('li');
        item.addEventListener('click', this.board.removePiece.bind(this));
        if (el === 1) {
          item.classList.add('filled');
        }
        line.appendChild(item);
      });
      this.$board.appendChild(line);
    });

    this.pieceMap.forEach((v, k) => {
      this.$pieces.appendChild(k);
    });
  }

  generateRandomPieces() {
    // returns 6 sets of piece arrays
    let res = [];
    for (let i=0; i<6; i++) {
      let set = [];
      let colorIdx = Math.floor(Math.random() * colors.length);
      for (let j=0; j<this.pieceNum; j++) {
        let p = new Piece();
        p.color = colors[(colorIdx + j) % colors.length];
        set.push(p);
      }
      res.push(set);
    }
    return res;
  }

  movePickedPiece(action) {
    let pieceObject = this.pieceMap.get(this.pickedPiece);
    if (action === "flip") {
      pieceObject.flip();
    } else {
      pieceObject.rotate();
    }
    this.renderPiece(this.pickedPiece, pieceObject);
  }

  renderPiece(node, piece) {
    node.innerHTML = "";
    piece.currentPiece().forEach((row) => {
      let ul = document.createElement('ul');
      row.forEach((el) => {
        let li = document.createElement('li');
        li.addEventListener('mousedown', (e) => {
          this.pickedCell = e.target;
        });
        li.addEventListener('mouseup', (e) => {
          this.pickedCell = undefined;
        });
        if (el === 1) { li.style.backgroundColor = piece.color; }
        ul.appendChild(li);
      });
      node.appendChild(ul);
    });
  }

  generatePieceMap(pieceSet) {
    this.pieceMap = new Map();
    pieceSet.forEach((pieceOb) => {
      let pieceNode = document.createElement('div');
      pieceNode.classList.add('piece');
      pieceNode.setAttribute('draggable', true);
      this.renderPiece(pieceNode, pieceOb);
      pieceNode.addEventListener('click', this.pieceClickHandler.bind(this, pieceNode));
      this.pieceMap.set(pieceNode, pieceOb);
    });
  }

  pieceClickHandler(e, pieceNode) {
    e.preventDefault();
    if (this.isPlaying === false) { return; }
    if (this.pickedPiece === pieceNode) {
      pieceNode.classList.remove('picked');
      this.pickedPiece = undefined;
    } else {
      if (this.pickedPiece) {
        this.pickedPiece.classList.remove('picked');
      }
      pieceNode.classList.add('picked');
      this.pickedPiece = pieceNode;
    }
  }
}

export default Game;
