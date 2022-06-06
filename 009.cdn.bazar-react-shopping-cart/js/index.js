function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}const { Component } = React;

const { initStore, register, poke } = bazar;

const colors = [
{ name: "Yellow", hex: "#FDFF8D", text: "black", price: 615 },
{ name: "Wine", hex: "#4D1310", text: "white", price: 258 },
{ name: "Punch", hex: "#EF5678", text: "black", price: 493 },
{ name: "Blue", hex: "#4342B6", text: "white", price: 807 },
{ name: "Green", hex: "#3CAF49", text: "black", price: 105 },
{ name: "Peach", hex: "#F99484", text: "black", price: 752 },
{ name: "Olive", hex: "#95BE67", text: "black", price: 60 },
{ name: "Rose", hex: "#DF3034", text: "white", price: 810 },
{ name: "Mint", hex: "#97ECC2", text: "black", price: 739 },
{ name: "Lilac", hex: "#B560CA", text: "white", price: 974 },
{ name: "Oil", hex: "#0D0702", text: "white", price: 153 },
{ name: "Teal", hex: "#4DA8AB", text: "white", price: 156 },
{ name: "Slate", hex: "#757A86", text: "white", price: 244 },
{ name: "Blush", hex: "#FEC4E4", text: "black", price: 981 },
{ name: "Sky", hex: "#67C3D8", text: "white", price: 239 },
{ name: "Wood", hex: "#413323", text: "white", price: 343 },
{ name: "Iris", hex: "#9865C2", text: "white", price: 56 },
{ name: "Smoke", hex: "#5A525E", text: "black", price: 902 },
{ name: "Azure", hex: "#2920A2", text: "white", price: 433 },
{ name: "Basil", hex: "#356132", text: "white", price: 743 }];


// initializing an empty bazar store
initStore();

const Item = props => {
  const { name, price, hex, text } = props.color;

  const buy = () =>
  poke("App", {
    name,
    type: "increment" });


  return (
    React.createElement("div", { className: "brick" },
    React.createElement("div", { className: "content" },
    React.createElement("div", { className: "color", style: { color: text } },
    React.createElement("div", { className: "palette", style: { background: hex } }),
    React.createElement("h1", null, name)),

    React.createElement("div", { className: "action" },
    React.createElement("p", null, "$ ", price),
    React.createElement("button", { className: "buyButton", onClick: () => buy() }, "Buy")))));






};

const Shop = props => {
  const items = () => {
    return props.colors.map((color, index) => {
      return React.createElement(Item, { color: color, key: index });
    });
  };

  return React.createElement("div", { className: "wall" }, items());
};

const Cart = props => {
  let total = 0;
  const purchases = props.items.map((item, index) => {
    const { name, hex, price, quantity } = item;
    const currentImport = quantity * price;
    total += currentImport;
    return (
      React.createElement("li", { key: index },
      React.createElement("span", { className: "cartColor", style: { background: hex } }, name),
      React.createElement("span", { className: "cartColorQty" }, " x", item.quantity),
      React.createElement("button", { onClick: () => poke("App", { name, type: "increment" }) }, "\u2795"),


      React.createElement("button", { onClick: () => poke("App", { name, type: "decrement" }) }, "\u2796"),


      React.createElement("span", { className: "cartColorImport" }, " $", currentImport),
      React.createElement("button", { onClick: () => poke("App", { name, type: "remove" }) }, "\uD83D\uDDD1")));


  });

  return (
    React.createElement("div", { className: "Cart" },
    React.createElement("ul", null, purchases.length === 0 ? "empty (:" : purchases),
    React.createElement("div", { className: "cartTotal" }, "$ ", total)));


};

const Navbar = (props) =>
React.createElement("div", { className: "navBar" },
React.createElement("ul", null,
React.createElement("li", { onClick: () => props.changeView("shop") },
React.createElement("span", { role: "img", "aria-label": "shop" }, "\uD83C\uDFEA",
" "),

React.createElement("span", null, "Shop")),

React.createElement("li", { onClick: () => props.changeView("cart") },
React.createElement("span", { role: "img", "aria-label": "shop" }, "\uD83D\uDED2",
" "),

React.createElement("span", null, "Cart "),
React.createElement("span", { className: "cartQuantity" }, props.quantity))));





class App extends Component {
  constructor(props) {
    super(props);_defineProperty(this, "changeView",


































    where => this.setState({ view: where }));this.state = { colors: colors.map(e => ({ ...e, quantity: 0 })) };register({ id: "App", sync: () => this.state, onPoke: arg => {const { name, type } = arg;const { colors } = this.state;this.setState({ colors: colors.map(e => {const { quantity } = e;return e.name === name ? { ...e, quantity: (() => {if (type === "increment") return quantity + 1;else if (type === "remove") return 0;return quantity - 1;})() } : e;}) });} });this.changeView = this.changeView.bind(this);}

  render() {
    const { view = "shop", colors } = this.state;

    const quantity = colors.map(e => e.quantity).reduce((a, b) => a + b);

    const inCart = colors.filter(e => e.quantity > 0);

    return (
      React.createElement("div", { className: "App" },
      React.createElement(Navbar, { changeView: this.changeView, quantity: quantity }),
      view === "shop" ? React.createElement(Shop, { colors: colors }) : React.createElement(Cart, { items: inCart })));


  }}


ReactDOM.render(React.createElement(App, null), document.getElementById("root"));