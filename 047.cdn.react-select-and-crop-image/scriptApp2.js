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

// loader component
const Loader = () =>
React.createElement("div", { className: "loader" },
React.createElement("span", null),
React.createElement("span", null),
React.createElement("span", null));

// crop image component
class CropImage extends PureComponent {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "imageObject",new Image());
    _defineProperty(this, "getImagePortion",
      (imgObject, newWidth, newHeight, startX, startY) => {
        // setIsCropped => a method to set a flag whether image is cropped or not
        const { setIsCropped, getCroppedImg, isFlippedHor, isFlippedVer } = this.props,
        cropCanvas = document.createElement("canvas"),
        cropCanvasContext = cropCanvas.getContext("2d"),
        originalImage = document.createElement('canvas'),
        originalImageContext = originalImage.getContext('2d'),
        imageWidth = imgObject.width,
        imageHeight = imgObject.height,
        scaleH = isFlippedHor ? -1 : 1, // Set horizontal scale to -1 if flip horizontal
        scaleV = isFlippedVer ? -1 : 1, // Set verical scale to -1 if flip vertical
        posX = isFlippedHor ? imageWidth * -1 : 0, // Set x position to -100% if flip horizontal
        posY = isFlippedVer ? imageHeight * -1 : 0; // Set y position to -100% if flip vertical
        let scale = 1;
        cropCanvas.width = newWidth;
        cropCanvas.height = newHeight;

        if (imageWidth > document.documentElement.offsetWidth) {
          scale = imageWidth / document.documentElement.offsetWidth;
        }

        // canvas of original image
        originalImage.width = imageWidth;
        originalImage.height = imageHeight;
        originalImageContext.drawImage(imgObject, 0, 0);

        originalImageContext.save(); // Save the current state
        originalImageContext.scale(scaleH, scaleV); // Set scale to flip the image
        originalImageContext.drawImage(imgObject, posX, posY, imageWidth, imageHeight); // draw the image
        originalImageContext.restore(); // Restore the last saved state

        cropCanvasContext.drawImage(
        originalImage,
        startX * scale,
        startY * scale,
        newWidth * scale,
        newHeight * scale,
        0,
        0,
        newWidth,
        newHeight);

        const croppedSrc = cropCanvas.toDataURL();

        setIsCropped(true);
        getCroppedImg(croppedSrc);
      }
    );
  }
  componentDidMount() {
    const { imageSrc } = 
      this.props;
      this.imageObject.src = imageSrc;
      this.imageObject.setAttribute("crossOrigin", "anonymous");
  }

  render() {
    const { width, height, x, y } = this.props;

    return (
      React.createElement(
        "div", {className: "crop-image-component-wrapper" },
        React.createElement(
          "button", {
            className: "btn btn-danger",
            onClick: () => this.getImagePortion(this.imageObject, width, height, x, y) 
          }, "Crop"
        )
      )
    );
  }}


