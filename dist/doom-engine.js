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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _player = __webpack_require__(8);

var _player2 = _interopRequireDefault(_player);

var _map = __webpack_require__(12);

var _camera = __webpack_require__(13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Main = function () {
    function Main() {
        _classCallCheck(this, Main);

        window.deltaTime = 0;
        window.lastUpdate = Date.now();
        this.camera = new _camera.Camera(300, 300);
        this.followCamera = new _camera.FollowCamera(300, 300);
        this.player = new _player2.default(150, 150);
        this.map = _map.map1;
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

            window.requestAnimationFrame(function () {
                return _this.gameLoop();
            });
        }
    }]);

    return Main;
}();

new Main();

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _gameObject = __webpack_require__(10);

var _gameObject2 = _interopRequireDefault(_gameObject);

var _keys = __webpack_require__(11);

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
        _this.moveSpeed = 50;
        _this.rotationSpeed = 90;
        _this.bindControls();
        return _this;
    }

    _createClass(Player, [{
        key: 'bindControls',
        value: function bindControls() {
            var _this2 = this;

            document.onkeydown = function (e) {
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector2 = function Vector2(x, y) {
    _classCallCheck(this, Vector2);

    this.x = x || 0;
    this.y = y || 0;
};

exports.default = Vector2;

/***/ }),
/* 10 */
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
/* 11 */
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.map1 = undefined;

var _vector = __webpack_require__(9);

var _vector2 = _interopRequireDefault(_vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var map1 = exports.map1 = [new _vector2.default(20, 70), new _vector2.default(70, 70), new _vector2.default(70, 90)];

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
            this.context.beginPath();
            for (var i = 0; i < map.length; i++) {
                var point = map[i];

                if (i == 0) {
                    this.context.moveTo(point.x, point.y);
                } else {
                    this.context.lineTo(point.x, point.y);
                }
            }
            this.context.stroke();
            this.context.closePath();
        }
    }]);

    return Camera;
}();

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
        key: 'render',
        value: function render(map) {
            var originX = this.canvas.width / 2;
            var originY = this.canvas.height / 2;
            this.clear();
            this.context.beginPath();
            for (var i = 0; i < map.length; i++) {
                var point = map[i];
                var transformedPoint = this.transformVertex(point);
                if (i == 0) {
                    this.context.moveTo(originX - transformedPoint.x, originY - transformedPoint.y);
                } else {
                    this.context.lineTo(originX - transformedPoint.x, originY - transformedPoint.y);
                }
            }
            this.context.stroke();
            this.context.closePath();
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

/***/ })
/******/ ]);