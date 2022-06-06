var hasOwn = {}.hasOwnProperty;

function classNames() {
  var classes = '';

  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i];
    if (!arg) continue;

    var argType = typeof arg;

    if (argType === 'string' || argType === 'number') {
      classes += ' ' + arg;
    } else if (Array.isArray(arg)) {
      classes += ' ' + classNames.apply(null, arg);
    } else if (argType === 'object') {
      for (var key in arg) {
        if (hasOwn.call(arg, key) && arg[key]) {
          classes += ' ' + key;
        }
      }
    }
  }

  return classes.substr(1);
}

class SlideShow extends React.Component {
  constructor() {
    super();
    this.state = { activeIndex: 0 };
  }
  jumpToSlide(index) {
    this.setState({ activeIndex: index });
  }
  render() {
    return (
      React.createElement("div", { className: "slideshow" },
      React.createElement("ul", { className: "slideshow-slides" },

      this.props.slides.map((slide, index) =>
      React.createElement("li", { className: classNames({ active: index == this.state.activeIndex }) },
      React.createElement("figure", null,
      React.createElement("img", { src: slide.imageUrl }),
      slide.caption ? React.createElement("figcaption", null, slide.caption) : null)))),





      React.createElement("ul", { className: "slideshow-dots" },

      this.props.slides.map((slide, index) =>
      React.createElement("li", { className: index == this.state.activeIndex ? 'active' : '' },
      React.createElement("a", { onClick: event => this.jumpToSlide(index) }, index + 1))))));






  }}


let _slides = [{
  imageUrl: "https://i.ytimg.com/vi/MxwjEacvrtY/hqdefault.jpg",
  caption: "Allan Allan Al Al Allan" },
{
  imageUrl: "https://pbs.twimg.com/profile_images/2576554888/s8vftzr3j0a9r703xdfn.jpeg",
  caption: "Steve Steve Steve" }];


class App extends React.Component {
  render() {
    return React.createElement(SlideShow, { slides: _slides });
  }}


var root = document.querySelector('#root');
ReactDOM.render(React.createElement(App, null), root);