// SelectAndCropControls component
const SelectAndCropControls = ({
  isLeftDisabled, // enable/disable to left button
  isRightDisabled, // enable/disable to right button
  isTopDisabled, // enable/disable to top button
  isBottomDisabled, // enable/disable to bottom button
  flipImageVertically, // allows user to flip image verically
  flipImageHorizontally, // allows user to flip image horizontally
  pushResizableToLeft, // method to push resizable div to left
  pushResizableToRight, // method to push resizable div to right
  pushResizableToTop, // method to push resizable div to top
  pushResizableToBottom, // method to push resizable div to bottom
  resetData, // method to reset all data
  onRatioChange, // method to handle ratio change
  ratioValue // used to add active styles to the checked ratio button
}) => {
  return (
    React.createElement("div", { className: "controls-wrapper" },
    React.createElement("div", { className: "controls" },
    React.createElement("div", { className: "control-col" },
    React.createElement("div", { className: "btn-group" },
    React.createElement("input", {
      type: "radio",
      name: "aspect-ratio",
      value: "1:1",
      id: "firstRatio",
      checked: ratioValue === "1:1",
      onChange: onRatioChange }),

    React.createElement("label", {
      className: "btn btn-primary on-top",
      "data-tool-tip": "Ratio 1 / 1",
      htmlFor: "firstRatio" }, "1:1"),



    React.createElement("input", {
      type: "radio",
      name: "aspect-ratio",
      value: "3:2",
      id: "secondRatio",
      checked: ratioValue === "3:2",
      onChange: onRatioChange }),

    React.createElement("label", {
      className: "btn btn-primary on-top",
      "data-tool-tip": "Ratio 3 / 2",
      htmlFor: "secondRatio" }, "3:2"),



    React.createElement("input", {
      type: "radio",
      name: "aspect-ratio",
      value: "4:3",
      id: "thirdRatio",
      checked: ratioValue === "4:3",
      onChange: onRatioChange }),

    React.createElement("label", {
      className: "btn btn-primary on-top",
      "data-tool-tip": "Ratio 4 / 3",
      htmlFor: "thirdRatio" }, "4:3"),



    React.createElement("input", {
      type: "radio",
      name: "aspect-ratio",
      value: "16:9",
      id: "forthRatio",
      checked: ratioValue === "16:9",
      onChange: onRatioChange }),

    React.createElement("label", {
      className: "btn btn-primary on-top",
      "data-tool-tip": "Ratio 16 / 9",
      htmlFor: "forthRatio" }, "16:9"),



    React.createElement("input", {
      type: "radio",
      name: "aspect-ratio",
      value: "16:10",
      id: "fifthRatio",
      checked: ratioValue === "16:10",
      onChange: onRatioChange }),

    React.createElement("label", {
      className: "btn btn-primary on-top",
      "data-tool-tip": "Ratio 16 / 10",
      htmlFor: "fifthRatio" }, "16:10"),



    React.createElement("input", {
      type: "radio",
      name: "aspect-ratio",
      value: "free",
      id: "sixthRatio",
      checked: ratioValue === "free",
      onChange: onRatioChange }),

    React.createElement("label", {
      className: "btn btn-primary on-top",
      "data-tool-tip": "Free ratio",
      htmlFor: "sixthRatio" }, "Free"))),





    React.createElement("div", { className: "control-col" },
    React.createElement("div", { className: "btn-group" },
    React.createElement("button", {
      className: "btn btn-primary on-top",
      "data-tool-tip": "To left",
      disabled: isLeftDisabled,
      onClick: pushResizableToLeft },

    React.createElement("i", { className: "fas fa-arrow-left" })),

    React.createElement("button", {
      className: "btn btn-primary on-top",
      "data-tool-tip": "To right",
      disabled: isRightDisabled,
      onClick: pushResizableToRight },

    React.createElement("i", { className: "fas fa-arrow-right" })),

    React.createElement("button", {
      className: "btn btn-primary on-top",
      "data-tool-tip": "To top",
      disabled: isTopDisabled,
      onClick: pushResizableToTop },

    React.createElement("i", { className: "fas fa-arrow-up" })),

    React.createElement("button", {
      className: "btn btn-primary on-top",
      "data-tool-tip": "To bottom",
      disabled: isBottomDisabled,
      onClick: pushResizableToBottom },

    React.createElement("i", { className: "fas fa-arrow-down" })))),



    React.createElement("div", { className: "control-col" },
    React.createElement("div", { className: "btn-group" },
    React.createElement("button", {
      className: "btn btn-primary on-top",
      "data-tool-tip": "Flip horizontally",
      onClick: flipImageHorizontally },

    React.createElement("i", { className: "fas fa-arrows-alt-h" })),

    React.createElement("button", {
      className: "btn btn-primary on-top",
      "data-tool-tip": "Flip vertically",
      onClick: flipImageVertically },

    React.createElement("i", { className: "fas fa-arrows-alt-v" })))),



    React.createElement("div", { className: "control-col" },
    React.createElement("div", { className: "btn-group" },
    React.createElement("button", {
      className: "btn btn-primary on-top",
      "data-tool-tip": "Reset",
      onClick: resetData },

    React.createElement("i", { className: "fas fa-sync-alt" })))))));






};

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
    _defineProperty(this, "loadTimer", void 0);
    _defineProperty(this, "img", new Image());
    _defineProperty(this, "resizeMoveCropContainer",createRef());
    _defineProperty(this, "resizable",createRef());
    _defineProperty(this, "element", void 0);
    _defineProperty(this, "parentWidth", void 0);
    _defineProperty(this, "parentHeight", void 0);
    _defineProperty(this, "parentY", void 0);
    _defineProperty(this, "parentX", void 0);
    _defineProperty(this, "handleMouseMove",
      e => {
        if (this.state.isMouseDown) {
          if (this.state.isResizeDiv) {
            //resize logic
            this.resize(e);
          }
          if (this.state.isMoveDiv) {
            //move logic
            this.move(e);
          }
        }
      }
    );
    _defineProperty(this, "handleResizerClick",
      () => {
        this.setState({
          isMouseDown: true,
          isResizeDiv: true,
          isMoveDiv: false });
      }
    );
    _defineProperty(this, "handleNodeResize",
      e => {
        e.preventDefault();
        e.stopPropagation();
        this.getDimensionsAndPosition(e);
        this.handleResizerClick();
      }
    );
    _defineProperty(this, "onTopLeftResize",
      e => {
        this.handleNodeResize(e);
        this.setState({
          isTopLeftResize: true,
          isTopRightResize: false,
          isBottomLeftResize: false,
          isBottomRightResize: false 
        });
      }
    );
    _defineProperty(this, "onTopRightResize",
      e => {
        this.handleNodeResize(e);
        this.setState({
          isTopLeftResize: false,
          isTopRightResize: true,
          isBottomLeftResize: false,
          isBottomRightResize: false 
        });
      }
    );
    _defineProperty(this, "onBottomLeftResize",
      e => {
        this.handleNodeResize(e);
        this.setState({
          isTopLeftResize: false,
          isTopRightResize: false,
          isBottomLeftResize: true,
          isBottomRightResize: false 
        });
      }
    );
    _defineProperty(this, "onBottomRightResize",
      e => {
        this.handleNodeResize(e);
        this.setState({
          isTopLeftResize: false,
          isTopRightResize: false,
          isBottomLeftResize: false,
          isBottomRightResize: true 
        });
      }
    );
    _defineProperty(this, "handleMoveClick",
      e => {
        let newMouseX = e.clientX || e.pageX || e.touches && e.touches[0].clientX;
        let newMouseY = e.clientY || e.pageY || e.touches && e.touches[0].clientY;

        this.setState({
          isMouseDown: true,
          isResizeDiv: false,
          isMoveDiv: true,
          offset: [
          this.element.offsetLeft - newMouseX,
          this.element.offsetTop - newMouseY] 
        });
        this.getDimensionsAndPosition(e);
      }
    );
    _defineProperty(this, "handleMouseUp",
      () => {
        this.setState({
          isMouseDown: false,
          isResizeDiv: false,
          isMoveDiv: false 
        });
      }
    );
    _defineProperty(this, "getDimensionsAndPosition",
      e => {
        this.setState({
          original: {
            width: this.element.offsetWidth,
            height: this.element.offsetHeight,
            x: this.element.offsetLeft,
            y: this.element.offsetTop,
            mouse_x: e.clientX || e.pageX || e.touches && e.touches[0].clientX,
            mouse_y: e.clientY || e.pageY || e.touches && e.touches[0].clientY 
          } 
        });
      }
    );
    _defineProperty(this, "onImgLoaded",
      () => {
        if (this.loadTimer !== null) {
          clearTimeout(this.loadTimer);
        }

        // if image is not completed call the current method recursively
        if (!this.img.complete) {
          this.loadTimer = setTimeout(() => {
            this.onImgLoaded();
          }, 3);
        } else {
          this.updateWrapperWidth();
          this.setState({ isImg: true });
        }
      }
    );
    _defineProperty(this, "updateWrapperWidth",
      () => {
        let containerMaxWidth = document.documentElement.clientWidth <= this.img.width ? "100%" : this.img.width + "px";
        this.setState({ containerMaxWidth: containerMaxWidth });

        // get data
        this.parentWidth = this.element.parentNode.getBoundingClientRect().width;
        this.parentHeight = this.element.parentNode.getBoundingClientRect().height;
        this.parentY = this.element.parentNode.getBoundingClientRect().y;
        this.parentX = this.element.parentNode.getBoundingClientRect().x;
        this.repositionOverlay();
      }
    );
    _defineProperty(this, "repositionOverlay",
      () => {
        const { final: { width, height, x, y } } = this.state;
        if (this.parentWidth) {
          this.setState({
            overlayN: {
              right: this.parentWidth - x - width,
              height: y,
              left: x },

            overlayE: {
              left: x + width },

            overlayS: {
              right: this.parentWidth - x - width,
              top: y + height,
              left: x },

            overlayW: {
              width: x } 
          });
        }
      }
    );
    _defineProperty(this, "repositionOverlayUserControls",
      (width, height, x, y) => {
        if (this.parentWidth) {
          this.setState({
            overlayN: {
              right: this.parentWidth - x - width,
              height: y,
              left: x },

            overlayE: {
              left: x + width },

            overlayS: {
              right: this.parentWidth - x - width,
              top: y + height,
              left: x },

            overlayW: {
              width: x } 
          });
        }
      }
    );
    _defineProperty(this, "setRatio",
      rValue => {
        const { final: { width } } = this.state, { ratioWidth, ratioHeight, allowUserControls } = this.props;

        // if (developer ratio and not user controls) => use props data to set ratio
        if (ratioWidth && ratioHeight && !allowUserControls) {
          const updatedFinal = {
            ...this.state.final,
            height: width * (ratioHeight / ratioWidth) 
          };

          this.setState({
            final: updatedFinal,
            isRatio: true,
            widthFromRatio: ratioWidth / ratioHeight,
            heightFromRatio: ratioHeight / ratioWidth 
          });
        }
        // if (developer ratio and user controls || user controls) => user user controls to set ratio
        else if ( ratioWidth && ratioHeight && allowUserControls || allowUserControls ){
          switch (rValue) {
            case "1:1":
              this.updateWidthHeightRatio(true, 1, 1);
              break;
            case "3:2":
              this.updateWidthHeightRatio(true, 3, 2);
              break;
            case "4:3":
              this.updateWidthHeightRatio(true, 4, 3);
              break;
            case "16:9":
              this.updateWidthHeightRatio(true, 16, 9);
              break;
            case "16:10":
              this.updateWidthHeightRatio(true, 16, 10);
              break;
            default:
              this.setState({ isRatio: false });
              break;
          }
        }
      }
    );
    _defineProperty(this, "updateWidthHeightRatio",
      (isRatio, width, height) => {
        const { final: { x, y } } = this.state,
        rWidth = width,
        rHeight = height,
        finalWidth = this.state.final.width,
        finalHeight = finalWidth * (height / width),
        updatedFinal = { ...this.state.final, height: finalHeight };
        this.setState({
          final: updatedFinal,
          isRatio: isRatio,
          widthFromRatio: rWidth / rHeight,
          heightFromRatio: rHeight / rWidth 
        });
        this.repositionOverlayUserControls(finalWidth, finalHeight, x, y);
      }
    );
    _defineProperty(this, "setFullWidthToRight",
      ({ width, final }) => {
        // if current x + current width is less than parent width (means we are in the parent div) => set width to the coming width
        if (final.x + width <= this.parentWidth) {
          const updatedFinal = { ...this.state.final, width: width };
          // enable/disable (push to right) button
          this.enableRightButton(final.x, width);
          this.setState({ final: updatedFinal });
        } else {
          // opposite => set width to parent width - current x
          const newWidth = this.parentWidth - final.x,
          updatedFinal = {
            ...this.state.final,
            width: newWidth };
          // enable/disable (push to right) button
          this.enableRightButton(final.x, newWidth);
          this.setState({ final: updatedFinal });
        }
      }
    );
    _defineProperty(this, "setFullWidthToLeft",
    ({ width, newMouseX, original, final }) => {
      // if initial x + (current mouse x - initial mouse x) is greater than 0 (means we are in the parent div) => set "width to comming width" and "x to initial x + (current mouse x - initial mouse x)"
      if (original.x + (newMouseX - original.mouse_x) >= 0) {
        const newX = original.x + (newMouseX - original.mouse_x),
        updatedFinal = {
          ...this.state.final,
          width: width,
          x: newX };


        // enable/disable (push to left) button
        this.enableLeftButton(newX);

        // enable/disable (push to right) button
        this.enableRightButton(newX, width);

        this.setState({ final: updatedFinal });
      } else {
        // opposite => set "width to current width + current x of current element" and "x to 0"
        const newWidth = final.width + final.x,
        updatedFinal = {
          ...this.state.final,
          width: newWidth,
          x: 0 };


        // enable/disable (push to left) button
        this.enableLeftButton(0);

        // enable/disable (push to right) button
        this.enableRightButton(0, newWidth);

        this.setState({ final: updatedFinal });
      }
    });_defineProperty(this, "setFullHeightToTop",


    ({ height, newMouseY, original, final }) => {
      // if initial y + (current mouse y - initial mouse y) is greater than 0 (means we are in the parent div) => set "height to coming height" and "y to initial y + (current mouse y - initial mouse y)"
      if (original.y + (newMouseY - original.mouse_y) >= 0) {
        const newY = original.y + (newMouseY - original.mouse_y),
        updatedFinal = {
          ...this.state.final,
          height: height,
          y: newY };


        // enable/disable (push to top) button
        this.enableTopButton(newY);

        this.setState({ final: updatedFinal });
      } else {
        // opposite => set "height to current height + current y of current element" and "y to 0"
        const newHeight = final.height + final.y,
        updatedFinal = {
          ...this.state.final,
          height: newHeight,
          y: 0 };


        // enable/disable (push to top) button
        this.enableTopButton(0);

        this.setState({ final: updatedFinal });
      }
    });_defineProperty(this, "setFullHeightToBottom",


    ({ height, final }) => {
      // if current y + current height is less than parent height (means we are in the parent div) => set height to the comming height
      if (final.y + height <= this.parentHeight) {
        const updatedFinal = { ...this.state.final, height: height };

        // enable/disable (push to bottom) button
        this.enableBottomButton(final.y, height);

        this.setState({ final: updatedFinal });
      } else {
        // opposite => set height to parent height - current y
        const newHeight = this.parentHeight - final.y,
        updatedFinal = {
          ...this.state.final,
          height: newHeight };


        // enable/disable (push to bottom) button
        this.enableBottomButton(final.y, newHeight);

        this.setState({ final: updatedFinal });
      }
    });_defineProperty(this, "setRatioToBottomLeft",



    ({
      width,
      newMouseX,
      minimum_size,
      original,
      final }) =>
    {
      const { widthFromRatio, heightFromRatio } = this.state,
      newHeight = heightFromRatio * width;
      // if initial x + (current mouse x - initial mouse x) is greater than 0 (means we are in the parent div)
      if (original.x + (newMouseX - original.mouse_x) >= 0) {
        /* if (new height > minimum size) and (new height + current y <= parent div height)
                                                             * set "width to coming width", "height to ratio height" and "x to initial x + (current mouse x - initial mouse x)*/
        if (
        newHeight > minimum_size &&
        newHeight + final.y <= this.parentHeight)
        {
          const newX = original.x + (newMouseX - original.mouse_x),
          finalHeight = heightFromRatio * width,
          updatedFinal = {
            ...this.state.final,
            width: width,
            height: finalHeight,
            x: newX };


          // enable/disable (push to left) button
          this.enableLeftButton(newX);

          // enable/disable (push to right) button
          this.enableRightButton(newX, width);

          // enable/disable (push to bottom) button
          this.enableBottomButton(final.y, finalHeight);

          this.setState({ final: updatedFinal });
        } else
        if (newHeight + final.y >= this.parentHeight) {
          /*if ratio height + current y is greater than parent div height =>
                                                       * set "width to (parent div height - current y) * ratio", "height to parent div height - current y" and "x to (old x + old width) - new width" */
          const oldOccupiedSpaceX = final.x + final.width,
          newWidth = (this.parentHeight - final.y) * widthFromRatio,
          newX = oldOccupiedSpaceX - newWidth,
          finalHeight = this.parentHeight - final.y,
          updatedFinal = {
            ...this.state.final,
            width: newWidth,
            height: finalHeight,
            x: newX };


          // enable/disable (push to left) button
          this.enableLeftButton(newX);

          // enable/disable (push to right) button
          this.enableRightButton(newX, newWidth);

          // enable/disable (push to bottom) button
          this.enableBottomButton(final.y, finalHeight);

          this.setState({ final: updatedFinal });
        }
      } else
      if (newHeight + final.y <= this.parentHeight) {
        /*if new height + current y <= parent div height
                                                      * set "width to current width + current x", "height to ratio height" and "x to 0" */
        const newWidth = final.width + final.x,
        finalHeight = heightFromRatio * newWidth,
        updatedFinal = {
          ...this.state.final,
          width: newWidth,
          height: finalHeight,
          x: 0 };


        // enable/disable (push to left) button
        this.enableLeftButton(0);

        // enable/disable (push to right) button
        this.enableRightButton(0, newWidth);

        // enable/disable (push to bottom) button
        this.enableBottomButton(final.y, finalHeight);

        this.setState({ final: updatedFinal });
      }
    });_defineProperty(this, "setRatioToBottomRight",


    ({ width, minimum_size, final }) => {
      const { widthFromRatio, heightFromRatio } = this.state;
      /* if current x + new width is less than parent width (means we are in the parent div) =>
                                                              * set "width to the new width" and "height to ratio height" */
      if (final.x + width <= this.parentWidth) {
        let newHeight = heightFromRatio * width;
        if (
        newHeight > minimum_size &&
        newHeight + final.y <= this.parentHeight)
        {
          const updatedFinal = {
            ...this.state.final,
            width: width,
            height: newHeight };


          // enable/disable (push to right) button
          this.enableRightButton(final.x, width);

          // enable/disable (push to bottom) button
          this.enableBottomButton(final.y, newHeight);

          this.setState({ final: updatedFinal });
        } else
        if (newHeight + final.y >= this.parentHeight) {
          /* if ratio height + current y >= parent div height =>
                                                       * set "width to (parent div height - current y) * width ratio value" and "height to parent div height - current y" */
          const newWidth = (this.parentHeight - final.y) * widthFromRatio,
          finalHeight = this.parentHeight - final.y,
          updatedFinal = {
            ...this.state.final,
            width: newWidth,
            height: finalHeight };


          // enable/disable (push to right) button
          this.enableRightButton(final.x, newWidth);

          // enable/disable (push to bottom) button
          this.enableBottomButton(final.y, finalHeight);

          this.setState({ final: updatedFinal });
        }
      } else {
        const newHeight = heightFromRatio * (this.parentWidth - final.x);
        if (newHeight + final.y <= this.parentHeight) {
          /* if new height + current y <= parent div height =>
                                                       * set "width to parent div width - current x" and "height to new height" */
          const newWidth = this.parentWidth - final.x,
          updatedFinal = {
            ...this.state.final,
            width: newWidth,
            height: newHeight };


          // enable/disable (push to right) button
          this.enableRightButton(final.x, newWidth);

          // enable/disable (push to bottom) button
          this.enableBottomButton(final.y, newHeight);

          this.setState({ final: updatedFinal });
        }
      }
    });_defineProperty(this, "setRatioToTopRight",

    ({
      height,
      newMouseY,
      minimum_size,
      original,
      final }) =>
    {
      const { widthFromRatio, heightFromRatio } = this.state,
      newWidth = widthFromRatio * height;
      // if inside div on y
      if (original.y + (newMouseY - original.mouse_y) >= 0) {
        if (newWidth + final.x <= this.parentWidth && height > minimum_size) {
          /* if (new width + current x <= parent div width) && (height is less than minimum size) =>
                                                                              * set "width to new width", "height to coming height" and "y to (initial y + (new mouse y - initial mouse y))"*/
          const newY = original.y + (newMouseY - original.mouse_y),
          updatedFinal = {
            ...this.state.final,
            width: newWidth,
            height: height,
            y: newY };


          // enable/disable (push to right) button
          this.enableRightButton(final.x, newWidth);

          // enable/disable (push to top) button
          this.enableTopButton(newY);

          // enable/disable (push to bottom) button
          this.enableBottomButton(newY, height);

          this.setState({ final: updatedFinal });
        } else {
          /*opposite =>
                * set "width to parent div width - current x", "height to ratio height based on new width" and "y to (old height + old y) - new height" */
          if (height > minimum_size) {
            const oldOccupiedSpace = final.height + final.y,
            newHeight = heightFromRatio * (this.parentWidth - final.x),
            newY = oldOccupiedSpace - newHeight,
            finalWidth = this.parentWidth - final.x,
            updatedFinal = {
              ...this.state.final,
              width: finalWidth,
              height: newHeight,
              y: newY };


            // enable/disable (push to right) button
            this.enableRightButton(final.x, finalWidth);

            // enable/disable (push to top) button
            this.enableTopButton(newY);

            // enable/disable (push to bottom) button
            this.enableBottomButton(newY, newHeight);

            this.setState({ final: updatedFinal });
          }
        }
      } else {
        if (newWidth + final.x <= this.parentWidth) {
          /* if new width + current x <= parent div width =>
                                                     * set "width to width based on new height", "height to current height + current y" and "y to 0" */
          const finalWidth = widthFromRatio * (final.height + final.y),
          finalHeight = final.height + final.y,
          updatedFinal = {
            ...this.state.final,
            width: finalWidth,
            height: finalHeight,
            y: 0 };


          // enable/disable (push to right) button
          this.enableRightButton(final.x, finalWidth);

          // enable/disable (push to top) button
          this.enableTopButton(0);

          // enable/disable (push to bottom) button
          this.enableBottomButton(0, finalHeight);

          this.setState({ final: updatedFinal });
        }
      }
    });_defineProperty(this, "setRatioToTopLeft",

    ({
      height,
      newMouseY,
      newMouseX,
      minimum_size,
      original,
      final }) =>
    {
      const { widthFromRatio, heightFromRatio } = this.state,
      newWidth = widthFromRatio * height,
      oldOccupiedSpaceX = final.x + final.width;
      // if initial y + (current mouse y - initial mouse y) is greater than 0
      if (original.y + (newMouseY - original.mouse_y) >= 0) {
        const newX = oldOccupiedSpaceX - newWidth;
        if (
        newX >= 0 &&
        original.x + (newMouseX - original.mouse_x) >= 0 &&
        height > minimum_size)
        {
          /* if (new x >= 0) && (initial x + (new mouse x - initial mouse x) >= 0) && (height > minimum size) =>
           * set "width to ratio width", "x to (old x + old width) - new width", "height to coming height" and "y to initial y + (new mouse y - initial mouse y)" */
          const newY = original.y + (newMouseY - original.mouse_y),
          updatedFinal = {
            ...this.state.final,
            width: newWidth,
            x: newX,
            height: height,
            y: newY };


          // enable/disable (push to left) button
          this.enableLeftButton(newX);

          // enable/disable (push to right) button
          this.enableRightButton(newX, newWidth);

          // enable/disable (push to top) button
          this.enableTopButton(newY);

          // enable/disable (push to bottom) button
          this.enableBottomButton(newY, height);

          this.setState({ final: updatedFinal });
        } else {
          // opposite
          const newHeight = heightFromRatio * (final.width + final.x),
          oldOccupiedSpaceY = final.y + final.height,
          newY = oldOccupiedSpaceY - newHeight;
          if (
          newY >= 0 &&
          newHeight + final.y <= this.parentHeight &&
          height > minimum_size)
          {
            /* if (new y >= 0) && (new height + current y <= parent div height) && (height > minimum size) =>
             * set "width to current width + current x", "height to new height", "x to 0" and "y to new y" */
            const finalWidth = final.width + final.x,
            updatedFinal = {
              ...this.state.final,
              width: finalWidth,
              height: newHeight,
              x: 0,
              y: newY };


            // enable/disable (push to left) button
            this.enableLeftButton(0);

            // enable/disable (push to right) button
            this.enableRightButton(0, finalWidth);

            // enable/disable (push to top) button
            this.enableTopButton(newY);

            // enable/disable (push to bottom) button
            this.enableBottomButton(newY, newHeight);

            this.setState({ final: updatedFinal });
          }
        }
      } else {
        // opposite
        const newX =
        oldOccupiedSpaceX - widthFromRatio * (final.height + final.y);
        if (newX >= 0 && newWidth + final.x <= this.parentWidth) {
          /* if (new x >= 0) && (new width + current x <= prent div width) =>
                                                                   * set "width to ratio width", "x to new x", "height to current height + current y", "y to 0" */
          const finalWidth = widthFromRatio * (final.height + final.y),
          finalHeight = final.height + final.y,
          updatedFinal = {
            ...this.state.final,
            width: finalWidth,
            x: newX,
            height: finalHeight,
            y: 0 };


          // enable/disable (push to left) button
          this.enableLeftButton(newX);

          // enable/disable (push to right) button
          this.enableRightButton(newX, finalWidth);

          // enable/disable (push to top) button
          this.enableTopButton(0);

          // enable/disable (push to bottom) button
          this.enableBottomButton(0, finalHeight);

          this.setState({ final: updatedFinal });
        }
      }
    });_defineProperty(this, "resize",

    e => {
      const {
        original,
        final,
        minimum_size,
        isResizeDiv,
        isRatio,
        isTopLeftResize,
        isTopRightResize,
        isBottomLeftResize,
        isBottomRightResize } =
      this.state;
      let newMouseX = e.clientX || e.pageX || e.touches && e.touches[0].clientX,
      newMouseY = e.clientY || e.pageY || e.touches && e.touches[0].clientY,
      width = 0,
      height = 0;

      if (isResizeDiv) {
        if (isBottomRightResize) {
          width = original.width + (newMouseX - original.mouse_x);
          height = original.height + (newMouseY - original.mouse_y);

          if (width > minimum_size) {
            if (isRatio) {
              this.setRatioToBottomRight({
                width,
                minimum_size,
                final });

            } else {
              this.setFullWidthToRight({ width, final });
            }
          }
          if (height > minimum_size) {
            if (isRatio) {
              this.setRatioToBottomRight({
                width,
                minimum_size,
                final });

            } else {
              this.setFullHeightToBottom({ height, final });
            }
          }
        } else
        if (isBottomLeftResize) {
          height = original.height + (newMouseY - original.mouse_y);
          width = original.width - (newMouseX - original.mouse_x);
          if (height > minimum_size) {
            if (isRatio) {
              this.setRatioToBottomLeft({
                width,
                newMouseX,
                minimum_size,
                original,
                final });

            } else {
              this.setFullHeightToBottom({ height, final });
            }
          }
          if (width > minimum_size) {
            if (isRatio) {
              this.setRatioToBottomLeft({
                width,
                newMouseX,
                minimum_size,
                original,
                final });

            } else {
              this.setFullWidthToLeft({
                width,
                newMouseX,
                original,
                final });

            }
          }
        } else
        if (isTopRightResize) {
          width = original.width + (newMouseX - original.mouse_x);
          height = original.height - (newMouseY - original.mouse_y);

          if (width > minimum_size) {
            if (isRatio) {
              this.setRatioToTopRight({
                height,
                newMouseY,
                minimum_size,
                original,
                final });

            } else {
              this.setFullWidthToRight({ width, final });
            }
          }
          if (height > minimum_size) {
            if (isRatio) {
              this.setRatioToTopRight({
                height,
                newMouseY,
                minimum_size,
                original,
                final });

            } else {
              this.setFullHeightToTop({
                height,
                newMouseY,
                original,
                final });

            }
          }
        } else
        if (isTopLeftResize) {
          width = original.width - (newMouseX - original.mouse_x);
          height = original.height - (newMouseY - original.mouse_y);

          if (width > minimum_size) {
            if (isRatio) {
              this.setRatioToTopLeft({
                height,
                newMouseY,
                newMouseX,
                minimum_size,
                original,
                final });

            } else {
              this.setFullWidthToLeft({
                width,
                newMouseX,
                original,
                final });

            }
          }
          if (height > minimum_size) {
            if (isRatio) {
              this.setRatioToTopLeft({
                height,
                newMouseY,
                newMouseX,
                minimum_size,
                original,
                final });

            } else {
              this.setFullHeightToTop({
                height,
                newMouseY,
                original,
                final });

            }
          }
        }
      }
      this.repositionOverlay();
    });_defineProperty(this, "move",


    e => {
      const { offset, original, final } = this.state;
      let newMouseX = e.clientX || e.pageX || e.touches && e.touches[0].clientX,
      newMouseY = e.clientY || e.pageY || e.touches && e.touches[0].clientY;

      if (this.state.isMoveDiv) {
        // if (mouse is inside parent div on y) and (current y + offset y + current div height <= parent height) set y
        if (
        original.y + (newMouseY - original.mouse_y) >= 0 &&
        newMouseY + offset[1] + final.height <= this.parentHeight)
        {
          const newY = newMouseY + offset[1],
          updatedFinal = {
            ...this.state.final,
            y: newY };


          // enable/disable (push to top) button
          this.enableTopButton(newY);

          // enable/disable (push to bottom) button
          this.enableBottomButton(newY, final.height);

          this.setState({ final: updatedFinal });
        } else
        if (original.y + (newMouseY - original.mouse_y) <= 0) {
          // if mouse is outside parent div on y => set y to 0
          const updatedFinal = {
            ...this.state.final,
            y: 0 };


          // enable/disable (push to top) button
          this.enableTopButton(0);

          // enable/disable (push to bottom) button
          this.enableBottomButton(0, final.height);

          this.setState({ final: updatedFinal });
        } else
        if (newMouseY + offset[1] + final.height >= this.parentHeight) {
          // if current y + offset y + current height >= parent height => set y parent height - current height
          const newY = this.parentHeight - final.height,
          updatedFinal = {
            ...this.state.final,
            y: newY };


          // enable/disable (push to top) button
          this.enableTopButton(newY);

          // enable/disable (push to bottom) button
          this.enableBottomButton(newY, final.height);
          this.setState({ final: updatedFinal });
        }

        // if (mouse is inside parent div on x) and (current x + offset x + current div width <= parent width) set x
        if (
        original.x + (newMouseX - original.mouse_x) >= 0 &&
        newMouseX + offset[0] + final.width <= this.parentWidth)
        {
          const newX = newMouseX + offset[0];
          const updatedFinal = {
            ...this.state.final,
            x: newX };


          // enable/disable (push to left) button
          this.enableLeftButton(newX);

          // enable/disable (push to right) button
          this.enableRightButton(newX, final.width);

          this.setState({ final: updatedFinal });
        } else
        if (original.x + (newMouseX - original.mouse_x) <= 0) {
          // if mouse is outside parent div on x => set x to 0
          const updatedFinal = {
            ...this.state.final,
            x: 0 };


          // enable/disable (push to left) button
          this.enableLeftButton(0);

          // enable/disable (push to right) button
          this.enableRightButton(0, final.width);

          this.setState({ final: updatedFinal });
        } else
        if (newMouseX + offset[0] + final.width >= this.parentWidth) {
          // if current x + initial x + current width >= parent width => set x to parent width - current width
          const newX = this.parentWidth - final.width,
          updatedFinal = {
            ...this.state.final,
            x: newX };


          // enable/disable (push to left) button
          this.enableLeftButton(newX);

          // enable/disable (push to right) button
          this.enableRightButton(newX, final.width);

          this.setState({ final: updatedFinal });
        }
      }
      this.repositionOverlay();
    });_defineProperty(this, "enableLeftButton",


    x => {
      const isEnabled = x > 0;
      this.setState({ isLeftEnabled: isEnabled });
    });_defineProperty(this, "enableRightButton",

    (x, width) => {
      const isEnabled = x + width < this.parentWidth;
      this.setState({ isRightEnabled: isEnabled });
    });_defineProperty(this, "enableTopButton",

    y => {
      const isEnabled = y > 0;
      this.setState({ isTopEnabled: isEnabled });
    });_defineProperty(this, "enableBottomButton",

    (y, height) => {
      const isEnabled = y + height < this.parentHeight;
      this.setState({ isBottomEnabled: isEnabled });
    });_defineProperty(this, "pushResizableToLeft",

    () => {
      const { isLeftEnabled, isRightEnabled, final: { width, height, x, y } } = this.state;
      if (isLeftEnabled) {
        this.setState(prevState => ({
          final: {
            ...this.state.final,
            x: prevState.final.x - 1 },

          isLeftEnabled: prevState.final.x - 1 === 0 ? false : true }));

      }

      if (!isRightEnabled) {
        this.setState({ isRightEnabled: true });
      }
      this.repositionOverlayUserControls(width, height, x - 1, y);
    });_defineProperty(this, "pushResizableToRight",

    () => {
      const { isRightEnabled, isLeftEnabled, final: { width, height, x, y } } = this.state;

      if (isRightEnabled) {
        this.setState(prevState => ({
          final: {
            ...this.state.final,
            x: prevState.final.x + 1 },

          isRightEnabled:
          prevState.final.x + 1 + prevState.final.width === this.parentWidth ?
          false :
          true }));

      }

      if (!isLeftEnabled) {
        this.setState({ isLeftEnabled: true });
      }

      this.repositionOverlayUserControls(width, height, x + 1, y);
    });_defineProperty(this, "pushResizableToTop",

    () => {
      const { isTopEnabled, isBottomEnabled, final: { width, height, x, y } } = this.state;
      if (isTopEnabled) {
        this.setState(prevState => ({
          final: {
            ...this.state.final,
            y: prevState.final.y - 1 },

          isTopEnabled: prevState.final.y - 1 === 0 ? false : true }));

      }

      if (!isBottomEnabled) {
        this.setState({ isBottomEnabled: true });
      }
      this.repositionOverlayUserControls(width, height, x, y - 1);
    });_defineProperty(this, "pushResizableToBottom",

    () => {
      const { isBottomEnabled, isTopEnabled, final: { width, height, x, y } } = this.state;

      if (isBottomEnabled) {
        this.setState(prevState => ({
          final: {
            ...this.state.final,
            y: prevState.final.y + 1 },

          isBottomEnabled:
          prevState.final.y + 1 + prevState.final.height === this.parentHeight ?
          false :
          true }));

      }

      if (!isTopEnabled) {
        this.setState({ isTopEnabled: true });
      }

      this.repositionOverlayUserControls(width, height, x, y + 1);
    });_defineProperty(this, "flipImageVertically",

    () => {
      this.setState(prevState => ({
        isFlippedVer: !prevState.isFlippedVer }));

    });_defineProperty(this, "flipImageHorizontally",

    () => {
      this.setState(prevState => ({
        isFlippedHor: !prevState.isFlippedHor }));

    });_defineProperty(this, "resetData",

    () => {
      this.setState({
        ...this.state,
        isMouseDown: false,
        isMoveDiv: false,
        isResizeDiv: false,
        ratioValue: "1:1",
        isRatio: true,
        widthFromRatio: 1,
        heightFromRatio: 1,
        minimum_size: 20,
        original: {
          width: 0,
          height: 0,
          x: 0,
          y: 0,
          mouse_x: 0,
          mouse_y: 0 },

        final: {
          width: 80,
          height: 80,
          x: 0,
          y: 0 },

        offset: [0, 0],
        isLeftEnabled: false,
        isRightEnabled: true,
        isTopEnabled: false,
        isBottomEnabled: true,
        isFlippedVer: false,
        isFlippedHor: false,
        isCropped: false,
        croppedSrc: "" });

      this.repositionOverlayUserControls(80, 80, 0, 0);
    });_defineProperty(this, "onRatioChange",

    ({ target: { value } }) => {
      this.setState({ ratioValue: value });
      this.setRatio(value);
    });_defineProperty(this, "setIsCropped",

    cropped => {
      this.setState({ isCropped: cropped });
    });_defineProperty(this, "getCroppedImg",

    croppedSrc => {
      this.setState({ croppedSrc: croppedSrc });
      this.props.getCroppedImg(croppedSrc);
    });}componentDidMount() {// access resizable div
    this.element = this.resizable.current; // check whether to resize based on ratio or no
    this.setRatio(this.state.ratioValue); // solve race condition issue
    const { image } = this.props;this.img.src = image;this.img.addEventListener("load", this.onImgLoaded); // attach event listeners
    window.addEventListener("mousemove", this.handleMouseMove);window.addEventListener("touchmove", this.handleMouseMove);window.addEventListener("mouseup", this.handleMouseUp);window.addEventListener("touchend", this.handleMouseUp);window.addEventListener("resize", this.updateWrapperWidth);}componentWillUnmount() {// remove event listeners
    window.removeEventListener("mousemove", this.handleMouseMove);window.removeEventListener("touchmove", this.handleMouseMove);window.removeEventListener("mouseup", this.handleMouseUp);window.removeEventListener("touchend", this.handleMouseUp);window.removeEventListener("resize", this.updateWrapperWidth);} // if mousedown is true check which action to make (resize or move)
  render() {const { final: { width, height, x, y }, containerMaxWidth, isImg,
      isLeftEnabled,
      isRightEnabled,
      isTopEnabled,
      isBottomEnabled,
      isFlippedHor,
      isFlippedVer,
      ratioValue,
      isCropped,
      overlayN,
      overlayE,
      overlayS,
      overlayW,
      croppedSrc } =
    this.state,
    { image, allowUserControls } = this.props;

    return (
      React.createElement(Fragment, null,
      !isImg && React.createElement(Loader, null),
      !isCropped ?
      React.createElement(Fragment, null,
      React.createElement("div", {
        className: "resize-move-crop-container",
        style: {
          width: containerMaxWidth,
          visibility: isImg ? "visible" : "hidden" },

        ref: this.resizeMoveCropContainer },

      React.createElement("img", {
        src: image,
        alt: "image",
        style: {
          transform: `scale(${isFlippedHor ? "-1" : "1"}, ${
          isFlippedVer ? "-1" : "1"
          })` } }),

      React.createElement("div", {
        className: "overlay-n",
        style: {
          right: overlayN.right,
          height: overlayN.height,
          left: overlayN.left } }),

      React.createElement("div", {
        className: "overlay-e",
        style: {
          left: overlayE.left } }),

      React.createElement("div", {
        className: "overlay-s",
        style: {
          right: overlayS.right,
          top: overlayS.top,
          left: overlayS.left } }),

      React.createElement("div", { className: "overlay-w", style: { width: overlayW.width } }),
      React.createElement("div", {
        className: "resizable",
        ref: this.resizable,
        onMouseDown: this.handleMoveClick,
        onTouchStart: this.handleMoveClick,
        style: { width: width, height: height, left: x, top: y } },

      React.createElement("div", { className: "resizers" },
      React.createElement("div", {
        className: "resizer top-left",
        onMouseDown: this.onTopLeftResize,
        onTouchStart: this.onTopLeftResize }),

      React.createElement("div", {
        className: "resizer top-right",
        onMouseDown: this.onTopRightResize,
        onTouchStart: this.onTopRightResize }),

      React.createElement("div", {
        className: "resizer bottom-left",
        onMouseDown: this.onBottomLeftResize,
        onTouchStart: this.onBottomLeftResize }),

      React.createElement("div", {
        className: "resizer bottom-right",
        onMouseDown: this.onBottomRightResize,
        onTouchStart: this.onBottomRightResize })))),

      allowUserControls &&
      React.createElement(SelectAndCropControls, {
        isLeftDisabled: !isLeftEnabled,
        isRightDisabled: !isRightEnabled,
        isTopDisabled: !isTopEnabled,
        isBottomDisabled: !isBottomEnabled,
        flipImageVertically: this.flipImageVertically,
        flipImageHorizontally: this.flipImageHorizontally,
        pushResizableToLeft: this.pushResizableToLeft,
        pushResizableToRight: this.pushResizableToRight,
        pushResizableToTop: this.pushResizableToTop,
        pushResizableToBottom: this.pushResizableToBottom,
        resetData: this.resetData,
        onRatioChange: this.onRatioChange,
        ratioValue: ratioValue }),

      React.createElement(CropImage, {
        imageSrc: image,
        width: width,
        height: height,
        x: x,
        y: y,
        setIsCropped: this.setIsCropped,
        getCroppedImg: this.getCroppedImg,
        isFlippedVer: isFlippedVer,
        isFlippedHor: isFlippedHor })) :

      React.createElement("div", null,
      React.createElement("img", { src: croppedSrc, alt: "cropped image" }))));
  }}


