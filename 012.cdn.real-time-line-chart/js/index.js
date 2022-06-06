function _extends() {_extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};return _extends.apply(this, arguments);}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}let addData;
const transitionDuration = 300;

setTimeout(() => {
  const view = [480, 320];
  const trbl = [0, 0, 0, 0]; // refactor, i don't understand the semantics of this.  Will i ever need trbl[1] or trbl[2] ?
  ReactDOM.render(
  React.createElement(Container, { view, trbl }),
  document.getElementById('js-app'));
}, 0);

let count = 0;

function streamDataStep() {
  const value = Math.random() * 900 + 100;
  addData(value);
}

function generateData(size) {
  const data = [];
  for (let index = 0; index < size; index++) {
    const value = Math.random() * 900 + 100;
    data.push({ index, value });
  }
  return data;
}

function labelFn(value, index) {
  return value;
}

class Container extends React.Component {





  constructor(props) {
    super(props);
    this.state = {
      domainXMin: 100,
      domainXMax: 500,
      domainYMin: 0,
      domainYMax: 100,
      data: generateData(23) };

  }

  componentDidMount() {
    addData = value => {
      const data = this.state.data.slice(0);
      const index = data[data.length - 1].index + 1;
      data.push({ index, value });
      data.shift();
      this.setState({ data });
    };
    streamDataStep();
  }

  buildDataSeries(data, containerView, containerTrbl, horizontalAxisHeight, verticalAxisWidth, xScale, yScale) {
    const trbl = [
    horizontalAxisHeight,
    verticalAxisWidth,
    horizontalAxisHeight,
    verticalAxisWidth];

    const view = [
    containerView[0] - verticalAxisWidth * 2,
    containerView[1] - horizontalAxisHeight * 2];

    return (
      React.createElement(AnimatedLineDataSeries, { data, trbl, view, xScale, yScale }));

  }

  buildVerticalAxis(containerView, containerTrbl, horizontalAxisHeight, verticalAxisWidth, scale) {
    const view = [verticalAxisWidth, containerView[1] - horizontalAxisHeight * 2];
    const trbl = [horizontalAxisHeight, 0, 0, 0];
    const orientation = VerticalAxis.orientation.LEFT;
    const tickValues = scale.ticks();
    return (
      React.createElement(AnimatedVerticalAxis, { scale, trbl, view, tickValues, orientation, labelFn }));

  }

  buildScale(domainMin, domainMax, range) {
    return d3.scaleLinear().domain([domainMin, domainMax]).range(range);
  }

  buildHorizontalAxis(containerView, containerTrbl, horizontalAxisHeight, verticalAxisWidth, scale) {
    const view = [containerView[0] - verticalAxisWidth * 2, horizontalAxisHeight];
    const trbl = [containerView[1] - horizontalAxisHeight, verticalAxisWidth, 0, verticalAxisWidth];
    const orientation = HorizontalAxis.orientation.BOTTOM;
    const tickValues = scale.ticks();
    return (
      React.createElement(AnimatedHorizontalAxis, { scale, trbl, view, tickValues, orientation, labelFn }));

  }

  render() {
    const { view, trbl } = this.props;
    const { data } = this.state;
    const [domainYMin, domainYMax] = d3.extent(data, ({ value }) => value);
    const [domainXMin, domainXMax] = d3.extent(data, ({ index }) => index);
    const horizontalAxisHeight = 30;
    const verticalAxisWidth = 42;
    const marginSide = (view[0] - verticalAxisWidth * 2) / data.length;
    const xScale = this.buildScale(domainXMin + 1, domainXMax - 2, [0 - marginSide, view[0] - verticalAxisWidth * 2 + marginSide]);
    const yScale = this.buildScale(domainYMin, domainYMax, [view[1] - horizontalAxisHeight * 2, 0]);
    return (
      React.createElement("g", null,
      this.buildHorizontalAxis(view, trbl, horizontalAxisHeight, verticalAxisWidth, xScale),
      this.buildVerticalAxis(view, trbl, horizontalAxisHeight, verticalAxisWidth, yScale),
      this.buildDataSeries(data, view, trbl, horizontalAxisHeight, verticalAxisWidth, xScale, yScale)));


  }}_defineProperty(Container, "propTypes", { trbl: React.PropTypes.array.isRequired, view: React.PropTypes.array.isRequired });


class HorizontalAxis extends React.Component {














  buildTicks(tickValues, scale, labelFn, trbl, view, orientation) {
    return tickValues.map((tickValue, index) => {
      const xPos = scale(tickValue);
      let y2 = view[1];
      let y1 = y2 - 5;
      if (orientation === HorizontalAxis.orientation.BOTTOM) {
        y1 = 0;
        y2 = 5;
      }
      return (
        React.createElement("g", {
          key: index,
          transform: `translate(${xPos}, 0)` },

        React.createElement("line", _extends(
        { y1, y2 }, {
          stroke: 'darkgray',
          x1: 0,
          x2: 0 })),

        React.createElement("text", {
          dy: '1.4em',
          textAnchor: 'middle',
          x: 0,
          y: 0 },
        labelFn(tickValue, index))));


    });
  }

