// state
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contador: 0,
      name: "Renan Pallin" };

  }

  render() {
    setTimeout(() => {
      this.setState({
        contador: this.state.contador + 1 });

    }, 1000);

    return (
      React.createElement("div", null,
      React.createElement("h1", null, this.state.contador),
      React.createElement("h2", null, this.state.name)));


  }}



// class Contador extends React.Component {
//   render() {
//     return (
//       <div>
//         <h1>{ this.props.valor }</h1>
//       </div>
//     );
//   }
// }



ReactDOM.render(
React.createElement(App, null),
document.getElementById('app'));



/**
                                  * Este pen faz parte do curso de React Native
                                  * https://www.udemy.com/construa-aplicativos-mobile-do-zero-com-react-native/?couponCode=CODEPEN
                                  * Cupom de desconto: CODEPEN
                                  */