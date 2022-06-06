// Write a component that renders out an h1 that says
// "My First Component". Use ReactDOM's render method
// to write it out to the page
//
// The name of the component must be MyFirstComponent

// code goes here
class MyFirstComponent extends React.Component {
  render() {
    return (
      React.createElement("h1", null, "My First Component"));

  }}


ReactDOM.render(
React.createElement(MyFirstComponent, null),
document.getElementById('target'));

// unit tests
// do not modify the below code
describe('my first component', function () {
  beforeEach(() => {

  });
  it('should exist', () => {
    expect(MyFirstComponent).toBeDefined();

  });

  it('should have a render method', () => {
    expect(MyFirstComponent.prototype.render).toBeDefined();
  });

  it('should render the text <h1>My First Component</h1>', () => {
    const node = document.getElementById('target');
    expect(node.innerHTML.toLowerCase()).toEqual('<h1 data-reactid=".0">my first component</h1>');
  });
});