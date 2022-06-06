// check out https://uber.github.io/react-vis/#/ for all that can be done with react-vis

const {
  HorizontalGridLines,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis,
  LineMarkSeries } =
reactVis;

function Chart({ data }) {
  return React.createElement(XYPlot, { width: 400, height: 300 }, React.createElement(XAxis, null), React.createElement(YAxis, null),
  React.createElement(HorizontalGridLines, null),
  React.createElement(VerticalGridLines, null),
  React.createElement(LineMarkSeries, { data: data }));

}

const data = new Array(19).fill(0).reduce((prev, curr) => [...prev, {
  x: prev.slice(-1)[0].x + 1,
  y: prev.slice(-1)[0].y * (0.9 + Math.random() * 0.2) }],
[{ x: 0, y: 10 }]);

const chart = React.createElement(Chart, { data: data });
ReactDOM.render(chart, document.querySelector('#root'));