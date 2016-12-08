import Board from './board.js';
import Piece from './piece.js';

class Game {
  constructor($board, $pieces, level) {
    this.$board = $board;
    this.$pieces = $pieces;
    this.pieceNum = level; // 4 = easy, 5 = medium, 6 = hard
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
        item.classList.add(el === 1 ? 'filled' : 'empty');
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
      for (let j=0; j<this.pieceNum; j++) {
        set.push(new Piece());
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
        item.classList.add(el === 1 ? 'filled' : 'empty');
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
