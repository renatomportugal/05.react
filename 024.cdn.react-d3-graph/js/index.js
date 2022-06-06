function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}class Line extends React.Component {










  render() {
    let path = d3.svg.line().
    interpolate(this.props.interpolate).
    x(d => this.context.xScale(d.x)).
    y(d => this.context.yScale(d.y));

    return (
      React.createElement("path", { d: path(this.props.data),
        stroke: this.props.color,
        strokeWidth: this.props.width,
        fill: "none" }));

  }}_defineProperty(Line, "contextTypes", { xScale: React.PropTypes.func, yScale: React.PropTypes.func });_defineProperty(Line, "defaultProps", { interpolate: "linear", dotted: false });


class Chart extends React.Component {



















  getChildContext() {
    return {
      xScale: this.getXScale(),
      yScale: this.getYScale() };

  }

  getXScale() {
    return d3.scale.linear().
    domain(d3.extent(this.props.data, d => d.x)).
    range([0, this.props.width]);

  }

  getYScale() {
    return d3.scale.linear().
    domain(d3.extent(this.props.data, d => d.y)).
    range([this.props.height, 0]);

  }

  render() {
    return (
      React.createElement("svg", { style: { width: this.props.width, height: this.props.height } },
      React.createElement(Line, { data: this.props.data, color: "cornflowerblue", width: "3", interpolate: "basis" })));


  }}



//Generate sample data
_defineProperty(Chart, "propTypes", { width: React.PropTypes.number, height: React.PropTypes.number, data: React.PropTypes.shape({ x: React.PropTypes.number.isRequired, y: React.PropTypes.number.isRequired }).isRequired });_defineProperty(Chart, "defaultProps", { width: 400, height: 200 });_defineProperty(Chart, "childContextTypes", { xScale: React.PropTypes.func, yScale: React.PropTypes.func });var data = [];

for (var i = 0; i < 100; i++) {
  data.push({
    x: i,
    y: Math.ceil(Math.random() * 100) });

}

console.log(React.createElement(Chart, { data: data }));

//Render!
React.render(React.createElement(Chart, { data: data }), document.getElementById("graph"));