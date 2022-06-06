function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _extends() {_extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};return _extends.apply(this, arguments);}const { map, is, contains, curry, __, prop, equals, pipe, find, ifElse, F, identity } = R;
const cloneChildren = (children, props) => React.Children.map(children, child => React.createElement(child.type, _extends({}, child.props, props)));
const Head = ({ children, ...props }) => cloneChildren(children, props);
const Content = ({ children, ...props }) => cloneChildren(children, props);

const pickFromRect = rect => {
  const { width, height, top, left } = rect;
  return { width, height, x: left, y: top };
};

const _findChildren = curry((component, children) => find(pipe(prop('type'), equals(component)))(children));
const findChildrenOr = curry((val, component, children) => ifElse(is(Array), _findChildren(component), val)(children));
const findChildren = findChildrenOr(F);
const findChildrenOrIdentity = findChildrenOr(identity);

const getLastPositionStyles = ({ maxWidth, maxHeight }) => {
  const mW = maxWidth > window.innerWidth ? window.innerWidth : maxWidth;
  const mH = maxHeight > window.innerHeight ? window.innerHeight : maxHeight;

  return {
    width: mW,
    height: mH,
    x: window.innerWidth / 2 - mW / 2,
    y: window.innerHeight / 2 - mH / 2 };

};

const states = {
  IDLE: 'IDLE',
  OPEN: 'OPEN',
  OPENED: 'OPENED',
  CLOSE: 'CLOSE',
  IMMEDIATELY_CLOSE: 'IMMEDIATELY_CLOSE' };


const openState = [states.OPEN, states.OPENED, states.CLOSE, states.IMMEDIATELY_CLOSE];
const afterOpenState = [states.OPENED, states.CLOSE];
const closingState = [states.CLOSE, states.IMMEDIATELY_CLOSE];
const isActiveState = contains(__, openState);
const isAfterOpenState = contains(__, afterOpenState);
const isClosingState = contains(__, closingState);
const isOpenedState = equals(states.OPENED);

class Modal extends React.Component {








  constructor(props) {
    super(props);_defineProperty(this, "state", { styles: {}, state: states.IDLE });_defineProperty(this, "openAnimation",
















































    () => {
      const { rect, state } = this.state;

      if (state !== states.OPEN) return;

      const to = getLastPositionStyles(this.props);

      anime({
        targets: this.content.current,
        maxWidth: to.width,
        height: to.height,
        translateX: [rect.x, to.x],
        translateY: [rect.y, to.y],
        duration: this.props.ms,
        baseFrequency: 0,
        complete: this.openDoneCallback,
        easing: 'easeInQuad' });

    });_defineProperty(this, "closeAnimation",






    () => {
      const { cloneRect: to, rect } = this.state;

      anime({
        targets: this.content.current,
        maxWidth: to.width,
        height: to.height,
        translateX: [rect.x, to.x],
        translateY: [rect.y, to.y],
        duration: this.props.ms,
        baseFrequency: 0,
        complete: this.closeDoneCallback,
        easing: 'easeOutQuad' });

    });this.open = this.open.bind(this);this.close = this.close.bind(this);this.createProps = this.createProps.bind(this);this.closeDoneCallback = this.closeDoneCallback.bind(this);this.openDoneCallback = this.openDoneCallback.bind(this);this.clone = React.createRef();this.content = React.createRef();}openDoneCallback() {const to = getLastPositionStyles(this.props);this.setState({ state: states.OPENED, styles: { maxWidth: to.width, height: to.height, left: '50%', top: '50%', transform: 'translate3d(-50%, -50%, 0)' } });}closeDoneCallback() {this.setState({ state: states.IDLE, styles: {}, bodyStyles: {} });}setStartData(state, cb) {const cloneRect = pickFromRect(this.clone.current.getBoundingClientRect());const rect = pickFromRect(this.content.current.getBoundingClientRect());const styles = { maxWidth: rect.width, height: rect.height, top: 0, left: 0, transform: `translate3d(${rect.x}px, ${rect.y}px, 0)` };this.setState({ ...state, cloneRect, rect, styles }, cb);}open() {if (this.state.state !== states.IDLE) return;this.setStartData({ state: states.OPEN }, this.openAnimation);}

  close() {
    if (this.state.state !== states.OPENED) return;

    this.setStartData(undefined, this.closeAnimation);
  }

  createProps(Component, props) {
    return {
      ...Component.props,
      modal: {
        ...props,
        isOpen: isActiveState(this.state.state),
        close: this.close } };


  }

  renderClone() {
    const Head = findChildrenOrIdentity(Modal.Head, this.props.children);

    return Head && isActiveState(this.state.state) ?
    React.createElement(Head.type, this.createProps(Head)) :
    null;
  }

  renderHead() {
    const Head = findChildrenOrIdentity(Modal.Head, this.props.children);

    return Head ?
    React.createElement(Head.type, this.createProps(Head, { original: true })) :
    null;
  }