  render() {
    const { scale, view, trbl, labelFn, tickValues, orientation } = this.props;
    const [width, height] = view;
    const id = 'clip-path--' + Math.floor(+new Date() + Math.random() * 0xffffff).toString(36);
    let y1 = 0;
    if (orientation === HorizontalAxis.orientation.TOP) {
      y1 = view[1];
    }
    const y2 = y1;
    return (
      React.createElement("g", null,
      React.createElement("defs", null,
      React.createElement("clipPath", { id },
      React.createElement("rect", { width, height }))),


      React.createElement("g", {
        clipPath: `url(#${id})`,
        transform: `translate(${trbl[3]}, ${trbl[0]})` },

      React.createElement("line", {
        stroke: "darkgray",
        x1: 0,
        y1: 0,
        x2: view[0],
        y2: 0 }),

      this.buildTicks(tickValues, scale, labelFn, trbl, view, orientation))));



  }}_defineProperty(HorizontalAxis, "propTypes", { labelFn: React.PropTypes.func.isRequired, orientation: React.PropTypes.string.isRequired, scale: React.PropTypes.func.isRequired, tickValues: React.PropTypes.array.isRequired, trbl: React.PropTypes.array.isRequired, view: React.PropTypes.array.isRequired });_defineProperty(HorizontalAxis, "orientation", { BOTTOM: 'horizontal-axis-bottom', TOP: 'horizontal-axis-top' });


class VerticalAxis extends React.Component {














  buildTicks(tickValues, scale, labelFn, trbl, view, orientation) {
    return tickValues.map((tickValue, index) => {
      const yPos = scale(tickValue);
      let x2 = view[0];
      let x1 = x2 - 5;
      let anchorPosition = 'end';
      let textXPos = x1 - 2;
      if (orientation === VerticalAxis.orientation.RIGHT) {
        x1 = 0;
        x2 = 5;
        anchorPosition = 'start';
        textXPos = x2 + 2;
      }
      return (
        React.createElement("g", {
          key: index,
          transform: `translate(0, ${yPos})` },

        React.createElement("line", _extends(
        { x1, x2 }, {
          stroke: 'darkgray',
          y1: 0,
          y2: 0 })),

        React.createElement("text", {
          dy: 3,
          textAnchor: anchorPosition,
          x: textXPos,
          y: 0 },
        labelFn(tickValue, index))));


    });
  }

  render() {
    const { scale, view, trbl, labelFn, tickValues, orientation } = this.props;
    let x1 = view[0];
    if (orientation === VerticalAxis.orientation.RIGHT) {
      x1 = 0;
    }
    const x2 = x1;
    return (
      React.createElement("g", { transform: `translate(${trbl[3]}, ${trbl[0]})` },
      React.createElement("line", _extends(
      { x1, x2 }, {
        stroke: "darkgray",
        y1: 0,
        y2: view[1] })),

      this.buildTicks(tickValues, scale, labelFn, trbl, view, orientation)));


  }}_defineProperty(VerticalAxis, "propTypes", { labelFn: React.PropTypes.func.isRequired, orientation: React.PropTypes.string.isRequired, scale: React.PropTypes.func.isRequired, tickValues: React.PropTypes.array.isRequired, trbl: React.PropTypes.array.isRequired, view: React.PropTypes.array.isRequired });_defineProperty(VerticalAxis, "orientation", { LEFT: 'horizontal-axis-left', RIGHT: 'horizontal-axis-right' });


const AnimatedAxisWrapper = () => ComposedComponent => {var _class, _temp;return _temp = _class = class extends React.Component {




    constructor(props) {
      super(props);
      const { scale } = this.props;
      const [domainMin, domainMax] = scale.domain();
      this.state = {
        domainMax,
        domainMin };

    }

    componentWillReceiveProps(nextProps) {
      const [nextDomainMin, nextDomainMax] = nextProps.scale.domain();
      const [domainMin, domainMax] = this.props.scale.domain();
      if (nextDomainMin === domainMin && nextDomainMax === domainMax) {
        return;
      }
      d3.select(this).transition().tween('attr.domain'); // refactor, is this necessary to cancel previous transition?
      d3.select(this).transition().duration(transitionDuration).ease(d3.easeLinear).tween('attr.domain', () => {
        const minInterpolator = d3.interpolateNumber(this.state.domainMin, nextDomainMin);
        const maxInterpolator = d3.interpolateNumber(this.state.domainMax, nextDomainMax);
        return t => {
          this.setState({
            domainMin: minInterpolator(t),
            domainMax: maxInterpolator(t) });

        };
      });
    }

    render() {
      const { props } = this;
      const { scale } = props;
      const { domainMin, domainMax } = this.state;
      const newScale = scale.copy();
      newScale.domain([domainMin, domainMax]);
      const newProps = Object.assign({}, props, { scale: newScale });
      return (
        React.createElement(ComposedComponent, newProps));

    }}, _defineProperty(_class, "propTypes", { scale: React.PropTypes.func.isRequired }), _temp;};


