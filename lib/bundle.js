/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/lib/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _game = __webpack_require__(1);
	
	var _game2 = _interopRequireDefault(_game);
	
	var _timer = __webpack_require__(5);
	
	var _timer2 = _interopRequireDefault(_timer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	document.addEventListener('DOMContentLoaded', function () {
	  var board = document.getElementById('board');
	  var pieces = document.getElementById('pieces');
	  var game = new _game2.default(board, pieces);
	  var button = document.getElementById('play');
	  var timer = new _timer2.default(document.getElementById('timer'));
	
	  button.addEventListener('click', function () {
	    board.innerHTML = "";
	    // timer.reset();
	    // timer.start();
	    game.play();
	  });
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _board = __webpack_require__(2);
	
	var _board2 = _interopRequireDefault(_board);
	
	var _piece = __webpack_require__(3);
	
	var _piece2 = _interopRequireDefault(_piece);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Game = function () {
	  function Game($board, $pieces) {
	    _classCallCheck(this, Game);
	
	    this.$board = $board;
	    this.$pieces = $pieces;
	    this.pieceNum = 4; // 4 = easy, 5 = medium, 6 = hard
	    this.pieceSets = this.generateRandomPieces();
	    this.board = undefined;
	    this.dice = undefined;
	  }
	
	  _createClass(Game, [{
	    key: 'renderGame',
	    value: function renderGame() {
	      var _this = this;
	
	      this.board.board.forEach(function (row) {
	        var line = document.createElement('ul');
	        line.classList.add('row');
	        row.forEach(function (el) {
	          var item = document.createElement('li');
	          item.classList.add(el === 1 ? 'filled' : 'empty');
	          line.appendChild(item);
	        });
	        _this.$board.appendChild(line);
	      });
	
	      this.board.piecesArr.forEach(function (p) {});
	    }
	  }, {
	    key: 'generateRandomPieces',
	    value: function generateRandomPieces() {
	      // returns 6 sets of piece arrays
	      var res = [];
	      for (var i = 0; i < 6; i++) {
	        var set = new Set();
	        for (var j = 0; j < this.pieceNum; j++) {
	          set.add(new _piece2.default());
	        }
	        res.push(set);
	      }
	      return res;
	    }
	  }, {
	    key: 'rollDice',
	    value: function rollDice() {
	      this.dice = Math.floor(Math.random() * 6);
	      this.board = new _board2.default(this.pieceSets[this.dice]);
	    }
	  }, {
	    key: 'play',
	    value: function play() {
	      this.rollDice();
	      this.renderGame();
	      window.board = this.board;
	    }
	  }]);
	
	  return Game;
	}();
	
	exports.default = Game;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var neighbors = [[-1, 0], [1, 0], [0, -1], [0, 1]];
	
	var Board = function () {
	  function Board(pieceSet) {
	    _classCallCheck(this, Board);
	
	    this.piecesArr = Array.from(pieceSet);
	    this.leftPieces = pieceSet;
	    this.board = this.generateBoard();
	    this.placedPieces = new Set();
	  }
	
	  _createClass(Board, [{
	    key: "isOver",
	    value: function isOver() {
	      return this.leftPieces.size === 0;
	    }
	  }, {
	    key: "display",
	    value: function display() {
	      // this.leftPieces.forEach((p) => {
	      //   console.log('-----------------');
	      //   let init = p.piece.default[0];
	      //   init.forEach((i) => {
	      //     console.log(i);
	      //   });
	      // });
	      this.board.forEach(function (r) {
	        console.log(r);
	      });
	    }
	  }, {
	    key: "generateBoard",
	    value: function generateBoard() {
	      var _this = this;
	
	      // returns the most dense board possible
	      var shuffledPieces = this.shuffledPieces();
	      var board = undefined;
	      // make the board as normal 2D array
	      shuffledPieces.forEach(function (p) {
	        var ob = _this.piecesArr[p.piece];
	        var currentPiece = ob.piece[p.flipped ? "flipped" : "default"][p.idx];
	        // for testing
	        // console.log('board');
	        // console.log(board);
	        // console.log('currentPiece');
	        // console.log(currentPiece);
	        if (board === undefined) {
	          board = currentPiece;
	        } else {
	          board = _this.combineTwo(board, currentPiece);
	        }
	      });
	      return board;
	    }
	  }, {
	    key: "isValid",
	    value: function isValid(pieceArr, loc) {
	      // returns true if the piece can be placed on the location
	      for (var i = 0; i < pieceArr.length; i++) {
	        for (var j = 0; j < pieceArr[0].length; j++) {
	          if (pieceArr[i][j] === 1 && this.board[i + loc[0]][j + loc[1]] === 0) {
	            return false;
	          }
	        }
	      }
	      return true;
	    }
	  }, {
	    key: "placePiece",
	    value: function placePiece(piece, loc) {
	      if (this.isValid(piece.currentPiece(), loc)) {
	        // place piece
	        var pieceArr = piece.currentPiece();
	        for (var i = 0; i < pieceArr.length; i++) {
	          for (var j = 0; j < pieceArr[0].length; j++) {
	            if (pieceArr[i][j] === 1) {
	              this.board[i + loc[0]][j + loc[1]] = 0;
	            }
	          }
	        }
	        piece.pos = loc;
	        this.leftPieces.delete(piece);
	        this.placedPieces.add(piece);
	      }
	    }
	  }, {
	    key: "removePiece",
	    value: function removePiece(piece, loc) {
	      // remove the piece from the board
	      if (piece.pos[0] !== loc[0] || piece.pos[1] !== loc[1]) {
	        return false;
	      }
	      var pieceArr = piece.currentPiece();
	      for (var i = 0; i < pieceArr.length; i++) {
	        for (var j = 0; j < pieceArr[0].length; j++) {
	          if (pieceArr[i][j] === 1) {
	            this.board[i + loc[0]][j + loc[1]] = 1;
	          }
	        }
	      }
	      piece.pos = [-1, -1];
	      this.leftPieces.add(piece);
	      this.placedPieces.delete(piece);
	    }
	  }, {
	    key: "shuffledPieces",
	    value: function shuffledPieces() {
	      // shuffles the pieces
	      var result = this.piecesArr.map(function (p, i) {
	        var ob = { piece: i };
	        ob.idx = Math.floor(Math.random() * 4);
	        ob.flipped = Boolean(Math.round(Math.random()));
	        return ob;
	      });
	      for (var i = 0; i < result.length; i++) {
	        var j = Math.floor(Math.random() * result.length);
	        var _ref = [result[j], result[i]];
	        result[i] = _ref[0];
	        result[j] = _ref[1];
	      }
	      return result;
	    }
	  }, {
	    key: "combineTwo",
	    value: function combineTwo(a, b) {
	      // combine two pieces for the best result
	      var res = this.makeEmptyGridWith(a, b);
	      // move the b block around and save that position if
	      // it makes shorter border length
	      var bestPos = this.getBestPosition(res, a, b);
	      // put b block in the best position
	      for (var i = 0; i < b.length; i++) {
	        for (var j = 0; j < b[0].length; j++) {
	          res[bestPos[0] + i][bestPos[1] + j] += b[i][j];
	        }
	      }
	      return this.trimZero(res);
	    }
	  }, {
	    key: "makeEmptyGridWith",
	    value: function makeEmptyGridWith(a, b) {
	      var res = [];
	      // make new empty grid
	      for (var i = 0; i < a.length + b.length; i++) {
	        var temp = [];
	        for (var j = 0; j < a[0].length + b[0].length; j++) {
	          if (i < a.length && j < a[0].length) {
	            temp[j] = a[i][j];
	          } else {
	            temp[j] = 0;
	          }
	        }
	        res.push(temp);
	      }
	      return res;
	    }
	  }, {
	    key: "trimZero",
	    value: function trimZero(grid) {
	      // return the zero trimmed grid
	      // trim zeroes
	      var row = false,
	          col = false;
	      while (!row || !col) {
	        row = grid[grid.length - 1].some(function (el) {
	          return el !== 0;
	        });
	        if (!row) {
	          grid.pop();
	        }
	        col = grid.map(function (c) {
	          return c[c.length - 1];
	        }).some(function (el) {
	          return el !== 0;
	        });
	        if (!col) {
	          grid.forEach(function (r) {
	            return r.pop();
	          });
	        }
	      }
	      return grid;
	    }
	  }, {
	    key: "processPositionAt",
	    value: function processPositionAt(res, b, i, j) {
	      // returns the new borderLen / false
	      var newBorder = true;
	      // put b piece on the board
	      for (var x = 0; x < b.length; x++) {
	        for (var y = 0; y < b[0].length; y++) {
	          res[i + x][j + y] += b[x][y];
	          if (res[i + x][j + y] > 1) {
	            newBorder = false;
	          }
	        }
	      }
	      if (newBorder) {
	        newBorder = Board.getBorderLength(res);
	      }
	      // change that back to just have a piece
	      for (var _x = 0; _x < b.length; _x++) {
	        for (var _y = 0; _y < b[0].length; _y++) {
	          res[i + _x][j + _y] -= b[_x][_y];
	        }
	      }
	      return newBorder;
	    }
	  }, {
	    key: "getBestPosition",
	    value: function getBestPosition(res, a, b) {
	      var bestPos = void 0,
	          borderLen = void 0;
	      for (var i = 0; i <= res.length - b.length; i++) {
	        for (var j = 0; j <= res[0].length - b[0].length; j++) {
	          var newBorder = this.processPositionAt(res, b, i, j);
	          if (!newBorder) {
	            continue;
	          }
	          if (!borderLen || newBorder < borderLen) {
	            borderLen = newBorder;
	            bestPos = [i, j];
	          }
	        }
	      }
	      return bestPos;
	    }
	  }], [{
	    key: "getBorderLength",
	    value: function getBorderLength(arr) {
	      // returns the piece's length of border
	      var len = 0;
	      for (var i = 0; i < arr.length; i++) {
	        for (var j = 0; j < arr[0].length; j++) {
	          if (arr[i][j] === 1) {
	            for (var n = 0; n < 4; n++) {
	              var _neighbors$n = _slicedToArray(neighbors[n], 2),
	                  x = _neighbors$n[0],
	                  y = _neighbors$n[1];
	
	              if (arr[x + i] && arr[x + i][y + j] === 1) {
	                continue;
	              }
	              len++;
	            }
	          }
	        }
	      }
	      return len;
	    }
	  }]);
	
	  return Board;
	}();
	
	exports.default = Board;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _piece_array = __webpack_require__(4);
	
	var _piece_array2 = _interopRequireDefault(_piece_array);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// prepopulate all the pieces in piece_array.js
	
	var Piece = function () {
	  function Piece() {
	    _classCallCheck(this, Piece);
	
	    this.piece = _piece_array2.default[Math.floor(Math.random() * _piece_array2.default.length)];
	    this.idx = 0;
	    this.flipped = false;
	    this.pos = [-1, -1];
	  }
	
	  _createClass(Piece, [{
	    key: 'currentPiece',
	    value: function currentPiece() {
	      var pieceArr = this.flipped ? this.piece.flipped : this.piece.default;
	      return pieceArr[this.idx];
	    }
	  }, {
	    key: 'rotate',
	    value: function rotate() {
	      this.idx = (this.idx + 1) % 4;
	    }
	  }, {
	    key: 'flip',
	    value: function flip() {
	      // flip the piece
	      this.flipped = !this.flipped;
	    }
	  }]);
	
	  return Piece;
	}();
	
	exports.default = Piece;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var rotate = function rotate(arr) {
	  var res = [];
	  for (var j = 0; j < arr[0].length; j++) {
	    var temp = [];
	    for (var i = arr.length - 1; i >= 0; i--) {
	      temp.push(arr[i][j]);
	    }
	    res.push(temp);
	  }
	  return res;
	};
	
	var flip = function flip(arr) {
	  var res = [];
	  arr.forEach(function (row) {
	    var temp = [];
	    for (var i = row.length - 1; i >= 0; i--) {
	      temp.push(row[i]);
	    }
	    res.push(temp);
	  });
	  return res;
	};
	
	var pieces = [[[1, 1, 1], [0, 1, 0]], [[1, 1], [1, 1]], [[1, 1, 1]], [[1, 1]], [[1, 1, 1, 1]], [[1, 1], [1, 0]], [[1, 1, 1], [1, 1, 0]], [[1, 1, 1], [1, 0, 0]], [[1, 0, 0], [1, 1, 1], [0, 0, 1]], [[1, 1, 1, 1], [0, 1, 0, 0]], [[1, 1, 0], [0, 1, 1]], [[1, 1, 1, 1], [1, 0, 0, 0]]];
	
	exports.default = pieces.map(function (p, idx) {
	  var piece = {};
	  piece.default = [p];
	  piece.flipped = [flip(p)];
	  for (var i = 0; i < 3; i++) {
	    piece.default.push(rotate(piece.default[i]));
	    piece.flipped.push(rotate(piece.flipped[i]));
	  }
	  return piece;
	});

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Timer = function Timer($timer) {
	  _classCallCheck(this, Timer);
	
	  this.$timer = $timer;
	};
	
	exports.default = Timer;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map