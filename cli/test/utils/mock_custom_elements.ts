/**
 * Utility for mocking web components usage.
 * JSDOM does not support document.createElement and shadowDom for native web components.
 * React unit tests try to do this so they fail.
 */

// @ts-ignore.
window.customElements.define = jest.fn();
