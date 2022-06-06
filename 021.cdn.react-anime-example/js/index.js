const Anime = ReactAnime.default;

let App = () =>
React.createElement(Anime, { easing: "easeOutElastic",
  loop: true,
  duration: 1000,
  direction: "alternate",
  delay: (el, index) => index * 240,
  translateX: "13rem",
  scale: [.75, .9] },
React.createElement("div", { className: "blue" }),
React.createElement("div", { className: "green" }),
React.createElement("div", { className: "red" }));



let node = document.getElementById('app');

ReactDOM.render(React.createElement(App, null), node);