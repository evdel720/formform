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
	
	var _piece = __webpack_require__(1);
	
	var _piece2 = _interopRequireDefault(_piece);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	document.addEventListener('DOMContentLoaded', function () {
	  var p = new _piece2.default();
	  console.log(p.currentPiece());
	  console.log(_piece2.default.getBorderLength(p.currentPiece()));
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _piece_array = __webpack_require__(2);
	
	var _piece_array2 = _interopRequireDefault(_piece_array);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// prepopulate all the pieces in piece_array.js
	
	var neighbors = [[-1, 0], [1, 0], [0, -1], [0, 1]];
	
	var Piece = function () {
	  function Piece() {
	    _classCallCheck(this, Piece);
	
	    this.piece = _piece_array2.default[Math.floor(Math.random() * _piece_array2.default.length)];
	    this.idx = 0;
	    this.flipped = false;
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
	  }], [{
	    key: 'getBorderLength',
	    value: function getBorderLength(pieceArr) {
	      // returns the piece's length of border
	      var len = 0;
	      for (var i = 0; i < pieceArr.length; i++) {
	        for (var j = 0; j < pieceArr[0].length; j++) {
	          if (pieceArr[i][j] === 1) {
	            for (var n = 0; n < 4; n++) {
	              var _neighbors$n = _slicedToArray(neighbors[n], 2),
	                  x = _neighbors$n[0],
	                  y = _neighbors$n[1];
	
	              if (pieceArr[x + i] && pieceArr[x + i][y + j] === 1) {
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
	
	  return Piece;
	}();
	
	exports.default = Piece;

/***/ },
/* 2 */
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

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map