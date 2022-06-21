

class Switch extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isChecked: null };

  }

  componentWillMount() {
    this.setState({ isChecked: this.props.isChecked });
  }


  render() {

    return (
      React.createElement("div", { className: "switch-container" },
      React.createElement("label", null,
      React.createElement("input", { ref: "switch", checked: this.state.isChecked, onChange: this._handleChange, className: "switch", type: "checkbox" }),
      React.createElement("div", null,

      React.createElement("div", null)))));




  }


  _handleChange() {
    this.setState({ isChecked: !this.state.isChecked });
  }}





React.render(React.createElement(Switch, { isChecked: true }), document.getElementById("page"));