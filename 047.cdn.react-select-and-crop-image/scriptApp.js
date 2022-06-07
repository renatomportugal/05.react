function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, { 
        value: value, 
        enumerable: true, 
        configurable: true, 
        writable: true });
      } else {
        obj[key] = value;
      }return obj;
    }const { Component, PureComponent, createRef, Fragment } = React;


    class SelectAndCrop extends PureComponent {
        constructor(...args) {
          super(...args);
          _defineProperty(this, "state",
            {
              isMouseDown: false, // to decide which action to make "resize or move" on "mousemove or touchmove"
              isMoveDiv: false, // to move div or not
              isResizeDiv: false, // to resize div or not
              ratioValue: "1:1", // resize div based on this value if user controls enabled
              isRatio: false, // enable/disable ratio resizing
              widthFromRatio: 0, // width ratio value
              heightFromRatio: 0, // height ratio value
              minimum_size: 20, // this is the minimum size of the div so that nodes will not stay on top of each other
              original: {
                // used to set the original values on any interaction
                width: 0,
                height: 0,
                x: 0,
                y: 0,
                mouse_x: 0,
                mouse_y: 0 },
      
              final: {
                // used to set the final data which is used to set the dimensions and the position of the resizable div and will be used for cropping the image as well
                width: 80,
                height: 80,
                x: 0,
                y: 0 },
      
              overlayN: {
                // north overlay styles
                right: 0,
                height: 0,
                left: 0 },
      
              overlayE: {
                // east overlay styles
                left: 0 },
      
              overlayS: {
                // south overlay styles
                right: 0,
                top: 0,
                left: 0 },
      
              overlayW: {
                // west overlay styles
                width: 0 },
      
              offset: [0, 0], // will be used to move the resizable div
              containerMaxWidth: 0, // width of the image container
              isImg: false, // show loader or image with resizers
              isLeftEnabled: false, // enable/disable to left button
              isRightEnabled: true, // enable/disable to right button
              isTopEnabled: false, // enable/disable to top button
              isBottomEnabled: true, // enable/disable to bottom button
              isFlippedVer: false, // flip image vertically
              isFlippedHor: false, // flip image horizontally
              isCropped: false, // show cropped image or original image with controls
              isTopLeftResize: false, // resize or not using the top left node
              isTopRightResize: false, // resize or not using the top right node
              isBottomLeftResize: false, // resize or not using the bottom left node
              isBottomRightResize: false, // resize or not using the bottom right node
              croppedSrc: "" // source of the cropped image so that we can send it to the parent component
            }
          );
        }
    }


class App extends Component {
    constructor(...args) {
        super(...args);
        _defineProperty(this,"state",
          {
            fileInputImage: "",
            isError: false
          }
        );
    }


    render() {
        const { fileInputImage, isError } = this.state;
        return (
          React.createElement(
            "div", { className: "container" },
            React.createElement(
              SelectAndCrop, {
                image: "./image_7150_2e-Hubble-Legacy-Field.jpg",
                getCroppedImg: this.getCroppedImgForth 
              }
            )
          )
        );
    }
}

ReactDOM.render(React.createElement(App, null), document.querySelector("#app"));