class App extends Component {
  constructor(...args) {
    super(...args);
    _defineProperty(this,"state",
      {
        fileInputImage: "",
        isError: false,
        croppedImgSrc: "",
        croppedImgSrc2: "",
        croppedImgSrc3: "",
        croppedImgSrc4: "" 
      }
    );
    _defineProperty(this,"form",
      createRef()
    );
    _defineProperty(this,"onSelectImage",
      event => {
        const file = event.target.files[0];
        if (file.type === "image/jpeg" ||file.type === "image/jpg" ||file.type === "image/png"){
          this.setState({
            fileInputImage: URL.createObjectURL(file),
            isError: false
          });
        } else {
          this.setState({ isError: true });
        }
      }
    );
    _defineProperty(this,"removeImg",
      () => {
        this.form.current.reset();
        this.setState({ fileInputImage: "" });
      });
    _defineProperty(this,"getCroppedImg",
      croppedSrc => {
        this.setState({ croppedImgSrc: croppedSrc });
      }
    );
    _defineProperty(this, "getCroppedImgSecond",
      croppedSrc => {
        this.setState({ croppedImgSrc2: croppedSrc });
      }
    );
    _defineProperty(this, "getCroppedImgThird",
      croppedSrc => {
        this.setState({ croppedImgSrc3: croppedSrc });
      }
    );
    _defineProperty(this, "getCroppedImgForth",
      croppedSrc => {
        this.setState({ croppedImgSrc4: croppedSrc });
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