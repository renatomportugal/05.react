import {Route,Link, HashRouter} from 'react-router-dom';

const Link = ReactRouterDOM.Link;
const Route = ReactRouterDOM.Route;

const Home = () => <h1>Home</h1>
const Login = () => <h1>Login</h1>
const Register = () => <h1>Register</h1>

const App = () => (
    <ReactRouterDOM.HashRouter>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
      </ul>
    </ReactRouterDOM.HashRouter>
)

ReactDOM.render(<App />, document.querySelector('#app'));