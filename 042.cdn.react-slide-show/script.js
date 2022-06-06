function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}let { Component } = React;

class SlideShow extends Component {constructor(...args) {super(...args);_defineProperty(this, "state",
    {
      activeIndex: 0,
      nextActiveIndex: 0,
      activeIndexClasses: ["active-slide"],
      nextActiveIndexClasses: [],
      disablePrevNext: false,
      xCoordinate: null });_defineProperty(this, "direction",


    "to-left");_defineProperty(this, "slideTimeOut",

    this.props.activeSlideDuration ?
    this.props.activeSlideDuration :
    3000);_defineProperty(this, "animationDuration",



    600);_defineProperty(this, "autoSlide", void 0);_defineProperty(this, "interactionMode",



    this.props.interactionMode ?
    this.props.interactionMode :
    "swipe");_defineProperty(this, "unify",










    e => e.changedTouches ? e.changedTouches[0] : e);_defineProperty(this, "getSetXCoordinate",


    (e) =>
    this.setState({ xCoordinate: this.unify(e).clientX }));_defineProperty(this, "moveSlide",


    e => {
      const { xCoordinate } = this.state;
      if (xCoordinate || xCoordinate === 0) {
        let dx = this.unify(e).clientX - xCoordinate,
        s = Math.sign(dx);
        if (s < 0) {
          this.nextSlide();
        } else if (s > 0) {
          this.prevSlide();
        }
      }
    });_defineProperty(this, "animateSliding",


    () => {
      let activeIndexClasses = [];
      let nextActiveIndexClasses = [];

      // attach the following classes if the user click the next button
      if (this.direction === "to-left") {
        activeIndexClasses.push("active-slide", "exit-to-left");
        nextActiveIndexClasses.push(
        "active-slide",
        "next-active-slide",
        "enter-to-left");

      } else {
        // attach the following classes if the user click the prev button
        activeIndexClasses.push("active-slide", "exit-to-right");
        nextActiveIndexClasses.push(
        "active-slide",
        "next-active-slide",
        "enter-to-right");

      }

      this.setState({
        activeIndexClasses: activeIndexClasses,
        nextActiveIndexClasses: nextActiveIndexClasses });

    });_defineProperty(this, "startAutoSliding",


    () => {
      const { autoPlay } = this.props;

      this.autoSlide = autoPlay ?
      setInterval(this.nextSlide, this.slideTimeOut) :
      null;
    });_defineProperty(this, "stopAutoSliding",


    () => {
      clearInterval(this.autoSlide);
    });_defineProperty(this, "restartAutoSliding",


    nextAcIn => {
      this.setState({
        nextActiveIndex: nextAcIn,
        disablePrevNext: true });


      // attach the required classes to animate the transition between slides
      this.animateSliding();

      // reset classes and enable prev & next btns after the animation duration
      this.setActiveSlide(nextAcIn);

      // restart auto sliding
      this.startAutoSliding();
    });_defineProperty(this, "setActiveSlide",


    nextActiveI => {
      setTimeout(() => {
        this.setState({
          activeIndex: nextActiveI,
          activeIndexClasses: ["active-slide"],
          nextActiveIndexClasses: [],
          disablePrevNext: false });

      }, this.animationDuration);
    });_defineProperty(this, "nextSlide",

    () => {
      const { activeIndex } = this.state;
      const { children } = this.props;

      //stop auto sliding (so that when user click the next button we can reset the timer for auto sliding)
      this.stopAutoSliding();

      // set direction to left because slide is coming from the right side to the view port
      this.direction = "to-left";

      // set the next active index
      let nextActiveI = activeIndex + 1;

      // if the we reach the last slide reset the next active index to 0
      if (nextActiveI === children.length) {
        nextActiveI = 0;
      }

      // restart auto sliding
      this.restartAutoSliding(nextActiveI);
    });_defineProperty(this, "prevSlide",

    () => {
      const { activeIndex } = this.state;
      const { children } = this.props;

      //stop auto sliding (so that when user click the prev button we can reset the timer for auto sliding)
      this.stopAutoSliding();

      // set direction to right because slide is coming from the left side to the view port
      this.direction = "to-right";

      // set the next active index
      let nextActiveI = activeIndex - 1;

      // if we are at the first slide set the next active index to the last slide
      if (nextActiveI < 0) {
        nextActiveI = children.length - 1;
      }

      // restart auto sliding
      this.restartAutoSliding(nextActiveI);
    });_defineProperty(this, "onCarouselIndecator",

    index => {
      const { activeIndex } = this.state;

      //stop auto sliding
      this.stopAutoSliding();

      // set the next active index
      let nextActiveI = index;

      // set the direction of the carousel based on the clicked indicator index
      if (nextActiveI < activeIndex) {
        this.direction = "to-right";
      } else {
        this.direction = "to-left";
      }

      // restart auto sliding
      this.restartAutoSliding(nextActiveI);
    });}componentDidMount() {this.startAutoSliding();}componentWillUnmount() {this.stopAutoSliding();} // used to unify the touch and click cases

