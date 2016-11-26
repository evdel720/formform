import Piece from './piece.js';

document.addEventListener('DOMContentLoaded', () => {
  let p = new Piece();
  console.log(p.currentPiece());
  console.log(Piece.getBorderLength(p.currentPiece()));
});
