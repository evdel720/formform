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
	
	var findLoc = function findLoc(grid, cell) {
	  var children = grid.childNodes;
	  for (var i = 0; i < children.length; i++) {
	    for (var j = 0; j < children.item(0).childNodes.length; j++) {
	      if (children.item(i).childNodes.item(j) === cell) {
	        return [i, j];
	      }
	    }
	  }
	};
	
	var disableInteraction = function disableInteraction(game, pieces) {
	  game.board.boardNode.forEach(function (row) {
	    row.forEach(function (cell) {
	      cell.style.cursor = "default";
	    });
	  });
	  pieces.childNodes.forEach(function (piece) {
	    piece.setAttribute('draggable', false);
	  });
	};
	
	document.addEventListener('DOMContentLoaded', function () {
	  var board = document.getElementById('board');
	  var pieces = document.getElementById('pieces');
	  var timer = new _timer2.default(document.getElementById('timer'));
	  var play = document.getElementById('play');
	  var rotate = document.getElementById('rotate');
	  var flip = document.getElementById('flip');
	  var levels = document.getElementById('levels');
	  var level = 4;
	  var game = new _game2.default(board, pieces, level);
	
	  Array.from(levels.children).forEach(function (li, idx) {
	    li.addEventListener('click', function () {
	      if (!game.isPlaying) {
	        document.getElementsByClassName('selected-level')[0].classList.remove('selected-level');
	        li.classList.add('selected-level');
	        level = idx + 4;
	        timer.setTime(idx);
	      }
	    });
	  });
	
	  document.addEventListener('drop', function (e) {
	    e.preventDefault();
	    if (e.target.parentNode.classList && e.target.parentNode.classList.contains("dropzone") && game && game.board && game.pickedCell) {
	      var currentPieceNode = game.pickedCell.parentNode.parentNode;
	      var currentPieceObject = game.pieceMap.get(currentPieceNode);
	      var bLoc = findLoc(board, e.target);
	      var pLoc = findLoc(currentPieceNode, game.pickedCell);
	      var topLeft = [bLoc[0] - pLoc[0], bLoc[1] - pLoc[1]];
	      if (game.board.isValid(currentPieceObject, topLeft)) {
	        currentPieceNode.classList.add("placed-piece");
	        game.board.placePiece(currentPieceNode, currentPieceObject, topLeft);
	        if (game.board.isWon()) {
	          // change pieces to non-draggable
	          disableInteraction(game, pieces);
	          levels.style.display = "flex";
	          game.isPlaying = false;
	          // ask play again
	        }
	      }
	    }
	  });
	
	  document.addEventListener('dragover', function (e) {
	    e.preventDefault();
	  }, false);
	
	  play.addEventListener('click', function () {
	    board.innerHTML = "";
	    pieces.innerHTML = "";
	    game = new _game2.default(board, pieces, level);
	    levels.style.display = "none";
	    // timer.reset();
	    // timer.start();
	    game.play();
	  });
	
	  rotate.addEventListener('click', function (e) {
	    e.preventDefault();
	    if (game && game.pickedPiece) {
	      game.rotatePickedPiece();
	    }
	  });
	
	  flip.addEventListener('click', function (e) {
	    e.preventDefault();
	    if (game && game.pickedPiece) {
	      game.flipPickedPiece();
	    }
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
	
	var colors = ['rgb(162, 72, 151)', 'rgb(238, 89, 139)', 'rgb(126, 205, 199)', 'rgb(34, 193, 228)', 'rgb(45, 49, 108)', 'rgb(246, 180, 205)', 'rgb(245, 143, 51)', 'rgb(226, 35, 63)', 'rgb(250, 235, 62)', 'rgb(189, 214, 93)', 'rgb(241, 122, 128)'];
	
	var Game = function () {
	  function Game($board, $pieces, level) {
	    _classCallCheck(this, Game);
	
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
	
	  _createClass(Game, [{
	    key: 'rollDice',
	    value: function rollDice() {
	      this.dice = Math.floor(Math.random() * 6);
	      this.generatePieceMap(this.pieceSets[this.dice]);
	      this.board = new _board2.default(this.pieceMap);
	    }
	  }, {
	    key: 'play',
	    value: function play() {
	      this.isPlaying = true;
	      this.rollDice();
	      this.renderBoard();
	      this.board.setBoardNode(this.$board);
	    }
	  }, {
	    key: 'renderBoard',
	    value: function renderBoard() {
	      var _this = this;
	
	      this.board.board.forEach(function (row) {
	        var line = document.createElement('ul');
	        line.classList.add('row', 'dropzone');
	        row.forEach(function (el) {
	          var item = document.createElement('li');
	          item.addEventListener('click', _this.board.removePiece.bind(_this));
	          if (el === 1) {
	            item.classList.add('filled');
	          }
	          line.appendChild(item);
	        });
	        _this.$board.appendChild(line);
	      });
	
	      this.pieceMap.forEach(function (v, k) {
	        _this.$pieces.appendChild(k);
	      });
	    }
	  }, {
	    key: 'generateRandomPieces',
	    value: function generateRandomPieces() {
	      // returns 6 sets of piece arrays
	      var res = [];
	      for (var i = 0; i < 6; i++) {
	        var set = [];
	        var colorIdx = Math.floor(Math.random() * colors.length);
	        for (var j = 0; j < this.pieceNum; j++) {
	          var p = new _piece2.default();
	          p.color = colors[(colorIdx + j) % colors.length];
	          set.push(p);
	        }
	        res.push(set);
	      }
	      return res;
	    }
	  }, {
	    key: 'rotatePickedPiece',
	    value: function rotatePickedPiece() {
	      var pieceObject = this.pieceMap.get(this.pickedPiece);
	      pieceObject.rotate();
	      this.renderPiece(this.pickedPiece, pieceObject);
	    }
	  }, {
	    key: 'flipPickedPiece',
	    value: function flipPickedPiece() {
	      var pieceObject = this.pieceMap.get(this.pickedPiece);
	      pieceObject.flip();
	      this.renderPiece(this.pickedPiece, pieceObject);
	    }
	  }, {
	    key: 'renderPiece',
	    value: function renderPiece(node, piece) {
	      var _this2 = this;
	
	      node.innerHTML = "";
	      piece.currentPiece().forEach(function (row) {
	        var temp = document.createElement('ul');
	        temp.classList.add('row');
	        row.forEach(function (el) {
	          var item = document.createElement('li');
	          item.addEventListener('mousedown', function (e) {
	            _this2.pickedCell = e.target;
	          });
	          item.addEventListener('mouseup', function (e) {
	            _this2.pickedCell = undefined;
	          });
	          if (el === 1) {
	            item.style.backgroundColor = piece.color;
	          }
	          temp.appendChild(item);
	        });
	        node.appendChild(temp);
	      });
	    }
	  }, {
	    key: 'generatePieceMap',
	    value: function generatePieceMap(pieceSet) {
	      var _this3 = this;
	
	      this.pieceMap = new Map();
	      pieceSet.forEach(function (p) {
	        var piece = document.createElement('div');
	        piece.classList.add('piece');
	        piece.setAttribute('draggable', true);
	        _this3.renderPiece(piece, p);
	        piece.addEventListener('click', function () {
	          if (_this3.pickedPiece === piece) {
	            piece.classList.remove('picked');
	            _this3.pickedPiece = undefined;
	          } else {
	            if (_this3.pickedPiece) {
	              _this3.pickedPiece.classList.remove('picked');
	            }
	            piece.classList.add('picked');
	            _this3.pickedPiece = piece;
	          }
	        });
	        _this3.pieceMap.set(piece, p);
	      });
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
	  function Board(pieceMap) {
	    _classCallCheck(this, Board);
	
	    this.piecesArr = Array.from(pieceMap.values());
	    this.pieceMap = pieceMap;
	    this.board = this.generateBoard();
	    this.boardNode = undefined;
	    this.cellMap = new Map();
	  }
	
	  _createClass(Board, [{
	    key: "setBoardNode",
	    value: function setBoardNode($board) {
	      this.boardNode = Array.from($board.childNodes).map(function (row) {
	        return row.childNodes;
	      });
	    }
	  }, {
	    key: "isWon",
	    value: function isWon() {
	      return this.piecesArr.every(function (p) {
	        return p.placed;
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
	    value: function isValid(pieceOb, loc) {
	      // returns true if the piece can be placed on the location
	      // for testing, logging stuff
	      if (pieceOb.placed || loc[0] < 0 || loc[1] < 0) {
	        console.log("piece already placed, location is smaller than 0");
	        return false;
	      }
	      var piece = pieceOb.currentPiece();
	      for (var i = 0; i < piece.length; i++) {
	        for (var j = 0; j < piece[0].length; j++) {
	          if (piece[i][j] === 1 && this.board[i + loc[0]][j + loc[1]] !== 1) {
	            console.log("piece " + i + ", " + j + " is filled");
	            console.log("but board i=" + (i + loc[0]) + ", j=" + (j + loc[1]) + " is " + this.board[i + loc[0]][j + loc[1]]);
	            return false;
	          }
	        }
	      }
	      return true;
	    }
	  }, {
	    key: "placePiece",
	    value: function placePiece(pieceNode, pieceOb, loc) {
	      var piece = pieceOb.currentPiece();
	      for (var i = 0; i < piece.length; i++) {
	        for (var j = 0; j < piece[0].length; j++) {
	          if (piece[i][j] === 1) {
	            this.board[i + loc[0]][j + loc[1]] = 2;
	            this.placeHelper([i + loc[0], j + loc[1]], pieceNode, pieceOb);
	          }
	        }
	      }
	      pieceOb.placed = true;
	    }
	  }, {
	    key: "placeHelper",
	    value: function placeHelper(loc, pieceNode, pieceOb) {
	      this.cellMap.set(this.boardNode[loc[0]][loc[1]], pieceNode);
	      this.boardNode[loc[0]][loc[1]].classList.add("placed-cell");
	      this.boardNode[loc[0]][loc[1]].style.backgroundColor = pieceOb.color;
	      this.boardNode[loc[0]][loc[1]].style.cursor = "pointer";
	    }
	  }, {
	    key: "removePiece",
	    value: function removePiece(e) {
	      var _this2 = this;
	
	      if (this.isPlaying && e.target.classList.contains("placed-cell")) {
	        (function () {
	          var pieceNode = _this2.board.cellMap.get(e.target);
	          pieceNode.classList.remove("placed-piece");
	          _this2.pieceMap.get(pieceNode).placed = false;
	          _this2.board.boardNode.forEach(function (row, i) {
	            row.forEach(function (cell, j) {
	              if (_this2.board.cellMap.get(cell) === pieceNode) {
	                cell.setAttribute("style", "");
	                cell.classList.remove("placed-cell");
	                _this2.board.board[i][j] = 1;
	                _this2.board.cellMap.delete(cell);
	              }
	            });
	          });
	        })();
	      }
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
	    this.placed = false;
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
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Timer = function () {
	  function Timer($timer) {
	    _classCallCheck(this, Timer);
	
	    this.$timer = $timer;
	    this.count = 0;
	  }
	
	  _createClass(Timer, [{
	    key: "setTime",
	    value: function setTime(idx) {}
	  }]);
	
	  return Timer;
	}();
	
	exports.default = Timer;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map