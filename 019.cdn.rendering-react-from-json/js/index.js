function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} // Page Definitions
// –––
// page1 and page2 define the page structure in 
// a serialized format and could be part of an 
// API response to a page or component 
// endpoint.

const page1 = {
  title: 'Page 1',
  sections: [{
    id: 'wzyQEG',
    component: 'Cover',
    props: {
      head: 'Welcome on Page 1',
      byline: 'Just one of these pages' } },

  {
    id: 'anRAB',
    component: 'Copy',
    props: {
      content: 'Lorem ipsum dolor sit amet.' } }] };




const page2 = {
  title: 'Page 2',
  sections: [{
    id: 'anRAB',
    component: 'Copy',
    props: {
      content: 'This page renders a different set of components.' } },

  {
    id: 'naSUP',
    component: 'Channels',
    props: {
      children: [{
        id: 'zuDAS',
        component: 'Twitter',
        props: {
          handle: 'example.com',
          key: 'twitter' } },

      {
        id: 'tuERA',
        component: 'Link',
        props: {
          subscribeUrl: 'https://google.com',
          key: 'link' } }] } }] };







// Stock Components
// –––
// This is a set of comoponents that we support 
// to render in our <DynamicPage /> component. 
// 
// This pen only experiments with the business 
// logic of traversing the JSON and rendering 
// components accordingly. A big concern in a 
// real-world use case is how to dynamically 
// load components when they are required (and
// SSR them initially on the server).

const CompLabel = (props) =>
React.createElement("div", { className: "complabel-component" }, "Component: ",
React.createElement("b", null, props.label));



const Cover = (props) =>
React.createElement("div", { className: "cover-component" },
React.createElement(CompLabel, { label: "Cover" }),
React.createElement("h1", { className: "cover-head" },
props.head),

React.createElement("p", { className: "cover-byline" },
props.byline));




const Copy = (props) =>
React.createElement("div", { className: "copy-component" },
React.createElement(CompLabel, { label: "Copy" }),
React.createElement("div", null, props.content));



const Channels = (props) =>
React.createElement("div", { className: "channels-component" },
React.createElement(CompLabel, { label: "Channels" }),
React.createElement("div", null, props.children));



const Twitter = (props) =>
React.createElement("div", { className: "twitter-component" },
React.createElement(CompLabel, { label: "Twitter" }),
React.createElement("div", null, "Twitter:\xA0",

React.createElement("a", { href: `https://twitter.com/${props.handle}`, target: "_blank", rel: "noopener noreferrer" }, "@",
props.handle)));





const Link = (props) =>
React.createElement("div", { className: "newsletter-component" },
React.createElement(CompLabel, { label: "Link" }),
React.createElement("div", null, "Google:\xA0",

React.createElement("a", { href: props.subscribeUrl, target: "_blank", rel: "noopener noreferrer" },
props.subscribeUrl)));






const stock = {
  Channels,
  Copy,
  Cover,
  Link,
  Twitter };



// Generic Components

/**
 * Renders components based on data in the
 * {@code root} prop.
 */
class Section extends React.Component {constructor(...args) {super(...args);_defineProperty(this, "createElement",

































    def => {
      return React.createElement(
      stock[def.component],
      def.props,
      ((def.props || {}).children || []).
      map(c => this.createElement(c)));

    });}get root() {return this.props.root;}get rSection() {return this.createElement(this.root);} /**
                                                                                                    * Returns React elements for each item in a 
                                                                                                    * definition tree.
                                                                                                    *
                                                                                                    * This method is the essence of the PEN. 
                                                                                                    * React's {@code render} method always 
                                                                                                    * returns a React element, which is what 
                                                                                                    * happens when we use JSX. 
                                                                                                    *
                                                                                                    * Since our requirement is to render 
                                                                                                    * components based on a serialized format we 
                                                                                                    * can't use JSX, as we don't know the 
                                                                                                    * order, arrangement, and combination of 
                                                                                                    * components at compile time. React's public 
                                                                                                    * {@code React.createElement()} method 
                                                                                                    * allows us to create these elements 
                                                                                                    * programmatically. 
                                                                                                    *
                                                                                                    * What makes it suitable is that it can also 
                                                                                                    * account for children, which enables 
                                                                                                    * handling a nested set of components (we do 
                                                                                                    * that with the {@code Channels}) component 
                                                                                                    * on page2).
                                                                                                    */render() {return React.createElement("section", { className: "section-component" }, this.rSection);}} /**
                                                                                                                                                                                                             * Renders a page defined by its JSON 
                                                                                                                                                                                                             * structure.
                                                                                                                                                                                                             *
                                                                                                                                                                                                             * See {@code page1} and {@code page2} const at 
                                                                                                                                                                                                             * the top.
                                                                                                                                                                                                             */class DynamicPage extends React.Component {get sections() {return this.props.page.sections;}get rSections() {return this.sections.map(s => React.createElement(Section, { key: s.id, root: s }));}

  render() {
    return (
      React.createElement("div", { className: "dynamicpage-component" },
      this.rSections));


  }}



// Utility component to highlight JSON of 
// current page using:
// https://github.com/isagalaev/highlight.js

class HighlightJs extends React.Component {constructor(...args) {super(...args);_defineProperty(this, "highlight",









    () => {
      try {
        hljs.highlightBlock(this.refs.code);
      } catch (e) {
        console.log(hljs, window.hljs);
      }
    });}componentDidMount() {this.highlight();}componentDidUpdate() {this.highlight();}

  render() {
    return (
      React.createElement("div", { className: "highlightjs-component" },
      React.createElement("p", null, React.createElement("b", null, "JSON for currently rendered page")),
      React.createElement("pre", null,
      React.createElement("code", { className: "json", ref: "code" },
      JSON.stringify(this.props.code, null, 2)))));




  }}



// App Component
// –––
// Orchestartes the state in our example, which 
// in real world would probably be handled by 
// some state container.

class App extends React.Component {

  constructor(...args) {
    super(...args);_defineProperty(this, "gotoPage",






    nextPage => {
      this.setState({ curPage: nextPage });
    });this.state = { curPage: page1 };}

  render() {
    return (
      React.createElement("div", { className: "app-component" },
      React.createElement("nav", { className: "app-nav" },
      React.createElement("button", { onClick: ev => this.gotoPage(page1) }, "Page 1"),
      React.createElement("button", { onClick: ev => this.gotoPage(page2) }, "Page 2")),

      React.createElement("p", null, "Current Page: ", React.createElement("b", null, this.state.curPage.title)),
      React.createElement(DynamicPage, { page: this.state.curPage }),
      React.createElement(HighlightJs, { code: this.state.curPage })));



  }}



// Rendering to DOM

ReactDOM.render(
React.createElement(App, null),
document.getElementById('slot'));