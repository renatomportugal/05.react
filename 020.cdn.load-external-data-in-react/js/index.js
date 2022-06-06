var App = React.createClass({ displayName: "App",

  getInitialState: function () {
    return {
      jobs: [] };

  },

  componentDidMount: function () {
    // Is there a React-y way to avoid rebinding `this`? fat arrow?
    var th = this;
    this.serverRequest =
    axios.get(this.props.source).
    then(function (result) {
      th.setState({
        jobs: result.data.jobs });

    });
  },

  componentWillUnmount: function () {
    this.serverRequest.abort();
  },

  render: function () {
    return (
      React.createElement("div", null,
      React.createElement("h1", null, "Jobs!"),

      this.state.jobs.map(function (job) {
        return (
          React.createElement("div", { key: job.url, className: "job" },
          React.createElement("a", { href: job.url },
          job.company_name, "is looking for a",

          job.term,
          job.title)));



      })));


  } });


React.render(React.createElement(App, { source: "./js/jobs.json" }), document.querySelector("#root"));