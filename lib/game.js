import Board from './board.js';
import Piece from './piece.js';

const colors = ['rgb(162, 72, 151)', 'rgb(238, 89, 139)', 'rgb(126, 205, 199)', 'rgb(34, 193, 228)', 'rgb(45, 49, 108)', 'rgb(246, 180, 205)', 'rgb(245, 143, 51)', 'rgb(226, 35, 63)', 'rgb(250, 235, 62)', 'rgb(189, 214, 93)', 'rgb(241, 122, 128)'];

class Game {
  constructor($boardNode, $pieces) {
    this.$boardNode = $boardNode;
    this.$pieces = $pieces;
    this.pieceNum = 4;
    this.pieceSets = undefined;
    this.board = undefined;
    this.pieceMap = undefined;
    this.pickedPiece = undefined;
    this.pickedCell = undefined;
    this.isPlaying = false;
  }

  clearBoard() {
    this.$pieces.innerHTML = "";
    this.$boardNode.forEach((row) => {
      row.forEach((cell) => {
        cell.removeAttribute('style');
        cell.classList.remove('filled');
      });
    });
    this.pickedPiece = undefined;
  }

  play() {
    // reset all the status and start
    this.clearBoard();
    this.isPlaying = true;
    this.generatePieceMap(this.generateRandomPieces());
    this.board = new Board(this.pieceMap, this.$boardNode);
    this.renderBoard();
  }

  renderBoard() {
    for (let i=0; i<this.board.board.length; i++) {
      for (let j=0; j<this.board.board[0].length; j++) {
        let el = this.$boardNode[i][j];
        if (this.board.board[i][j] === 1) {
          el.addEventListener('click', this.board.removePiece.bind(this));
        }
        el.setAttribute('class', this.board.board[i][j] === 1 ? 'filled' : "");
      }
    }
    this.pieceMap.forEach((v, k) => {
      this.$pieces.appendChild(k);
    });
  }

  generateRandomPieces() {
    let res = [];
    let colorIdx = Math.floor(Math.random() * colors.length);
    for (let i=0; i<this.pieceNum; i++) {
      let p = new Piece();
      p.color = colors[(colorIdx + i) % colors.length];
      res.push(p);
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
        if (el === 1) {
          li.classList.add("filled");
          li.style.backgroundColor = piece.color;
        }
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

  pieceClickHandler(pieceNode, e) {
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
