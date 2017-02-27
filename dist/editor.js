/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _editorObjects = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Editor = function () {
    function Editor() {
        _classCallCheck(this, Editor);

        this.grid = document.createElement('canvas');
        this.gridContext = this.grid.getContext('2d');;
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.hitCanvas = document.createElement('canvas');
        this.hitContext = this.hitCanvas.getContext('2d');
        this.grid.width = '2000';
        this.grid.height = '2000';
        this.canvas.width = '2000';
        this.canvas.height = '2000';
        this.hitCanvas.width = '2000';
        this.hitCanvas.height = '2000';
        this.grid.style.position = 'absolute';
        this.canvas.style.position = 'relative';
        this.canvas.style.zIndex = '2';
        this.gridSize = 16;
        this.gridScale = 2;
        this.tool = 'select';
        this.snap = false;
        this.sectors = [];
        this.selectedSector = null;
        this.hoverPoint = null;
        this.dragging = null;
        this.startDrag = {
            x: 0,
            y: 0
        };

        document.getElementsByClassName('editor-container')[0].appendChild(this.grid);
        document.getElementsByClassName('editor-container')[0].appendChild(this.canvas);
        document.getElementById('select').checked = 'true';

        this.drawGrid();
        this.bindMouse();
        this.update();
    }

    _createClass(Editor, [{
        key: 'bindMouse',
        value: function bindMouse() {
            var _this = this;

            this.canvas.onclick = function (event) {
                if (_this.tool == 'wall') {
                    _this.drawWall(event);
                }
            };
            this.canvas.onmousedown = function (event) {
                if (_this.tool == 'select') {
                    _this.selectObject(event);
                }
            };
            this.canvas.onmouseup = function () {
                _this.dragging = null;
            };
            this.canvas.onmousemove = function (event) {
                var x = event.offsetX / _this.gridScale;
                var y = event.offsetY / _this.gridScale;

                if (_this.snap) {
                    x = Math.round(x / _this.gridSize) * _this.gridSize;
                    y = Math.round(y / _this.gridSize) * _this.gridSize;
                }

                if (_this.tool == 'wall') {
                    if (_this.selectedSector) {
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                            for (var _iterator = _this.selectedSector.nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var n = _step.value;

                                if (x < n.x + _this.gridSize && x > n.x - _this.gridSize && y < n.y + _this.gridSize && y > n.y - _this.gridSize) {
                                    x = n.x;
                                    y = n.y;
                                }
                            }
                        } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }
                            } finally {
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                        }
                    }

                    _this.hoverPoint = {
                        x: x,
                        y: y
                    };
                } else if (_this.tool == 'select') {
                    if (_this.dragging) {
                        if (_this.dragging.type() == 'node') {
                            _this.dragging.x = x;
                            _this.dragging.y = y;
                        } else if (_this.dragging.type() == 'sector') {
                            var xOffset = x - _this.startDrag.x;
                            var yOffset = y - _this.startDrag.y;

                            var _iteratorNormalCompletion2 = true;
                            var _didIteratorError2 = false;
                            var _iteratorError2 = undefined;

                            try {
                                for (var _iterator2 = _this.dragging.nodes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                    var node = _step2.value;

                                    node.x += xOffset;
                                    node.y += yOffset;
                                }
                            } catch (err) {
                                _didIteratorError2 = true;
                                _iteratorError2 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                        _iterator2.return();
                                    }
                                } finally {
                                    if (_didIteratorError2) {
                                        throw _iteratorError2;
                                    }
                                }
                            }

                            _this.startDrag.x = x;
                            _this.startDrag.y = y;
                        }
                    }
                }
            };
            this.canvas.onmouseleave = function (event) {
                _this.hoverPoint = null;
            };
        }
    }, {
        key: 'selectObject',
        value: function selectObject(event) {
            var x = event.offsetX / this.gridScale;
            var y = event.offsetY / this.gridScale;
            var hitObject = null;

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.sectors[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var sector = _step3.value;
                    var _iteratorNormalCompletion4 = true;
                    var _didIteratorError4 = false;
                    var _iteratorError4 = undefined;

                    try {
                        for (var _iterator4 = sector.nodes[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                            var _node = _step4.value;

                            this.hitContext.clearRect(0, 0, this.hitCanvas.width, this.hitCanvas.height);
                            this.hitContext.beginPath();
                            this.hitContext.rect(_node.x * this.gridScale - 4, _node.y * this.gridScale - 4, 8, 8);
                            if (this.hitContext.isPointInPath(x * this.gridScale, y * this.gridScale)) {
                                hitObject = _node;
                                break;
                            }
                            this.hitContext.closePath();
                        }
                    } catch (err) {
                        _didIteratorError4 = true;
                        _iteratorError4 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                _iterator4.return();
                            }
                        } finally {
                            if (_didIteratorError4) {
                                throw _iteratorError4;
                            }
                        }
                    }

                    if (!hitObject) {
                        this.hitContext.clearRect(0, 0, this.hitCanvas.width, this.hitCanvas.height);
                        this.hitContext.beginPath();
                        var _iteratorNormalCompletion5 = true;
                        var _didIteratorError5 = false;
                        var _iteratorError5 = undefined;

                        try {
                            for (var _iterator5 = sector.nodes[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                                var node = _step5.value;

                                this.hitContext.lineTo(node.x * this.gridScale, node.y * this.gridScale);
                            }
                        } catch (err) {
                            _didIteratorError5 = true;
                            _iteratorError5 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                                    _iterator5.return();
                                }
                            } finally {
                                if (_didIteratorError5) {
                                    throw _iteratorError5;
                                }
                            }
                        }

                        if (this.hitContext.isPointInPath(x * this.gridScale, y * this.gridScale)) {
                            hitObject = sector;
                            break;
                        }
                        this.hitContext.closePath();
                    }
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            if (hitObject) {
                this.dragging = hitObject;
                this.startDrag.x = x;
                this.startDrag.y = y;
            } else {
                this.startDrag = {
                    x: 0,
                    y: 0
                };
            }
            console.log(hitObject);
        }
    }, {
        key: 'drawWall',
        value: function drawWall(event) {
            var x = event.offsetX / this.gridScale;
            var y = event.offsetY / this.gridScale;

            if (!this.selectedSector) {
                var sector = new _editorObjects.Sector();
                this.selectedSector = sector;
                this.sectors.push(sector);
            }

            var addNode = true;
            if (this.snap) {
                x = Math.round(x / this.gridSize) * this.gridSize;
                y = Math.round(y / this.gridSize) * this.gridSize;
            }

            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
                for (var _iterator6 = this.selectedSector.nodes[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var n = _step6.value;

                    if (x < n.x + this.gridSize && x > n.x - this.gridSize && y < n.y + this.gridSize && y > n.y - this.gridSize) {
                        this.selectedSector.closed = true;
                        this.selectedSector = null;
                        addNode = false;
                    }
                }
            } catch (err) {
                _didIteratorError6 = true;
                _iteratorError6 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
                        _iterator6.return();
                    }
                } finally {
                    if (_didIteratorError6) {
                        throw _iteratorError6;
                    }
                }
            }

            if (addNode) {
                var node = new _editorObjects.Node(x, y);
                this.selectedSector.add(node);
            }
        }
    }, {
        key: 'drawGrid',
        value: function drawGrid() {
            var gridSize = this.gridSize * this.gridScale;
            this.gridContext.strokeStyle = '#2c3e50';

            this.gridContext.clearRect(0, 0, this.grid.width, this.grid.height);
            var columns = this.grid.width / gridSize;
            var rows = this.grid.height / gridSize;
            this.gridContext.beginPath();
            for (var i = 0; i < columns; i++) {
                this.gridContext.moveTo(i * gridSize, 0);
                this.gridContext.lineTo(i * gridSize, this.grid.height);
            }
            for (var _i = 0; _i < rows; _i++) {
                this.gridContext.moveTo(0, _i * gridSize);
                this.gridContext.lineTo(this.grid.width, _i * gridSize);
            }
            this.gridContext.stroke();
            this.gridContext.closePath();
        }
    }, {
        key: 'changeTool',
        value: function changeTool(tool) {
            this.tool = tool;
        }
    }, {
        key: 'toggleSnap',
        value: function toggleSnap(event) {
            this.snap = event.target.checked;
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }, {
        key: 'drawSectors',
        value: function drawSectors() {
            var _iteratorNormalCompletion7 = true;
            var _didIteratorError7 = false;
            var _iteratorError7 = undefined;

            try {
                for (var _iterator7 = this.sectors[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                    var sector = _step7.value;

                    this.context.beginPath();
                    if (sector.closed) {
                        this.context.strokeStyle = '#eee';
                        this.context.fillStyle = '#51F5EA';
                    } else {
                        this.context.strokeStyle = '#f39c12';
                        this.context.fillStyle = '#f39c12';
                    }
                    var _iteratorNormalCompletion8 = true;
                    var _didIteratorError8 = false;
                    var _iteratorError8 = undefined;

                    try {
                        for (var _iterator8 = sector.nodes[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                            var node = _step8.value;

                            this.context.lineTo(node.x * this.gridScale, node.y * this.gridScale);
                            this.context.fillRect(node.x * this.gridScale - 4, node.y * this.gridScale - 4, 8, 8);
                        }
                    } catch (err) {
                        _didIteratorError8 = true;
                        _iteratorError8 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion8 && _iterator8.return) {
                                _iterator8.return();
                            }
                        } finally {
                            if (_didIteratorError8) {
                                throw _iteratorError8;
                            }
                        }
                    }

                    if (sector.closed) {
                        this.context.lineTo(sector.nodes[0].x * this.gridScale, sector.nodes[0].y * this.gridScale);
                        this.context.fillStyle = 'rgba(0,0,0,0.2)';
                        this.context.fill();
                    }
                    this.context.stroke();
                    this.context.closePath();
                }
            } catch (err) {
                _didIteratorError7 = true;
                _iteratorError7 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion7 && _iterator7.return) {
                        _iterator7.return();
                    }
                } finally {
                    if (_didIteratorError7) {
                        throw _iteratorError7;
                    }
                }
            }
        }
    }, {
        key: 'save',
        value: function save() {
            var json = {
                hello: 'world',
                something: 'else'
            };
            var file = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(json));
            var filename = prompt("Enter Filename", "level1");
            if (filename) {
                var downloadAnchor = document.getElementById('download');
                downloadAnchor.setAttribute('href', file);
                downloadAnchor.setAttribute('download', filename + '.json');
                downloadAnchor.click();
            }
        }
    }, {
        key: 'drawTools',
        value: function drawTools() {
            if (this.hoverPoint) {
                this.context.fillStyle = '#fff';
                this.context.fillRect(this.hoverPoint.x * this.gridScale - 4, this.hoverPoint.y * this.gridScale - 4, 8, 8);
            }
        }
    }, {
        key: 'update',
        value: function update() {
            var _this2 = this;

            this.clear();
            this.drawSectors();
            this.drawTools();

            window.requestAnimationFrame(function () {
                return _this2.update();
            });
        }
    }]);

    return Editor;
}();

window.Editor = Editor;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var nodeId = 0;
var sectorId = 0;

var Node = exports.Node = function () {
    function Node(x, y) {
        _classCallCheck(this, Node);

        this.id = nodeId++;
        this.x = x;
        this.y = y;
    }

    _createClass(Node, [{
        key: 'type',
        value: function type() {
            return 'node';
        }
    }]);

    return Node;
}();

var Sector = exports.Sector = function () {
    function Sector() {
        var nodes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        _classCallCheck(this, Sector);

        this.id = sectorId++;
        this.nodes = nodes;
        this.closed = false;
    }

    _createClass(Sector, [{
        key: 'type',
        value: function type() {
            return 'sector';
        }
    }, {
        key: 'add',
        value: function add(node) {
            this.nodes.push(node);
        }
    }]);

    return Sector;
}();

/***/ })
/******/ ]);