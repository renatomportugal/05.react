const myStyle = {
  color: "blue" };


/** 
                   // React Element using plain Js
                   const myReactElement = React.createElement(
                     "h1",
                     { style: myStyle, className: "myClassName" },
                     "Hello World!"
                   );
                   */

// React Element using Jsx
const myReactElement =
React.createElement("h1", { style: myStyle, className: "myClassName" }, "Hello World!");




ReactDOM.render(myReactElement, document.getElementById("app"));