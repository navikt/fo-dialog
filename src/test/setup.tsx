import '@testing-library/jest-dom/vitest';
// import '../polyfill';
// import.meta.env.VITE_DIALOG_API_URL = 'http://localhost:3000'; // Dette er det som ligger på window.location i jsdom
vi.mock('../felleskomponenter/logging', () => ({
    default: vi.fn(),
    loggChangeInDialog: vi.fn()
}));
Element.prototype.scrollTo = () => {};

window.matchMedia = (): MediaQueryList => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
    onchange: null,
    media: ''
});
