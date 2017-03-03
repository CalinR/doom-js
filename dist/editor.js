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
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var modalId = 0;

var Modal = function () {
    function Modal() {
        var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Heading';
        var templateInner = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '<h2>Content</h2>';

        _classCallCheck(this, Modal);

        this.id = modalId++;
        this.title = title;
        this._templateInner = templateInner;
        this._template = '<div class="modal-container">\n            <div class="modal-background"></div>\n            <div class="modal">\n                <div class="modal-header">' + this.title + '</div>\n                <div class="modal-body">' + this.templateInner + '</div>\n                <div class="modal-footer"><button class="modal-cancel btn">Cancel</button><button class="modal-okay btn">Okay</button></div>\n            </div>\n        </div>';
        this._visible = false;
        this.domElement = document.createElement('div');
        this.domElement.setAttribute('id', 'modal-' + this.id);
        document.body.appendChild(this.domElement);
        this.html = null;
        this.generateHTML();
        this.render();
    }

    _createClass(Modal, [{
        key: 'closeModal',
        value: function closeModal() {
            this.visible = false;
        }
    }, {
        key: 'generateHTML',
        value: function generateHTML() {
            this.domElement.innerHTML = '<div class="modal-container">\n            <div class="modal-background"></div>\n            <div class="modal">\n                <div class="modal-header">' + this.title + '</div>\n                <div class="modal-body">' + this.templateInner + '</div>\n                <div class="modal-footer"><button class="modal-cancel btn">Cancel</button><button class="modal-okay btn">Okay</button></div>\n            </div>\n        </div>';
            this.bindActions();
        }
    }, {
        key: 'bindActions',
        value: function bindActions() {
            var _this = this;

            this.domElement.getElementsByClassName('modal-cancel')[0].onclick = function (event) {
                _this.visible = false;
            };
            this.domElement.getElementsByClassName('modal-okay')[0].onclick = function (event) {
                _this.save();
            };
        }
    }, {
        key: 'save',
        value: function save() {
            this.visible = false;
        }
    }, {
        key: 'render',
        value: function render() {
            this.domElement.style.display = this.visible ? '' : 'none';
        }
    }, {
        key: 'visible',
        set: function set(value) {
            this._visible = value;
            this.render();
        },
        get: function get() {
            return this._visible;
        }
    }, {
        key: 'templateInner',
        set: function set(value) {
            this._templateInner = value;
            this.generateHTML();
        },
        get: function get() {
            return this._templateInner;
        }
    }, {
        key: 'template',
        set: function set(value) {
            this._template = value;
            this.generateHTML();
        },
        get: function get() {
            return this._template;
        }
    }]);

    return Modal;
}();

exports.default = Modal;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.sectors = [];
window.linedefs = [];
window.vertices = [];

// let vertexId = window.vertices.length;
// let sectorId = window.sectors.length;
// let linedefId = window.linedefs.length;

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

