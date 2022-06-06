function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function buildFileSelector() {
  const fileSelector = document.createElement('input');
  fileSelector.setAttribute('type', 'file');
  fileSelector.setAttribute('multiple', 'multiple');
  return fileSelector;
}

class FileDialogue extends React.Component {constructor(...args) {super(...args);_defineProperty(this, "handleFileSelect",




    e => {
      e.preventDefault();
      this.fileSelector.click();
    });}componentDidMount() {this.fileSelector = buildFileSelector();}

  render() {
    return React.createElement("a", { className: "button", href: "", onClick: this.handleFileSelect }, "Select files");
  }}


ReactDOM.render(React.createElement(FileDialogue, null), document.getElementById('app'));