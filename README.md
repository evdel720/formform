# FormForm

[FormForm live][https://evdel720.github.io/formform/]

  FormForm is a browser based puzzle game. It is implemented with JavaScript(ES6), HTML and CSS using webpack and babel.

## Background
  I wanted to build a fun and educational game that can help developing geographical sense. With FormForm, user can think various ways to make a certain board with given pieces. I love the idea of generating random board and giving the freedom to make the board with given pieces.
  ![formform_gif](https://res.cloudinary.com/wkdal720/image/upload/v1481661014/imageedit__4466087888_nqlmek.gif)

## How to play
  First, set proper level for you. Then click Play button. That generates the green board on the left and pieces on the right.
  Second, drag pieces to where you want to place the piece on the board. The goal is fill all the green cells on the board with all the pieces.
  Third, you can rotate/flip your piece when you select one.
  Fourth, you can take a piece off from the board by clicking.
  Fifth, enjoy!

## Features & Implementation

### Setup Piece Object
  I pre-populated the pieces as objects in /lib/piece_array.js with all the possible rotations. Each piece object has all the rotations as array and possible indexes like below.
  ```javascript
    piece = {
      possibleIndexes: [0],
      piecesArr: []
    }
  ```
  possibleIndexes are for avoiding duplicated calculation when the app tries to generate a random board.
  I pre-populated the pieces to optimize the running time. Once a user loaded the piece_array.js in client side, no matter how many times they play, it never actually rotate the piece or flip the piece. It uses the already made pieces and simply moves the index of the piece according to the action.

### Generate random board
  When user click play, the game object will generate a new board object with randomly picked pieces. In generating process, first shuffle the pieces(because order of the placing matters). Then pick one piece from pieces, take its rotated version randomly, and place it on the board. After that, go through the shuffled pieces and place each one on the board.
  When placing one piece, the app uses the possibleIndexes in the piece object to reduce duplicated calculation. Since the possibleIndexes only has the unique piece grids. (Some pieces has all unique rotations but for example, [[1, 1], [1, 1]] will be same in any cases)
  Basic idea of placing a piece is go through all the possible positions with possible shape and (hypothetically) put the piece on the board to see if the pieces already on the board and the new piece share the longest border between them. Since it has limited board size(8*8), for the worst case to place a piece on the board, it calculate (8 - piece.width) * (8 - piece.height) * (possibleIndexes.length) times.
  I didn't actually put the piece on the board if we didn't finish the calculations by using this code below to check sharing border.

  ```javascript
    sharedBorder(pos, board, piece) {
      let len = 0;
      for (let i=0; i<piece.length; i++) {
        for (let j=0; j<piece[0].length; j++) {
          if (piece[i][j] === 1) {
            if (board[i+pos[0]][j+pos[1]] === 1) { return -1; }
            neighbors.forEach((n) => {
              if (board[n[0]+i+pos[0]] !== undefined && board[n[0]+i+pos[0]][n[1]+j+pos[1]] === 1) {
                len++;
              }
            });
          }
        }
      }
      return len;
    }
  ```
### Drag and Drop UI
  The pieces are draggable html elements. I gave the board's children dropzone class to check if the piece dropped in the right place. I kept the drop event handling and lots of other things in the utils.js to keep the game_view.js short.

## Future Directions for the Project

### Multiplayer mode
  Use WebSocket to generate multi player mode

### Mobile app development
  Implement the app with Swift
