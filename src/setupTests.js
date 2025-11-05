// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock IntersectionObserver for testing environment (jsdom)
class IntersectionObserverMock {
	constructor() {}
	observe() {}
	unobserve() {}
	disconnect() {}
}

global.IntersectionObserver = global.IntersectionObserver || IntersectionObserverMock;

// Mock scrollTo to avoid errors during tests
global.scrollTo = global.scrollTo || function () {};
