const React = require('react');

exports.BrowserRouter = ({ children }) => React.createElement(React.Fragment, null, children);
exports.HashRouter = exports.BrowserRouter;
exports.MemoryRouter = exports.BrowserRouter;

exports.Link = ({ children, to, ...rest }) => React.createElement('a', { href: to, ...rest }, children);
exports.NavLink = exports.Link;
exports.Route = ({ children }) => React.createElement(React.Fragment, null, children);
exports.Switch = ({ children }) => React.createElement(React.Fragment, null, children);

exports.useNavigate = () => () => {};
exports.useLocation = () => ({ pathname: '/' });
exports.useParams = () => ({});
exports.useHistory = () => ({ push: () => {} });
module.exports = exports;
