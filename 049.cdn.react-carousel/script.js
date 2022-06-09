!function () {
  const useState = React.useState;

  const SHAPES = [
  [
  "heart",
  `#heart {

  position: relative;
  width: 100px;
  height: 90px;

}

#heart::before, #heart::after {

  content: '';
  position: absolute;
  left: 50px;
  top: 0;
  width: 50px;
  height: 80px;
  background: red;
  border-radius: 50px 50px 0 0;
  transform: rotate(-45deg);
  transform-origin: 0 100%;

}

#heart::after {

  left: 0;
  transform: rotate(45deg);
  transform-origin: 100% 100%;

}`],

  [
  "pacman",
  `#pacman {

  width: 0px;
  height: 0px;
  border-right: 60px solid transparent;
  border-top: 60px solid orange;
  border-left: 60px solid orange;
  border-bottom: 60px solid orange;
  border-top-left-radius: 60px;
  border-top-right-radius: 60px;
  border-bottom-left-radius: 60px;
  border-bottom-right-radius: 60px;

}`],

  [
  "yin-yang",
  `#yin-yang {

  width: 96px;
  box-sizing: content-box;
  height: 48px;
  background: white;
  border-color: black;
  border-style: solid;
  border-width: 2px 2px 50px 2px;
  border-radius: 100%;
  position: relative;

}

#yin-yang::before {

  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  background: white;
  border: 18px solid black;
  border-radius: 100%;
  width: 12px;
  height: 12px;
  box-sizing: content-box;

}

#yin-yang::after {

  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  background: black;
  border: 18px solid white;
  border-radius: 100%;
  width: 12px;
  height: 12px;
  box-sizing: content-box;

}`],

  [
  "cut-diamond",
  `#cut-diamond {

  border-style: solid;
  border-color: transparent transparent DodgerBlue transparent;
  border-width: 0 25px 25px 25px;
  height: 0;
  width: 50px;
  box-sizing: content-box;
  position: relative;
  margin-bottom: 50px;

}

#cut-diamond::after {

  content: "";
  position: absolute;
  top: 25px;
  left: -25px;
  width: 0;
  height: 0;
  border-style: solid;
  border-color: DodgerBlue transparent transparent transparent;
  border-width: 70px 50px 0 50px;

}`],

  [
  "infinity",
  `#infinity {

  position: relative;
  width: 150px;
  height: 80px;
  box-sizing: content-box;

}

#infinity::before, #infinity::after {

  content: "";
  box-sizing: content-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  border: 15px solid green;
  border-radius: 40px 40px 0 40px;
  transform: rotate(-45deg);

}

#infinity::after {

  left: auto;
  right: 0;
  border-radius: 40px 40px 40px 0;
  transform: rotate(45deg);

}`]];



  function App(props) {
    const [app, updateApp] = useState({
      currentIndex: 0,
      lastIndex: -1,
      direction: 0 });


    return (
      React.createElement("div", { className: "wrapper" },
      React.createElement("div", { className: "intro" },
      React.createElement("h1", null, "\u201CThe Shapes of CSS\u201D"),
      React.createElement("h2", null, "from CSS-Tricks"),
      React.createElement("p", null, "an incredibly clever article written by ",
      React.createElement("span", null, "Chris Coyier"), ","),

      React.createElement("p", null, "shamelessly copied (only a little part) by me")),


      React.createElement(Carousel, {
        direction: app.direction,
        currentIndex: app.currentIndex,
        lastIndex: app.currentIndex,
        updateApp: updateApp,
        shapes: props.shapes }),


      React.createElement(Code, {
        direction: app.direction,
        lastShape: props.shapes[app.lastIndex],
        currentShape: props.shapes[app.currentIndex],
        shapes: props.shapes })));



  }

  function Carousel(props) {
    function showNext(index) {
      let lastIndex =
      index < 0 ?
      0 :
      index === props.shapes.length ?
      props.shapes.length - 1 :
      index;
      let currentIndex = index + 1 === props.shapes.length ? 0 : index + 1;
      props.updateApp({ currentIndex, lastIndex, direction: 1 });
    }

    function showPrevious(index) {
      let lastIndex = index < 0 ? 0 : index;
      let currentIndex = index - 1 < 0 ? props.shapes.length - 1 : index - 1;
      props.updateApp({ currentIndex, lastIndex, direction: -1 });
    }

    return (
      React.createElement("div", {
        className: "carousel carousel--" + props.shapes[props.currentIndex][0] },

      React.createElement("div", {
        onClick: () => showPrevious(props.currentIndex),
        className: "controls controls--back" },

      React.createElement("span", null)),


      React.createElement(Slide, { shape: props.shapes[props.currentIndex] }),

      React.createElement("div", {
        onClick: () => showNext(props.currentIndex),
        className: "controls controls--next" },

      React.createElement("span", null))));



  }

  function Slide(props) {
    const [copyMessage, setCopyMessage] = useState(false);

    function copyCSS(shapeCSS) {
      navigator.clipboard.writeText(shapeCSS).then(
      () => {
        console.log("Successfully copied CSS to clipboard");

        setCopyMessage(true);

        setTimeout(setCopyMessage, 2000, false);
      },
      () => {
        console.log("Error: couldn't copy to clipboard :(");
      });

    }

    return (
      React.createElement("div", { key: props.shape[0], className: "slide slide--" + props.shape[0] },
      React.createElement("h6", {
        className: "slide__copy-message " + (copyMessage ? "show" : "nope") }, "I am in your Clipboard!"),




      React.createElement("div", {
        onClick: () => copyCSS(props.shape[1]),
        className: "slide__shape slide__shape--" + props.shape[0] })));



  }

  function Code(props) {
    return (
      React.createElement("div", { className: "code-wrapper code-wrapper--" + props.currentShape[0] },
      React.createElement("pre", {
        key: props.currentShape[0],
        className:
        "code code--active" + (
        props.direction < 0 ? " slide-left" : " slide-right") },


      props.currentShape[1]),


      props.lastShape &&
      React.createElement("pre", {
        key: props.lastShape[0],
        className:
        "code code--last" + (
        props.direction < 0 ? " slide-left" : " slide-right") },


      props.lastShape[1])));




  }

  ReactDOM.render(React.createElement(App, { shapes: SHAPES }), document.getElementById("app"));
}();