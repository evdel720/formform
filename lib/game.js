import Board from './board.js';
import Piece from './piece.js';

class Game {
  constructor($board, $pieces) {
    this.$board = $board;
    this.$pieces = $pieces;
    this.pieceNum = 4; // 4 = easy, 5 = medium, 6 = hard
    this.pieceSets = this.generateRandomPieces();
    this.board = undefined;
    this.dice = undefined;
    this.pieceMap = undefined;
    this.pickedPiece = undefined;
  }

  renderGame() {
    this.board.board.forEach((row) => {
      let line = document.createElement('ul');
      line.classList.add('row', 'dropzone');
      row.forEach((el) => {
        let item = document.createElement('li');
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
          
          console.log("possible to drag!");
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
      // piece.addEventListener('drag', (e) => {
      //   e.dataTransfer.setData("text", e.target.id);
      //   console.log('dragging');
      // });
      //
      // piece.addEventListener('dragend', (e) => {
      //   console.log(e);
      //   console.log('drop');
      // });
      // //

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

  rollDice() {
    this.dice = Math.floor(Math.random() * 6);
    this.generatePieceMap(this.pieceSets[this.dice]);
    this.board = new Board(this.pieceMap);
  }

  play() {
    this.rollDice();
    this.renderGame();
  }
}

export default Game;
