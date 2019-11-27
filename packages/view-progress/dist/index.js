"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _eventEmitter = _interopRequireDefault(require("@okiba/event-emitter"));

var _sizesCache = _interopRequireDefault(require("@okiba/sizes-cache"));

var _scrollManager = _interopRequireDefault(require("@okiba/scroll-manager"));

var _eventManager = _interopRequireDefault(require("@okiba/event-manager"));

var _math = require("@okiba/math");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ViewProgress =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(ViewProgress, _EventEmitter);

  function ViewProgress(el, opts) {
    var _this;

    _classCallCheck(this, ViewProgress);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ViewProgress).call(this));

    _defineProperty(_assertThisInitialized(_this), "onScroll", function (_ref) {
      var y = _ref.y,
          rest = _objectWithoutProperties(_ref, ["y"]);

      if (!_this.opts.overflow && !_this.isInside) {
        if (y < _this.startY || y > _this.endY) return;
      }

      var progress = (0, _math.map)(y, _this.startY, _this.endY, 0, 1);
      var isInside = progress >= 0 && progress <= 1;

      if (isInside !== _this.isInside) {
        if (isInside) {
          _this.emit('enter');
        } else {
          _this.emit('exit');
        }
      }

      _this.isInside = isInside;

      _this.emit('progress', _objectSpread({
        progress: progress,
        isInside: isInside
      }, rest, {
        y: y
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "onResize", function () {
      var _this$sizes = _this.sizes,
          top = _this$sizes.top,
          height = _this$sizes.height;
      _this.startY = top - _sizesCache["default"].window.height;
      _this.endY = _this.startY + height + _sizesCache["default"].window.height;

      if (_this.endY >= _sizesCache["default"].body.height) {
        _this.endY = _this.startY + height;
      }

      if (_this.startY < 0) {
        _this.startY = 0;
        _this.endY = height;
      }
    });

    _this.opts = opts || {};
    _this.el = el;
    _this.sizes = _sizesCache["default"].get(el);
    _this.isInside = false;

    _this.onResize();

    _this.listen();

    return _this;
  }

  _createClass(ViewProgress, [{
    key: "listen",
    value: function listen() {
      _scrollManager["default"].on('scroll', this.onScroll);

      _eventManager["default"].on('resize', this.onResize);
    }
  }]);

  return ViewProgress;
}(_eventEmitter["default"]);

exports["default"] = ViewProgress;