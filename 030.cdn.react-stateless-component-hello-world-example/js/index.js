function Welcome(props) {
  return React.createElement("h1", null, "HELLO, ", props.name);
}

const element = React.createElement(Welcome, { name: "WORLD" });
ReactDOM.render(
element,
document.getElementById('root'));


/* another option is to put the element directly in your ReactDOM render statment.
                                  
                                  ReactDOM.render(
                                    <Welcome name="WORLD" />,
                                    document.getElementById('root')
                                  );
                                  */