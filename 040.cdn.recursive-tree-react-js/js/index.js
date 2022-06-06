function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}class Branches extends React.Component {constructor(...args) {super(...args);_defineProperty(this, "drawTree",




    (startX, startY, length, angle, depth, branchWidth) => {
      const canvas = this.refs.canvasRed;
      const ctx = canvas.getContext("2d");
      console.log(ctx);
      let rand = Math.random;
      let newLength,newAngle,newDepth,maxBranch = 3,endX,endY,maxAngle = 2 * Math.PI / 4,subBranches;

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      endX = startX + length * Math.cos(angle);
      endY = startY + length * Math.sin(angle);

      ctx.lineCap = 'round';
      ctx.lineWidth = branchWidth;
      ctx.lineTo(endX, endY);

      if (depth <= 2) {
        ctx.strokeStyle = `rgb(${this.props.r}, ${rand() * 46 + this.props.g >> 0}, ${this.props.b})`;
      } else {
        ctx.strokeStyle = `rgb(95, ${rand() * 46 + 64 >> 0}, 15)`;
      }

      ctx.stroke();
      newDepth = depth - 1;
      if (!newDepth) {
        return 0;
      }
      subBranches = rand() * (maxBranch - 1) + 1;
      branchWidth *= 0.7;

      for (let i = 0; i < subBranches; i++) {
        newAngle = angle + rand() * maxAngle - maxAngle * 0.5;
        newLength = length * (0.7 + rand() * 0.3);
        this.drawTree(endX, endY, newLength, newAngle, newDepth, branchWidth);
      }
    });}componentDidMount() {this.drawTree(150, 350, 50, -Math.PI / 2, 12, 15);}
  render() {
    return (
      React.createElement("canvas", {
        ref: "canvasRed",
        width: "300", height: "350" }));


  }}


const App = () =>
React.createElement("div", {
  className: "canvas-container" },

React.createElement(Branches, {
  r: 222,
  g: 64,
  b: 46 }),

React.createElement(Branches, {
  r: 105,
  g: 55,
  b: 167 }),

React.createElement(Branches, {
  r: 232,
  g: 190,
  b: 25 }));




ReactDOM.render(React.createElement(App, null), document.getElementById("root"));