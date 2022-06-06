const App = React.createClass({ displayName: "App",
  render() {
    return (
      React.createElement("div", { className: "module" },
      React.createElement("h1", null, "Hello, world!")));


  } });



ReactDOM.render(
React.createElement(App, null),
document.getElementById("app"));