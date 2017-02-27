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
        this.verticesToAdd = [];
        this.hoveredVertex = null;

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
                // if(this.tool == 'select'){
                //     this.selectObject(event);
                // }
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
                    _this.hoveredVertex = null;
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = _this.sectors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var sector = _step.value;
                            var _iteratorNormalCompletion2 = true;
                            var _didIteratorError2 = false;
                            var _iteratorError2 = undefined;

                            try {
                                for (var _iterator2 = sector.linedefs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                    var linedef = _step2.value;

                                    var vertices = [linedef.startVertex, linedef.endVertex];
                                    var _iteratorNormalCompletion3 = true;
                                    var _didIteratorError3 = false;
                                    var _iteratorError3 = undefined;

                                    try {
                                        for (var _iterator3 = vertices[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                            var vertex = _step3.value;

                                            if (x < vertex.x + _this.gridSize && x > vertex.x - _this.gridSize && y < vertex.y + _this.gridSize && y > vertex.y - _this.gridSize) {
                                                x = vertex.x;
                                                y = vertex.y;
                                                _this.hoveredVertex = vertex;
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

                    _this.hoverPoint = { x: x, y: y };
                }

                // if(this.tool == 'wall'){
                //     if(this.selectedSector){
                //         for(let n of this.selectedSector.vertices){
                //             if(x < n.x + this.gridSize && x > n.x - this.gridSize && y < n.y + this.gridSize && y > n.y -this.gridSize){
                //                 x = n.x;
                //                 y = n.y;
                //             }
                //         }
                //     }

                //     this.hoverPoint = {
                //         x: x,
                //         y: y
                //     }
                // }
                // else if(this.tool == 'select'){
                //     if(this.dragging){
                //         if(this.dragging.type() == 'node'){
                //             this.dragging.x = x;
                //             this.dragging.y = y;
                //         }
                //         else if(this.dragging.type() == 'sector') {
                //             let xOffset = x - this.startDrag.x;
                //             let yOffset = y - this.startDrag.y;

                //             for(let node of this.dragging.nodes){
                //                 node.x += xOffset;
                //                 node.y += yOffset;
                //             }
                //             this.startDrag.x = x;
                //             this.startDrag.y = y;
                //         }
                //     }
                // }
            };
            this.canvas.onmouseleave = function (event) {
                _this.hoverPoint = null;
            };
        }
    }, {
        key: 'selectObject',
        value: function selectObject(event) {
            // let x = event.offsetX / this.gridScale;
            // let y = event.offsetY / this.gridScale;
            // let hitObject = null;

            // for(let sector of this.sectors){
            //     for(let vertex of sector.vertices){
            //         this.hitContext.clearRect(0, 0, this.hitCanvas.width, this.hitCanvas.height);
            //         this.hitContext.beginPath();
            //         this.hitContext.rect((vertex.x * this.gridScale) - 4, (vertex.y * this.gridScale) - 4, 8, 8);
            //         if(this.hitContext.isPointInPath(x * this.gridScale, y * this.gridScale)){
            //             hitObject = vertex;
            //             break;
            //         }
            //         this.hitContext.closePath();
            //     }

            //     if(!hitObject){
            //         this.hitContext.clearRect(0, 0, this.hitCanvas.width, this.hitCanvas.height);
            //         this.hitContext.beginPath();
            //         for(let vertex of sector.vertices){
            //             this.hitContext.lineTo(vertex.x * this.gridScale, vertex.y * this.gridScale);
            //         }
            //         if(this.hitContext.isPointInPath(x * this.gridScale, y * this.gridScale)){
            //             hitObject = sector;
            //             break;
            //         }
            //         this.hitContext.closePath();
            //     }
            // }

            // if(hitObject){
            //     this.dragging = hitObject;
            //     this.startDrag.x = x;
            //     this.startDrag.y = y;
            // }
            // else {
            //     this.startDrag = {
            //         x: 0,
            //         y: 0
            //     }
            // }
            // console.log(hitObject);
        }
    }, {
        key: 'drawWall',
        value: function drawWall(event) {
            var x = this.hoverPoint.x;
            var y = this.hoverPoint.y;

            if (!this.selectedSector) {
                var sector = new _editorObjects.Sector();
                this.selectedSector = sector;
                this.sectors.push(sector);
            }

            var addVertex = true;
            var vertex = null;

            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = this.selectedSector.linedefs[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var _linedef2 = _step4.value;

                    var startVertex = _linedef2.startVertex;
                    var endVertex = _linedef2.endVertex;

                    if (x < startVertex.x + this.gridSize && x > startVertex.x - this.gridSize && y < startVertex.y + this.gridSize && y > startVertex.y - this.gridSize) {
                        addVertex = false;
                        vertex = startVertex;
                    } else if (x < endVertex.x + this.gridSize && x > endVertex.x - this.gridSize && y < endVertex.y + this.gridSize && y > endVertex.y - this.gridSize) {
                        addVertex = false;
                        vertex = endVertex;
                    }
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

            var foundLineDef = false;
            if (this.verticesToAdd.length > 1) {
                var lastVertex = this.verticesToAdd[this.verticesToAdd.length - 1];
                var _iteratorNormalCompletion5 = true;
                var _didIteratorError5 = false;
                var _iteratorError5 = undefined;

                try {
                    for (var _iterator5 = window.linedefs[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                        var linedef = _step5.value;

                        var startMatch = this.checkMatch(linedef.startVertex, { x: x, y: y }, lastVertex);
                        var endMatch = this.checkMatch(linedef.endVertex, { x: x, y: y }, lastVertex);
                        if (startMatch && endMatch) {
                            foundLineDef = true;
                            this.selectedSector.add(linedef);
                            if (linedef.startVertex.x == x && linedef.startVertex.y == y) {
                                vertex = linedef.startVertex;
                                this.verticesToAdd.push(vertex);
                                addVertex = false;
                            } else if (linedef.endVertex.x == x && linedef.endVertex.y == y) {
                                vertex = linedef.endVertex;
                                this.verticesToAdd.push(vertex);
                                addVertex = false;
                            }
                            break;
                        }
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
            }

            if (!foundLineDef) {
                if (addVertex) {
                    vertex = new _editorObjects.Vertex(x, y);
                }

                this.verticesToAdd.push(vertex);

                if (this.verticesToAdd.length > 1) {
                    var _lastVertex = this.verticesToAdd[this.verticesToAdd.length - 2];
                    var _linedef = new _editorObjects.LineDef(_lastVertex, vertex);
                    this.selectedSector.add(_linedef);
                }
            }

            if (x == this.verticesToAdd[0].x && y == this.verticesToAdd[0].y && this.verticesToAdd.length > 1) {
                this.selectedSector.closed = true;
                this.verticesToAdd = [];
                this.selectedSector = null;
            }
        }
    }, {
        key: 'checkMatch',
        value: function checkMatch(haystack, needle1, needle2) {
            if (haystack.x == needle1.x && haystack.y == needle1.y) {
                return true;
            } else if (haystack.x == needle2.x && haystack.y == needle2.y) {
                return true;
            }
            return false;
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
            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
                for (var _iterator6 = this.sectors[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var sector = _step6.value;


                    if (sector.closed) {
                        this.context.beginPath();
                        for (var i = 0; i < sector.linedefs.length; i++) {
                            var linedef = sector.linedefs[i];
                            if (i == 0) {
                                this.context.moveTo(linedef.startVertex.x * this.gridScale, linedef.startVertex.y * this.gridScale);
                                this.context.lineTo(linedef.endVertex.x * this.gridScale, linedef.endVertex.y * this.gridScale);
                            } else {
                                this.context.lineTo(linedef.endVertex.x * this.gridScale, linedef.endVertex.y * this.gridScale);
                            }
                        }
                        this.context.fillStyle = 'rgba(0,0,0,0.2)';
                        this.context.fill();
                        this.context.closePath();

                        for (var _i2 = 0; _i2 < sector.linedefs.length; _i2++) {
                            this.context.beginPath();
                            var _linedef3 = sector.linedefs[_i2];
                            this.context.fillStyle = '#51F5EA';
                            if (_linedef3.parents.length == 1) {
                                this.context.strokeStyle = '#fff';
                                this.context.lineWidth = 2;
                            } else {
                                this.context.lineWidth = 1;
                                this.context.strokeStyle = 'rgba(255,255,255,0.2)';
                            }
                            this.context.moveTo(_linedef3.startVertex.x * this.gridScale, _linedef3.startVertex.y * this.gridScale);
                            this.context.lineTo(_linedef3.endVertex.x * this.gridScale, _linedef3.endVertex.y * this.gridScale);
                            this.context.stroke();
                            this.context.fillRect(_linedef3.startVertex.x * this.gridScale - 6, _linedef3.startVertex.y * this.gridScale - 6, 12, 12);
                            this.context.fillRect(_linedef3.endVertex.x * this.gridScale - 6, _linedef3.endVertex.y * this.gridScale - 6, 12, 12);
                            this.context.closePath();
                        }
                    } else {
                        this.context.beginPath();
                        this.context.strokeStyle = '#f39c12';
                        this.context.fillStyle = '#f39c12';
                        this.context.lineWidth = 2;
                        var _iteratorNormalCompletion7 = true;
                        var _didIteratorError7 = false;
                        var _iteratorError7 = undefined;

                        try {
                            for (var _iterator7 = this.verticesToAdd[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                                var vertex = _step7.value;

                                this.context.lineTo(vertex.x * this.gridScale, vertex.y * this.gridScale);
                                this.context.fillRect(vertex.x * this.gridScale - 4, vertex.y * this.gridScale - 4, 8, 8);
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

                        this.context.stroke();
                        this.context.closePath();
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

var vertexId = 0;
var sectorId = 0;
var linedefId = 0;

window.sectors = [];
window.linedefs = [];
window.vertices = [];

window.sharedLineDefs = function () {
    var shared = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = window.linedefs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var linedef = _step.value;

            if (linedef.parents.length > 1) {
                shared.push(linedef);
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

    return shared;
};

var Vertex = exports.Vertex = function () {
    function Vertex(x, y) {
        var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : vertexId++;

        _classCallCheck(this, Vertex);

        this.id = id;
        this.parents = [];
        this.x = x;
        this.y = y;
        window.vertices.push(this);
    }

    _createClass(Vertex, [{
        key: 'type',
        value: function type() {
            return 'vertex';
        }
    }]);

    return Vertex;
}();

var LineDef = exports.LineDef = function () {
    function LineDef(startVertex, endVertex) {
        var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : linedefId++;

        _classCallCheck(this, LineDef);

        this.id = id;
        this.parents = [];
        startVertex.parents.push(this);
        endVertex.parents.push(this);
        this.startVertex = startVertex;
        this.endVertex = endVertex;
        window.linedefs.push(this);
    }

    _createClass(LineDef, [{
        key: 'type',
        value: function type() {
            return 'linedef';
        }
    }, {
        key: 'twoSided',
        get: function get() {
            return this.parents.length > 1;
        }
    }]);

    return LineDef;
}();

var Sector = exports.Sector = function () {
    function Sector() {
        var linedefs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var closed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : sectorId++;

        _classCallCheck(this, Sector);

        this.id = id;
        this.linedefs = linedefs;
        this.closed = closed;
        window.sectors.push(this);
    }

    _createClass(Sector, [{
        key: 'type',
        value: function type() {
            return 'sector';
        }
    }, {
        key: 'add',
        value: function add(linedef) {
            linedef.parents.push(this);
            this.linedefs.push(linedef);
        }
    }]);

    return Sector;
}();

/***/ })
/******/ ]);