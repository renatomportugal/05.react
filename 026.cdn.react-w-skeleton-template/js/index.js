class Awesome extends React.Component {
  render() {
    return (
      React.createElement("div", null,
      React.createElement("h1", null, "Hello, World!"),
      React.createElement("h4", null, "Skeleton - A dead simple, responsive boilerplate."),
      React.createElement("a", { className: "button button-primary u-pull-left", href: "https://codepen.io/pen?template=xObVBe", target: "_blank" }, "Use this template!"), React.createElement("a", { className: "button button-primary u-pull-right", href: "http://getskeleton.com", target: "_blank" }, "getskeleton.com")));


  }}


ReactDOM.render(
React.createElement(Awesome, null),
document.getElementById('yes'));