  render() {
    const {
      activeIndex,
      nextActiveIndex,
      activeIndexClasses,
      nextActiveIndexClasses,
      disablePrevNext } =
    this.state;

    const {
      alignIndicators,
      alignCaption,
      useRightLeftTriangles,
      leftTriangleColor,
      leftIcon,
      rightTriangleColor,
      rightIcon,
      indicatorsColor,
      interactionMode,
      children } =
    this.props;

    // use it to set the indicator position based on the coming props
    let indicatorPosition = "position-center";

    if (alignIndicators === "right") {
      indicatorPosition = "position-right";
    } else if (alignIndicators === "left") {
      indicatorPosition = "position-left";
    }

    return (
      React.createElement("div", {
        className: "carousel-slider-wrapper",
        style: {
          cursor: interactionMode === "swipe" ? "pointer" : "" },

        onMouseDown: e => {
          if (this.interactionMode !== "swipe") {
            return;
          }
          this.getSetXCoordinate(e);
        },
        onTouchStart: e => {
          if (this.interactionMode !== "swipe") {
            return;
          }
          this.getSetXCoordinate(e);
        },
        onMouseUp: e => {
          if (disablePrevNext || this.interactionMode !== "swipe") {
            return;
          }
          this.moveSlide(e);
        },
        onTouchEnd: e => {
          if (disablePrevNext || this.interactionMode !== "swipe") {
            return;
          }
          this.moveSlide(e);
        },
        onMouseMove: e => {
          if (this.interactionMode !== "swipe") {
            return;
          }
          e.preventDefault();
        },
        onTouchMove: e => {
          if (this.interactionMode !== "swipe") {
            return;
          }
          e.preventDefault();
        } },




      children.map((el, i) => {
        let classes = "";

        if (i === activeIndex) {
          classes = activeIndexClasses.join(" ");
        } else if (i === nextActiveIndex) {
          classes = nextActiveIndexClasses.join(" ");
        }

        const swipeClass =
        interactionMode === "swipe" ? "swipe" : "";

        return (
          React.createElement("div", {
            key: i,
            className: `carousel-slide ${classes} ${swipeClass}`,
            style: { textAlign: alignCaption }
            // the following events to pause the auto slide on hover
            , onMouseEnter: () => {
              if (this.interactionMode !== "hover") {
                return;
              }
              this.stopAutoSliding();
            },
            onMouseLeave: () => {
              if (this.interactionMode !== "hover") {
                return;
              }
              this.startAutoSliding();
            } },

          el.props.children));


      }),

      React.createElement("div", { className: "carousel-left-arrow carousel-control" },
      React.createElement("div", {
        className: useRightLeftTriangles ? "left-triangle" : "",
        style: {
          borderLeftColor: useRightLeftTriangles ?
          leftTriangleColor :
          "" } }),


      React.createElement("button", {
        className:
        !useRightLeftTriangles ? "padding-left-15" : "",

        disabled: disablePrevNext,
        onClick: () => {
          children.length !== 1 ? this.prevSlide() : null;
        } },

      leftIcon ?
      leftIcon :

      React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 256 512" },
      React.createElement("path", { d: "M231.293 473.899l19.799-19.799c4.686-4.686 4.686-12.284 0-16.971L70.393 256 251.092 74.87c4.686-4.686 4.686-12.284 0-16.971L231.293 38.1c-4.686-4.686-12.284-4.686-16.971 0L4.908 247.515c-4.686 4.686-4.686 12.284 0 16.971L214.322 473.9c4.687 4.686 12.285 4.686 16.971-.001z" })))),




      React.createElement("div", { className: "carousel-right-arrow carousel-control" },
      React.createElement("div", {
        className: useRightLeftTriangles ? "right-triangle" : "",
        style: {
          borderRightColor: useRightLeftTriangles ?
          rightTriangleColor :
          "" } }),


      React.createElement("button", {
        className:
        !useRightLeftTriangles ? "padding-right-15" : "",

        disabled: disablePrevNext,
        onClick: () => {
          children.length !== 1 ? this.nextSlide() : null;
        } },

      rightIcon ?
      rightIcon :

      React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 256 512" },
      React.createElement("path", { d: "M24.707 38.101L4.908 57.899c-4.686 4.686-4.686 12.284 0 16.971L185.607 256 4.908 437.13c-4.686 4.686-4.686 12.284 0 16.971L24.707 473.9c4.686 4.686 12.284 4.686 16.971 0l209.414-209.414c4.686-4.686 4.686-12.284 0-16.971L41.678 38.101c-4.687-4.687-12.285-4.687-16.971 0z" })))),





      React.createElement("ol", { className: `carousel-indicators ${indicatorPosition}` },
      children.map((el, i) =>
      React.createElement("li", {
        key: i,
        className: i === nextActiveIndex ? "active" : "",
        style:
        indicatorsColor ?
        {
          borderColor: indicatorsColor,
          backgroundColor:
          i === nextActiveIndex ?
          indicatorsColor :
          "",
          ":hover": {
            backgroundColor: indicatorsColor,
            opacity: i === nextActiveIndex ? 1 : 0.7 } } :


        {},

        onClick: () => {
          children.length !== 1 ?
          this.onCarouselIndecator(i) :
          null;
        } })))));





  }}


