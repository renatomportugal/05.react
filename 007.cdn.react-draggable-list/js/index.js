var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var Card2 = function (_React$Component) {_inherits(Card2, _React$Component);
  function Card2(props) {_classCallCheck(this, Card2);var _this = _possibleConstructorReturn(this, (Card2.__proto__ || Object.getPrototypeOf(Card2)).call(this,
    props));
    _this.state = {
      item: null,
      no: null,
      val: null,
      down: false,
      vScale: 0.0,
      v: 0,
      clicked: 0,
      posScale: 1,
      z: 1,
      y: 0,
      posy: 0,
      newPos: 0,
      shadow1: 1,
      shadow2: 2,
      vs1: 0,
      vs2: 0,
      ps1: 0,
      ps2: 0 };


    _this.animate = _this.animate.bind(_this);
    _this.startLoop = _this.startLoop.bind(_this);
    _this.updateScale = _this.updateScale.bind(_this);
    _this.updateYaxis = _this.updateYaxis.bind(_this);
    _this.updateShadow = _this.updateShadow.bind(_this);
    _this.handleDown = _this.handleDown.bind(_this);
    _this.handleUp = _this.handleUp.bind(_this);
    _this.handleMove = _this.handleMove.bind(_this);
    _this.handleTouchStart = _this.handleTouchStart.bind(_this);
    _this.handleTouchEnd = _this.handleTouchEnd.bind(_this);
    _this.handleTouchMove = _this.handleTouchMove.bind(_this);return _this;
  }_createClass(Card2, [{ key: "componentWillMount", value: function componentWillMount()

    {
      this.setState({
        item: this.props.item,
        val: this.props.item,
        y: this.props.item * 100,
        no: this.props.item });

    } }, { key: "componentDidMount", value: function componentDidMount()

    {
      this.startLoop();
    } }, { key: "componentWillReceiveProps", value: function componentWillReceiveProps(

    newProps) {
      if (!this.state.down) {
        this.setState({
          item: newProps.item,
          val: newProps.item });

      }
    } }, { key: "handleDown", value: function handleDown(

    e) {
      this.setState({
        down: true,
        z: 4,
        posy: e.clientY });

    } }, { key: "handleTouchStart", value: function handleTouchStart(

    e) {
      e.persist();
      this.setState({
        down: true,
        z: 4,
        posy: e.touches[0].screenY });

    } }, { key: "handleUp", value: function handleUp()

    {
      this.setState({
        down: false });

    } }, { key: "handleTouchEnd", value: function handleTouchEnd()

    {
      this.setState({
        down: false });

    } }, { key: "handleMove", value: function handleMove(

    e) {var _this2 = this;
      if (this.state.down) {
        var newPos = e.clientY - this.state.posy;
        this.setState(
        {
          y: this.state.val * 100 + newPos },

        function () {
          if (_this2.state.y > _this2.state.item * 100 + 50) {
            if (_this2.state.item + 1 < 4) {
              _this2.setState(
              {
                item: _this2.state.item + 1 },

              function () {
                _this2.props.handlePos(
                _this2.state.no,
                _this2.state.item,
                _this2.state.item - 1);

              });

            }
          } else if (_this2.state.y < _this2.state.item * 100 - 50) {
            if (_this2.state.item - 1 > -1) {
              _this2.setState(
              {
                item: _this2.state.item - 1 },

              function () {
                _this2.props.handlePos(
                _this2.state.no,
                _this2.state.item,
                _this2.state.item + 1);

              });

            }
          }
        });

      }
    } }, { key: "handleTouchMove", value: function handleTouchMove(

    e) {var _this3 = this;
      e.persist();
      if (this.state.down) {
        var newPos = e.touches[0].screenY - this.state.posy;
        this.setState(
        {
          y: this.state.val * 100 + newPos },

        function () {
          if (_this3.state.y > _this3.state.item * 100 + 50) {
            if (_this3.state.item + 1 < 4) {
              _this3.setState(
              {
                item: _this3.state.item + 1 },

              function () {
                _this3.props.handlePos(
                _this3.state.no,
                _this3.state.item,
                _this3.state.item - 1);

              });

            }
          } else if (_this3.state.y < _this3.state.item * 100 - 50) {
            if (_this3.state.item - 1 > -1) {
              _this3.setState(
              {
                item: _this3.state.item - 1 },

              function () {
                _this3.props.handlePos(
                _this3.state.no,
                _this3.state.item,
                _this3.state.item + 1);

              });

            }
          }
        });

      }
    } }, { key: "updateScale", value: function updateScale()

    {var _this4 = this;
      if (this.state.down) {
        var f = -0.2 * (this.state.posScale - 1.1);
        var a = f / 0.8;
        this.setState(
        {
          vScale: 0.4 * (this.state.vScale + a) },

        function () {
          _this4.setState({
            posScale: _this4.state.posScale + _this4.state.vScale });

        });

      } else if (!this.state.down) {
        var _f = -0.2 * (this.state.posScale - 1);
        var _a = _f / 0.8;
        this.setState(
        {
          vScale: 0.4 * (this.state.vScale + _a) },

        function () {
          _this4.setState({
            posScale: _this4.state.posScale + _this4.state.vScale });

        });

        if (Math.floor(this.state.posScale) === 1) {
          this.setState(
          {
            z: 1 },

          function () {
            _this4.setState({
              val: _this4.state.item });

          });

        }
      }
    } }, { key: "updateYaxis", value: function updateYaxis()

    {var _this5 = this;
      if (!this.state.down) {
        var f = -0.2 * (this.state.y - this.state.item * 100);
        var a = f / 1;
        this.setState(
        {
          v: 0.3 * (this.state.v + a) },

        function () {
          _this5.setState({
            y: _this5.state.y + _this5.state.v });

        });

      }
    } }, { key: "updateShadow", value: function updateShadow()

    {var _this6 = this;
      if (this.state.down) {
        var f = -0.2 * (this.state.shadow1 - 16);
        var a = f / 0.8;
        this.setState(
        {
          vs1: 0.4 * (this.state.vs1 + a) },

        function () {
          _this6.setState({
            shadow1: _this6.state.shadow1 + _this6.state.vs1 });

        });

        var f2 = -0.2 * (this.state.shadow2 - 32);
        var a2 = f2 / 0.8;
        this.setState(
        {
          vs2: 0.4 * (this.state.vs2 + a2) },

        function () {
          _this6.setState({
            shadow2: _this6.state.shadow2 + _this6.state.vs2 });

        });

      }
      if (!this.state.down) {
        var _f2 = -0.2 * (this.state.shadow1 - 1);
        var _a2 = _f2 / 0.8;
        this.setState(
        {
          vs1: 0.4 * (this.state.vs1 + _a2) },

        function () {
          _this6.setState({
            shadow1: _this6.state.shadow1 + _this6.state.vs1 });

        });

        var _f3 = -0.2 * (this.state.shadow2 - 2);
        var _a3 = _f3 / 0.8;
        this.setState(
        {
          vs2: 0.4 * (this.state.vs2 + _a3) },

        function () {
          _this6.setState({
            shadow2: _this6.state.shadow2 + _this6.state.vs2 });

        });

      }
    } }, { key: "startLoop", value: function startLoop()

    {
      if (!this._frameId) {
        this._frameId = window.requestAnimationFrame(this.animate);
      }
    } }, { key: "animate", value: function animate()

    {
      this.updateScale();
      this.updateYaxis();
      this.updateShadow();
      document.getElementById("card" + this.state.no).style.transform =
      " translate3d(0px ," +
      this.state.y +
      "px, 0px)scale(" +
      this.state.posScale +
      ")";
      document.getElementById("card" + this.state.no).style.zIndex = this.state.z;
      document.getElementById("card" + this.state.no).style.boxShadow =
      "rgba(0, 0, 0, 0.2) 0px " +
      this.state.shadow1 +
      "px " +
      this.state.shadow2 +
      "px 0px";
      this.frameId = window.requestAnimationFrame(this.animate);
    } }, { key: "stopLoop", value: function stopLoop()
    {
      window.cancelAnimationFrame(this._frameId);
    } }, { key: "render", value: function render()
    {
      return (
        React.createElement("div", {
            id: "card" + this.state.no,
            className: "card",
            onMouseDown: this.handleDown,
            onMouseUp: this.handleUp,
            onMouseMove: this.handleMove,
            onMouseLeave: this.handleUp,
            onTouchStart: this.handleTouchStart,
            onTouchMove: this.handleTouchMove,
            onTouchEnd: this.handleTouchEnd },

          this.state.no + 1));


    } }]);return Card2;}(React.Component);var