var ClearMap = exports.ClearMap = function ClearMap() {
    // vertexId = 0;
    // sectorId = 0;
    // linedefId = 0;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = window.vertices[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var vertex = _step2.value;

            vertex.parents = [];
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

    window.vertices = [];
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = window.linedefs[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var linedef = _step3.value;

            linedef.parents = [];
            linedef.startVertex = null;
            linedef.endVertex = null;
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

    window.linedefs = [];
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
        for (var _iterator4 = window.sectors[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var sector = _step4.value;

            sector.linedefs = [];
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

    window.sectors = [];
};

var Vertex = exports.Vertex = function () {
    function Vertex(x, y) {
        var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window.vertices.length;

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
    }, {
        key: 'toString',
        value: function toString() {
            return 'Vertex';
        }
    }]);

    return Vertex;
}();

var LineDef = exports.LineDef = function () {
    function LineDef(startVertex, endVertex) {
        var leftSidedef = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '#cccccc';
        var rightSidedef = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '#cccccc';
        var id = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : window.linedefs.length;

        _classCallCheck(this, LineDef);

        this.id = id;
        this.parents = [];
        startVertex.parents.push(this);
        endVertex.parents.push(this);
        this.startVertex = startVertex;
        this.endVertex = endVertex;
        this.leftSidedef = leftSidedef;
        this.rightSidedef = rightSidedef;
        window.linedefs.push(this);
    }

    _createClass(LineDef, [{
        key: 'checkMatch',
        value: function checkMatch(match1, match2) {
            var found_match = false;
            if (this.startVertex.x == match1.x && this.startVertex.y == match1.y || this.endVertex.x == match1.x && this.endVertex.y == match1.y) {
                found_match = true;
            }
            if (this.startVertex.x == match2.x && this.startVertex.y == match2.y || this.endVertex.x == match2.x && this.endVertex.y == match2.y) {
                if (found_match) {
                    if (this.startVertex.x == match1.x && this.startVertex.y == match1.y) {
                        return this.startVertex;
                    } else {
                        return this.endVertex;
                    }
                }
            }

            return false;
        }
    }, {
        key: 'type',
        value: function type() {
            return 'linedef';
        }
    }, {
        key: 'toString',
        value: function toString() {
            return 'Linedef';
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
        var floorHeight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var ceilingHeight = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 20;
        var id = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : window.sectors.length;

        _classCallCheck(this, Sector);

        this.id = id;
        this.linedefs = linedefs;
        this.closed = closed;
        this.floorHeight = floorHeight;
        this.ceilingHeight = ceilingHeight;
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
            for (var _iterator5 = linedefs[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                var linedef = _step5.value;

                linedef.parents.push(this);
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
    }, {
        key: 'toString',
        value: function toString() {
            return 'Sector';
        }
    }]);

    return Sector;
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _modal = __webpack_require__(0);

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LinedefModal = function (_Modal) {
    _inherits(LinedefModal, _Modal);

    function LinedefModal() {
        _classCallCheck(this, LinedefModal);

        var _this = _possibleConstructorReturn(this, (LinedefModal.__proto__ || Object.getPrototypeOf(LinedefModal)).call(this, 'Edit Linedef'));

        _this.linedef = null;
        return _this;
    }

    _createClass(LinedefModal, [{
        key: 'changeLinedef',
        value: function changeLinedef(linedef) {
            this.linedef = linedef;
            this.templateInner = '<div class="input-row">\n            <label for="left_sidedef">Left Sidedef</label>\n            <input type="text" name="left_sidedef" class="left-sidedef" id="left_sidedef" value="' + this.linedef.leftSidedef + '" />\n        </div>';

            if (this.linedef.parents.length > 1) {
                this.templateInner += '<div class="input-row">\n                <label for="right_sidedef">Right Sidedef</label>\n                <input type="text" name="right_sidedef" class="right-sidedef" id="right_sidedef" value="' + this.linedef.rightSidedef + '" />\n            </div>';
            }
            this.visible = true;
        }
    }, {
        key: 'save',
        value: function save() {
            this.linedef.leftSidedef = this.domElement.getElementsByClassName('left-sidedef')[0].value;
            if (this.linedef.parents.length > 1) {
                this.linedef.rightSidedef = this.domElement.getElementsByClassName('right-sidedef')[0].value;
            } else {
                this.linedef.rightSidedef = null;
            }
            _get(LinedefModal.prototype.__proto__ || Object.getPrototypeOf(LinedefModal.prototype), 'save', this).call(this);
        }
    }]);

    return LinedefModal;
}(_modal2.default);

exports.default = LinedefModal;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _modal = __webpack_require__(0);

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SectorModal = function (_Modal) {
    _inherits(SectorModal, _Modal);

    function SectorModal() {
        _classCallCheck(this, SectorModal);

        var _this = _possibleConstructorReturn(this, (SectorModal.__proto__ || Object.getPrototypeOf(SectorModal)).call(this, 'Edit Sector'));

        _this.sector = null;
        return _this;
    }

    _createClass(SectorModal, [{
        key: 'changeSector',
        value: function changeSector(sector) {
            this.sector = sector;
            this.templateInner = '<div class="input-row">\n            <label for="floor">Floor Height</label>\n            <input type="text" name="floor_height" class="floor-height" id="floor" value="' + this.sector.floorHeight + '" />\n        </div>\n        <div class="input-row">\n            <label for="ceiling">Ceiling Height</label>\n            <input type="text" name="ceiling_height" class="ceiling-height" id="ceiling" value="' + this.sector.ceilingHeight + '" />\n        </div>';
            this.visible = true;
        }
    }, {
        key: 'save',
        value: function save() {
            this.sector.floorHeight = this.domElement.getElementsByClassName('floor-height')[0].value;
            this.sector.ceilingHeight = this.domElement.getElementsByClassName('ceiling-height')[0].value;
            _get(SectorModal.prototype.__proto__ || Object.getPrototypeOf(SectorModal.prototype), 'save', this).call(this);
        }
    }]);

    return SectorModal;
}(_modal2.default);

exports.default = SectorModal;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _editorObjects = __webpack_require__(1);

var _modal = __webpack_require__(0);

var _modal2 = _interopRequireDefault(_modal);

var _sectorModal = __webpack_require__(3);

var _sectorModal2 = _interopRequireDefault(_sectorModal);

var _linedefModal = __webpack_require__(2);

var _linedefModal2 = _interopRequireDefault(_linedefModal);

var _editableMap = __webpack_require__(7);

var _editableMap2 = _interopRequireDefault(_editableMap);

var _thingSelector = __webpack_require__(8);

var _thingSelector2 = _interopRequireDefault(_thingSelector);

var _thing = __webpack_require__(10);

var _thing2 = _interopRequireDefault(_thing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        this.sectorModal = new _sectorModal2.default();
        this.linedefModal = new _linedefModal2.default();
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
        this._tool = 'select';
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
        this._selectedObject = null;
        this.ui = {
            edit: document.getElementById('edit'),
            editButton: document.getElementById('edit-button'),
            thingContainer: document.getElementById('thing-container')
        };
        this.thingSelector = new _thingSelector2.default(document.getElementById('thing-selector'));
        this.things = [];

        document.getElementsByClassName('editor-container')[0].appendChild(this.grid);
        document.getElementsByClassName('editor-container')[0].appendChild(this.canvas);
        document.getElementById('select').checked = 'true';

        this.drawGrid();
        this.bindMouse();
        this.update();
        this.updateUI();
    }

    _createClass(Editor, [{
        key: 'bindMouse',
        value: function bindMouse() {
            var _this = this;

            this.canvas.onclick = function (event) {
                if (_this.tool == 'wall') {
                    _this.drawWall(event);
                } else if (_this.tool == 'select') {
                    _this.selectObject(event);
                } else if (_this.tool == 'thing') {
                    _this.placeThing(event);
                }
            };
            this.canvas.onmousedown = function (event) {
                if (_this.tool == 'select') {
                    _this.dragObject(event);
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
                } else if (_this.tool == 'select') {
                    if (_this.dragging) {
                        if (_this.dragging.type() == 'vertex') {
                            _this.dragging.x = x;
                            _this.dragging.y = y;
                        }
                        if (_this.dragging.type() == 'thing') {
                            _this.dragging.x = x;
                            _this.dragging.y = y;
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
            var iconSize = 16 * this.gridScale;

            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = this.things[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var thing = _step4.value;

                    this.hitContext.beginPath();
                    this.hitContext.arc(thing.x * this.gridScale, thing.y * this.gridScale, iconSize / 2, 0, 2 * Math.PI);
                    this.hitContext.fill();
                    this.hitContext.closePath();
                    var _hitData2 = this.hitContext.getImageData(x * this.gridScale, y * this.gridScale, 1, 1).data;
                    if (_hitData2[0] != 0 || _hitData2[1] != 0 || _hitData2[2] != 0 || _hitData2[3] != 0) {
                        hitObject = thing;
                        break;
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

            if (!hitObject) {
                var _iteratorNormalCompletion5 = true;
                var _didIteratorError5 = false;
                var _iteratorError5 = undefined;

                try {
                    for (var _iterator5 = this.sectors[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                        var sector = _step5.value;
                        var _iteratorNormalCompletion6 = true;
                        var _didIteratorError6 = false;
                        var _iteratorError6 = undefined;

                        try {
                            for (var _iterator6 = sector.linedefs[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                                var _linedef2 = _step6.value;

                                this.hitContext.clearRect(0, 0, this.hitCanvas.width, this.hitCanvas.height);
                                this.hitContext.beginPath();
                                this.hitContext.strokeStyle = 'blue';
                                this.hitContext.moveTo(_linedef2.startVertex.x * this.gridScale, _linedef2.startVertex.y * this.gridScale);
                                this.hitContext.lineTo(_linedef2.endVertex.x * this.gridScale, _linedef2.endVertex.y * this.gridScale);
                                this.hitContext.lineWidth = 12;
                                this.hitContext.stroke();
                                this.hitContext.closePath();
                                this.hitContext.clearRect(_linedef2.startVertex.x * this.gridScale - 4, _linedef2.startVertex.y * this.gridScale - 4, 8, 8);
                                this.hitContext.clearRect(_linedef2.endVertex.x * this.gridScale - 4, _linedef2.endVertex.y * this.gridScale - 4, 8, 8);
                                var _hitData = this.hitContext.getImageData(x * this.gridScale, y * this.gridScale, 1, 1).data;
                                if (_hitData[0] != 0 || _hitData[1] != 0 || _hitData[2] != 0 || _hitData[3] != 0) {
                                    hitObject = _linedef2;
                                    break;
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

                        if (!hitObject) {
                            this.hitContext.beginPath();
                            for (var i = 0; i < sector.linedefs.length; i++) {
                                var linedef = sector.linedefs[i];

                                if (i == 0) {
                                    this.hitContext.moveTo(linedef.startVertex.x * this.gridScale, linedef.startVertex.y * this.gridScale);
                                    this.hitContext.lineTo(linedef.endVertex.x * this.gridScale, linedef.endVertex.y * this.gridScale);
                                } else {
                                    this.hitContext.lineTo(linedef.endVertex.x * this.gridScale, linedef.endVertex.y * this.gridScale);
                                }
                            }
                            this.hitContext.fill();
                            for (var _i = 0; _i < sector.linedefs.length; _i++) {
                                var _linedef = sector.linedefs[_i];
                                this.hitContext.clearRect(_linedef.startVertex.x * this.gridScale - 4, _linedef.startVertex.y * this.gridScale - 4, 8, 8);
                                this.hitContext.clearRect(_linedef.endVertex.x * this.gridScale - 4, _linedef.endVertex.y * this.gridScale - 4, 8, 8);
                            }
                            var hitData = this.hitContext.getImageData(x * this.gridScale, y * this.gridScale, 1, 1).data;
                            if (hitData[0] != 0 || hitData[1] != 0 || hitData[2] != 0 || hitData[3] != 0) {
                                hitObject = sector;
                                break;
                            }
                            this.hitContext.closePath();
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

            this.selectedObject = hitObject;
        }
    }, {
        key: 'dragObject',
        value: function dragObject(event) {
            var x = event.offsetX / this.gridScale;
            var y = event.offsetY / this.gridScale;
            var hitObject = null;
            var iconSize = 16 * this.gridScale;

            var _iteratorNormalCompletion7 = true;
            var _didIteratorError7 = false;
            var _iteratorError7 = undefined;

            try {
                for (var _iterator7 = this.things[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                    var thing = _step7.value;

                    this.hitContext.clearRect(0, 0, this.hitCanvas.width, this.hitCanvas.height);
                    this.hitContext.beginPath();
                    this.hitContext.arc(thing.x * this.gridScale, thing.y * this.gridScale, iconSize / 2, 0, 2 * Math.PI);
                    if (this.hitContext.isPointInPath(x * this.gridScale, y * this.gridScale)) {
                        hitObject = thing;
                        break;
                    }
                    this.hitContext.closePath();
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

            if (!hitObject) {
                var _iteratorNormalCompletion8 = true;
                var _didIteratorError8 = false;
                var _iteratorError8 = undefined;

                try {
                    for (var _iterator8 = this.sectors[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                        var sector = _step8.value;
                        var _iteratorNormalCompletion9 = true;
                        var _didIteratorError9 = false;
                        var _iteratorError9 = undefined;

                        try {
                            for (var _iterator9 = sector.linedefs[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                                var linedef = _step9.value;

                                this.hitContext.clearRect(0, 0, this.hitCanvas.width, this.hitCanvas.height);
                                this.hitContext.beginPath();
                                this.hitContext.rect(linedef.startVertex.x * this.gridScale - 4, linedef.startVertex.y * this.gridScale - 4, 8, 8);
                                if (this.hitContext.isPointInPath(x * this.gridScale, y * this.gridScale)) {
                                    hitObject = linedef.startVertex;
                                    break;
                                }
                                this.hitContext.closePath();

                                this.hitContext.beginPath();
                                this.hitContext.rect(linedef.endVertex.x * this.gridScale - 4, linedef.endVertex.y * this.gridScale - 4, 8, 8);
                                if (this.hitContext.isPointInPath(x * this.gridScale, y * this.gridScale)) {
                                    hitObject = linedef.endVertex;
                                    break;
                                }
                                this.hitContext.closePath();
                            }
                        } catch (err) {
                            _didIteratorError9 = true;
                            _iteratorError9 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion9 && _iterator9.return) {
                                    _iterator9.return();
                                }
                            } finally {
                                if (_didIteratorError9) {
                                    throw _iteratorError9;
                                }
                            }
                        }
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

            var _iteratorNormalCompletion10 = true;
            var _didIteratorError10 = false;
            var _iteratorError10 = undefined;

            try {
                for (var _iterator10 = this.selectedSector.linedefs[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                    var _linedef4 = _step10.value;

                    var startVertex = _linedef4.startVertex;
                    var endVertex = _linedef4.endVertex;

                    if (x < startVertex.x + this.gridSize && x > startVertex.x - this.gridSize && y < startVertex.y + this.gridSize && y > startVertex.y - this.gridSize) {
                        addVertex = false;
                        vertex = startVertex;
                    } else if (x < endVertex.x + this.gridSize && x > endVertex.x - this.gridSize && y < endVertex.y + this.gridSize && y > endVertex.y - this.gridSize) {
                        addVertex = false;
                        vertex = endVertex;
                    }
                }
            } catch (err) {
                _didIteratorError10 = true;
                _iteratorError10 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion10 && _iterator10.return) {
                        _iterator10.return();
                    }
                } finally {
                    if (_didIteratorError10) {
                        throw _iteratorError10;
                    }
                }
            }

            var foundLineDef = false;
            if (this.verticesToAdd.length > 1) {
                var lastVertex = this.verticesToAdd[this.verticesToAdd.length - 1];
                var _iteratorNormalCompletion11 = true;
                var _didIteratorError11 = false;
                var _iteratorError11 = undefined;

                try {
                    for (var _iterator11 = window.linedefs[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                        var linedef = _step11.value;

                        var match = linedef.checkMatch({ x: x, y: y }, lastVertex);
                        if (match) {
                            foundLineDef = true;
                            this.selectedSector.add(linedef);
                            vertex = match;
                            this.verticesToAdd.push(match);
                            addVertex = false;
                            break;
                        }
                    }
                } catch (err) {
                    _didIteratorError11 = true;
                    _iteratorError11 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion11 && _iterator11.return) {
                            _iterator11.return();
                        }
                    } finally {
                        if (_didIteratorError11) {
                            throw _iteratorError11;
                        }
                    }
                }
            }

            if (!foundLineDef) {
                if (addVertex) {
                    var foundVertex = false;
                    var _iteratorNormalCompletion12 = true;
                    var _didIteratorError12 = false;
                    var _iteratorError12 = undefined;

                    try {
                        for (var _iterator12 = window.vertices[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
                            var v = _step12.value;

                            if (v.x == x && v.y == y) {
                                foundVertex = v;
                            }
                        }
                    } catch (err) {
                        _didIteratorError12 = true;
                        _iteratorError12 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion12 && _iterator12.return) {
                                _iterator12.return();
                            }
                        } finally {
                            if (_didIteratorError12) {
                                throw _iteratorError12;
                            }
                        }
                    }

                    if (foundVertex) {
                        vertex = foundVertex;
                    } else {
                        vertex = new _editorObjects.Vertex(x, y);
                    }
                }

                this.verticesToAdd.push(vertex);

                if (this.verticesToAdd.length > 1) {
                    var _lastVertex = this.verticesToAdd[this.verticesToAdd.length - 2];
                    var _linedef3 = new _editorObjects.LineDef(_lastVertex, vertex);
                    this.selectedSector.add(_linedef3);
                }
            }

            if (x == this.verticesToAdd[0].x && y == this.verticesToAdd[0].y && this.verticesToAdd.length > 1) {
                this.selectedSector.closed = true;
                this.verticesToAdd = [];
                this.selectedSector = null;
            }
        }
    }, {
        key: 'placeThing',
        value: function placeThing(event) {
            var x = event.offsetX / this.gridScale;
            var y = event.offsetY / this.gridScale;
            var thing = this.thingSelector.selection;
            if (thing) {
                var newThing = new _thing2.default(x, y, thing.sprite, thing.type, thing.hex);
                this.things.push(newThing);
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
            for (var _i2 = 0; _i2 < rows; _i2++) {
                this.gridContext.moveTo(0, _i2 * gridSize);
                this.gridContext.lineTo(this.grid.width, _i2 * gridSize);
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
            var _iteratorNormalCompletion13 = true;
            var _didIteratorError13 = false;
            var _iteratorError13 = undefined;

            try {
                for (var _iterator13 = this.sectors[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
                    var sector = _step13.value;

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

                        for (var _i3 = 0; _i3 < sector.linedefs.length; _i3++) {
                            this.context.beginPath();
                            var _linedef5 = sector.linedefs[_i3];
                            this.context.fillStyle = '#51F5EA';
                            if (_linedef5.parents.length == 1) {
                                this.context.strokeStyle = '#fff';
                                this.context.lineWidth = 2;
                            } else {
                                this.context.lineWidth = 1;
                                this.context.strokeStyle = 'rgba(255,255,255,0.2)';
                            }
                            this.context.moveTo(_linedef5.startVertex.x * this.gridScale, _linedef5.startVertex.y * this.gridScale);
                            this.context.lineTo(_linedef5.endVertex.x * this.gridScale, _linedef5.endVertex.y * this.gridScale);
                            this.context.stroke();
                            if (this.tool != 'thing') {
                                this.context.fillRect(_linedef5.startVertex.x * this.gridScale - 6, _linedef5.startVertex.y * this.gridScale - 6, 12, 12);
                                this.context.fillRect(_linedef5.endVertex.x * this.gridScale - 6, _linedef5.endVertex.y * this.gridScale - 6, 12, 12);
                            }
                            this.context.closePath();
                        }
                    } else {
                        this.context.beginPath();
                        this.context.strokeStyle = '#f39c12';
                        this.context.fillStyle = '#f39c12';
                        this.context.lineWidth = 2;
                        var _iteratorNormalCompletion14 = true;
                        var _didIteratorError14 = false;
                        var _iteratorError14 = undefined;

                        try {
                            for (var _iterator14 = this.verticesToAdd[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
                                var vertex = _step14.value;

                                this.context.lineTo(vertex.x * this.gridScale, vertex.y * this.gridScale);
                                this.context.fillRect(vertex.x * this.gridScale - 4, vertex.y * this.gridScale - 4, 8, 8);
                            }
                        } catch (err) {
                            _didIteratorError14 = true;
                            _iteratorError14 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion14 && _iterator14.return) {
                                    _iterator14.return();
                                }
                            } finally {
                                if (_didIteratorError14) {
                                    throw _iteratorError14;
                                }
                            }
                        }

                        this.context.stroke();
                        this.context.closePath();
                    }
                }
            } catch (err) {
                _didIteratorError13 = true;
                _iteratorError13 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion13 && _iterator13.return) {
                        _iterator13.return();
                    }
                } finally {
                    if (_didIteratorError13) {
                        throw _iteratorError13;
                    }
                }
            }
        }
    }, {
        key: 'save',
        value: function save() {
            var json = _editableMap2.default.toJSON(this.sectors, this.things);
            var file = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(json, null, '\t'));
            var filename = prompt("Enter Filename", "level1");
            if (filename) {
                var downloadAnchor = document.getElementById('download');
                downloadAnchor.setAttribute('href', file);
                downloadAnchor.setAttribute('download', filename + '.json');
                downloadAnchor.click();
            }
        }
    }, {
        key: 'load',
        value: function load(event) {
            var _this2 = this;

            var reader = new FileReader();
            reader.onload = function (e) {
                (0, _editorObjects.ClearMap)();
                _this2.things = [];
                window.things = [];
                var json = JSON.parse(e.target.result);
                json = _editableMap2.default.fromJSON(json);
                _this2.sectors = json.sectors;
                _this2.things = json.things;
            };
            reader.readAsText(event.target.files[0]);
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
        key: 'edit',
        value: function edit() {
            var editType = this.selectedObject ? this.selectedObject.type() : null;
            if (editType == 'sector') {
                this.sectorModal.changeSector(this.selectedObject);
            } else if (editType == 'linedef') {
                this.linedefModal.changeLinedef(this.selectedObject);
            }
        }
    }, {
        key: 'drawSelections',
        value: function drawSelections() {
            if (this.selectedObject) {
                switch (this.selectedObject.type()) {
                    case 'linedef':
                        this.context.fillStyle = '#FFCF4B';
                        this.context.beginPath();
                        this.context.strokeStyle = '#FFCF4B';
                        this.context.lineWidth = 4;
                        this.context.moveTo(this.selectedObject.startVertex.x * this.gridScale, this.selectedObject.startVertex.y * this.gridScale);
                        this.context.lineTo(this.selectedObject.endVertex.x * this.gridScale, this.selectedObject.endVertex.y * this.gridScale);
                        this.context.stroke();
                        this.context.closePath();
                        this.context.fillRect(this.selectedObject.startVertex.x * this.gridScale - 6, this.selectedObject.startVertex.y * this.gridScale - 6, 12, 12);
                        this.context.fillRect(this.selectedObject.endVertex.x * this.gridScale - 6, this.selectedObject.endVertex.y * this.gridScale - 6, 12, 12);
                        break;
                    case 'sector':
                        this.context.beginPath();
                        this.context.strokeStyle = '#FFCF4B';
                        this.context.lineWidth = 4;
                        for (var i = 0; i < this.selectedObject.linedefs.length; i++) {
                            var linedef = this.selectedObject.linedefs[i];

                            if (i == 0) {
                                this.context.moveTo(linedef.startVertex.x * this.gridScale, linedef.startVertex.y * this.gridScale);
                                this.context.lineTo(linedef.endVertex.x * this.gridScale, linedef.endVertex.y * this.gridScale);
                            } else {
                                this.context.lineTo(linedef.startVertex.x * this.gridScale, linedef.startVertex.y * this.gridScale);
                                this.context.lineTo(linedef.endVertex.x * this.gridScale, linedef.endVertex.y * this.gridScale);
                            }
                            this.context.fillStyle = '#FFCF4B';
                            this.context.fillRect(linedef.startVertex.x * this.gridScale - 6, linedef.startVertex.y * this.gridScale - 6, 12, 12);
                            this.context.fillRect(linedef.endVertex.x * this.gridScale - 6, linedef.endVertex.y * this.gridScale - 6, 12, 12);
                        }
                        this.context.fillStyle = 'rgba(255, 207, 75, 0.2)';
                        this.context.stroke();
                        this.context.fill();
                        this.context.closePath();
                        break;
                    case 'thing':
                        this.context.beginPath();
                        this.context.strokeStyle = '#FFCF4B';
                        this.context.lineWidth = 4;
                        this.context.arc(this.selectedObject.x * this.gridScale, this.selectedObject.y * this.gridScale, 16 * this.gridScale / 2, 0, 2 * Math.PI);
                        this.context.stroke();
                        this.context.closePath();
                        break;
                }
            }
        }
    }, {
        key: 'drawThings',
        value: function drawThings() {
            var iconSize = 16 * this.gridScale;
            var _iteratorNormalCompletion15 = true;
            var _didIteratorError15 = false;
            var _iteratorError15 = undefined;

            try {
                for (var _iterator15 = this.things[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
                    var thing = _step15.value;

                    this.context.beginPath();
                    switch (thing.thingType) {
                        case 'player_starts':
                            this.context.fillStyle = '#2ecc71';
                            this.context.arc(thing.x * this.gridScale, thing.y * this.gridScale, iconSize / 2, 0, 2 * Math.PI);
                            this.context.fill();
                            break;
                    }
                    this.context.closePath();
                }
            } catch (err) {
                _didIteratorError15 = true;
                _iteratorError15 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion15 && _iterator15.return) {
                        _iterator15.return();
                    }
                } finally {
                    if (_didIteratorError15) {
                        throw _iteratorError15;
                    }
                }
            }
        }
    }, {
        key: 'update',
        value: function update() {
            var _this3 = this;

            this.clear();
            this.drawSectors();
            this.drawTools();
            this.drawSelections();
            this.drawThings();

            window.requestAnimationFrame(function () {
                return _this3.update();
            });
        }
    }, {
        key: 'updateUI',
        value: function updateUI() {
            // console.log('updated ui');
            this.ui.edit.style.display = this.selectedObject ? '' : 'none';
            this.ui.editButton.style.display = this.selectedObject ? '' : 'none';
            this.ui.editButton.innerHTML = 'Edit ' + (this.selectedObject ? this.selectedObject.toString() : '');
            this.ui.thingContainer.style.display = this.tool == 'thing' ? '' : 'none';
        }
    }, {
        key: 'tool',
        get: function get() {
            return this._tool;
        },
        set: function set(value) {
            if (this._tool != value) {
                this._tool = value;
                this.selectedObject = null;
                this.updateUI();
            }
        }
    }, {
        key: 'selectedObject',
        get: function get() {
            return this._selectedObject;
        },
        set: function set(value) {
            if (this._selectedObject != value) {
                this._selectedObject = value;
                this.updateUI();
            }
        }
    }]);

    return Editor;
}();

window.Editor = Editor;

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _editorObjects = __webpack_require__(1);

var _thing = __webpack_require__(10);

var _thing2 = _interopRequireDefault(_thing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EditableMap = function () {
    function EditableMap() {
        _classCallCheck(this, EditableMap);
    }

    _createClass(EditableMap, null, [{
        key: 'fromJSON',
        value: function fromJSON(json) {
            var object = {
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
                                var startVertex = new _editorObjects.Vertex(linedef.startVertex.x, linedef.startVertex.y, linedef.startVertex.id);
                                var endVertex = new _editorObjects.Vertex(linedef.endVertex.x, linedef.endVertex.y, linedef.endVertex.id);
                                currentLinedef = new _editorObjects.LineDef(startVertex, endVertex, linedef.leftSidedef ? linedef.leftSidedef : '', linedef.rightSidedef ? linedef.rightSidedef : '', linedef.id);
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

                    var currentSector = new _editorObjects.Sector(linedefs, true, sector.floorHeight, sector.ceilingHeight, sector.id);
                    object.sectors.push(currentSector);
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

                    object.things.push(new _thing2.default(thing.x, thing.y, thing.sprite, thing.type, thing.hex, thing.id));
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

            return object;
        }
    }, {
        key: 'toJSON',
        value: function toJSON(map, things) {
            var json = {
                sectors: [],
                things: []
            };

            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = map[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var sector = _step5.value;

                    var linedefs = [];
                    var _iteratorNormalCompletion7 = true;
                    var _didIteratorError7 = false;
                    var _iteratorError7 = undefined;

                    try {
                        for (var _iterator7 = sector.linedefs[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                            var linedef = _step7.value;

                            var currentLinedef = {
                                id: linedef.id,
                                startVertex: {
                                    id: linedef.startVertex.id,
                                    x: linedef.startVertex.x,
                                    y: linedef.startVertex.y
                                },
                                endVertex: {
                                    id: linedef.endVertex.id,
                                    x: linedef.endVertex.x,
                                    y: linedef.endVertex.y
                                },
                                leftSidedef: linedef.leftSidedef != '' ? linedef.leftSidedef : null,
                                rightSidedef: linedef.rightSidedef != '' ? linedef.rightSidedef : null
                            };
                            linedefs.push(currentLinedef);
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

                    var currentSector = {
                        id: sector.id,
                        linedefs: linedefs,
                        floorHeight: sector.floorHeight,
                        ceilingHeight: sector.ceilingHeight
                    };
                    json.sectors.push(currentSector);
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

            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
                for (var _iterator6 = things[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var thing = _step6.value;

                    json.things.push({
                        id: thing.id,
                        x: thing.x,
                        y: thing.y,
                        sprite: thing.sprite,
                        type: thing.thingType,
                        hex: thing.hex
                    });
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

            console.log(json);

            return json;
        }
    }]);

    return EditableMap;
}();

exports.default = EditableMap;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _things = __webpack_require__(9);

var _things2 = _interopRequireDefault(_things);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ThingSelector = function () {
    function ThingSelector(selector) {
        _classCallCheck(this, ThingSelector);

        this.selector = selector;
        this.selection = null;

        this.prepareOptions();
        this.bindEvents();
    }

    _createClass(ThingSelector, [{
        key: 'prepareOptions',
        value: function prepareOptions() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = _things2.default[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var thing = _step.value;

                    var option = document.createElement('option');
                    option.value = thing.hex;
                    option.text = thing.name;
                    option.setAttribute('data-sprite', thing.sprite);
                    option.setAttribute('data-type', thing.type);

                    this.selector.appendChild(option);
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
        key: 'bindEvents',
        value: function bindEvents() {
            var _this = this;

            this.selector.onchange = function (event) {
                var selector = event.target;
                var option = selector.options[selector.selectedIndex];
                _this.selection = {
                    hex: selector.value,
                    sprite: option.getAttribute('data-sprite'),
                    type: option.getAttribute('data-type')
                };
            };
        }
    }]);

    return ThingSelector;
}();

exports.default = ThingSelector;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = [
	{
		"name": "Player 1 start",
		"hex": "1",
		"type": "player_starts",
		"sprite": "PLAY"
	},
	{
		"name": "Imp",
		"hex": "BB9",
		"type": "monsters",
		"sprite": "TROO"
	}
];

/***/ }),
/* 10 */
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