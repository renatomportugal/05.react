/*
 * A simple React component
 */
class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numOfLights: 100,
      whichIsOn: 0,
      howWide: 10,
      howFast: 100 };

  }
  componentDidMount() {
    this.resetRoulette();
  }
  resetRoulette() {
    clearInterval(this.startRoulette);

    this.startRoulette = window.setInterval(() => {
      this._nextLight();
    }, this.state.howFast);
  }

  _nextLight() {
    var whichIsOn = this.state.whichIsOn;

    whichIsOn++;
    if (whichIsOn >= this.state.numOfLights) {
      whichIsOn = 0;
    }
    this.setState({
      whichIsOn });

  }

  changeHowMany() {
    var x = ReactDOM.findDOMNode(this.refs.howMany).value.trim();
    this.setState({
      numOfLights: x });

    this.resetRoulette();

  }
  changeHowWide() {
    var x = ReactDOM.findDOMNode(this.refs.howWide).value.trim();
    this.setState({
      howWide: x });

    this.resetRoulette();

  }
  changeHowFast() {
    var x = ReactDOM.findDOMNode(this.refs.howFast).value.trim();
    this.setState({
      howFast: x });

    this.resetRoulette();
  }
  render() {
    if (this.state.numOfLights) {
      var lightsArrToReturn = [];
      for (var i = 0; i <= this.state.numOfLights; i++) {
        lightsArrToReturn.push(React.createElement(Circle, { howFast: this.state.howFast, howWide: this.state.howWide, key: i, whichIsOn: this.state.whichIsOn, turnedOn: this.state.turnedOn, howMany: this.state.numOfLights, whichOneAmI: i }));
      }
    }
    return React.createElement("div", { id: "container" },
    React.createElement("div", { style: { width: 200, position: 'absolute', top: 0, left: 0 } },
    React.createElement("div", { style: { position: 'absolute', top: 0, left: 0 } }, "Time In Between - ",
    this.state.howFast, React.createElement("input", { min: 50, max: 5000, value: this.state.howFast, onChange: this.changeHowFast.bind(this), ref: "howFast", type: "range" }), "Qty - ",
    this.state.numOfLights, React.createElement("input", { value: this.state.numOfLights, onChange: this.changeHowMany.bind(this), ref: "howMany", type: "range" }), "Apart - ",
    this.state.howWide, React.createElement("input", { ref: "howWide", onChange: this.changeHowWide.bind(this), type: "range" }))),


    lightsArrToReturn);

  }}



class Circle extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var transformAmount;
    var x = 360 / this.props.howMany;
    var y = -360 / this.props.howMany;
    transformAmount = `rotate(${this.props.whichOneAmI * x}deg) translate(${this.props.howWide}em) rotate(${this.props.whichOneAmI * y}deg)`;
    var imTheOne = this.props.whichOneAmI === this.props.whichIsOn;
    var whatColor = imTheOne ? 'green' : 'tomato';
    var imTheOneClasses = "field";
    if (imTheOne) {
      //imTheOneClasses += " cssAnimation"
      transformAmount += 'rotate(90deg) scale(2.2)';
    }
    return (
      React.createElement("div", { className: imTheOneClasses, style: { transform: transformAmount,
          width: 20, height: 20, zIndex: imTheOne ? 9 : 1, border: imTheOne ? '1px solid white' : '1px solid transparent', borderRadius: '50%', background: whatColor } }));



  }}


/*
      * Render the above component into the div#app
      */
ReactDOM.render(React.createElement(Application, null), document.getElementById('app'));