App2 = function (_React$Component2) {_inherits(App2, _React$Component2);
  function App2(props) {_classCallCheck(this, App2);var _this7 = _possibleConstructorReturn(this, (App2.__proto__ || Object.getPrototypeOf(App2)).call(this,
    props));
    _this7.state = {
      down: false,
      no: 0,
      v: 0.0,
      pos: 1,
      clicked: 0,
      //     0, 1, 2, 3
      card: [0, 1, 2, 3] };

    _this7.changePos = _this7.changePos.bind(_this7);return _this7;
  }_createClass(App2, [{ key: "changePos", value: function changePos(

    i, newPos, oldPos) {
      var arr = this.state.card;
      for (var j = 0; j < 4; j++) {
        if (j != i) {
          if (arr[j] === newPos) {
            arr[j] = oldPos;
            arr[i] = newPos;
          }
        }
      }
      this.setState({
        card: arr });

    } }, { key: "render", value: function render()

    {var _this8 = this;
      var cards = this.state.card.map(function (item, i) {
        return (
          React.createElement(Card2, { key: i, item: item, y: item * 100, handlePos: _this8.changePos }));

      });
      return (
        React.createElement("div", { className: "app" },
          React.createElement("div", { className: "text" }, "Draggable List"),
          React.createElement("div", { className: "container" }, cards)));


    } }]);return App2;}(React.Component);

var mountNode = document.getElementById("app");
ReactDOM.render(React.createElement(App2, null), mountNode);