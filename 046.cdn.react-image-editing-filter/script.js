class HeadBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: '' };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ imageUrl: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.changeImage(this.state.imageUrl);
  }


  render() {
    return (
      React.createElement("header", { className: "HeadBar" },
      React.createElement("h1", { className: "HeadBar__title" }, "React Image Editor"),
      React.createElement("form", { onSubmit: this.handleSubmit },
      React.createElement("input", { className: "Headbar__input__text", type: "text", defaultValue: this.props.image, onChange: this.handleChange }),
      React.createElement("button", null, "Submit"))));



  }}


class FilterBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      React.createElement("div", { className: "FilterBar" },
      React.createElement("h3", null, "Filters"),
      React.createElement("img", { className: "TestFilter", src: this.props.image }),
      React.createElement("img", { className: "TestFilter", src: this.props.image }),
      React.createElement("img", { className: "TestFilter", src: this.props.image }),
      React.createElement("img", { className: "TestFilter", src: this.props.image })));


  }}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: 'https://s3.amazonaws.com/ktpublic-pics/rheaAtThePark.JPG',
      width: '400',
      brightness: '1',
      saturation: '100',
      contrast: '100' };

    this.handleChange = this.handleChange.bind(this);
    this.resetDefaults = this.resetDefaults.bind(this);
    this.monochromeFN = this.monochromeFN.bind(this);
    this.deepfriedFN = this.deepfriedFN.bind(this);
    this.changeImage = this.changeImage.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value }, () => console.log(this.state.range));
  }

  resetDefaults(e) {
    e.preventDefault();
    this.setState({ width: '400', brightness: '1', saturation: '100', contrast: '100' });
  }

  monochromeFN(e) {
    e.preventDefault();
    this.setState({ saturation: '0' });
  }

  deepfriedFN(e) {
    e.preventDefault();
    this.setState({ saturation: '200', contrast: '150' });
  }

  changeImage(imageUrl) {
    this.setState({ image: imageUrl });
  }

  render() {
    const { width, brightness, saturation, contrast } = this.state;

    const imgStyle = {
      width: width + 'px',
      filter: `brightness(${brightness}) saturate(${saturation}%) contrast(${contrast}%)` };


    return (
      React.createElement("div", { className: "App" },
      React.createElement(HeadBar, { image: this.state.image, changeImage: this.changeImage }),
      React.createElement("div", { className: "MainView" },
      React.createElement("div", { className: "inputs" },
      React.createElement("div", { className: "presets", style: { display: 'flex', justifyContent: 'space-between' } },
      React.createElement("button", { onClick: this.monochromeFN }, "Monochrome Filter"),
      React.createElement("button", { onClick: this.deepfriedFN }, "Deep Fried Filter")),

      React.createElement("form", null,
      React.createElement("h3", null, "Width"),
      React.createElement("input", { type: "range", name: "width", value: this.state.width, min: "0", max: "600", onChange: this.handleChange }),
      React.createElement("input", { type: "number", name: "width", value: this.state.width, onChange: this.handleChange })),


      React.createElement("form", null,
      React.createElement("h3", null, "Brightness"),
      React.createElement("input", { type: "range", name: "brightness", value: this.state.brightness, min: "0", max: "3", step: "0.1", onChange: this.handleChange }),
      React.createElement("input", { type: "number", name: "brightness", value: this.state.brightness, step: "0.01", onChange: this.handleChange })),


      React.createElement("form", null,
      React.createElement("h3", null, "Saturation"),
      React.createElement("input", { type: "range", name: "saturation", value: this.state.saturation, min: "0", max: "200", onChange: this.handleChange }),
      React.createElement("input", { type: "number", name: "saturation", value: this.state.saturation, onChange: this.handleChange })),


      React.createElement("form", null,
      React.createElement("h3", null, "Contrast"),
      React.createElement("input", { type: "range", name: "contrast", value: this.state.contrast, min: "50", max: "150", onChange: this.handleChange }),
      React.createElement("input", { type: "number", name: "contrast", value: this.state.contrast, onChange: this.handleChange })),

      React.createElement("button", { onClick: this.resetDefaults, style: { marginLeft: '75%' } }, "Reset to Defaults"),
      React.createElement("p", { className: "annotation" }, "Image: Rhea cooling down under the shade of a tree.")),

      React.createElement("img", { style: imgStyle, src: this.state.image }),
      React.createElement(FilterBar, { image: this.state.image }))));



  }}


ReactDOM.render(React.createElement(App, null), document.querySelector('#root'));