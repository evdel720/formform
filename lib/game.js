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

  rotatePickedPiece() {
    let pieceObject = this.pieceMap.get(this.pickedPiece);
    pieceObject.rotate();
    this.renderPiece(this.pickedPiece, pieceObject);
  }

  flipPickedPiece() {
    let pieceObject = this.pieceMap.get(this.pickedPiece);
    pieceObject.flip();
    this.renderPiece(this.pickedPiece, pieceObject);
  }

  renderPiece(node, piece) {
    node.innerHTML = "";
    piece.currentPiece().forEach((row) => {
      let temp = document.createElement('ul');
      temp.classList.add('row');
      row.forEach((el) => {
        let item = document.createElement('li');
        item.addEventListener('mousedown', (e) => {
          this.pickedCell = e.target;
        });
        item.addEventListener('mouseup', (e) => {
          this.pickedCell = undefined;
        });
        if (el === 1) {
          item.style.backgroundColor = piece.color;
        }
        temp.appendChild(item);
      });
      node.appendChild(temp);
    });
  }

  generatePieceMap(pieceSet) {
    this.pieceMap = new Map();
    pieceSet.forEach((p) => {
      let piece = document.createElement('div');
      piece.classList.add('piece');
      piece.setAttribute('draggable', true);
      this.renderPiece(piece, p);
      piece.addEventListener('click', () => {
        if (this.pickedPiece === piece) {
          piece.classList.remove('picked');
          this.pickedPiece = undefined;
        } else {
          if (this.pickedPiece) {
            this.pickedPiece.classList.remove('picked');
          }
          piece.classList.add('picked');
          this.pickedPiece = piece;
        }
      });
      this.pieceMap.set(piece, p);
    });
  }
}

export default Game;
