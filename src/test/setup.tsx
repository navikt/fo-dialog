import '../polyfill';

vi.mock('../felleskomponenter/logging', () => ({
    default: vi.fn()
}));
Element.prototype.scrollTo = () => {};
// @ts-ignore
window.matchMedia = (): boolean => true;
