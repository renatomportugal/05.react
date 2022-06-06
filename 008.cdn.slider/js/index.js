var Slider = React.createClass({ displayName: "Slider",
  getInitialState: function () {
    return { value: 50 };
  },
  onChange: function (e) {
    this.setState({ value: e.target.value });
  },
  render: function () {
    return (
      React.createElement("div", null,
      React.createElement("h1", null, this.state.value),
      React.createElement("input", { type: "range", min: "0", max: "100", step: "1", onChange: this.onChange })));


  } });


React.render(React.createElement(Slider, null), document.body);