  renderContent() {
    const Content = findChildren(Modal.Content, this.props.children);

    return Content && isOpenedState(this.state.state) ?
    React.createElement(Content.type, this.createProps(Content)) :
    null;
  }

  getBackgroundStyle() {
    return {
      transition: `opacity ${this.props.ms / 4}ms ease-in-out` };

  }

  getContentStyle() {
    return {
      ...this.state.styles,
      transition: `box-shadow ${this.props.ms}ms ease-in-out` };

  }

  getContaninerClassNames() {
    const { state } = this.state;
    return [
    'transform-modal__container',
    isActiveState(state) ? 'transform-modal__container--open' : '',
    isClosingState(state) ? 'transform-modal__container--closing' : ''].
    join(' ');
  }

  render() {
    return (
      React.createElement("div", _extends({ className: "transform-modal" }, this.props),
      React.createElement("div", { ref: this.clone },
      this.renderClone()),

      React.createElement("div", { className: this.getContaninerClassNames() },
      React.createElement("div", {
        className: "transform-modal__background",
        onClick: this.close,
        style: this.getBackgroundStyle() }),

      React.createElement("div", {
        className: "transform-modal__content",
        style: this.getContentStyle(),
        onClick: this.open,
        ref: this.content },

      this.renderHead(),
      this.renderContent()))));




  }}_defineProperty(Modal, "Head", Head);_defineProperty(Modal, "Content", Content);


const images = [
{
  bg: 'https://images.unsplash.com/photo-1465765407776-61e63b99d10c?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=bc1d692696d6dc9f422fd89b2aaa1cd1',
  title: 'Winner #1',
  text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna.' },

{
  bg: 'https://images.unsplash.com/photo-1485286162995-aa63d31c06cb?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=edb0ee9e83e720444637907175b1b521',
  title: 'Winner #2',
  text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna.' },

{
  bg: 'https://images.unsplash.com/photo-1473346782721-d6cef5897f07?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=254be18c40b7520249b2b29f85e05fa4',
  title: 'Winner #3',
  text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna.' },

{
  bg: 'https://images.unsplash.com/photo-1516737347189-ed6ee46a4027?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=bcf69dbf1cf03001f85e570f09237baa',
  title: 'Winner #4',
  text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna.' },

{
  bg: 'https://images.unsplash.com/photo-1516419591857-14c5e8ce3a6e?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=a7dc46f376e7dd7650884f1314712c5c',
  title: 'Winner #5',
  text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna.' },

{
  bg: 'https://images.unsplash.com/photo-1520405231068-ff009f727fe6?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=4dea33bfbf12e317d9966179cdc14188',
  title: 'Winner #6',
  text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna.' }];



const ImageHead = ({ title, bg, modal: { isOpen, original, close } }) =>
React.createElement("div", { className: `image ${isOpen & original ? 'image--active' : ''}`, style: {} },
React.createElement("div", { className: "image__bg", style: { backgroundImage: `url(${bg})` } }),
React.createElement("div", { className: "image__content" },

isOpen & original ?
React.createElement("button", { className: "image__close", onClick: close }, "\u2716") :
null,

React.createElement("h2", null, title)));




const ImageContent = ({ title, text }) =>
React.createElement("div", { className: "image-content" },
React.createElement("h3", null, title),
React.createElement("p", null, text));



const ImageModal = (item) =>
React.createElement("div", { className: "grid__item" },
React.createElement(Modal, {
  maxWidth: 700,
  maxHeight: 500,
  ms: 300 },

React.createElement(Modal.Head, null,
React.createElement(ImageHead, item)),

React.createElement(Modal.Content, null,
React.createElement(ImageContent, item))));





const ImageModalList = ({ images }) => map(ImageModal, images);

const Layout = ({ children }) =>
React.createElement(React.Fragment, null,
React.createElement("div", { class: "title" },
React.createElement("h1", null, "React modal animation"),
React.createElement("ul", { class: "socials" },
React.createElement("li", null,
React.createElement("a", { href: "https://odintsov.me", target: "_blank" },
React.createElement("img", { src: "https://maxcdn.icons8.com/Android_L/PNG/24/Messaging/link-24.png", alt: "Twitter icon" }))),


React.createElement("li", null,
React.createElement("a", { href: "https://twitter.com/odintsov_design", target: "_blank" },
React.createElement("img", { src: "https://img.icons8.com/color/48/000000/twitter.png", alt: "Twitter icon" }))))),




children,
React.createElement("div", { class: "credits" }, "Created with ", React.createElement("span", { class: "love" }), " by ", React.createElement("a", { href: "https://codepen.io/ivanodintsov" }, "Ivan Odintsov")));



const App = () =>
React.createElement(Layout, null,
React.createElement("div", { className: "grid" },
React.createElement(ImageModalList, { images: images })));




const root = document.querySelector('#root');
ReactDOM.render(React.createElement(App, null), root);