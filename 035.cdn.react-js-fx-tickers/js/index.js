function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}class Toolbar extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "handleInputChange",



    event => {
      this.setState({ inputValue: event.target.value });
    });_defineProperty(this, "handleSubmit",

    () => {
      this.props.addTicker(this.state.inputValue);
      this.clearInput();
    });_defineProperty(this, "addRandomTickers",





    () => {
      const randomTickers = [];
      for (let i = 0; i < 100; ++i) {
        randomTickers.push(makeDummyCurrencyPair());
      }
      this.props.addTicker(randomTickers);
    });this.state = { inputValue: '' };}clearInput() {this.setState({ inputValue: '' });}

  render() {
    return (
      React.createElement("div", { className: "toolbar" },
      React.createElement("label", null, "Add currency pair: "),
      React.createElement("input", { className: "toolbar__input", type: "text", value: this.state.inputValue, onChange: this.handleInputChange }),
      React.createElement("button", { className: "toolbar__button", onClick: this.handleSubmit }, "Add"),
      React.createElement("button", { className: "toolbar__button", onClick: this.addRandomTickers }, "Add 100 random pairs")));


  }}


class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { price: 50, prevPrice: 50, fluctuation: 0 };
  }

  componentDidMount() {
    this.tickPrice();
  }

  tickPrice() {
    setTimeout(() => {
      const randomTick = this.state.price / 100 * Math.random();
      const fluctuation = Math.random() > 0.5 ? randomTick : -1 * randomTick; //-1% to 1% fluctuation
      const newPrice = this.state.price + fluctuation;

      this.setState({ price: newPrice, prevPrice: this.state.price, fluctuation });
      this.tickPrice();
    }, Math.random() * 1000 + 500); //tick every 500 - 1500 ms
  }

  getFluctuationClassName() {
    if (this.state.fluctuation < 0) {
      return 'tile__fluctuation tile__fluctuation--down';
    }
    return 'tile__fluctuation';
  }

  render() {
    const buyPrice = this.state.price + 0.12;
    const sellPrice = this.state.price - 0.12;
    const absoluteFluctuation = Math.abs(this.state.fluctuation);

    return (
      React.createElement("div", { className: "tile" },
      React.createElement("h1", { className: "tile__currency-pair-label" }, this.props.currencyPair),
      React.createElement("div", { className: this.getFluctuationClassName() }, absoluteFluctuation.toFixed(2)),

      React.createElement("div", { className: "tile__box tile__box--buy" },
      React.createElement("h2", { className: "tile__direction-label" }, "BUY"),
      React.createElement("span", { className: "tile__price-P1" }, buyPrice.toString().substring(0, 5)),
      React.createElement("span", { className: "tile__price-P2" }, buyPrice.toString().substring(5, 7)),
      React.createElement("span", { className: "tile__price-P3" }, buyPrice.toFixed(5).substring(7, 8))),


      React.createElement("div", { className: "tile__box tile__box--sell" },
      React.createElement("h2", { className: "tile__direction-label" }, "SELL"),
      React.createElement("span", { className: "tile__price-P1" }, sellPrice.toString().substring(0, 5)),
      React.createElement("span", { className: "tile__price-P2" }, sellPrice.toString().substring(5, 7)),
      React.createElement("span", { className: "tile__price-P3" }, sellPrice.toFixed(5).substring(7, 8)))));



  }}


class TickerList extends React.Component {
  render() {
    return (
      React.createElement("div", { className: "ticker-list" },

      this.props.data.map(ticker => {
        return React.createElement(Tile, { currencyPair: ticker });
      })));



  }}


class TickerApp extends React.Component {

  constructor(props) {
    super(props);_defineProperty(this, "handleAddTicker",



    ticker => {
      if (ticker) {
        const newCurrencyPairs = this.state.currencyPairs.concat(ticker);
        this.setState({ currencyPairs: newCurrencyPairs });
      }
    });this.state = { currencyPairs: ['USD / JPY', 'GBP / JPY', 'EUR / JPY', 'AUD / USD'] };}

  render() {
    return (
      React.createElement("div", { className: "container" },
      React.createElement("h1", null, "React FX Tickers"),
      React.createElement(Toolbar, { addTicker: this.handleAddTicker }),
      React.createElement(TickerList, { data: this.state.currencyPairs })));


  }}


ReactDOM.render(
React.createElement(TickerApp, null),
document.getElementById('app'));


function makeDummyCurrencyPair() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const alphabetLength = alphabet.length;
  let text = '';

  for (let i = 0; i < 3; ++i) {
    text += alphabet.charAt(Math.floor(Math.random() * alphabetLength));
  }

  text += ' / ';

  for (let i = 0; i < 3; ++i) {
    text += alphabet.charAt(Math.floor(Math.random() * alphabetLength));
  }

  return text;
}