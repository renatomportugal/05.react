class ClickableExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0 };

  }

  render() {
    const { children } = this.props;
    const { counter } = this.state;

    return children({
      counter,
      onClick: () => this.setState({ counter: counter + 1 }) });

  }}


function Example() {
  return (
    React.createElement("div", { className: "example-rows" },
    React.createElement(ClickableExample, null,
    ({ counter, onClick }) =>
    React.createElement(ReactTween, {
      style: {
        color: counter % 2 === 0 ? '#FF851B' : '#7FDBFF' } },


    (style) =>
    React.createElement("div", { className: "example-row" },
    React.createElement("div", {
      className: "example",
      onClick: onClick,
      style: { backgroundColor: style.color } }, "Click to animate")))),








    React.createElement(ClickableExample, null,
    ({ counter, onClick }) => {
      const styles = [
      {
        key: '0',
        style: { opacity: 1 } },

      {
        key: '1',
        style: { opacity: 1 } }];



      const filteredStyles = styles.slice(0, counter % 2 === 0 ? 1 : 2);

      return (
        React.createElement(ReactTween.TransitionGroup, {
          styles: filteredStyles,
          willEnter: style => ({ ...style.style, opacity: 0 }),
          willLeave: style => ({ ...style.style, opacity: 0 }) },

        (styles) =>
        React.createElement("div", { className: "example-row" },
        styles.map((style) =>
        React.createElement("div", {
          className: "example",
          key: style.key,
          onClick: onClick,
          style: { opacity: style.style.opacity } },

        style.key === '0' && React.createElement("span", null,
        counter % 2 === 0 && 'Click to add',
        counter % 2 === 1 && 'Click to remove'))))));







    })));



}

ReactDOM.render(React.createElement(Example, null), document.getElementById('content'));