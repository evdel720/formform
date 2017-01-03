# FormForm

[FormForm live][http://formform.us-west-1.elasticbeanstalk.com/]

  FormForm is a browser based puzzle game. It is implemented with JavaScript(ES6), HTML and CSS using webpack, babel, WebSocket, express.js, and node.js, and deployed with AWS Elastic Beanstalk.

## Background
  I wanted to build a fun and educational game that can help developing a geometrical sense. With FormForm, users can think about various ways to make a certain board with given pieces. I love the idea of generating a random board and giving users freedom to make the board with given pieces.
  ![formform_gif](https://res.cloudinary.com/wkdal720/image/upload/v1481661014/imageedit__4466087888_nqlmek.gif)

## How to play
  First, set the proper difficulty level for you. Then click the Play button. That generates the green board on the left and pieces on the right.
  Second, drag pieces to where you want to place them on the board. The goal is to fill all the green cells on the board by using all the pieces.
  Third, you can rotate/flip your piece when you select one.
  Fourth, you can remove a piece from the board by clicking.
  Fifth, enjoy!

## Features & Implementation

### Setup Piece Object
  I pre-populated the pieces as objects in /lib/piece_array.js with all the possible rotations. Each piece object has all the rotations as an array and possible indexes.
  possibleIndexes are for avoiding duplicated calculation when the app tries to generate a random board.
  I pre-populated the pieces to optimize the running time. Once users load the piece_array.js on the client side, no matter how many times they play, it never actually rotates or flips the piece. It uses the already made pieces and simply moves the index of the piece according to the action.

### Generate random board
  When the user clicks play, the game object will generate a new board object with randomly picked pieces. In the generating process, it first shuffles the pieces (because the placement order matters). Then, it picks one piece from pieces, take its rotated version randomly, and places it on the board. After that, it goes through the shuffled pieces and places each one on the board.
  When placing one piece, the app uses the possibleIndexes in the piece object to reduce duplicated calculation, since the possibleIndexes only has the unique piece grids. (Some pieces have all unique rotations but for example, [[1, 1], [1, 1]] will be the same in every case)
  The basic idea of placing a piece is to go through all the possible positions with possible shapes and (hypothetically) put the piece on the board to see if the pieces already on the board and the new piece share the longest border between them. Since it has limited board size(8*8), for the worst case to place a piece on the board, it calculates (8 - piece.width) * (8 - piece.height) * (possibleIndexes.length) times.
  It doesn't actually put the piece on the board if it didn't finish the calculations, using this code below to check sharing border.

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
  The pieces are draggable html elements. I gave the board's children the dropzone class to check if the piece was dropped in the right place. I kept the drop event handling and lots of other things in the utils.js to keep the game_view.js short.

### Multi Players
  After solo mode, I basically changed the whole structure of the app and implemented multi mode. I refactored the game_view.js to use common interfaces to invoke common behaviors for both of the modes using duck-typing. When a user clicks Battle button, it generates new room and add the user's socket to the room. It generates a unique room id for the room and lets the user copy and paste the url.
  Another user can join and add his socket to the room and only after two players match, they can press the ready button and play the game.
  In game play, two sockets send data to each other whenever a user places/removes a piece.
  I made allRooms with JS Map Object to hold all GameStates on the server side. I avoided using DB since it was unnecessary for this simple two player game.
  When all the users in one room disconnect, it removes the room from all rooms.

## Future Directions for the Project

### Leader Board
  Implement weekly leader board

### Mobile app development
  Implement the app with Swift