// used for inline styles with pseudo selectors
// Note the following line just for codepen and if you open the devTool you will see an error. to solve this error see the next comment
SlideShow = Radium(SlideShow);
// to use it in your app replace the previous line with the following
// - export default Radium(SlideShow);

const app =
React.createElement("div", { className: "text-center container" },















React.createElement("h3", null, "Example with swip interaction mode (swip to right/left)"),
React.createElement(SlideShow, {
  autoPlay: true,
  activeSlideDuration: 3000,
  interactionMode: "swipe",
  alignCaption: "center",
  alignIndicators: "center",
  indicatorsColor: "#fff",
  useRightLeftTriangles: true,
  rightTriangleColor: "#fff",
  leftTriangleColor: "#fff",
  rightIcon:
  React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 256 512" },
  React.createElement("path", { d: "M24.707 38.101L4.908 57.899c-4.686 4.686-4.686 12.284 0 16.971L185.607 256 4.908 437.13c-4.686 4.686-4.686 12.284 0 16.971L24.707 473.9c4.686 4.686 12.284 4.686 16.971 0l209.414-209.414c4.686-4.686 4.686-12.284 0-16.971L41.678 38.101c-4.687-4.687-12.285-4.687-16.971 0z" })),


  leftIcon:
  React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 256 512" },
  React.createElement("path", { d: "M231.293 473.899l19.799-19.799c4.686-4.686 4.686-12.284 0-16.971L70.393 256 251.092 74.87c4.686-4.686 4.686-12.284 0-16.971L231.293 38.1c-4.686-4.686-12.284-4.686-16.971 0L4.908 247.515c-4.686 4.686-4.686 12.284 0 16.971L214.322 473.9c4.687 4.686 12.285 4.686 16.971-.001z" })) },



