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
	
	var _utils = __webpack_require__(6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	document.addEventListener('DOMContentLoaded', function () {
	  var board = document.getElementById('board');
	  var pieces = document.getElementById('pieces');
	  var play = document.getElementById('play');
	  var rotate = document.getElementById('rotate');
	  var flip = document.getElementById('flip');
	  var levels = document.getElementById('levels');
	  var moveSound = document.getElementById('move-sound');
	  var instruction = document.getElementById('instruction');
	  var boardNode = (0, _utils.getGridNode)(board);
	
	  var game = new _game2.default(boardNode, pieces);
	  var timer = new _timer2.default(document.getElementById('timer'), _utils.disableInteraction);
	
	  Array.from(levels.children).forEach(function (li, idx) {
	    (0, _utils.setLevelHandler)(game, timer, li, idx);
	  });
	
	  document.addEventListener('drop', function (e) {
	    return (0, _utils.dropHandler)(game, boardNode, timer, e);
	  });
	
	  play.addEventListener('click', function () {
	    levels.classList.add("hidden");
	    instruction.classList.add("hidden");
	    rotate.classList.remove("hidden");
	    flip.classList.remove("hidden");
	    timer.start(game);
	    game.play();
	  });
	
	  document.addEventListener('dragover', function (e) {
	    e.preventDefault();
	  }, false);
	
	  [rotate, flip].forEach(function (btn) {
	    btn.addEventListener('click', function (e) {
	      e.preventDefault();
	      if (game && game.pickedPiece) {
	        moveSound.play();
	        game.movePickedPiece(btn.id);
	      }
	    });
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
	  function Game($boardNode, $pieces) {
	    _classCallCheck(this, Game);
	
	    this.$boardNode = $boardNode;
	    this.$pieces = $pieces;
	    this.pieceNum = 4;
	    this.pieceSets = undefined;
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
	      this.pieceSets = this.generateRandomPieces();
	      this.dice = Math.floor(Math.random() * 6);
	      this.generatePieceMap(this.pieceSets[this.dice]);
	      this.board = new _board2.default(this.pieceMap, this.$boardNode);
	    }
	  }, {
	    key: 'play',
	    value: function play() {
	      // reset all the status and start
	      this.$pieces.innerHTML = "";
	      this.$boardNode.forEach(function (row) {
	        row.forEach(function (cell) {
	          cell.removeAttribute('style');
	        });
	      });
	      this.pickedPiece = undefined;
	      this.isPlaying = true;
	      this.rollDice();
	      this.renderBoard();
	    }
	  }, {
	    key: 'renderBoard',
	    value: function renderBoard() {
	      var _this = this;
	
	      for (var i = 0; i < this.board.board.length; i++) {
	        for (var j = 0; j < this.board.board[0].length; j++) {
	          var el = this.$boardNode[i][j];
	          if (this.board.board[i][j] === 1) {
	            el.addEventListener('click', this.board.removePiece.bind(this));
	          }
	          el.setAttribute('class', this.board.board[i][j] === 1 ? 'filled' : "");
	        }
	      }
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
	    key: 'movePickedPiece',
	    value: function movePickedPiece(action) {
	      var pieceObject = this.pieceMap.get(this.pickedPiece);
	      if (action === "flip") {
	        pieceObject.flip();
	      } else {
	        pieceObject.rotate();
	      }
	      this.renderPiece(this.pickedPiece, pieceObject);
	    }
	  }, {
	    key: 'renderPiece',
	    value: function renderPiece(node, piece) {
	      var _this2 = this;
	
	      node.innerHTML = "";
	      piece.currentPiece().forEach(function (row) {
	        var ul = document.createElement('ul');
	        row.forEach(function (el) {
	          var li = document.createElement('li');
	          li.addEventListener('mousedown', function (e) {
	            _this2.pickedCell = e.target;
	          });
	          li.addEventListener('mouseup', function (e) {
	            _this2.pickedCell = undefined;
	          });
	          if (el === 1) {
	            li.style.backgroundColor = piece.color;
	          }
	          ul.appendChild(li);
	        });
	        node.appendChild(ul);
	      });
	    }
	  }, {
	    key: 'generatePieceMap',
	    value: function generatePieceMap(pieceSet) {
	      var _this3 = this;
	
	      this.pieceMap = new Map();
	      pieceSet.forEach(function (pieceOb) {
	        var pieceNode = document.createElement('div');
	        pieceNode.classList.add('piece');
	        pieceNode.setAttribute('draggable', true);
	        _this3.renderPiece(pieceNode, pieceOb);
	        pieceNode.addEventListener('click', _this3.pieceClickHandler.bind(_this3, pieceNode));
	        _this3.pieceMap.set(pieceNode, pieceOb);
	      });
	    }
	  }, {
	    key: 'pieceClickHandler',
	    value: function pieceClickHandler(pieceNode, e) {
	      e.preventDefault();
	      if (this.isPlaying === false) {
	        return;
	      }
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
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var neighbors = [[-1, 0], [1, 0], [0, -1], [0, 1]];
	
	var Board = function () {
	  function Board(pieceMap, $boardNode) {
	    _classCallCheck(this, Board);
	
	    this.piecesObjects = Array.from(pieceMap.values());
	    this.pieceMap = pieceMap;
	    this.$boardNode = $boardNode;
	    this.board = this.generateBoard();
	    this.cellMap = new Map();
	  }
	
	  _createClass(Board, [{
	    key: "isWon",
	    value: function isWon() {
	      return this.piecesObjects.every(function (p) {
	        return p.placed;
	      });
	    }
	  }, {
	    key: "isValid",
	    value: function isValid(pieceOb, loc) {
	      // returns true if the piece can be placed on the location
	      // for testing, logging stuff
	      if (pieceOb.placed || loc[0] < 0 || loc[1] < 0) {
	        console.log("piece already placed or location is smaller than 0");
	        return false;
	      }
	      var piece = pieceOb.currentPiece();
	      for (var i = 0; i < piece.length; i++) {
	        for (var j = 0; j < piece[0].length; j++) {
	          if (piece[i][j] === 1 && this.board[i + loc[0]][j + loc[1]] !== 1) {
	            // These are for testing!
	            console.log("piece location: " + i + ", " + j);
	            console.log("board location: " + (i + loc[0]) + ", " + (j + loc[1]));
	            console.log("piece:");
	            piece.forEach(function (row, t) {
	              console.log(t + " " + row.join(" "));
	            });
	            console.log("board:");
	            this.board.forEach(function (row, t) {
	              console.log(t + " " + row.join(" "));
	            });
	            window.board = this.board;
	            return false;
	          }
	        }
	      }
	      return true;
	    }
	  }, {
	    key: "placePiece",
	    value: function placePiece(pieceNode, loc) {
	      var pieceOb = this.pieceMap.get(pieceNode);
	      var piece = pieceOb.currentPiece();
	      for (var i = 0; i < piece.length; i++) {
	        for (var j = 0; j < piece[0].length; j++) {
	          if (piece[i][j] === 1) {
	            this.placeHelper([i + loc[0], j + loc[1]], pieceNode, pieceOb);
	          }
	        }
	      }
	      pieceNode.classList.add("hidden");
	      pieceOb.placed = true;
	    }
	  }, {
	    key: "placeHelper",
	    value: function placeHelper(loc, pieceNode, pieceOb) {
	      this.board[loc[0]][loc[1]] = 2;
	      this.$boardNode[loc[0]][loc[1]].style.backgroundColor = pieceOb.color;
	      this.cellMap.set(this.$boardNode[loc[0]][loc[1]], pieceNode);
	      this.$boardNode[loc[0]][loc[1]].classList.add("placed-cell");
	      this.$boardNode[loc[0]][loc[1]].style.cursor = "pointer";
	    }
	  }, {
	    key: "movePieceAt",
	    value: function movePieceAt(pos, board, piece, put, callback) {
	      // put is boolean. if it's true, place piece
	      // if it's false, remove piece from the pos
	      for (var i = 0; i < piece.length; i++) {
	        for (var j = 0; j < piece[0].length; j++) {
	          if (piece[i][j] === 1) {
	            if (put) {
	              board[i + pos[0]][j + pos[1]]++;
	            } else {
	              board[i + pos[0]][j + pos[1]]--;
	            }
	          }
	        }
	      }
	    }
	  }, {
	    key: "removePiece",
	    value: function removePiece(e) {
	      var _this = this;
	
	      if (this.isPlaying && e.target.classList.contains("placed-cell")) {
	        (function () {
	          var pieceNode = _this.board.cellMap.get(e.target);
	          pieceNode.classList.remove("hidden");
	          _this.pieceMap.get(pieceNode).placed = false;
	          _this.board.$boardNode.forEach(function (row, i) {
	            row.forEach(function (cell, j) {
	              if (_this.board.cellMap.get(cell) === pieceNode) {
	                cell.setAttribute("style", "");
	                cell.classList.remove("placed-cell");
	                _this.board.board[i][j] = 1;
	                _this.board.cellMap.delete(cell);
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
	      var result = this.piecesObjects.map(function (p) {
	        return p;
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
	    key: "generateBoard",
	    value: function generateBoard() {
	      var _this2 = this;
	
	      // TODO more randomize!!
	      var shuffledPieces = this.shuffledPieces();
	      var board = this.$boardNode.map(function (row) {
	        return row.map(function (cell) {
	          return 0;
	        });
	      });
	      // for testing
	      // let firstP = new Piece(8).piecesArr[4];
	      // console.log(firstP);
	      // pick the first piece randomly
	      var firstP = shuffledPieces.pop().piecesArr[Math.floor(Math.random() * 8)];
	      // start at the middle
	      var i = Math.floor((board.length - firstP.length) / 2);
	      var j = Math.floor((board[0].length - firstP[0].length) / 2);
	      this.movePieceAt([i, j], board, firstP, true);
	      // board.forEach((row, t) => {
	      //   console.log(`${t} ${row.join(" ")}`);
	      // });
	      // let secondP = new Piece(7);
	      // let [bestPos, bestPiece] = this.getBestPieceAndPosition(board, secondP);
	      // this.movePieceAt(bestPos, board, bestPiece, true);
	
	      shuffledPieces.forEach(function (p) {
	        var _getBestPieceAndPosit = _this2.getBestPieceAndPosition(board, p),
	            _getBestPieceAndPosit2 = _slicedToArray(_getBestPieceAndPosit, 2),
	            bestPos = _getBestPieceAndPosit2[0],
	            bestPiece = _getBestPieceAndPosit2[1];
	
	        _this2.movePieceAt(bestPos, board, bestPiece, true);
	      });
	      return board;
	    }
	  }, {
	    key: "sharedBorder",
	    value: function sharedBorder(pos, board, piece) {
	      var len = 0;
	
	      var _loop = function _loop(i) {
	        var _loop2 = function _loop2(j) {
	          if (piece[i][j] === 1) {
	            if (board[i + pos[0]][j + pos[1]] === 1) {
	              return {
	                v: {
	                  v: -1
	                }
	              };
	            }
	            neighbors.forEach(function (n) {
	              if (board[n[0] + i + pos[0]] !== undefined && board[n[0] + i + pos[0]][n[1] + j + pos[1]] === 1) {
	                len++;
	              }
	            });
	          }
	        };
	
	        for (var j = 0; j < piece[0].length; j++) {
	          var _ret3 = _loop2(j);
	
	          if ((typeof _ret3 === "undefined" ? "undefined" : _typeof(_ret3)) === "object") return _ret3.v;
	        }
	      };
	
	      for (var i = 0; i < piece.length; i++) {
	        var _ret2 = _loop(i);
	
	        if ((typeof _ret2 === "undefined" ? "undefined" : _typeof(_ret2)) === "object") return _ret2.v;
	      }
	      return len;
	    }
	  }, {
	    key: "getBestPieceAndPosition",
	    value: function getBestPieceAndPosition(board, piece) {
	      var _this3 = this;
	
	      // get the best possible position by running through
	      // all possible combination
	      var sharedBorder = -1;
	      var bestPos = [];
	      var bestPiece = [];
	      piece.possibleIndexes.forEach(function (idx) {
	        var current = piece.piecesArr[idx];
	        for (var i = 0; i < board.length - current.length; i++) {
	          for (var j = 0; j < board[0].length - current[0].length; j++) {
	            var newBorder = _this3.sharedBorder([i, j], board, current);
	            if (newBorder > sharedBorder) {
	              sharedBorder = newBorder;
	              bestPos = [i, j];
	              bestPiece = current;
	            }
	          }
	        }
	      });
	      return [bestPos, bestPiece];
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
	  function Piece(i) {
	    _classCallCheck(this, Piece);
	
	    // let randomPiece = i ? pieces[i] : pieces[Math.floor(Math.random() * pieces.length)];
	    var randomPiece = _piece_array2.default[Math.floor(Math.random() * _piece_array2.default.length)];
	    this.piecesArr = randomPiece.piecesArr;
	    this.possibleIndexes = randomPiece.possibleIndexes;
	    this.idx = 0;
	    this.placed = false;
	  }
	
	  _createClass(Piece, [{
	    key: 'currentPiece',
	    value: function currentPiece() {
	      return this.piecesArr[this.idx];
	    }
	  }, {
	    key: 'rotate',
	    value: function rotate() {
	      if (this.idx < 4) {
	        this.idx = (this.idx + 1) % 4;
	      } else {
	        this.idx = (this.idx + 1) % 8 || 4;
	      }
	    }
	  }, {
	    key: 'flip',
	    value: function flip() {
	      this.idx = (this.idx + 4) % 8;
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
	// in 12 pieces, 5 pieces shares same shape in rotation
	// 1 piece has same for all
	// [...[piece arr], [indexs of things that doesn't change]]
	// in 0 to 7 indexs
	var pieces = [[[1, 1, 1], [0, 1, 0], -1], [[1, 1], [1, 1], [0]], [[1, 1, 1], [0, 1]], [[1, 1], [0, 1]], [[1, 1, 1, 1], [0, 1]], [[1, 1], [1, 0], -1], [[1, 1, 1], [1, 1, 0], -1], [[1, 1, 1], [1, 0, 0], -1], [[1, 0, 0], [1, 1, 1], [0, 0, 1], [0, 1, 4, 5]], [[1, 1, 1, 1], [0, 1, 0, 0], -1], [[1, 1, 0], [0, 1, 1], [0, 1, 4, 5]], [[1, 1, 1, 1], [1, 0, 0, 0], -1]];
	
	exports.default = pieces.map(function (p, idx) {
	  var piece = {};
	  var last = p.pop();
	  piece.possibleIndexes = last === -1 ? [0, 1, 2, 3, 4, 5, 6, 7] : last;
	  piece.piecesArr = [p];
	  for (var i = 0; i < 3; i++) {
	    piece.piecesArr.push(rotate(piece.piecesArr[i]));
	  }
	  for (var _i = 0; _i < 4; _i++) {
	    piece.piecesArr.push(flip(piece.piecesArr[_i]));
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
	  function Timer($timer, callback) {
	    _classCallCheck(this, Timer);
	
	    this.$timer = $timer;
	    this.init = 60;
	    this.seconds = this.init;
	    this.interval = undefined;
	    this.timeout = undefined;
	    this.callback = callback;
	    this.renderTimer();
	  }
	
	  _createClass(Timer, [{
	    key: "renderTimer",
	    value: function renderTimer() {
	      if (this.seconds === 10) {
	        this.$timer.style.color = "#F00";
	        this.$timer.style.fontSize = "45px";
	      }
	      this.$timer.innerText = this.seconds;
	    }
	  }, {
	    key: "reset",
	    value: function reset(seconds) {
	      this.init = seconds;
	      this.seconds = seconds;
	      this.renderTimer();
	    }
	  }, {
	    key: "tick",
	    value: function tick() {
	      this.seconds--;
	      this.renderTimer();
	      if (this.seconds === 0) {
	        this.stop();
	      }
	    }
	  }, {
	    key: "stop",
	    value: function stop() {
	      window.clearInterval(this.interval);
	      window.clearTimeout(this.timeout);
	      this.seconds = this.init;
	    }
	  }, {
	    key: "start",
	    value: function start(game) {
	      var _this = this;
	
	      this.$timer.style.color = '#000';
	      this.$timer.style.fontSize = "30px";
	      if (game.isPlaying) {
	        this.stop();
	      }
	      this.renderTimer();
	      this.timeout = window.setTimeout(function () {
	        return _this.callback(game);
	      }, this.init * 1000);
	      this.interval = window.setInterval(this.tick.bind(this), 1000);
	    }
	  }]);
	
	  return Timer;
	}();
	
	exports.default = Timer;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var setLevelHandler = function setLevelHandler(game, timer, li, idx) {
	  li.addEventListener('click', function () {
	    if (!game.isPlaying) {
	      document.getElementsByClassName('selected-level')[0].classList.remove('selected-level');
	      li.classList.add('selected-level');
	      game.pieceNum = idx + 4;
	      timer.reset((idx + 1) * 60);
	    }
	  });
	};
	
	var getGridNode = function getGridNode(gridNode) {
	  return Array.from(gridNode.children).map(function (row) {
	    return Array.from(row.children);
	  });
	};
	
	var findLoc = function findLoc(boardNode, cell) {
	  for (var i = 0; i < boardNode.length; i++) {
	    for (var j = 0; j < boardNode[0].length; j++) {
	      if (boardNode[i][j] === cell) {
	        return [i, j];
	      }
	    }
	  }
	};
	
	var disableInteraction = function disableInteraction(game, isWin) {
	  game.isPlaying = false;
	  document.getElementById('rotate').classList.add('hidden');
	  document.getElementById('flip').classList.add('hidden');
	  document.getElementById('levels').classList.remove('hidden');
	  document.querySelectorAll('#board li.filled').forEach(function (cell) {
	    cell.style.cursor = "default";
	    if (!isWin) {
	      cell.style.backgroundColor = "#AAA";
	    }
	  });
	
	  document.querySelectorAll('#pieces li').forEach(function (cell) {
	    if (!isWin) {
	      cell.style.backgroundColor = "#AAA";
	    }
	  });
	
	  document.querySelectorAll('#pieces > *').forEach(function (piece) {
	    piece.style.cursor = "default";
	    piece.setAttribute('draggable', false);
	  });
	};
	
	var dropHandler = function dropHandler(game, boardNode, timer, e) {
	  var placeSound = document.getElementById('place-sound');
	  e.preventDefault();
	  if (e.target.parentNode.classList && e.target.parentNode.classList.contains("dropzone") && game && game.isPlaying && game.pickedCell) {
	    var currentPieceNode = game.pickedCell.parentNode.parentNode;
	    var currentPieceObject = game.pieceMap.get(currentPieceNode);
	    var bLoc = findLoc(boardNode, e.target);
	    var pLoc = findLoc(getGridNode(currentPieceNode), game.pickedCell);
	    var topLeft = [bLoc[0] - pLoc[0], bLoc[1] - pLoc[1]];
	    if (game.board.isValid(currentPieceObject, topLeft)) {
	      game.board.placePiece(currentPieceNode, topLeft);
	      placeSound.play();
	      if (game.board.isWon()) {
	        disableInteraction(game, true);
	        timer.stop();
	      }
	    }
	  }
	};
	
	exports.setLevelHandler = setLevelHandler;
	exports.getGridNode = getGridNode;
	exports.findLoc = findLoc;
	exports.disableInteraction = disableInteraction;
	exports.dropHandler = dropHandler;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map