const AnimatedVerticalAxis = AnimatedAxisWrapper()(VerticalAxis);
const AnimatedHorizontalAxis = AnimatedAxisWrapper()(HorizontalAxis);

class LineDataSeries extends React.Component {








  buildAreaPlot(data, view, trbl, xScale, yScale, stroke) {
    const area = d3.line();
    area.x(({ index }) => xScale(index));
    area.y(({ value }) => yScale(value));
    area.curve(d3.curveBasis);
    const d = area(data);
    return (
      React.createElement("path", { d, stroke, fill: 'none', strokeWidth: 3 }));

  }

  render() {
    const { trbl, view, data, xScale, yScale, year } = this.props;
    const stroke = 'steelblue';
    const [width, height] = view;
    const id = 'clip-path--' + Math.floor(+new Date() + Math.random() * 0xffffff).toString(36);
    return (
      React.createElement("g", null,
      React.createElement("defs", null,
      React.createElement("clipPath", { id },
      React.createElement("rect", { width, height }))),


      React.createElement("g", {
        clipPath: `url(#${id})`,
        transform: `translate(${trbl[3]}, ${trbl[0]})` },

      this.buildAreaPlot(data, view, trbl, xScale, yScale, stroke))));



  }}_defineProperty(LineDataSeries, "propTypes", { data: React.PropTypes.array.isRequired, trbl: React.PropTypes.array.isRequired, view: React.PropTypes.array.isRequired, xScale: React.PropTypes.func.isRequired, yScale: React.PropTypes.func.isRequired });


const AnimatedDataSeriesWrapper = () => ComposedComponent => {var _class2, _temp2;return _temp2 = _class2 = class extends React.Component {





    constructor(props) {
      super(props);
      const { yScale, xScale } = this.props;
      const [domainXMin, domainXMax] = xScale.domain();
      const [domainYMin, domainYMax] = yScale.domain();
      this.state = {
        domainYMin,
        domainYMax,
        domainXMin,
        domainXMax };

    }

    componentWillReceiveProps(nextProps) {
      const [nextDomainXMin, nextDomainXMax] = nextProps.xScale.domain();
      const [domainXMin, domainXMax] = this.props.xScale.domain();
      const [nextDomainYMin, nextDomainYMax] = nextProps.yScale.domain();
      const [domainYMin, domainYMax] = this.props.yScale.domain();
      const domainYUnchanged = nextDomainYMin === domainYMin && nextDomainYMax === domainYMax;
      const domainXUnchanged = nextDomainXMin === domainXMin && nextDomainXMax === domainXMax;
      if (domainYUnchanged && domainXUnchanged) {
        return;
      }
      d3.select(this).transition().tween('attr.domain'); // refactor, is this necessary to cancel previous transition?
      d3.select(this).transition().duration(transitionDuration).ease(d3.easeLinear).tween('attr.domain', () => {
        const minYInterpolator = d3.interpolateNumber(this.state.domainYMin, nextDomainYMin);
        const maxYInterpolator = d3.interpolateNumber(this.state.domainYMax, nextDomainYMax);
        const minXInterpolator = d3.interpolateNumber(this.state.domainXMin, nextDomainXMin);
        const maxXInterpolator = d3.interpolateNumber(this.state.domainXMax, nextDomainXMax);
        return t => {
          this.setState({
            domainYMin: minYInterpolator(t),
            domainYMax: maxYInterpolator(t),
            domainXMin: minXInterpolator(t),
            domainXMax: maxXInterpolator(t) });

        };
      }).on('end', streamDataStep); // refactor, this is a hacky way to get smoothy rendering
    }

    render() {
      const { props } = this;
      const { xScale, yScale } = props;
      const { domainYMin, domainYMax, domainXMin, domainXMax } = this.state;
      const newYScale = yScale.copy();
      const newXScale = xScale.copy();
      newYScale.domain([domainYMin, domainYMax]);
      newXScale.domain([domainXMin, domainXMax]);
      const newProps = Object.assign({}, props, { xScale: newXScale, yScale: newYScale });
      return (
        React.createElement(ComposedComponent, newProps));

    }}, _defineProperty(_class2, "propTypes", { xScale: React.PropTypes.func.isRequired, yScale: React.PropTypes.func.isRequired }), _temp2;};


const AnimatedLineDataSeries = AnimatedDataSeriesWrapper()(LineDataSeries);

const BaseWrapper = () => ComposedComponent => {var _class3, _temp3;return _temp3 = _class3 = class extends React.Component {





    render() {
      const { props } = this;
      const { view, trbl, children } = props;
      const viewBox = `0 0 ${view[0]} ${view[1]}`;
      return (
        React.createElement("svg", _extends(
        { viewBox }, {
          height: view[1],
          width: view[0] }),

        React.createElement("g", { transform: `translate(${trbl[0]}, ${trbl[3]})` },
        React.createElement(ComposedComponent, props))));



    }}, _defineProperty(_class3, "propTypes", { trbl: React.PropTypes.array.isRequired, view: React.PropTypes.array.isRequired }), _temp3;};


Container = BaseWrapper()(Container);