React.createElement("div", null,
React.createElement("img", { src: "https://picsum.photos/1280/500/?image=819" }),
React.createElement("div", { className: "carousel-caption" },
React.createElement("h3", { className: "carousel-caption-title" }, "Frist title"),
React.createElement("p", { className: "carousel-caption-subtitle" }, "First subtitle"))),


React.createElement("div", null,
React.createElement("img", { src: "https://picsum.photos/1280/500/?image=2" }),
React.createElement("div", { className: "carousel-caption" },
React.createElement("h3", { className: "carousel-caption-title" }, "Second title"),
React.createElement("p", { className: "carousel-caption-subtitle" }, "Second subtitle"))),


React.createElement("div", null,
React.createElement("img", { src: "https://picsum.photos/1280/500/?image=26" }),
React.createElement("div", { className: "carousel-caption" },
React.createElement("h3", { className: "carousel-caption-title" }, "Third title"),
React.createElement("p", { className: "carousel-caption-subtitle" }, "Third subtitle")))),



React.createElement("hr", null),
React.createElement("h3", null, "Example with hover interaction mode (hover over a slide to pause auto play)"),
React.createElement(SlideShow, {
  autoPlay: true,
  interactionMode: "hover",
  useRightLeftTriangles: true },

React.createElement("div", null,
React.createElement("img", { src: "https://picsum.photos/id/64/1280/500" }),
React.createElement("div", { className: "carousel-caption" },
React.createElement("h3", { className: "carousel-caption-title" }, "Frist title"),
React.createElement("p", { className: "carousel-caption-subtitle" }, "First subtitle"))),


React.createElement("div", null,
React.createElement("img", { src: "https://picsum.photos/id/234/1280/500" }),
React.createElement("div", { className: "carousel-caption" },
React.createElement("h3", { className: "carousel-caption-title" }, "Second title"),
React.createElement("p", { className: "carousel-caption-subtitle" }, "Second subtitle"))),


React.createElement("div", null,
React.createElement("img", { src: "https://picsum.photos/id/790/1280/500" }),
React.createElement("div", { className: "carousel-caption" },
React.createElement("h3", { className: "carousel-caption-title" }, "Third title"),
React.createElement("p", { className: "carousel-caption-subtitle" }, "Third subtitle")))),



React.createElement("hr", null),
React.createElement("h3", null, "Example with default values and auto play"),
React.createElement(SlideShow, { autoPlay: true },
React.createElement("div", null,
React.createElement("img", { src: "https://picsum.photos/1280/500/?image=27" }),
React.createElement("div", { className: "carousel-caption" },
React.createElement("h3", { className: "carousel-caption-title" }, "Frist title"),
React.createElement("p", { className: "carousel-caption-subtitle" }, "First subtitle"))),


React.createElement("div", null,
React.createElement("img", { src: "https://picsum.photos/1280/500/?image=50" }),
React.createElement("div", { className: "carousel-caption" },
React.createElement("h3", { className: "carousel-caption-title" }, "Second title"),
React.createElement("p", { className: "carousel-caption-subtitle" }, "Second subtitle"))),


React.createElement("div", null,
React.createElement("img", { src: "https://picsum.photos/1280/500/?image=55" }),
React.createElement("div", { className: "carousel-caption" },
React.createElement("h3", { className: "carousel-caption-title" }, "Third title"),
React.createElement("p", { className: "carousel-caption-subtitle" }, "Third subtitle")))));






ReactDOM.render(app, document.querySelector("#app"));