const React = require('react');

// drop boolean-only props like `smooth` to avoid React DOM warnings
exports.HashLink = ({ children, to, smooth, ...rest }) => React.createElement('a', { href: to, ...rest }, children);
module.exports = exports;
