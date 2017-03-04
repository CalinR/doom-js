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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.nearPlane = 300;

/**
 * STANDARD CAMERA
 * above view camera
 */

var Camera = exports.Camera = function () {
    function Camera() {
        var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
        var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;

        _classCallCheck(this, Camera);

        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = width;
        this.canvas.height = height;

        document.body.appendChild(this.canvas);
    }

    _createClass(Camera, [{
        key: 'clear',
        value: function clear() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }, {
        key: 'render',
        value: function render(map) {
            this.clear();
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = map.sectors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var sector = _step.value;
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = sector.linedefs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var linedef = _step2.value;

                            this.context.beginPath();
                            this.context.moveTo(linedef.vertices[0].x, linedef.vertices[0].y);
                            this.context.lineTo(linedef.vertices[1].x, linedef.vertices[1].y);
                            this.context.stroke();
                            this.context.closePath();
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
        }
    }]);

    return Camera;
}();

/**
 * FOLLOWCAMERA
 * above view camera that follows player position
 */


var FollowCamera = exports.FollowCamera = function (_Camera) {
    _inherits(FollowCamera, _Camera);

    function FollowCamera(width, height) {
        var x = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var y = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
        var rotation = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

        _classCallCheck(this, FollowCamera);

        var _this = _possibleConstructorReturn(this, (FollowCamera.__proto__ || Object.getPrototypeOf(FollowCamera)).call(this, width, height));

        _this.x = x;
        _this.y = y;
        _this.rotation = rotation;
        return _this;
    }

    _createClass(FollowCamera, [{
        key: 'transformVertex',
        value: function transformVertex(point) {
            var originX = this.canvas.width / 2;
            var originY = this.canvas.height / 2;
            var px = point.x - this.x;
            var py = point.y - this.y;

            var ty = px * Math.cos(this.radians) + py * Math.sin(this.radians);
            var tx = px * Math.sin(this.radians) - py * Math.cos(this.radians);

            return {
                x: originX - tx,
                y: originY - ty
            };
        }
    }, {
        key: 'render',
        value: function render(map) {
            this.clear();
            var originX = this.canvas.width / 2;
            var originY = this.canvas.height / 2;

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = map.sectors[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var sector = _step3.value;
                    var _iteratorNormalCompletion4 = true;
                    var _didIteratorError4 = false;
                    var _iteratorError4 = undefined;

                    try {
                        for (var _iterator4 = sector.linedefs[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                            var linedef = _step4.value;

                            this.context.beginPath();
                            var vertex1 = this.transformVertex(linedef.vertices[0]);
                            var vertex2 = this.transformVertex(linedef.vertices[1]);

                            if (vertex1.y < originY || vertex2.y < originY) {
                                if (vertex1.y > originY) {
                                    var xDiff = vertex1.x - vertex2.x;
                                    var yDiff = vertex1.y - vertex2.y;
                                    var slope = xDiff / yDiff;
                                    var clipY = originY - vertex2.y;
                                    vertex1.y = originY;
                                    vertex1.x = vertex2.x + clipY * slope;
                                }
                                if (vertex2.y > originY) {
                                    var _xDiff = vertex2.x - vertex1.x;
                                    var _yDiff = vertex2.y - vertex1.y;
                                    var _slope = _xDiff / _yDiff;
                                    var _clipY = originY - vertex1.y;
                                    vertex2.y = originY;
                                    vertex2.x = vertex1.x + _clipY * _slope;
                                }

                                this.context.moveTo(vertex1.x, vertex1.y);
                                this.context.lineTo(vertex2.x, vertex2.y);
                                this.context.stroke();
                                this.context.closePath();
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
    }, {
        key: 'radians',
        get: function get() {
            return this.rotation * Math.PI / 180;
        },
        set: function set(radians) {
            this.rotation = radians * 180 / Math.PI;
        }
    }]);

    return FollowCamera;
}(Camera);

/**
 * PERSPECTIVE CAMERA
 * camera that shows player's perspective in 3d
 */


var PerspectiveCamera = exports.PerspectiveCamera = function (_Camera2) {
    _inherits(PerspectiveCamera, _Camera2);

    function PerspectiveCamera(width, height) {
        var x = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var z = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
        var rotation = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

        _classCallCheck(this, PerspectiveCamera);

        var _this2 = _possibleConstructorReturn(this, (PerspectiveCamera.__proto__ || Object.getPrototypeOf(PerspectiveCamera)).call(this, width, height));

        _this2.x = x;
        _this2.z = z;
        _this2.rotation = rotation;
        _this2.aspect = width / height;
        _this2.nearPlane = height / (2 / _this2.aspect); // This is some crappy math to always force a 90 degree FOV
        _this2.drawCache = [];
        return _this2;
    }

    _createClass(PerspectiveCamera, [{
        key: 'transformVertex',
        value: function transformVertex(point) {
            var originX = this.canvas.width / 2;
            var originY = this.canvas.height / 2;
            var px = point.x - this.x;
            var py = point.y - this.y;

            var ty = px * Math.cos(this.radians) + py * Math.sin(this.radians);
            var tx = px * Math.sin(this.radians) - py * Math.cos(this.radians);

            return {
                x: tx,
                y: ty
            };
        }
    }, {
        key: 'projectVertex',
        value: function projectVertex(vertex, height) {
            var originX = this.canvas.width / 2;
            var originY = this.canvas.height / 2;
            var r = window.nearPlane / vertex.y;

            return {
                x: -(vertex.x * r) + originX,
                y: -((height - 10) * r) + originY,
                z: vertex.y
            };
        }
    }, {
        key: 'render',
        value: function render(map) {
            var originX = this.canvas.width / 2;
            var originY = this.canvas.height / 2;
            this.drawCache = [];

            this.clear();

            this.drawSector(map, 0);

            // for(let sector of map.sectors){
            //     let floorHeight = sector.floorHeight;
            //     let ceilingHeight = sector.ceilingHeight;
            //     for(let linedef of sector.linedefs){
            //         if(linedef.leftSidedef){
            //             let point1 = this.transformVertex(linedef.vertices[0]);
            //             let point2 = this.transformVertex(linedef.vertices[1]);
            //             let color = linedef.leftSidedef;

            //             if(point1.y > 0 || point2.y > 0){
            //                 if(point1.y<0){
            //                     let xDiff = point1.x - point2.x;
            //                     let yDiff = point1.y - point2.y;
            //                     let slope = xDiff / yDiff;
            //                     let clipY = point2.y;
            //                     point1.y = 1;
            //                     point1.x = point2.x - point2.y * slope;
            //                 }
            //                 if(point2.y<0){
            //                     let xDiff = point1.x - point2.x;
            //                     let yDiff = point1.y - point2.y;
            //                     let slope = xDiff / yDiff;
            //                     point2.y = 1;
            //                     point2.x = point1.x - point1.y * slope;
            //                 }

            //                 let vertex1 = this.projectVertex(point1, floorHeight);
            //                 let vertex2 = this.projectVertex(point2, floorHeight);
            //                 let vertex3 = this.projectVertex(point2, ceilingHeight);
            //                 let vertex4 = this.projectVertex(point1, ceilingHeight);

            //                 this.context.beginPath();
            //                 this.context.strokeStyle = '#000';
            //                 this.context.fillStyle = color;
            //                 this.context.moveTo(vertex1.x, vertex1.y);
            //                 this.context.lineTo(vertex2.x, vertex2.y);
            //                 this.context.lineTo(vertex3.x, vertex3.y);
            //                 this.context.lineTo(vertex4.x, vertex4.y);
            //                 this.context.lineTo(vertex1.x, vertex1.y);
            //                 this.context.stroke();
            //                 this.context.fill();
            //                 this.context.closePath();
            //             }
            //         }
            //     }
            // }
        }
    }, {
        key: 'drawSector',
        value: function drawSector(map, index) {
            var sector = map.sectors[index];

            if (sector) {
                var floorHeight = sector.floorHeight;
                var ceilingHeight = sector.ceilingHeight;
                var _iteratorNormalCompletion5 = true;
                var _didIteratorError5 = false;
                var _iteratorError5 = undefined;

                try {
                    for (var _iterator5 = sector.linedefs[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                        var linedef = _step5.value;

                        if (linedef.leftSidedef) {
                            var point1 = this.transformVertex(linedef.vertices[0]);
                            var point2 = this.transformVertex(linedef.vertices[1]);
                            var color = linedef.leftSidedef;

                            if (point1.y > 0 || point2.y > 0) {
                                if (point1.y < 0) {
                                    var xDiff = point1.x - point2.x;
                                    var yDiff = point1.y - point2.y;
                                    var slope = xDiff / yDiff;
                                    var clipY = point2.y;
                                    point1.y = 1;
                                    point1.x = point2.x - point2.y * slope;
                                }
                                if (point2.y < 0) {
                                    var _xDiff2 = point1.x - point2.x;
                                    var _yDiff2 = point1.y - point2.y;
                                    var _slope2 = _xDiff2 / _yDiff2;
                                    point2.y = 1;
                                    point2.x = point1.x - point1.y * _slope2;
                                }

                                var vertex1 = this.projectVertex(point1, floorHeight);
                                var vertex2 = this.projectVertex(point2, floorHeight);
                                var vertex3 = this.projectVertex(point2, ceilingHeight);
                                var vertex4 = this.projectVertex(point1, ceilingHeight);

                                if ((vertex1.x > 0 || vertex2.x > 0) && (vertex1.x < this.canvas.width || vertex2.x < this.canvas.width)) {
                                    var left = 0;
                                    var right = 0;
                                    var startHeight = 0;
                                    var endHeight = 0;
                                    var startY = 0;

                                    if (vertex1.x < vertex2.x) {
                                        left = Math.floor(vertex1.x);
                                        right = Math.ceil(vertex2.x);
                                        startHeight = vertex1.y - vertex4.y;
                                        endHeight = vertex2.y - vertex3.y;
                                        startY = vertex4.y;
                                    } else {
                                        left = Math.floor(vertex2.x);
                                        right = Math.ceil(vertex1.x);
                                        startHeight = vertex2.y - vertex3.y;
                                        endHeight = vertex1.y - vertex4.y;
                                        startY = vertex3.y;
                                    }
                                    var columns = right - left;
                                    var heightDiff = (startHeight - endHeight) / columns;
                                    this.context.fillStyle = color;

                                    for (var i = 0; i < columns; i++) {
                                        if (left + i >= 0 && left + i <= this.canvas.width) {
                                            var yDecrease = heightDiff * i;
                                            this.context.fillRect(left + i, startY + yDecrease / 2, 1, startHeight - yDecrease);
                                        }
                                    }

                                    this.context.beginPath();
                                    this.context.strokeStyle = '#000';
                                    this.context.moveTo(vertex1.x, vertex1.y);
                                    this.context.lineTo(vertex2.x, vertex2.y);
                                    this.context.lineTo(vertex3.x, vertex3.y);
                                    this.context.lineTo(vertex4.x, vertex4.y);
                                    this.context.lineTo(vertex1.x, vertex1.y);
                                    this.context.stroke();
                                    this.context.closePath();
                                }
                            }
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

                var newIndex = index + 1;
                this.drawSector(map, newIndex);

                // console.log(this.drawCache);

                // setTimeout(() => {
                //     let newIndex = index + 1;
                //     this.drawSector(map, newIndex);
                // }, 5000)
            }
        }
    }, {
        key: 'radians',
        get: function get() {
            return this.rotation * Math.PI / 180;
        },
        set: function set(radians) {
            this.rotation = radians * 180 / Math.PI;
        }
    }]);

    return PerspectiveCamera;
}(Camera);

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _gameObject = __webpack_require__(4);

var _gameObject2 = _interopRequireDefault(_gameObject);

var _keys = __webpack_require__(5);

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Player = function (_GameObject) {
    _inherits(Player, _GameObject);

    function Player() {
        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var rotation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, Player);

        var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, x, y, rotation));

        _this.speed = 0;
        _this.direction = 0;
        _this.moveSpeed = 75;
        _this.rotationSpeed = 90;
        _this.bindControls();
        return _this;
    }

    _createClass(Player, [{
        key: 'bindControls',
        value: function bindControls() {
            var _this2 = this;

            document.onkeydown = function (e) {
                e.preventDefault();
                var key = e.keyCode ? e.keyCode : e.which;

                switch (key) {
                    case _keys2.default.up:
                        // Up arrow
                        _this2.speed = 1;
                        break;
                    case _keys2.default.down:
                        // Down arrow
                        _this2.speed = -1;
                        break;
                    case _keys2.default.left:
                        // Left arrow
                        _this2.direction = -1;
                        break;
                    case _keys2.default.right:
                        // Right arrow
                        _this2.direction = 1;
                        break;
                }
            };

            document.onkeyup = function (e) {
                e.preventDefault();
                var key = e.keyCode ? e.keyCode : e.which;

                switch (key) {
                    case _keys2.default.up:
                        // Up arrow
                        _this2.speed = 0;
                        break;
                    case _keys2.default.down:
                        // Down arrow
                        _this2.speed = 0;
                        break;
                    case _keys2.default.left:
                        // Left arrow
                        _this2.direction = 0;
                        break;
                    case _keys2.default.right:
                        // Right arrow
                        _this2.direction = 0;
                        break;
                }
            };
        }
    }, {
        key: 'update',
        value: function update() {
            this.rotation += this.direction * this.rotationSpeed * window.deltaTime;

            if (this.rotation > 360) {
                this.rotation = 0;
            } else if (this.rotation < 0) {
                this.rotation += 360;
            }

            var moveStep = this.speed * this.moveSpeed;

            var moveX = Math.cos(this.radians) * moveStep;
            var moveY = Math.sin(this.radians) * moveStep;

            var newX = this.x + moveX * window.deltaTime;
            var newY = this.y + moveY * window.deltaTime;

            this.x = newX;
            this.y = newY;
        }
    }]);

    return Player;
}(_gameObject2.default);

exports.default = Player;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = {
	"sectors": [
		{
			"id": 0,
			"linedefs": [
				{
					"id": 0,
					"startVertex": {
						"id": 0,
						"x": 16,
						"y": 32
					},
					"endVertex": {
						"id": 1,
						"x": 16,
						"y": 64
					},
					"leftSidedef": "#cccccc",
					"rightSidedef": "#cccccc"
				},
				{
					"id": 1,
					"startVertex": {
						"id": 1,
						"x": 16,
						"y": 64
					},
					"endVertex": {
						"id": 2,
						"x": 32,
						"y": 80
					},
					"leftSidedef": "#cccccc",
					"rightSidedef": "#cccccc"
				},
				{
					"id": 2,
					"startVertex": {
						"id": 2,
						"x": 32,
						"y": 80
					},
					"endVertex": {
						"id": 3,
						"x": 64,
						"y": 80
					},
					"leftSidedef": "#cccccc",
					"rightSidedef": "#cccccc"
				},
				{
					"id": 3,
					"startVertex": {
						"id": 3,
						"x": 64,
						"y": 80
					},
					"endVertex": {
						"id": 4,
						"x": 80,
						"y": 64
					},
					"leftSidedef": "#cccccc",
					"rightSidedef": "#cccccc"
				},
				{
					"id": 4,
					"startVertex": {
						"id": 4,
						"x": 80,
						"y": 64
					},
					"endVertex": {
						"id": 5,
						"x": 80,
						"y": 32
					},
					"leftSidedef": null,
					"rightSidedef": null
				},
				{
					"id": 5,
					"startVertex": {
						"id": 5,
						"x": 80,
						"y": 32
					},
					"endVertex": {
						"id": 6,
						"x": 64,
						"y": 16
					},
					"leftSidedef": "#cccccc",
					"rightSidedef": "#cccccc"
				},
				{
					"id": 6,
					"startVertex": {
						"id": 6,
						"x": 64,
						"y": 16
					},
					"endVertex": {
						"id": 7,
						"x": 32,
						"y": 16
					},
					"leftSidedef": "#cccccc",
					"rightSidedef": "#cccccc"
				},
				{
					"id": 7,
					"startVertex": {
						"id": 7,
						"x": 32,
						"y": 16
					},
					"endVertex": {
						"id": 0,
						"x": 16,
						"y": 32
					},
					"leftSidedef": "#cccccc",
					"rightSidedef": "#cccccc"
				}
			],
			"floorHeight": 0,
			"ceilingHeight": 20
		},
		{
			"id": 1,
			"linedefs": [
				{
					"id": 8,
					"startVertex": {
						"id": 5,
						"x": 80,
						"y": 32
					},
					"endVertex": {
						"id": 8,
						"x": 144,
						"y": 32
					},
					"leftSidedef": "#cccccc",
					"rightSidedef": "#cccccc"
				},
				{
					"id": 9,
					"startVertex": {
						"id": 8,
						"x": 144,
						"y": 32
					},
					"endVertex": {
						"id": 9,
						"x": 112,
						"y": 64
					},
					"leftSidedef": null,
					"rightSidedef": null
				},
				{
					"id": 10,
					"startVertex": {
						"id": 9,
						"x": 112,
						"y": 64
					},
					"endVertex": {
						"id": 4,
						"x": 80,
						"y": 64
					},
					"leftSidedef": "#cccccc",
					"rightSidedef": "#cccccc"
				},
				{
					"id": 4,
					"startVertex": {
						"id": 4,
						"x": 80,
						"y": 64
					},
					"endVertex": {
						"id": 5,
						"x": 80,
						"y": 32
					},
					"leftSidedef": null,
					"rightSidedef": null
				}
			],
			"floorHeight": 0,
			"ceilingHeight": 20
		},
		{
			"id": 2,
			"linedefs": [
				{
					"id": 11,
					"startVertex": {
						"id": 8,
						"x": 144,
						"y": 32
					},
					"endVertex": {
						"id": 10,
						"x": 144,
						"y": 96
					},
					"leftSidedef": "#cccccc",
					"rightSidedef": "#cccccc"
				},
				{
					"id": 12,
					"startVertex": {
						"id": 10,
						"x": 144,
						"y": 96
					},
					"endVertex": {
						"id": 11,
						"x": 112,
						"y": 96
					},
					"leftSidedef": "#cccccc",
					"rightSidedef": "#cccccc"
				},
				{
					"id": 13,
					"startVertex": {
						"id": 11,
						"x": 112,
						"y": 96
					},
					"endVertex": {
						"id": 9,
						"x": 112,
						"y": 64
					},
					"leftSidedef": "#cccccc",
					"rightSidedef": "#cccccc"
				},
				{
					"id": 9,
					"startVertex": {
						"id": 8,
						"x": 144,
						"y": 32
					},
					"endVertex": {
						"id": 9,
						"x": 112,
						"y": 64
					},
					"leftSidedef": null,
					"rightSidedef": null
				}
			],
			"floorHeight": 0,
			"ceilingHeight": 20
		}
	],
	"things": [
		{
			"id": 0,
			"x": 48.5,
			"y": 48.5,
			"sprite": "PLAY",
			"type": "player_starts",
			"hex": "1"
		}
	]
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameObject = function () {
    function GameObject(x, y, rotation) {
        var _this = this;

        _classCallCheck(this, GameObject);

        this.x = x;
        this.y = y;
        this.rotation = rotation;

        setTimeout(function () {
            _this.updateLoop();
        }, 100);
    }

    _createClass(GameObject, [{
        key: "update",
        value: function update() {}
    }, {
        key: "updateLoop",
        value: function updateLoop() {
            var _this2 = this;

            this.update();
            window.requestAnimationFrame(function () {
                return _this2.updateLoop();
            });
        }
    }, {
        key: "radians",
        get: function get() {
            return this.rotation * Math.PI / 180;
        },
        set: function set(radians) {
            this.rotation = radians * 180 / Math.PI;
        }
    }]);

    return GameObject;
}();

exports.default = GameObject;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var keys = {
    up: 38,
    down: 40,
    left: 37,
    right: 39
};

exports.default = keys;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
// import { map1 } from './map1'


var _player = __webpack_require__(2);

var _player2 = _interopRequireDefault(_player);

var _map = __webpack_require__(3);

var _map2 = _interopRequireDefault(_map);

var _jsonToMap = __webpack_require__(8);

var _jsonToMap2 = _interopRequireDefault(_jsonToMap);

var _camera = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Main = function () {
    function Main() {
        _classCallCheck(this, Main);

        window.deltaTime = 0;
        window.lastUpdate = Date.now();
        this.camera = new _camera.Camera(300, 300);
        this.followCamera = new _camera.FollowCamera(300, 300);
        this.perspectiveCamera = new _camera.PerspectiveCamera(600, 600, 0, 0, 0);
        this.player = new _player2.default(0, 200, 0);
        this.map = (0, _jsonToMap2.default)(_map2.default);
        this.setupThings();
        this.gameLoop();
    }

    _createClass(Main, [{
        key: 'updateDeltaTime',
        value: function updateDeltaTime() {
            var currentFrameTime = Date.now();
            window.deltaTime = (currentFrameTime - window.lastUpdate) / 1000.0; // Convert delta time from milliseconds to seconds
            window.lastUpdate = currentFrameTime;
        }
    }, {
        key: 'setupThings',
        value: function setupThings() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.map.things[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var thing = _step.value;

                    switch (thing.hex) {
                        case '1':
                            this.player.x = thing.x;
                            this.player.y = thing.y;
                            break;
                    }
                    console.log(thing);
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
    }, {
        key: 'gameLoop',
        value: function gameLoop() {
            var _this = this;

            this.updateDeltaTime();

            // Draw Moving Player
            this.camera.render(this.map);
            this.camera.context.save();
            this.camera.context.translate(this.player.x, this.player.y);
            this.camera.context.rotate(this.player.radians);
            this.camera.context.fillRect(-2, -2, 4, 4);
            this.camera.context.fillStyle = 'red';
            this.camera.context.fillRect(2, -1, 8, 2);
            this.camera.context.restore();

            // Draw Stationary Player
            this.followCamera.x = this.player.x;
            this.followCamera.y = this.player.y;
            this.followCamera.rotation = this.player.rotation;
            this.followCamera.render(this.map);
            this.followCamera.context.save();
            this.followCamera.context.translate(this.followCamera.canvas.width / 2, this.followCamera.canvas.height / 2);
            this.followCamera.context.fillRect(-2, -2, 4, 4);
            this.followCamera.context.fillStyle = 'red';
            this.followCamera.context.fillRect(-1, -10, 2, 8);
            this.followCamera.context.restore();

            // Draw Player 3d Perspective
            this.perspectiveCamera.x = this.player.x;
            this.perspectiveCamera.y = this.player.y;
            this.perspectiveCamera.rotation = this.player.rotation;
            this.perspectiveCamera.render(this.map);

            window.requestAnimationFrame(function () {
                return _this.gameLoop();
            });
        }
    }]);

    return Main;
}();

window.game = new Main();

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var sectorId = 0;
var lineDefId = 0;
var vertexId = 0;
var vertex3Id = 0;

window.sectors = [];
window.linedefs = [];
window.vertices = [];

var Sector = exports.Sector = function Sector(linedefs) {
    var floorHeight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var ceilingHeight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
    var id = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : sectorId++;

    _classCallCheck(this, Sector);

    this.id = id;
    this.linedefs = linedefs;
    this.floorHeight = floorHeight;
    this.ceilingHeight = ceilingHeight;
    window.sectors.push(this);
};

var LineDef = exports.LineDef = function LineDef(vectors) {
    var leftSidedef = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '#ccc';
    var rightSidedef = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '#ccc';
    var id = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : lineDefId++;

    _classCallCheck(this, LineDef);

    this.id = id;
    this.vertices = vectors;
    this.leftSidedef = leftSidedef;
    this.rightSidedef = rightSidedef;
    window.linedefs.push(this);
};

var Vertex = exports.Vertex = function Vertex(x, y) {
    var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : vertexId++;

    _classCallCheck(this, Vertex);

    this.id = id;
    this.x = x;
    this.y = y;
    window.vertices.push(this);
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _objects = __webpack_require__(7);

var _thing = __webpack_require__(9);

var _thing2 = _interopRequireDefault(_thing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var JsonToMap = function JsonToMap(json) {
    var map = {
        sectors: [],
        things: []
    };
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = json.sectors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var sector = _step.value;

            var linedefs = [];
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = sector.linedefs[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var linedef = _step3.value;

                    var currentLinedef = null;
                    var _iteratorNormalCompletion4 = true;
                    var _didIteratorError4 = false;
                    var _iteratorError4 = undefined;

                    try {
                        for (var _iterator4 = window.linedefs[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                            var l = _step4.value;

                            if (l.id == linedef.id) {
                                currentLinedef = l;
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

                    if (!currentLinedef) {
                        var startVertex = new _objects.Vertex(linedef.startVertex.x, linedef.startVertex.y, linedef.startVertex.id);
                        var endVertex = new _objects.Vertex(linedef.endVertex.x, linedef.endVertex.y, linedef.endVertex.id);
                        currentLinedef = new _objects.LineDef([startVertex, endVertex], linedef.leftSidedef, linedef.rightSidedef, linedef.id);
                    }
                    linedefs.push(currentLinedef);
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

            var currentSector = new _objects.Sector(linedefs, sector.floorHeight, sector.ceilingHeight, sector.id);
            map.sectors.push(currentSector);
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

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = json.things[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var thing = _step2.value;

            map.things.push(new _thing2.default(thing.x, thing.y, thing.sprite, thing.type, thing.hex, thing.id));
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

    return map;
};

exports.default = JsonToMap;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.things = [];

var Thing = function () {
    function Thing(x, y) {
        var sprite = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var type = arguments[3];
        var hex = arguments[4];
        var id = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : window.things.length;

        _classCallCheck(this, Thing);

        this.id = id;
        this.x = x;
        this.y = y;
        this.hex = hex;
        this.sprite = sprite;
        this.thingType = type;
        window.things.push(this);
    }

    _createClass(Thing, [{
        key: 'type',
        value: function type() {
            return 'thing';
        }
    }]);

    return Thing;
}();

exports.default = Thing;

/***/ })
/******/ ]);